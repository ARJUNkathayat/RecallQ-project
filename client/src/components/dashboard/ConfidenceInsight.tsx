"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Info, AlertTriangle, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { isArjunUser, getCurrentUser } from "@/lib/authHelper";
import { getQuizHistory } from "@/lib/geminiQuizService";

export default function ConfidenceInsight() {
  const [confidence, setConfidence] = useState(90);
  const [accuracy, setAccuracy] = useState(65);
  const [isEmptyNewUser, setIsEmptyNewUser] = useState(false);

  useEffect(() => {
    try {
      const u = getCurrentUser();
      if (!isArjunUser(u)) {
        const history = getQuizHistory();
        if (history.length === 0) {
          setIsEmptyNewUser(true);
          setConfidence(0);
          setAccuracy(0);
        } else {
          setIsEmptyNewUser(false);
          const avgConf = Math.round(
            history.reduce((acc, q) => acc + (q.confidence || 0), 0) / history.length
          );
          const avgAcc = Math.round(
            history.reduce((acc, q) => acc + (q.accuracy || 0), 0) / history.length
          );
          setConfidence(avgConf);
          setAccuracy(avgAcc);
        }
      }
    } catch (e) {}
  }, []);

  const gap = Math.abs(confidence - accuracy);
  const isOverconfident = confidence - accuracy >= 15;

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <span>Confidence Insight</span>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 rounded-xl bg-slate-900 text-white text-[10px] shadow-lg z-20">
                Confidence Gap = |Confidence - Accuracy|. High positive gap indicates overconfidence risk.
              </div>
            </div>
          </div>

          <Link href="/analytics" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-xs text-slate-500">Based on your recent quizzes.</p>
      </div>

      {isEmptyNewUser ? (
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-2">
          <Sparkles className="w-5 h-5 text-indigo-500 mx-auto" />
          <p className="text-xs font-semibold text-slate-800">No calibration data yet</p>
          <p className="text-[11px] text-slate-500">
            Set your pre-quiz confidence and finish 1 quiz to measure your calibration gap.
          </p>
        </div>
      ) : (
        <>
          {/* Comparison Progress Bars */}
          <div className="my-6 space-y-4">
            {/* Your Confidence */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Your Confidence</span>
                <span className="font-bold text-indigo-600">{confidence}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>

            {/* Actual Accuracy */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-slate-700">Actual Accuracy</span>
                <span className="font-bold text-purple-600">{accuracy}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-purple-600 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Insight Alert Box */}
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
              isOverconfident
                ? "bg-amber-50/80 border-amber-200/80 text-amber-900"
                : "bg-emerald-50/80 border-emerald-200/80 text-emerald-900"
            }`}
          >
            {isOverconfident ? (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="leading-snug">
              <span className="font-bold">{gap}% Gap Detected:</span>{" "}
              {isOverconfident
                ? "You may be overestimating your understanding of recent topics."
                : "Your confidence aligns closely with your actual test accuracy."}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
