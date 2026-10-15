"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  ShieldCheck,
  Calendar
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface QuizResultViewProps {
  topicName: string;
  subjectName: string;
  totalQuestions: number;
  correctCount: number;
  confidence: number;
  timeSpentSec: number;
  onRetake: () => void;
}

export default function QuizResultView({
  topicName,
  subjectName,
  totalQuestions,
  correctCount,
  confidence,
  timeSpentSec,
  onRetake
}: QuizResultViewProps) {
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  const confidenceGap = Math.abs(confidence - accuracy);
  const isOverconfident = confidence > accuracy && confidenceGap >= 15;
  const isUnderconfident = accuracy > confidence && confidenceGap >= 15;
  const isCalibrated = confidenceGap < 15;

  // Algorithmic Mastery calculation: M = 0.40*A + 0.25*R + 0.20*D + 0.15*C
  const calibrationScore = Math.max(0, 100 - confidenceGap);
  const difficultyFactor = 85; // Medium difficulty base
  const revisionHistoryBase = 70;
  const masteryScore = Math.round(
    0.4 * accuracy +
    0.25 * revisionHistoryBase +
    0.2 * difficultyFactor +
    0.15 * calibrationScore
  );

  // Retention and Forgetting risk calculation
  let forgettingRisk: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  let riskColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
  let riskBadgeDot = "bg-emerald-500";
  let recommendedDays = 7;

  if (masteryScore < 60 || (isOverconfident && accuracy < 70)) {
    forgettingRisk = "HIGH";
    riskColor = "text-red-700 bg-red-50 border-red-200";
    riskBadgeDot = "bg-red-500";
    recommendedDays = 2;
  } else if (masteryScore < 78 || isOverconfident) {
    forgettingRisk = "MEDIUM";
    riskColor = "text-amber-700 bg-amber-50 border-amber-200";
    riskBadgeDot = "bg-amber-500";
    recommendedDays = 3;
  }

  const estimatedRetention = Math.round(100 * Math.exp(-1 / (masteryScore / 18)));

  const retentionForecast = [
    { day: "Today", retention: 100 },
    { day: "Day 1", retention: Math.round(100 * Math.exp(-1 / (masteryScore / 18))) },
    { day: "Day 3", retention: Math.round(100 * Math.exp(-3 / (masteryScore / 18))) },
    { day: "Day 7", retention: Math.round(100 * Math.exp(-7 / (masteryScore / 18))) },
    { day: "Day 14", retention: Math.round(100 * Math.exp(-14 / (masteryScore / 18))) },
    { day: "Day 30", retention: Math.round(100 * Math.exp(-30 / (masteryScore / 18))) }
  ];

  useEffect(() => {
    if (accuracy >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [accuracy]);

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
            <span>Retention & Metacognitive Analysis</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Quiz Completed: {topicName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {subjectName} &middot; {correctCount} of {totalQuestions} correct &middot; {Math.floor(timeSpentSec / 60)}m {timeSpentSec % 60}s time spent
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRetake}
            className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
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

      {/* 4 Core Performance Stat Rings */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className="text-3xl font-black text-slate-950">{accuracy}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Quiz Accuracy</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{correctCount}/{totalQuestions} questions correct</div>
        </div>

        {/* Confidence */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className="text-3xl font-black text-indigo-600">{confidence}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Self Confidence</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Pre-quiz rating</div>
        </div>

        {/* Calculated Mastery */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className="text-3xl font-black text-slate-950">{masteryScore}%</div>
          <div className="text-xs font-bold text-slate-700 mt-1">Calculated Mastery</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Weighted formula: M = Σ(w·X)</div>
        </div>

        {/* Forgetting Risk */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
          <div className={`px-3 py-1 rounded-full text-xs font-black border ${riskColor} flex items-center gap-1.5`}>
            <span className={`w-2 h-2 rounded-full ${riskBadgeDot}`} />
            <span>{forgettingRisk} RISK</span>
          </div>
          <div className="text-xs font-bold text-slate-700 mt-2">Forgetting Risk</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Recommended revision in {recommendedDays} days</div>
        </div>

      </div>

      {/* METANCOGNITIVE INSIGHT & CONFIDENCE GAP ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Confidence vs Accuracy Comparison */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                <span>Confidence vs Accuracy Calibration</span>
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Gap: {confidenceGap}%
              </span>
            </div>

            <div className="space-y-4 my-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Confidence (Prior belief)</span>
                  <span className="font-bold text-indigo-600">{confidence}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${confidence}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Actual Accuracy (Test score)</span>
                  <span className="font-bold text-blue-600">{accuracy}%</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${accuracy}%` }} />
                </div>
              </div>
            </div>

            {/* Diagnostic Message */}
            <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isOverconfident
                ? "bg-red-50 border-red-200 text-red-800"
                : isUnderconfident
                ? "bg-blue-50 border-blue-200 text-blue-800"
                : "bg-emerald-50 border-emerald-200 text-emerald-800"
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {isOverconfident && <AlertTriangle className="w-4 h-4 text-red-600" />}
                {isUnderconfident && <Sparkles className="w-4 h-4 text-blue-600" />}
                {isCalibrated && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                <span>
                  {isOverconfident && "Overconfidence Detected"}
                  {isUnderconfident && "Underconfidence / High Mastery"}
                  {isCalibrated && "Calibrated Metacognition"}
                </span>
              </div>
              <p>
                {isOverconfident && `Your confidence was ${confidenceGap}% higher than your actual performance. You may feel you understand this topic better than you actually do — revision is recommended before forgetting accelerates.`}
                {isUnderconfident && `Your test performance exceeded your confidence by ${confidenceGap}%. You have solid intuitive grasp of this topic.`}
                {isCalibrated && `Your confidence is closely aligned with your actual accuracy (${confidenceGap}% gap). Your self-assessment is well calibrated.`}
              </p>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Retention Decay Forecast Curve */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>Ebbinghaus Memory Decay Projection</span>
              </h3>
              <span className="text-[11px] font-semibold text-indigo-600">R(t) = e^(-t/S)</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Estimated retention degradation over 30 days without spaced revision.
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={retentionForecast} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="resultRetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
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
              <span>Recommended Spaced Revision:</span>
            </div>
            <span className="font-extrabold text-amber-700">Within {recommendedDays} days</span>
          </div>
        </div>

      </div>

      {/* WHY THIS RISK & ACTION CALLOUT */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Next Step in the RecallIQ Loop</div>
          <h4 className="text-lg font-black text-white">
            Spaced revision scheduled for {topicName}
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            Reviewing core formulas, edge cases, and common mistakes in {recommendedDays} days will elevate retention from {estimatedRetention}% back above 85%.
          </p>
        </div>

        <Link
          href={`/revision`}
          className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-[0.98] shrink-0"
        >
          <span>Start Revision Now</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </Link>
      </div>

    </div>
  );
}
