import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  jwtSecret: process.env.JWT_SECRET || "recallq_jwt_super_secret_dev_key_2026",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
};

export default config;