import { Response } from "express";
import prisma from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.js";

export async function getDashboardOverview(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    // Default student benchmark when unauthenticated or demo
    if (!userId) {
      return res.json({
        stats: {
          overallMastery: 78,
          topicsAtRisk: 5,
          topicsStudied: 24,
          currentStreak: 7,
        },
        retentionCurve: [
          { day: "Today", retention: 100 },
          { day: "1 day", retention: 75 },
          { day: "3 days", retention: 52 },
          { day: "7 days", retention: 40 },
          { day: "14 days", retention: 25 },
          { day: "30 days", retention: 18 },
        ],
        confidenceInsight: {
          confidence: 90,
          accuracy: 65,
          gap: 25,
          alert: "You may be overestimating your understanding of this topic.",
        },
      });
    }

    const [attemptsCount, predictions, user] = await Promise.all([
      prisma.quizAttempt.count({ where: { userId } }),
      prisma.retentionPrediction.findMany({
        where: { userId },
        include: { topic: { select: { id: true, name: true, difficulty: true } } },
        orderBy: { calculatedAt: "desc" },
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { streak: true, name: true },
      }),
    ]);

    const highRiskTopics = predictions.filter((p) => p.forgettingRisk === "HIGH");
    const avgMastery = predictions.length
      ? Math.round(predictions.reduce((acc, p) => acc + p.retentionScore, 0) / predictions.length)
      : 78;

    return res.json({
      stats: {
        overallMastery: avgMastery,
        topicsAtRisk: highRiskTopics.length || 5,
        topicsStudied: predictions.length || 24,
        currentStreak: user?.streak || 7,
      },
      atRiskTopics: predictions.slice(0, 4).map((p) => ({
        id: p.topicId,
        name: p.topic.name,
        retentionScore: p.retentionScore,
        forgettingRisk: p.forgettingRisk,
        recommendedDate: p.recommendedRevisionDate,
      })),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch dashboard overview." });
  }
}