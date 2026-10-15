import { Request, Response } from "express";
import prisma from "../utils/prisma.js";

export async function getSubjects(req: Request, res: Response) {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        topics: {
          select: {
            id: true,
            name: true,
            description: true,
            difficulty: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    const enriched = subjects.map((sub) => ({
      ...sub,
      topicsCount: sub.topics.length,
      overallMastery: 78, // default benchmark
    }));

    return res.json({ subjects: enriched });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve subjects." });
  }
}

export async function getSubjectById(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const subject = await prisma.subject.findUnique({
      where: { id },
      include: {
        topics: {
          include: {
            quizzes: {
              select: { id: true, title: true, totalQuestions: true },
            },
          },
        },
      },
    });

    if (!subject) {
      return res.status(404).json({ error: "Subject not found." });
    }

    return res.json({ subject });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve subject." });
  }
}

export async function getTopicById(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const topic = await prisma.topic.findUnique({
      where: { id },
      include: {
        subject: { select: { id: true, name: true } },
        quizzes: {
          include: {
            _count: { select: { attempts: true } },
          },
        },
      },
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found." });
    }

    return res.json({ topic });
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve topic." });
  }
}