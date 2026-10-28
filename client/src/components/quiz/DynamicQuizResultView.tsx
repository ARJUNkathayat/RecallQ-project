"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BarChart2,
  Bell,
  Calendar,
  Layers,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { QuizDiagnosticResult } from "@/lib/geminiQuizService";
import TargetedReQuizModal from "./TargetedReQuizModal";

interface DynamicQuizResultViewProps {
  diagnostic: QuizDiagnosticResult;
  timeSpentSec: number;
  onRetake: () => void;
  onNewTopic: () => void;
}

export default function DynamicQuizResultView({
  diagnostic,
  timeSpentSec,
  onRetake,
  onNewTopic,
}: DynamicQuizResultViewProps) {
  const [showRequizModal, setShowRequizModal] = useState(false);
  const [simulatedReminderFired, setSimulatedReminderFired] = useState(false);
  const [expandedSubtopic, setExpandedSubtopic] = useState<string | null>(null);

  const {
    topicName,
    accuracy,
    confidence,
    confidenceGap,
    correctCount,
    totalQuestions,
    masteryScore,
    forgettingRisk,
    recommendedDays,
    subtopicBreakdown,
    weakSubtopics,
    decayCurve,
    isOverconfident,
    isUnderconfident,
    isCalibrated,
  } = diagnostic;

  useEffect(() => {
    if (accuracy >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  }, [accuracy]);

  const toggleSubtopic = (sub: string) => {
    setExpandedSubtopic((prev) => (prev === sub ? null : sub));
  };

  const handleSimulateReminder = () => {
    setSimulatedReminderFired(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Diagnostic & Retention Report</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Diagnostic Complete: {topicName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {correctCount} of {totalQuestions} questions correct &middot;{" "}
            {Math.floor(timeSpentSec / 60)}m {timeSpentSec % 60}s time spent
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onRetake}
            className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake</span>
          </button>

          <button
            onClick={onNewTopic}
            className="px-4 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>New Topic</span>
          </button>

          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <span>Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </motion.div>

      {/* 4 Performance Metric Rings */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className="text-3xl font-black text-slate-950">{accuracy}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Quiz Accuracy</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {correctCount}/{totalQuestions} questions correct
          </div>
        </div>

        {/* Prior Confidence */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className="text-3xl font-black text-indigo-600">{confidence}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Self Confidence</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Pre-quiz belief rating</div>
        </div>

        {/* Calculated Mastery */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className="text-3xl font-black text-slate-950">{masteryScore}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Calculated Mastery</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            Weighted Calibration M
          </div>
        </div>

        {/* Forgetting Risk */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div
            className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${
              forgettingRisk === "HIGH"
                ? "text-red-700 bg-red-50 border-red-200"
                : forgettingRisk === "MEDIUM"
                ? "text-amber-700 bg-amber-50 border-amber-200"
                : "text-emerald-700 bg-emerald-50 border-emerald-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                forgettingRisk === "HIGH"
                  ? "bg-red-500"
                  : forgettingRisk === "MEDIUM"
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />
            <span>{forgettingRisk} RISK</span>
          </div>
          <div className="text-xs font-bold text-slate-700 mt-2">Forgetting Risk</div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Revision recommended in {recommendedDays} days
          </div>
        </div>
      </div>

      {/* METACONGNITIVE INSIGHT & CONFIDENCE GAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6: Calibration Gap Bar */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                <span>Confidence vs Accuracy Calibration</span>
              </h3>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Gap: {confidenceGap}%
              </span>
            </div>

            <div className="space-y-4 my-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Prior Self-Confidence Rating</span>
                  <span className="font-bold text-indigo-600">{confidence}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Actual Diagnostic Accuracy</span>
                  <span className="font-bold text-blue-600">{accuracy}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${accuracy}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Diagnostic Message */}
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                isOverconfident
                  ? "bg-red-50 border-red-200 text-red-800"
                  : isUnderconfident
                  ? "bg-blue-50 border-blue-200 text-blue-800"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {isOverconfident && <AlertTriangle className="w-4 h-4 text-red-600" />}
                {isUnderconfident && <Sparkles className="w-4 h-4 text-blue-600" />}
                {isCalibrated && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                <span>
                  {isOverconfident && "Overconfidence Detected"}
                  {isUnderconfident && "Underconfidence / Solid Instincts"}
                  {isCalibrated && "Calibrated Metacognition"}
                </span>
              </div>
              <p>
                {isOverconfident &&
                  `Your confidence exceeded actual performance by ${confidenceGap}%. You feel you understand "${topicName}" better than you actually demonstrated. The Ebbinghaus decay curve will wipe out unreinforced concepts quickly without targeted review.`}
                {isUnderconfident &&
                  `Your test performance exceeded your confidence by ${confidenceGap}%. You possess strong intuitive retention in "${topicName}".`}
                {isCalibrated &&
                  `Your confidence is tightly aligned with your actual accuracy (${confidenceGap}% gap). Your self-assessment is well calibrated.`}
              </p>
            </div>
          </div>
        </div>

        {/* Right 6: Ebbinghaus Memory Decay Projection */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>Ebbinghaus Memory Decay Projection</span>
              </h3>
              <span className="text-[11px] font-semibold text-indigo-600">
                R(t) = e^(-t/S)
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Estimated retention degradation over 30 days without spaced revision.
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={decayCurve}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="resultRetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 9, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderRadius: "10px",
                      border: "none",
                      color: "#fff",
                      fontSize: "11px",
                    }}
                    formatter={(val) => [`${val}%`, "Estimated Retention"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="retention"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#resultRetGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-2 p-3 rounded-2xl bg-amber-50/80 border border-amber-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Recommended Spaced Revision Interval:</span>
            </div>
            <span className="font-extrabold text-amber-700">
              Within {recommendedDays} days
            </span>
          </div>
        </div>
      </div>

      {/* SUBTOPIC WEAK-SPOT BREAKDOWN MATRIX (The core user requirement!) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Diagnostic Weak-Spot Breakdown</span>
            </div>
            <h3 className="text-lg font-black text-slate-950">
              Where You Need Targeted Practice in &ldquo;{topicName}&rdquo;
            </h3>
            <p className="text-xs text-slate-500">
              Pinpointing granular subtopics where misconceptions occurred so you don&apos;t waste time rereading what you already know.
            </p>
          </div>

          {weakSubtopics.length > 0 && (
            <div className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold shrink-0 self-start sm:self-auto">
              {weakSubtopics.length} Weak Area{weakSubtopics.length > 1 ? "s" : ""} Flagged
            </div>
          )}
        </div>

        {/* Subtopic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subtopicBreakdown.map((item) => {
            const isWeak = item.status === "CRITICAL_WEAK_SPOT";
            const isMod = item.status === "MODERATE_RISK";
            const isMastered = item.status === "MASTERED";
            const isExpanded = expandedSubtopic === item.subtopic;

            return (
              <div
                key={item.subtopic}
                className={`p-4 rounded-2xl border transition-all ${
                  isWeak
                    ? "bg-red-50/40 border-red-200"
                    : isMod
                    ? "bg-amber-50/40 border-amber-200"
                    : "bg-emerald-50/40 border-emerald-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isWeak
                            ? "bg-red-500"
                            : isMod
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.subtopic}
                      </h4>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span>
                        Score: {item.correct} of {item.total} correct ({item.accuracy}%)
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                      isWeak
                        ? "text-red-700 bg-red-50 border-red-300"
                        : isMod
                        ? "text-amber-700 bg-amber-50 border-amber-300"
                        : "text-emerald-700 bg-emerald-50 border-emerald-300"
                    }`}
                  >
                    {item.statusLabel}
                  </span>
                </div>

                {/* Progress bar inside subtopic card */}
                <div className="w-full h-1.5 bg-slate-200/70 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isWeak
                        ? "bg-red-500"
                        : isMod
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>

                {/* Actionable Cheat Sheet Tip */}
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-start justify-between gap-2">
                  <p className="text-[11px] text-slate-600 leading-snug">
                    <span className="font-bold text-slate-800">Flash Fix:</span>{" "}
                    {item.cheatSheetTip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SPACED REVISION REMINDER & TARGETED RE-TEST SIMULATION (The exact workflow the user requested!) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Bell className="w-3.5 h-3.5" />
              <span>Automated Spaced Revision Loop</span>
            </div>
            <h3 className="text-xl font-black text-white">
              Spaced Revision Scheduled for &ldquo;{topicName}&rdquo;
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              RecallIQ will automatically remind you in {recommendedDays} days when your memory decay hits the critical retention boundary. Want to test how the reminder and targeted re-quiz works right now?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {/* Simulate Notification Trigger */}
            <button
              onClick={handleSimulateReminder}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <Bell className="w-4 h-4" />
              <span>Simulate Day {recommendedDays} Reminder</span>
            </button>

            {/* Launch Targeted Re-test */}
            <button
              onClick={() => setShowRequizModal(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Take Weak-Spot Re-Test Now</span>
            </button>
          </div>
        </div>

        {/* Simulated Push Notification Toast Card */}
        <AnimatePresence>
          {simulatedReminderFired && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                    Simulated Notification &middot; Day {recommendedDays} Trigger
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">
                    &ldquo;Hey Arjun! {recommendedDays} days ago you studied {topicName} and had weak spots in {weakSubtopics[0] || "core concepts"}. Your retention has decayed to ~45%. Take a 2-minute targeted re-quiz to reinforce it!&rdquo;
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowRequizModal(true)}
                className="px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs shrink-0 self-end sm:self-auto shadow-md"
              >
                Launch Re-Test
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Targeted Re-Quiz Modal */}
      <TargetedReQuizModal
        isOpen={showRequizModal}
        onClose={() => setShowRequizModal(false)}
        topicName={topicName}
        weakSubtopics={weakSubtopics.length > 0 ? weakSubtopics : ["Core Principles"]}
        initialRetention={Math.round(100 * Math.exp(-3 / (masteryScore / 18)))}
      />
    </div>
  );
}
