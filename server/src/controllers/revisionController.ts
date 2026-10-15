import { Response } from "express";
import { z } from "zod";
import prisma from "../utils/prisma.js";
import { AuthRequest } from "../middleware/auth.js";
import { calculateMemoryStrength, calculateRetention, calculateForgettingRisk, calculateNextRevisionDate } from "../services/retentionEngine.js";

export async function getRevisionQueue(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      // Return seeded demo list
      const topics = await prisma.topic.findMany({
        take: 4,
        select: {
          id: true,
          name: true,
          difficulty: true,
          summary: true,
          keyConcepts: true,
          subject: { select: { name: true } },
        },
      });

      return res.json({
        queue: topics.map((t, idx) => ({
          id: t.id,
          topic: t.name,
          subject: t.subject.name,
          priority: idx === 0 ? "HIGH" : "MEDIUM",
          due: idx === 0 ? "Due Today" : `Due in ${idx + 1} Days`,
          mastery: 65 + idx * 8,
          retentionBefore: 38 + idx * 10,
          retentionAfter: 85 + idx * 3,
          summary: t.summary || "Core concepts revision",
          keyPoints: t.keyConcepts ? t.keyConcepts.split("\n") : [],
        })),
      });
    }

    const predictions = await prisma.retentionPrediction.findMany({
      where: { userId },
      include: {
        topic: {
          include: { subject: { select: { name: true } } },
        },
      },
      orderBy: [{ forgettingRisk: "asc" }, { recommendedRevisionDate: "asc" }],
    });

    return res.json({ queue: predictions });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch revision queue." });
  }
}

const completeRevisionSchema = z.object({
  confidenceBefore: z.number().optional().default(50),
  confidenceAfter: z.number().min(0).max(100),
});

export async function completeRevision(req: AuthRequest, res: Response) {
  try {
    const topicId = String(req.params.topicId);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const validated = completeRevisionSchema.parse(req.body);

    const existingPred = await prisma.retentionPrediction.findUnique({
      where: { userId_topicId: { userId, topicId } },
    });

    const topic = await prisma.topic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return res.status(404).json({ error: "Topic not found." });
    }

    const retentionBefore = existingPred ? existingPred.retentionScore : 45;
    const revCount = await prisma.revision.count({ where: { userId, topicId } });

    const newMemoryStrength = calculateMemoryStrength(
      85,
      revCount + 1,
      topic.difficulty as any,
      10
    );

    const retentionAfter = calculateRetention(0, newMemoryStrength); // resets to 100 on revision day
    const nextDate = calculateNextRevisionDate(newMemoryStrength);
    const forgettingRisk = calculateForgettingRisk(retentionAfter, 10, 0);

    const revision = await prisma.revision.create({
      data: {
        userId,
        topicId,
        confidenceBefore: validated.confidenceBefore,
        confidenceAfter: validated.confidenceAfter,
        retentionBefore,
        retentionAfter,
      },
    });

    await prisma.retentionPrediction.upsert({
      where: { userId_topicId: { userId, topicId } },
      create: {
        userId,
        topicId,
        retentionScore: retentionAfter,
        forgettingRisk,
        memoryStrength: newMemoryStrength,
        recommendedRevisionDate: nextDate,
      },
      update: {
        retentionScore: retentionAfter,
        forgettingRisk,
        memoryStrength: newMemoryStrength,
        recommendedRevisionDate: nextDate,
        calculatedAt: new Date(),
      },
    });

    return res.json({
      message: "Revision session completed successfully.",
      revision,
      retentionBefore,
      retentionAfter,
      forgettingRisk,
      recommendedNextDate: nextDate,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid payload", details: error.errors });
    }
    return res.status(500).json({ error: "Failed to record revision session." });
  }
}