"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  ArrowRight,
  Home,
  LayoutDashboard,
  Sparkles,
  RefreshCw,
  Code2,
  AlertTriangle,
} from "lucide-react";

export default function NotFound() {
  const quickRoutes = [
    {
      title: "Dashboard",
      desc: "Retention overview & AI study input",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "AI Diagnostic Quiz",
      desc: "Test any topic or pasted notes",
      href: "/quiz/dynamic?topic=Linked%20List&confidence=75&count=10",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "Spaced Revision",
      desc: "Flip flashcards & recall rules",
      href: "/revision",
      icon: RefreshCw,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Code & DSA Audit",
      desc: "LeetCode & GitHub profiler",
      href: "/analyzer",
      icon: Code2,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 bg-grid-slate flex flex-col justify-between p-4 sm:p-8 font-sans antialiased text-slate-900 relative overflow-hidden">
      {/* Ambient background halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-indigo-200/40 via-purple-100/30 to-sky-100/40 blur-3xl -z-10 pointer-events-none rounded-full" />

      {/* Top Brand Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-sm group-hover:bg-indigo-600 transition-colors">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base text-slate-950 tracking-tight">RecallIQ</span>
            <span className="block text-[10px] text-slate-500 font-medium">Remember More. Forget Less.</span>
          </div>
        </Link>

        <Link
          href="/"
          className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-2xs flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </header>

      {/* Main 404 Visual Card */}
      <main className="max-w-4xl mx-auto w-full my-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden"
        >
          {/* Dark Cognitive Header with Animated Decay SVG */}
          <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 overflow-hidden">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-[11px] font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Error 404 &middot; Route Retention: 0%</span>
                </div>

                <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  404
                </h1>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  This memory trace has decayed.
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                  The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s jump back into your active learning loop before your streak cools down.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                    <span>Back to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/"
                    className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs transition-all"
                  >
                    Landing Page
                  </Link>
                </div>
              </div>

              {/* Visual Ebbinghaus Decay Curve Widget */}
              <div className="md:col-span-5">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-indigo-300">Ebbinghaus Trace</span>
                    <span className="font-mono text-rose-300 font-bold">R(t) = 0.00%</span>
                  </div>

                  <svg viewBox="0 0 260 120" className="w-full h-28 overflow-visible">
                    <defs>
                      <linearGradient id="decay404Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="decay404Stroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#f43f5e" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="10" y1="20" x2="250" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <line x1="10" y1="60" x2="250" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                    <line x1="10" y1="100" x2="250" y2="100" stroke="rgba(255,255,255,0.15)" />

                    {/* Area under exponential decay */}
                    <path
                      d="M 15 18 Q 70 82, 240 100 L 240 100 L 15 100 Z"
                      fill="url(#decay404Grad)"
                    />

                    {/* Animated decay curve */}
                    <motion.path
                      d="M 15 18 Q 70 82, 240 100"
                      fill="none"
                      stroke="url(#decay404Stroke)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />

                    {/* Start & End nodes */}
                    <circle cx="15" cy="18" r="4" fill="#818cf8" />
                    <circle cx="240" cy="100" r="5" fill="#f43f5e" />
                  </svg>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>t = 0 (100%)</span>
                    <span className="text-rose-300">URL Missing (0%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Jump Grid */}
          <div className="p-6 sm:p-8 bg-white">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Jump Back Into Active Modules
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {quickRoutes.map((route) => {
                const Icon = route.icon;
                return (
                  <Link
                    key={route.title}
                    href={route.href}
                    className="p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-300 bg-slate-50/50 hover:bg-indigo-50/30 transition-all group flex flex-col justify-between gap-3"
                  >
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${route.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 flex items-center justify-between">
                        <span>{route.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{route.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-slate-400 py-2">
        RecallIQ Adaptive Learning Platform &middot; Built for Long-Term Retention
      </footer>
    </div>
  );
}
