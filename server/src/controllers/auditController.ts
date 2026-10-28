import { Request, Response } from "express";
import { z } from "zod";
import {
  fetchLeetCodeProfile,
  fetchGitHubProfile,
  runCognitiveAudit,
} from "../services/profileAuditService.js";

const auditRequestSchema = z.object({
  leetcodeUsername: z.string().optional().default(""),
  githubUsername: z.string().optional().default(""),
});

export async function analyzeUserProfile(req: Request, res: Response) {
  try {
    const validated = auditRequestSchema.parse(req.body);
    const { leetcodeUsername, githubUsername } = validated;

    if (!leetcodeUsername.trim() && !githubUsername.trim()) {
      return res.status(400).json({
        error: "Please provide at least one username: LeetCode or GitHub.",
      });
    }

    const [leetcodeData, githubData] = await Promise.all([
      leetcodeUsername.trim() ? fetchLeetCodeProfile(leetcodeUsername.trim()) : Promise.resolve(null),
      githubUsername.trim() ? fetchGitHubProfile(githubUsername.trim()) : Promise.resolve(null),
    ]);

    const auditResult = await runCognitiveAudit(leetcodeData, githubData);

    return res.status(200).json({
      status: "success",
      query: {
        leetcodeUsername: leetcodeUsername.trim() || null,
        githubUsername: githubUsername.trim() || null,
      },
      audit: auditResult,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid audit request payload", details: error.errors });
    }
    console.error("Profile audit error:", error);
    return res.status(500).json({ error: "Failed to perform cognitive audit on profile." });
  }
}
