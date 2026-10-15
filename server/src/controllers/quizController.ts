import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.js";
import { calculateMasteryScore } from "../services/masteryEngine.js";
import {
  calculateMemoryStrength,
  calculateRetention,
  calculateForgettingRisk,
  calculateNextRevisionDate,
} from "../services/retentionEngine.js";

export async function getQuiz(req: AuthRequest, res: Response) {
  try {
    const quizId = String(req.params.id);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        topic: {
          select: {
            id: true,
            name: true,
            difficulty: true,
            subject: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    const questions = await prisma.question.findMany({
      where: { topicId: quiz.topicId },
      select: {
        id: true,
        question: true,
        options: true,
        difficulty: true,
      },
      take: quiz.totalQuestions || 10,
    });

    return res.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        topic: quiz.topic,
        questions,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch quiz." });
  }
}

const submitAttemptSchema = z.object({
  confidence: z.number().min(0).max(100),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedAnswer: z.number().int().min(0).max(3),
      timeSpent: z.number().int().optional().default(0),
    })
  ),
  totalTimeSpentSec: z.number().int().optional().default(0),
});

export async function submitQuizAttempt(req: AuthRequest, res: Response) {
  try {
    const quizId = String(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const validated = submitAttemptSchema.parse(req.body);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { topic: true },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found." });
    }

    const questions = await prisma.question.findMany({
      where: { topicId: quiz.topicId },
    });

    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let correctCount = 0;
    const processedAnswers: Array<{
      questionId: string;
      selectedAnswer: number;
      isCorrect: boolean;
      timeSpent: number;
    }> = [];

    for (const ans of validated.answers) {
      const q = questionMap.get(ans.questionId);
      const isCorrect = q ? q.correctAnswer === ans.selectedAnswer : false;
      if (isCorrect) correctCount++;

      processedAnswers.push({
        questionId: ans.questionId,
        selectedAnswer: ans.selectedAnswer,
        isCorrect,
        timeSpent: ans.timeSpent || 0,
      });
    }

    const totalQuestions = validated.answers.length || 1;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const confidenceGap = Math.abs(validated.confidence - accuracy);

    // Difficulty score normalization
    let difficultyScore = 75;
    if (quiz.topic.difficulty === "HARD") difficultyScore = 90;
    if (quiz.topic.difficulty === "EASY") difficultyScore = 60;

    // Metacognitive calibration
    const confidenceCalibration = Math.max(0, 100 - confidenceGap);

    // Prior revisions count
    const revisionCount = await prisma.revision.count({
      where: { userId, topicId: quiz.topicId },
    });

    const masteryResult = calculateMasteryScore({
      accuracy,
      revisionPerformance: Math.min(100, 60 + revisionCount * 10),
      difficultyScore,
      confidenceCalibration,
    });

    const memoryStrength = calculateMemoryStrength(
      accuracy,
      revisionCount,
      quiz.topic.difficulty as any,
      confidenceGap
    );

    const retentionScore = calculateRetention(1, memoryStrength);
    const forgettingRisk = calculateForgettingRisk(retentionScore, confidenceGap, 1);
    const recommendedDate = calculateNextRevisionDate(memoryStrength);

    // Store in DB
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        userId,
        score: correctCount,
        totalMarks: totalQuestions,
        accuracy,
        confidence: validated.confidence,
        confidenceGap,
        masteryScore: masteryResult.numericMastery,
        timeSpentSec: validated.totalTimeSpentSec,
        answers: {
          create: processedAnswers.map((pa) => ({
            questionId: pa.questionId,
            selectedAnswer: pa.selectedAnswer,
            isCorrect: pa.isCorrect,
            timeSpent: pa.timeSpent,
          })),
        },
      },
    });

    // Upsert retention prediction
    await prisma.retentionPrediction.upsert({
      where: {
        userId_topicId: {
          userId,
          topicId: quiz.topicId,
        },
      },
      create: {
        userId,
        topicId: quiz.topicId,
        retentionScore,
        forgettingRisk,
        memoryStrength,
        recommendedRevisionDate: recommendedDate,
      },
      update: {
        retentionScore,
        forgettingRisk,
        memoryStrength,
        recommendedRevisionDate: recommendedDate,
        calculatedAt: new Date(),
      },
    });

    return res.status(201).json({
      attemptId: attempt.id,
      correctCount,
      totalQuestions,
      accuracy,
      confidence: validated.confidence,
      confidenceGap,
      masteryScore: masteryResult.numericMastery,
      retentionScore,
      forgettingRisk,
      memoryStrength,
      recommendedRevisionDate: recommendedDate,
      diagnostics: {
        isOverconfident: validated.confidence > accuracy && confidenceGap >= 15,
        isUnderconfident: accuracy > validated.confidence && confidenceGap >= 15,
        contributingFactors: masteryResult.contributingFactors,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid quiz submission payload", details: error.errors });
    }
    return res.status(500).json({ error: "Failed to submit quiz attempt." });
  }
}