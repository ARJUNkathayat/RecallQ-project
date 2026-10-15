"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Brain } from "lucide-react";

export default function StudyBanner() {
  return (
    <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
      
      {/* Background Ambient Orbs */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Left Content */}
      <div className="relative z-10 max-w-lg text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RecallIQ Metacognitive Engine</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-handwriting italic">
          &ldquo;A smarter you, for a brighter tomorrow.&rdquo;
        </h3>
        <p className="mt-1 text-xs text-slate-300 font-sans not-italic">
          Keep learning. Your future self will thank you.
        </p>
      </div>

      {/* Right Button */}
      <div className="relative z-10">
        <Link
          href="/subjects"
          className="group px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
        >
          <span>Explore Subjects</span>
          <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
