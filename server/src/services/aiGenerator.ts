import { config } from "../config/index.js";

export interface AIQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  subtopic: string;
  explanation: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

const CANDIDATE_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-2.5-flash-lite",
];

async function callGemini(prompt: string): Promise<string> {
  const apiKey = config.geminiApiKey;
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        }),
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Gemini ${model}] failed with ${response.status}: ${errorText.substring(0, 100)}`);
        continue;
      }

      const data = (await response.json()) as any;
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return rawText;
      }
    } catch (err: any) {
      console.warn(`[Gemini ${model}] request error:`, err.message);
      lastError = err;
    }
  }

  throw new Error(lastError ? `Gemini API error: ${lastError.message}` : "Failed to query Gemini models.");
}

/**
 * Generate diagnostic multiple-choice questions for ANY subject/topic
 */
export async function generateAIQuestions(
  topic: string,
  questionCount: number = 20,
  difficulty: string = "MEDIUM"
): Promise<AIQuestion[]> {
  const prompt = `You are an elite diagnostic assessment creator for the RecallIQ adaptive learning platform.
Generate exactly ${questionCount} diverse, high-yield diagnostic multiple-choice questions for the topic: "${topic}".
Difficulty level: ${difficulty}.

Requirements:
1. Cover at least 4 to 6 distinct, granular subtopics under "${topic}".
   For example, if the topic is "Linked List", subtopics might be "Floyd Cycle Detection", "Memory Locality & Overhead", "Pointer Reversal", "Doubly Linked List Deletion", "Circular Lists".
   If the topic is "French Revolution", subtopics might be "Estates General", "Reign of Terror", "Economic Crisis", "Bastille Storming".
   If the topic is "Three-Phase Induction Motor", subtopics might be "Slip Calculation", "Rotating Magnetic Field", "Torque-Speed Characteristics", "Stator Winding".
2. Every question must test deep conceptual understanding, edge cases, and common student misconceptions (NOT trivial definitions).
3. Exactly 4 options per question. The distractors must reflect common conceptual mistakes.
4. "correctAnswer" must be the 0-based index (0, 1, 2, or 3).
5. "explanation" must clearly explain why the correct choice is true and why the others are misconceptions.

Respond strictly with a valid JSON array of objects matching this schema:
[
  {
    "question": "string",
    "options": ["Option 0", "Option 1", "Option 2", "Option 3"],
    "correctAnswer": 0,
    "subtopic": "string granular subtopic",
    "explanation": "string detailed explanation",
    "difficulty": "EASY" | "MEDIUM" | "HARD"
  }
]`;

  try {
    const rawJson = await callGemini(prompt);
    const parsed = JSON.parse(rawJson);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((q, idx) => ({
        id: `ai-q-${idx + 1}-${Date.now().toString(36)}`,
        question: q.question,
        options: Array.isArray(q.options) ? q.options.slice(0, 4) : ["A", "B", "C", "D"],
        correctAnswer: typeof q.correctAnswer === "number" ? q.correctAnswer : 0,
        subtopic: q.subtopic || "Core Principles",
        explanation: q.explanation || "Correct based on fundamental principles.",
        difficulty: (["EASY", "MEDIUM", "HARD"].includes(q.difficulty) ? q.difficulty : difficulty) as "EASY" | "MEDIUM" | "HARD",
      }));
    }
  } catch (error) {
    console.error("AI Question Generation error, falling back to algorithmic generator:", error);
  }

  // Graceful fallback questions if external network fails
  return generateFallbackQuestions(topic, questionCount);
}

/**
 * Generate targeted remediation re-quiz focused on identified weak subtopics
 */
export async function generateWeakSubtopicReQuiz(
  topic: string,
  weakSubtopics: string[],
  questionCount: number = 5
): Promise<AIQuestion[]> {
  const subtopicListStr = weakSubtopics.length > 0 ? weakSubtopics.join(", ") : "Core Fundamentals";
  const prompt = `You are an expert diagnostic tutor. A student just took a test on "${topic}" and scored poorly on these specific weak subtopics:
${subtopicListStr}

Generate exactly ${questionCount} targeted diagnostic remediation questions specifically testing and reinforcing these exact weak areas to verify if their retention has recovered.
Make each explanation offer a memorable "Cheat Sheet Mental Hook".

Return strictly a JSON array of objects:
[
  {
    "question": "string",
    "options": ["Option 0", "Option 1", "Option 2", "Option 3"],
    "correctAnswer": 0,
    "subtopic": "one of the weak subtopics: ${subtopicListStr}",
    "explanation": "string explanation with a clear takeaway",
    "difficulty": "MEDIUM"
  }
]`;

  try {
    const rawJson = await callGemini(prompt);
    const parsed = JSON.parse(rawJson);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((q, idx) => ({
        id: `requiz-q-${idx + 1}-${Date.now().toString(36)}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        subtopic: q.subtopic || weakSubtopics[0] || "Targeted Review",
        explanation: q.explanation,
        difficulty: "MEDIUM",
      }));
    }
  } catch (err) {
    console.error("Re-quiz generation error:", err);
  }

  return generateFallbackQuestions(topic, questionCount, weakSubtopics);
}

/**
 * Robust fallback generator ensuring zero downtime even without internet
 */
function generateFallbackQuestions(topic: string, count: number, customSubtopics?: string[]): AIQuestion[] {
  const subtopics = customSubtopics && customSubtopics.length > 0
    ? customSubtopics
    : ["Core Definition & Structure", "Operational Complexity", "Edge Cases & Boundaries", "Common Anti-Patterns", "Real-World Application"];

  const sampleQuestions: AIQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const subtopic = subtopics[i % subtopics.length];
    sampleQuestions.push({
      id: `fallback-${i + 1}-${Date.now().toString(36)}`,
      question: `In the context of ${topic} (${subtopic}), what is the primary consideration when evaluating efficiency and structural constraints?`,
      options: [
        `Optimal resource utilization and minimization of overhead in ${subtopic}`,
        `Strict reliance on sequential traversal disregarding memory hierarchy`,
        `Constant time execution regardless of input scaling parameters`,
        `Deprecation of boundary validation during state transitions`,
      ],
      correctAnswer: 0,
      subtopic: subtopic,
      explanation: `Understanding ${subtopic} in ${topic} requires balancing optimal resource bounds while preserving algorithmic invariants.`,
      difficulty: "MEDIUM",
    });
  }
  return sampleQuestions;
}
