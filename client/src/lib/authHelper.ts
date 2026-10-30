/**
 * Auth & User Context Helper for RecallIQ
 * Manages separate state for Demo (Arjun Kathayat) vs New Registered Users
 */

export interface RecallUser {
  id?: string;
  name: string;
  email: string;
  branch?: string;
  year?: string;
  college?: string;
  streak?: number;
  role?: string;
}

export const ARJUN_DEMO_USER: RecallUser = {
  id: "ed07abbe-6715-408d-b397-5a0d50f110c5",
  name: "Arjun Kathayat",
  email: "arjun@example.com",
  branch: "Computer Science & Engineering (CSE)",
  year: "3rd Year",
  college: "NIET Greater Noida",
  streak: 7,
  role: "STUDENT",
};

export function getCurrentUser(): RecallUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem("recallq_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && (parsed.email || parsed.name)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to parse recallq_user from localStorage", e);
  }
  return null;
}

export function isArjunUser(user: RecallUser | null): boolean {
  if (!user) return true; // Default unauthenticated state shows Arjun demo curriculum
  const email = (user.email || "").toLowerCase().trim();
  const name = (user.name || "").toLowerCase().trim();
  return (
    email === "arjun@example.com" ||
    email.startsWith("arjunkathayat") ||
    name.includes("arjun")
  );
}
