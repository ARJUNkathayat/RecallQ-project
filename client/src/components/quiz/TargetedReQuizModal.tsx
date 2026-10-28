"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Brain,
  RotateCcw,
  Zap,
} from "lucide-react";
import {
  QuestionItem,
  generateTargetedReQuizQuestions,
} from "@/lib/geminiQuizService";

interface TargetedReQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicName: string;
  weakSubtopics: string[];
  initialRetention: number;
}

export default function TargetedReQuizModal({
  isOpen,
  onClose,
  topicName,
  weakSubtopics,
  initialRetention,
}: TargetedReQuizModalProps) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [postRetention, setPostRetention] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadRequiz();
    } else {
      setIsSubmitted(false);
      setSelectedAnswers({});
      setCurrentIndex(0);
    }
  }, [isOpen]);

  const loadRequiz = async () => {
    setLoading(true);
    try {
      const qList = await generateTargetedReQuizQuestions(topicName, weakSubtopics, 4);
      setQuestions(qList);
    } catch (e) {
      console.error("Failed to load requiz questions", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });

    const scorePct = Math.round((correct / (questions.length || 1)) * 100);
    // Spaced consolidation elevates retention from degraded initial retention back to high tier
    const elevated = Math.min(96, Math.max(78, initialRetention + Math.round(scorePct * 0.55)));
    setPostRetention(elevated);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];
  const attemptedCount = Object.keys(selectedAnswers).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Targeted Spaced Re-Test
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {topicName}: Weak-Spot Retention Boost
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-700">
                AI Synthesizing Targeted Remediation Questions...
              </p>
              <p className="text-xs text-slate-400">
                Focusing specifically on: {weakSubtopics.join(", ")}
              </p>
            </div>
          ) : isSubmitted ? (
            /* Results View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Spaced Consolidation Confirmed
                </span>
                <h4 className="text-2xl font-black text-slate-950 mt-2">
                  Retention Decay Interrupted!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  By testing your weak spots right at the forgetting threshold, neural pathways were reinforced according to the Ebbinghaus curve.
                </p>
              </div>

              {/* Before vs After Jump Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="text-center p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                  <div className="text-xs text-slate-400 font-semibold">Pre-Revision</div>
                  <div className="text-2xl font-black text-red-600 mt-1">
                    {initialRetention}%
                  </div>
                  <div className="text-[10px] text-red-500 font-medium">Decayed state</div>
                </div>

                <div className="text-center p-3 rounded-xl bg-white border border-slate-100 shadow-2xs">
                  <div className="text-xs text-slate-400 font-semibold">Post-Revision</div>
                  <div className="text-2xl font-black text-emerald-600 mt-1">
                    {postRetention}%
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    +{postRetention - initialRetention}% Retention Jump 🚀
                  </div>
                </div>
              </div>

              {/* Review Weak Subtopic Answers */}
              <div className="text-left space-y-3 pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900">
                  Concept Remediation Explanations:
                </div>
                {questions.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctAnswer;
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs ${
                        isCorrect
                          ? "bg-emerald-50/50 border-emerald-200 text-slate-800"
                          : "bg-red-50/50 border-red-200 text-slate-800"
                      }`}
                    >
                      <div className="font-semibold text-slate-900 mb-1">
                        Q{idx + 1}: {q.question}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        <span className="font-bold text-indigo-600">Takeaway:</span> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
              >
                Done & Return to Analysis
              </button>
            </div>
          ) : (
            /* Live Re-quiz Question Runner */
            <div className="space-y-6">
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Subtopic: {currentQ?.subtopic}
                </span>
                <span>
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-sm font-bold text-slate-900 leading-relaxed">
                  {currentQ?.question}
                </p>
              </div>

              {/* 4 Options */}
              <div className="space-y-2.5">
                {currentQ?.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex-1 pr-2">{opt}</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isSelected
                            ? "bg-white text-indigo-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((p) => p - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((p) => p + 1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={attemptedCount === 0}
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md flex items-center gap-1.5"
                  >
                    <span>Submit & Check Retention</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
