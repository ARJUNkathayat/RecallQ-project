import express from "express";
import cors from "cors";
import config from "./config/index.js";
import apiRouter from "./routes/api.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.corsOrigin === "*" ? true : config.corsOrigin.split(","),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome & health
app.get("/", (req, res) => {
  res.json({
    name: "RecallIQ Backend REST API",
    tagline: "Remember More. Forget Less.",
    version: "1.0.0",
    docs: "/api/health",
  });
});

// Mount API routes
app.use("/api", apiRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    error: "Internal server error occurred.",
    message: config.nodeEnv === "development" ? err?.message : undefined,
  });
});

// Start Server
app.listen(config.port, () => {
  console.log(`[RecallIQ API] Server actively listening on port ${config.port}`);
  console.log(`[RecallIQ API] Environment: ${config.nodeEnv}`);
});

export default app;