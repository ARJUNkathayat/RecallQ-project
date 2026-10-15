export interface MasteryFactors {
  accuracy: number; // A in [0, 100]
  revisionPerformance: number; // R in [0, 100]
  difficultyScore: number; // D in [0, 100]
  confidenceCalibration: number; // C in [0, 100]
}

export interface MasteryWeights {
  w1: number; // Accuracy weight (default 0.40)
  w2: number; // Revision weight (default 0.25)
  w3: number; // Difficulty weight (default 0.20)
  w4: number; // Calibration weight (default 0.15)
}

export const DEFAULT_MASTERY_WEIGHTS: MasteryWeights = {
  w1: 0.40,
  w2: 0.25,
  w3: 0.20,
  w4: 0.15,
};

export function calculateMasteryScore(
  factors: MasteryFactors,
  weights: MasteryWeights = DEFAULT_MASTERY_WEIGHTS
) {
  const { accuracy, revisionPerformance, difficultyScore, confidenceCalibration } = factors;
  const { w1, w2, w3, w4 } = weights;

  const rawMastery =
    w1 * accuracy +
    w2 * revisionPerformance +
    w3 * difficultyScore +
    w4 * confidenceCalibration;

  const numericMastery = Math.round(Math.max(0, Math.min(100, rawMastery)));

  return {
    numericMastery,
    normalizedScore: numericMastery / 100,
    contributingFactors: {
      accuracyContribution: +(w1 * accuracy).toFixed(2),
      revisionContribution: +(w2 * revisionPerformance).toFixed(2),
      difficultyContribution: +(w3 * difficultyScore).toFixed(2),
      confidenceContribution: +(w4 * confidenceCalibration).toFixed(2),
    },
    weights,
  };
}