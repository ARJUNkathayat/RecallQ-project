"use client";

import React from "react";
import Link from "next/link";
import { Info, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ConfidenceInsight() {
  const confidence = 90;
  const accuracy = 65;
  const gap = Math.abs(confidence - accuracy);

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
              className="h-full bg-purple-500 rounded-full"
            />
          </div>
        </div>

      </div>

      {/* Confidence Gap Alert Box */}
      <div className="p-3.5 rounded-2xl bg-red-50/80 border border-red-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-red-900 flex items-center gap-1.5">
            <span>Confidence Gap</span>
            <span className="text-sm font-black text-red-600">{gap}%</span>
          </div>
          <p className="text-[11px] text-red-700/90 mt-0.5 leading-snug">
            You may be overestimating your understanding.
          </p>
        </div>
      </div>

    </div>
  );
}
