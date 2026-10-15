import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import prisma from "../utils/prisma.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: "STUDENT" | "ADMIN";
  name: string;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication token missing or invalid." });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, config.jwtSecret) as {
      userId: string;
      email: string;
      role: "STUDENT" | "ADMIN";
    };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return res.status(401).json({ error: "User session expired or not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
}

export function requireRole(role: "STUDENT" | "ADMIN") {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }
    next();
  };
}