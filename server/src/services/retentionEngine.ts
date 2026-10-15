export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface RetentionInputs {
  daysSinceRevision: number; // t
  accuracy: number; // 0 to 100
  revisionCount: number; // N_rev
  topicDifficulty: "EASY" | "MEDIUM" | "HARD";
  confidenceGap: number; // |Confidence - Accuracy|
}

export const RETENTION_THRESHOLDS = {
  HIGH_RISK_MAX: 50, // Retention < 50% => HIGH
  MEDIUM_RISK_MAX: 75, // 50% <= Retention < 75% => MEDIUM
  CRITICAL_OVERCONFIDENCE_GAP: 25,
};

export function calculateMemoryStrength(
  accuracy: number,
  revisionCount: number,
  difficulty: "EASY" | "MEDIUM" | "HARD",
  confidenceGap: number
): number {
  // Base memory strength in days
  let s0 = 7.0;
  if (difficulty === "EASY") s0 = 10.0;
  if (difficulty === "HARD") s0 = 5.0;

  // Multiplier for revision count: each spaced repetition stabilizes memory
  const revisionMultiplier = 1 + 0.45 * Math.min(revisionCount, 6);

  // Performance scaling
  const accuracyFactor = Math.max(0.3, accuracy / 100);

  // Metacognitive penalty: large overconfidence or underconfidence lowers memory stability
  const calibrationPenalty = 1 - Math.min(0.35, confidenceGap / 200);

  const memoryStrength = s0 * revisionMultiplier * accuracyFactor * calibrationPenalty;

  return Math.max(1.0, +memoryStrength.toFixed(2));
}

export function calculateRetention(daysSinceRevision: number, memoryStrength: number): number {
  if (daysSinceRevision <= 0) return 100;
  const decay = Math.exp(-daysSinceRevision / Math.max(0.1, memoryStrength));
  const retentionPct = Math.round(Math.max(0, Math.min(100, decay * 100)));
  return retentionPct;
}

export function calculateForgettingRisk(
  retentionScore: number,
  confidenceGap: number,
  daysSinceRevision: number
): RiskLevel {
  if (
    retentionScore < RETENTION_THRESHOLDS.HIGH_RISK_MAX ||
    (confidenceGap >= RETENTION_THRESHOLDS.CRITICAL_OVERCONFIDENCE_GAP && daysSinceRevision >= 2)
  ) {
    return "HIGH";
  }

  if (retentionScore < RETENTION_THRESHOLDS.MEDIUM_RISK_MAX) {
    return "MEDIUM";
  }

  return "LOW";
}

export function calculateNextRevisionDate(memoryStrength: number, targetRetention = 0.70): Date {
  // t_rev = -S * ln(targetRetention)
  const daysUntilRevision = Math.max(1, Math.round(-memoryStrength * Math.log(targetRetention)));
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysUntilRevision);
  return nextDate;
}