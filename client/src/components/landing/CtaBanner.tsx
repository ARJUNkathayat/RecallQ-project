"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, TrendingUp, Brain } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dark Luxe Double-Bezel Card */}
        <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
          
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Content */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Ready to remember more?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                Join thousands of learners who are already building better study habits with RecallIQ.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 text-sm font-semibold text-slate-900 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-all active:scale-[0.98]"
                >
                  <span>Get Started Free</span>
                  <div className="w-5 h-5 rounded-full bg-slate-900/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
                  </div>
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-full backdrop-blur-md transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Demo</span>
                </a>
              </div>
            </div>

            {/* Right Graphic Box (Matching the student visual mockup) */}
            <div className="flex flex-col items-center sm:items-end gap-3">
              
              <div className="relative p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-xl shadow-xl flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                  <Brain className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">Adaptive Engine</div>
                  <div className="text-base font-bold text-white mt-0.5">Smarter Learning</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Exponential Retention</span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-medium">
                <Sparkles className="w-3 h-3 text-indigo-300" />
                <span>A smarter you starts today</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
