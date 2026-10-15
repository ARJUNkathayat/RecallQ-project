"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Brain,
  BarChart2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Layers,
  MoreVertical,
  Bell
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const retentionChartData = [
  { day: "Now", retention: 100 },
  { day: "1 day", retention: 82 },
  { day: "3 days", retention: 64 },
  { day: "7 days", retention: 52 },
  { day: "14 days", retention: 36 },
  { day: "30 days", retention: 20 }
];

export default function Hero() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white bg-grid-slate">
      
      {/* Background Soft Ambient Light Halos (Clean, not over-saturated) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-100/50 via-sky-50/40 to-purple-100/40 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-12 right-1/4 w-96 h-96 bg-blue-100/30 blur-2xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Container: Left Typography & Actions, Right Orbit & Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-10">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/90 shadow-2xs mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span className="text-xs font-semibold text-slate-700 tracking-wide">
                Learn &middot; Track &middot; Retain &middot; Grow
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-slate-950 leading-[1.08]"
            >
              Remember more. <br />
              <span className="text-indigo-600 font-black">
                Forget less.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-lg"
            >
              RecallIQ predicts what you&apos;re likely to forget and turns revision into a personalized learning loop.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-semibold text-white bg-slate-950 rounded-full shadow-lg shadow-slate-950/15 hover:bg-slate-800 hover:shadow-xl transition-all duration-200 active:scale-[0.98]"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-2xs transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>See how it works</span>
              </a>
            </motion.div>

            {/* 3 Value Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
            >
              {[
                { icon: Target, text: "Predict forgetting risk", color: "text-indigo-600 bg-indigo-50" },
                { icon: BarChart2, text: "Get personalized revision plans", color: "text-blue-600 bg-blue-50" },
                { icon: BookOpen, text: "Build long-term knowledge retention", color: "text-purple-600 bg-purple-50" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white border border-slate-200/70 shadow-2xs flex items-start gap-2.5"
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 leading-snug">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            {/* Handwritten style note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 font-handwriting italic"
            >
              <span>Smarter learning for a brighter you</span>
              <span className="text-indigo-400">↗</span>
            </motion.div>

          </div>


          {/* ================= RIGHT COLUMN: ORBIT RADAR & COMPOSITE DASHBOARD ================= */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-8 pb-12">
            
            {/* Orbit System Radar Arcs & Node Badges */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              
              {/* Radar Circles */}
              <div className="w-[580px] h-[580px] rounded-full border border-indigo-100/60 -z-10" />
              <div className="w-[440px] h-[440px] rounded-full border border-dashed border-indigo-200/70 -z-10" />
              <div className="w-[300px] h-[300px] rounded-full border border-indigo-100/40 -z-10" />

              {/* Orbit Node 1: Mastery (Top Center) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-1/3 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800 pointer-events-auto"
              >
                <div className="w-5 h-5 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Mastery</div>
                  <div className="text-[9px] font-normal text-slate-400">Build understanding</div>
                </div>
              </motion.div>

              {/* Orbit Node 2: Confidence (Top Left) */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-10 left-6 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800 pointer-events-auto"
              >
                <div className="w-5 h-5 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Confidence</div>
                  <div className="text-[9px] font-normal text-slate-400">Know what you know</div>
                </div>
              </motion.div>

              {/* Orbit Node 3: Retention (Top Right) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-12 right-2 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800 pointer-events-auto"
              >
                <div className="w-5 h-5 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Retention</div>
                  <div className="text-[9px] font-normal text-slate-400">Track over time</div>
                </div>
              </motion.div>

              {/* Orbit Node 4: Risk (Right Middle) */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-1/2 -right-6 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800 pointer-events-auto"
              >
                <div className="w-5 h-5 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Risk</div>
                  <div className="text-[9px] font-normal text-slate-400">Identify weak areas</div>
                </div>
              </motion.div>

              {/* Orbit Node 5: Revision (Bottom Center) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 right-1/3 px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md flex items-center gap-2 text-[11px] font-bold text-slate-800 pointer-events-auto"
              >
                <div className="w-5 h-5 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <RefreshCw className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div>Revision</div>
                  <div className="text-[9px] font-normal text-slate-400">Practice at the right time</div>
                </div>
              </motion.div>

            </div>

            {/* ============ MAIN COMPOSITE DASHBOARD FRAME ============ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-visible p-5 sm:p-6"
            >
              
              {/* Dashboard Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    R
                  </div>
                  <span className="font-bold text-sm text-slate-900">RecallIQ</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">Good morning, Arjun</p>
                    <p className="text-[10px] text-slate-400">Keep learning, you&apos;re doing great!</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                    A
                  </div>
                </div>
              </div>

              {/* Main Content: Retention Curve + Overall Mastery Ring */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
                
                {/* Retention Over Time Chart (8 Cols) */}
                <div className="sm:col-span-8 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Your Retention Overview</h4>
                      <p className="text-[10px] text-slate-500">Retention decreases over time. Stay ahead with timely revision.</p>
                    </div>
                  </div>

                  <div className="h-28 w-full mt-2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={retentionChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="heroRetGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 8, fill: "#94a3b8" }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} />
                        <Area type="monotone" dataKey="retention" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#heroRetGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>

                    {/* Badge on Chart: ~52% Estimated Retention */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold shadow-xs">
                      ~ 52% Estimated Retention
                    </div>
                  </div>
                </div>

                {/* Overall Mastery Ring (4 Cols) */}
                <div className="sm:col-span-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col items-center justify-center text-center">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="40" cy="40" r="32"
                        stroke="#4F46E5" strokeWidth="6" strokeLinecap="round" fill="transparent"
                        strokeDasharray="201" strokeDashoffset="44"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-black text-slate-900">78%</span>
                    </div>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 mt-2">Overall Mastery</h5>
                  <span className="text-[10px] font-semibold text-emerald-600 mt-0.5">↑ 12% from last month</span>
                </div>

              </div>

              {/* At-Risk Topics Section */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-900">At-Risk Topics</span>
                  <span className="text-[11px] font-semibold text-indigo-600 hover:underline cursor-pointer">View all →</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { name: "Binary Trees", mastery: "82%", risk: "Low Risk", color: "text-emerald-700 bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
                    { name: "DBMS Normalization", mastery: "61%", risk: "High Risk", color: "text-red-700 bg-red-50 border-red-200", dot: "bg-red-500" },
                    { name: "Operating Systems", mastery: "74%", risk: "Medium Risk", color: "text-amber-700 bg-amber-50 border-amber-200", dot: "bg-amber-500" }
                  ].map((topic) => (
                    <div
                      key={topic.name}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-800 truncate">{topic.name}</span>
                        <MoreVertical className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-xs font-extrabold text-slate-900 mt-1">{topic.mastery} Mastery</div>
                      <div className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border ${topic.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${topic.dot}`} />
                        <span>{topic.risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* ============ FLOATING OVERLAPPING CARD 1 (Bottom-Left: Confidence vs Accuracy) ============ */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-6 sm:-left-12 z-20 w-64 sm:w-72 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mb-2.5">
                  <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Confidence vs Accuracy</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-600 mb-0.5">
                      <span>Confidence</span>
                      <span className="font-bold text-indigo-600">90%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[90%] h-full bg-indigo-600 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-600 mb-0.5">
                      <span>Accuracy</span>
                      <span className="font-bold text-blue-600">65%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[65%] h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-3 p-2 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold text-red-700">Confidence Gap: 25%</div>
                    <div className="text-[9px] text-red-600/90">You may be overconfident. Consider a revision.</div>
                  </div>
                </div>
              </motion.div>


              {/* ============ FLOATING OVERLAPPING CARD 2 (Bottom-Right: Recommended for You) ============ */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -bottom-12 -right-4 sm:-right-8 z-20 w-60 sm:w-68 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-1">
                  <span>💡</span>
                  <span>Recommended for You</span>
                </div>

                <h6 className="text-xs font-extrabold text-slate-900 mt-1">
                  Revise DBMS Normalization today
                </h6>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                  Your retention is likely to drop below 40% in 2 days.
                </p>

                <Link
                  href="/register"
                  className="mt-3 w-full py-1.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Start Revision</span>
                  <ArrowRight className="w-3 h-3 text-white" />
                </Link>
              </motion.div>

            </motion.div>

            {/* Handwritten style badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-16 right-10 hidden sm:flex items-center gap-1 text-xs text-slate-400 font-handwriting italic"
            >
              <span>Turn insights into improvement ✨</span>
            </motion.div>

          </div>

        </div>


        {/* ================= BOTTOM METRICS STRIP ================= */}
        <div className="mt-20 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          <div>
            <h4 className="text-base font-extrabold text-slate-900">
              Built for focused, <br />measurable learning
            </h4>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Students</div>
              <div className="text-xs text-slate-500">Learn smarter</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Learning Analytics</div>
              <div className="text-xs text-slate-500">Real insights</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Personalized Revision</div>
                <div className="text-xs text-slate-500">Better results</div>
              </div>
            </div>

            <span className="hidden lg:inline text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
              A smarter way to learn ↗
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
