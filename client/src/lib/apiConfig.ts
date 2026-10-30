/**
 * Centralized API configuration for RecallIQ Frontend
 * Direct-wired to live production backend on Vercel
 */
export const BACKEND_PROD_URL = "https://recall-q-project-pn86.vercel.app";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || `${BACKEND_PROD_URL}/api`;
