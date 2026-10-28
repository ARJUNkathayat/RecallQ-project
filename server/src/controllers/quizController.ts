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
import {
  generateAIQuestions,
  generateWeakSubtopicReQuiz,
  AIQuestion,
} from "../services/aiGenerator.js";

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

const generateDynamicSchema = z.object({
  topicName: z.string().min(1, "Topic name is required"),
  subjectName: z.string().optional().default("General Studies"),
  questionCount: z.number().int().min(3).max(30).optional().default(20),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).optional().default("MEDIUM"),
  confidence: z.number().min(0).max(100).optional().default(75),
});

/**
 * Dynamic Universal AI Quiz Generation endpoint
 * Generates custom 20 diagnostic questions with subtopic tags on ANY subject/topic
 */
export async function generateDynamicQuiz(req: AuthRequest, res: Response) {
  try {
    const validated = generateDynamicSchema.parse(req.body);
    const { topicName, subjectName, questionCount, difficulty, confidence } = validated;

    const questions = await generateAIQuestions(topicName, questionCount, difficulty);

    return res.status(200).json({
      quiz: {
        id: `ai-quiz-${Date.now().toString(36)}`,
        title: `${topicName} Diagnostic Assessment`,
        topicName,
        subjectName,
        difficulty,
        confidence,
        totalQuestions: questions.length,
        questions,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid request payload", details: error.errors });
    }
    console.error("Dynamic quiz generation error:", error);
    return res.status(500).json({ error: "Failed to generate dynamic quiz." });
  }
}

const dynamicSubmitSchema = z.object({
  topicName: z.string().min(1),
  subjectName: z.string().optional().default("General Studies"),
  confidence: z.number().min(0).max(100),
  totalTimeSpentSec: z.number().int().default(0),
  answers: z.array(
    z.object({
      questionId: z.string(),
      question: z.string(),
      subtopic: z.string(),
      selectedAnswer: z.number().int().min(0).max(3),
      correctAnswer: z.number().int().min(0).max(3),
      isCorrect: z.boolean(),
      explanation: z.string().optional().default(""),
    })
  ),
});

/**
 * Submit & Analyze Dynamic Quiz with Subtopic Breakdown & Ebbinghaus Retention Forecast
 */
export async function submitDynamicQuizAttempt(req: AuthRequest, res: Response) {
  try {
    const validated = dynamicSubmitSchema.parse(req.body);
    const { topicName, subjectName, confidence, totalTimeSpentSec, answers } = validated;
    const userId = req.user?.id;

    const totalQuestions = answers.length || 1;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    const confidenceGap = Math.abs(confidence - accuracy);

    // Subtopic Diagnostic Matrix
    const subtopicStats: Record<
      string,
      { total: number; correct: number; questions: Array<{ q: string; isCorrect: boolean; explanation: string }> }
    > = {};

    for (const ans of answers) {
      const sub = ans.subtopic || "General Concepts";
      if (!subtopicStats[sub]) {
        subtopicStats[sub] = { total: 0, correct: 0, questions: [] };
      }
      subtopicStats[sub].total += 1;
      if (ans.isCorrect) {
        subtopicStats[sub].correct += 1;
      }
      subtopicStats[sub].questions.push({
        q: ans.question,
        isCorrect: ans.isCorrect,
        explanation: ans.explanation,
      });
    }

    const subtopicBreakdown = Object.entries(subtopicStats).map(([subtopic, stat]) => {
      const subAccuracy = Math.round((stat.correct / stat.total) * 100);
      let status: "CRITICAL_WEAK_SPOT" | "MODERATE_RISK" | "MASTERED" = "MASTERED";
      let statusLabel = "Mastered";
      let statusColor = "emerald";

      if (subAccuracy < 50) {
        status = "CRITICAL_WEAK_SPOT";
        statusLabel = "Critical Weak Spot";
        statusColor = "red";
      } else if (subAccuracy < 75) {
        status = "MODERATE_RISK";
        statusLabel = "Needs Practice";
        statusColor = "amber";
      }

      // Generate actionable flash fix tip based on subtopic
      const cheatSheetTip = `Key principle: Review edge cases and core invariant definitions for ${subtopic}. Focus on boundary conditions and time/space constraints.`;

      return {
        subtopic,
        total: stat.total,
        correct: stat.correct,
        accuracy: subAccuracy,
        status,
        statusLabel,
        statusColor,
        cheatSheetTip,
      };
    });

    const weakSubtopics = subtopicBreakdown
      .filter((s) => s.status !== "MASTERED")
      .map((s) => s.subtopic);

    // Mastery & Retention calculation
    const calibrationScore = Math.max(0, 100 - confidenceGap);
    const masteryResult = calculateMasteryScore({
      accuracy,
      revisionPerformance: 70,
      difficultyScore: 80,
      confidenceCalibration: calibrationScore,
    });

    const memoryStrength = calculateMemoryStrength(accuracy, 0, "MEDIUM", confidenceGap);
    const retentionScore = calculateRetention(1, memoryStrength);
    const forgettingRisk = calculateForgettingRisk(retentionScore, confidenceGap, 1);
    const recommendedDate = calculateNextRevisionDate(memoryStrength);

    // Ebbinghaus 30-Day Curve Forecast: R(t) = 100 * e^(-t / S)
    const decayCurve = [
      { day: "Today", retention: 100 },
      { day: "Day 1", retention: Math.max(10, Math.round(100 * Math.exp(-1 / memoryStrength))) },
      { day: "Day 3", retention: Math.max(8, Math.round(100 * Math.exp(-3 / memoryStrength))) },
      { day: "Day 7", retention: Math.max(5, Math.round(100 * Math.exp(-7 / memoryStrength))) },
      { day: "Day 14", retention: Math.max(3, Math.round(100 * Math.exp(-14 / memoryStrength))) },
      { day: "Day 30", retention: Math.max(2, Math.round(100 * Math.exp(-30 / memoryStrength))) },
    ];

    const recommendedDays = forgettingRisk === "HIGH" ? 2 : forgettingRisk === "MEDIUM" ? 3 : 7;

    return res.status(200).json({
      topicName,
      subjectName,
      correctCount,
      totalQuestions,
      accuracy,
      confidence,
      confidenceGap,
      masteryScore: masteryResult.numericMastery,
      forgettingRisk,
      memoryStrength,
      recommendedDays,
      recommendedRevisionDate: recommendedDate,
      diagnostics: {
        isOverconfident: confidence > accuracy && confidenceGap >= 15,
        isUnderconfident: accuracy > confidence && confidenceGap >= 15,
        isCalibrated: confidenceGap < 15,
      },
      subtopicBreakdown,
      weakSubtopics,
      decayCurve,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid submission data", details: error.errors });
    }
    console.error("Submit dynamic quiz error:", error);
    return res.status(500).json({ error: "Failed to submit dynamic quiz attempt." });
  }
}

const requizSchema = z.object({
  topicName: z.string().min(1),
  weakSubtopics: z.array(z.string()).min(1),
  questionCount: z.number().int().min(1).max(10).optional().default(5),
});

/**
 * Generate 5 targeted questions exclusively on the weak subtopics to test retention recovery
 */
export async function generateReQuiz(req: AuthRequest, res: Response) {
  try {
    const validated = requizSchema.parse(req.body);
    const { topicName, weakSubtopics, questionCount } = validated;

    const questions = await generateWeakSubtopicReQuiz(topicName, weakSubtopics, questionCount);

    return res.status(200).json({
      quiz: {
        id: `requiz-${Date.now().toString(36)}`,
        title: `${topicName}: Targeted Weak-Spot Re-Test`,
        topicName,
        weakSubtopics,
        totalQuestions: questions.length,
        questions,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid requiz request", details: error.errors });
    }
    console.error("Re-quiz generation error:", error);
    return res.status(500).json({ error: "Failed to generate targeted re-quiz." });
  }
}