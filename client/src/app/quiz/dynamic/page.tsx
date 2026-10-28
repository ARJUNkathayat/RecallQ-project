"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Timer,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  RotateCcw,
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DynamicQuizResultView from "@/components/quiz/DynamicQuizResultView";
import {
  QuestionItem,
  QuizDiagnosticResult,
  generateQuizQuestions,
  calculateQuizDiagnostics,
  saveQuizHistory,
  SavedQuizRecord,
} from "@/lib/geminiQuizService";

function DynamicQuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const topicParam = searchParams.get("topic") || "Linked List";
  const confidenceParam = parseInt(searchParams.get("confidence") || "75", 10);
  const countParam = parseInt(searchParams.get("count") || "20", 10);

  const [topic, setTopic] = useState(topicParam);
  const [confidence, setConfidence] = useState(confidenceParam);
  const [questionCount, setQuestionCount] = useState(countParam);

  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(countParam * 60); // 1 minute per question
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<QuizDiagnosticResult | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Loading animation step messages
  const loadingSteps = [
    `Connecting to Gemini AI Engine...`,
    `Analyzing topic domain: "${topicParam}"...`,
    `Structuring granular subtopic diagnostic matrix...`,
    `Synthesizing ${countParam} high-yield questions with conceptual distractors...`,
  ];

  // Fetch AI generated questions on mount
  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      setLoading(true);

      const stepInterval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 900);

      try {
        const qList = await generateQuizQuestions(topicParam, countParam, "MEDIUM");
        if (isMounted) {
          setQuestions(qList);
          setTimeRemaining(qList.length * 60);
        }
      } catch (err) {
        console.error("Quiz generation failed:", err);
      } finally {
        clearInterval(stepInterval);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuestions();
    return () => {
      isMounted = false;
    };
  }, [topicParam, countParam]);

  // Timer countdown
  useEffect(() => {
    if (loading || quizSubmitted) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, quizSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
  };

  const handleSubmitQuiz = async () => {
    const diag = calculateQuizDiagnostics(topic, confidence, questions, selectedAnswers);
    setDiagnosticResult(diag);
    setQuizSubmitted(true);

    // Save to local storage for Analytics tab
    const historyRecord: SavedQuizRecord = {
      id: `attempt-${Date.now()}`,
      topicName: topic,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      timestamp: Date.now(),
      accuracy: diag.accuracy,
      confidence: diag.confidence,
      confidenceGap: diag.confidenceGap,
      correctCount: diag.correctCount,
      totalQuestions: diag.totalQuestions,
      masteryScore: diag.masteryScore,
      forgettingRisk: diag.forgettingRisk,
      weakSubtopics: diag.weakSubtopics,
      subtopicBreakdown: diag.subtopicBreakdown,
    };
    saveQuizHistory(historyRecord);

    // Also attempt backend persistence silently
    try {
      const answersPayload = questions.map((q, idx) => ({
        questionId: String(q.id),
        question: q.question,
        subtopic: q.subtopic,
        selectedAnswer: selectedAnswers[idx] ?? -1,
        correctAnswer: q.correctAnswer,
        isCorrect: selectedAnswers[idx] === q.correctAnswer,
        explanation: q.explanation,
      }));

      await fetch("http://localhost:5000/api/quizzes/submit-dynamic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicName: topic,
          subjectName: "Universal Curriculum",
          confidence,
          totalTimeSpentSec: questions.length * 60 - timeRemaining,
          answers: answersPayload,
        }),
      });
    } catch (e) {
      // Graceful offline fallback
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setTimeRemaining(questions.length * 60);
    setQuizSubmitted(false);
    setDiagnosticResult(null);
  };

  const handleNewTopic = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="relative w-20 h-20 mb-6">
          <div className="w-full h-full border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <Brain className="w-8 h-8 text-indigo-400 absolute inset-0 m-auto" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>RecallIQ AI Assessment Engine</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          Preparing Diagnostic Assessment
        </h2>

        <motion.p
          key={loadingStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md h-6"
        >
          {loadingSteps[loadingStep]}
        </motion.p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const attemptedCount = Object.keys(selectedAnswers).length;
  const progressPct = Math.round(((currentIndex + 1) / (questions.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50/70 flex font-sans antialiased text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">AI Diagnostic</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">{topic}</span>
          </div>

          {/* Topic Hero Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 shadow-2xs">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <span>AI Dynamic Quiz</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  {topic}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pre-quiz self confidence: <span className="font-bold text-indigo-600">{confidence}%</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 self-start md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <span className="text-sm font-black text-slate-900">{questions.length}</span>
                <span className="block text-[10px] text-slate-400 font-medium">Questions</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-sm font-black text-slate-900">{formatTimer(timeRemaining)}</span>
                <span className="block text-[10px] text-slate-400 font-medium">Time left</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-sm font-black text-indigo-600">Adaptive</span>
                <span className="block text-[10px] text-slate-400 font-medium">Difficulty</span>
              </div>
            </div>
          </div>

          {/* Show Result View if submitted */}
          {quizSubmitted && diagnosticResult ? (
            <DynamicQuizResultView
              diagnostic={diagnosticResult}
              timeSpentSec={questions.length * 60 - timeRemaining}
              onRetake={handleRetake}
              onNewTopic={handleNewTopic}
            />
          ) : (
            /* Live Quiz Question Runner & Palette */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left 8 Cols: Main Question View */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
                  
                  {/* Question Header & Subtopic Tag */}
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Question {currentIndex + 1} of {questions.length}
                    </span>

                    {currentQ?.subtopic && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1.5 shadow-2xs">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Subtopic: {currentQ.subtopic}</span>
                      </span>
                    )}
                  </div>

                  {/* Question Statement */}
                  <div className="min-h-[70px]">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                      {currentQ?.question}
                    </h3>
                  </div>

                  {/* 4 Options */}
                  <div className="space-y-3">
                    {currentQ?.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentIndex] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 group active:scale-[0.99] cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-600/30"
                              : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? "bg-white text-indigo-600 border-white"
                                  : "bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-slate-200"
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-white bg-white"
                                : "border-slate-300"
                            }`}
                          >
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Prev / Next Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((p) => p - 1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {currentIndex < questions.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentIndex((p) => p + 1)}
                          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <span>Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          className="px-7 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-md active:scale-95"
                        >
                          <span>Submit & Analyze Retention</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>

              {/* Right 4 Cols: Progress Palette & Overview */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Question Status Card */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Question Palette
                    </h4>
                    <span className="text-xs font-bold text-indigo-600">
                      {attemptedCount} of {questions.length} Answered
                    </span>
                  </div>

                  {/* Linear Progress */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${(attemptedCount / (questions.length || 1)) * 100}%` }}
                    />
                  </div>

                  {/* 1 to 20 Grid Palette */}
                  <div className="grid grid-cols-5 gap-2 pt-2">
                    {questions.map((_, qIdx) => {
                      const isAnswered = selectedAnswers[qIdx] !== undefined;
                      const isCurrent = currentIndex === qIdx;
                      return (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => setCurrentIndex(qIdx)}
                          className={`h-9 rounded-xl text-xs font-black transition-all border ${
                            isCurrent
                              ? "bg-slate-950 text-white border-slate-950 ring-2 ring-slate-950/20 scale-105"
                              : isAnswered
                              ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                              : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {qIdx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-slate-950" />
                      <span>Current</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700" />
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-md bg-slate-100 border border-slate-200" />
                      <span>Remaining</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Submit & Finish Exam</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtopic Coverage Peek */}
                <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Subtopics Under Test</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    RecallIQ will analyze your accuracy across each subtopic at completion:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {Array.from(new Set(questions.map((q) => q.subtopic))).map((sub) => (
                      <span
                        key={sub}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-semibold"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}
        </main>

        <DashboardFooter />
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function DynamicQuizPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
          <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <DynamicQuizContent />
    </Suspense>
  );
}
