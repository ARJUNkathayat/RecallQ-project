import { Router } from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { getSubjects, getSubjectById, getTopicById } from "../controllers/subjectController.js";
import {
  getQuiz,
  submitQuizAttempt,
  generateDynamicQuiz,
  submitDynamicQuizAttempt,
  generateReQuiz,
} from "../controllers/quizController.js";
import { getDashboardOverview } from "../controllers/dashboardController.js";
import { getRevisionQueue, completeRevision } from "../controllers/revisionController.js";
import { analyzeUserProfile } from "../controllers/auditController.js";
import { requireAuth } from "../middleware/auth.js";

export const apiRouter = Router();

// Health check endpoint (Used by Render for zero-downtime health monitoring)
apiRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "RecallIQ REST API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Authentication Routes
apiRouter.post("/auth/register", register);
apiRouter.post("/auth/login", login);
apiRouter.get("/auth/me", requireAuth, getMe);

// Subjects & Curriculum Routes
apiRouter.get("/subjects", getSubjects);
apiRouter.get("/subjects/:id", getSubjectById);
apiRouter.get("/topics/:id", getTopicById);

// Quiz & Adaptive Confidence Routes
apiRouter.get("/quizzes/:id", getQuiz);
apiRouter.post("/quizzes/:id/attempt", requireAuth, submitQuizAttempt);

// Universal AI Topic & Diagnostic Routes
apiRouter.post("/quizzes/generate-dynamic", generateDynamicQuiz);
apiRouter.post("/quizzes/submit-dynamic", submitDynamicQuizAttempt);
apiRouter.post("/quizzes/requiz", generateReQuiz);

// Student Dashboard Routes
apiRouter.get("/dashboard", getDashboardOverview);

// Spaced Revision Routes
apiRouter.get("/revision", getRevisionQueue);
apiRouter.post("/revision/:topicId/complete", requireAuth, completeRevision);

// LeetCode & GitHub Cognitive Profiler & Audit Routes
apiRouter.post("/audit/analyze", analyzeUserProfile);

export default apiRouter;