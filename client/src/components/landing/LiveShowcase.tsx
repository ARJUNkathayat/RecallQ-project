"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Sparkles,
  RefreshCw,
  Code2,
  ArrowRight,
  Brain,
  CheckCircle2,
  Layers,
} from "lucide-react";

const modules = [
  {
    badge: "AI Input Engine",
    title: "Notes & Syllabus-to-Quiz",
    desc: "Paste lecture notes, upload .txt/.md files, or speak any topic. Gemini extracts granular subtopics and generates a diagnostic quiz in seconds.",
    href: "/dashboard",
    cta: "Try Study Input",
    icon: FileText,
    accent: "from-indigo-500/20 to-blue-500/10 border-indigo-400/30 text-indigo-300",
    highlights: ["Voice + Text + Notes", "Subtopic Tagging", "5 / 10 / 20 Questions"],
  },
  {
    badge: "Metacognitive Tutor",
    title: "Ask AI Why & Calibration",
    desc: "Compare your pre-quiz confidence against real accuracy. On any missed question, tap 'Ask AI Why' for an instant conceptual breakdown + analogy.",
    href: "/quiz/dynamic?topic=Operating%20Systems&confidence=80&count=5",
    cta: "Launch Diagnostic",
    icon: Brain,
    accent: "from-purple-500/20 to-pink-500/10 border-purple-400/30 text-purple-300",
    highlights: ["Overconfidence Detection", "Real-World Analogies", "Rule of Thumb"],
  },
  {
    badge: "Active Recall Loop",
    title: "3D Flip Flashcards & Ebbinghaus",
    desc: "Every topic feeds into your spaced revision queue powered by R(t) = e^(-t/S). Flip interactive cards right before your memory trace decays.",
    href: "/revision",
    cta: "Open Flashcards",
    icon: RefreshCw,
    accent: "from-emerald-500/20 to-teal-500/10 border-emerald-400/30 text-emerald-300",
    highlights: ["Tap-to-Flip Deck", "Got It / Need Review", "Decay Curve Forecast"],
  },
  {
    badge: "Developer Intelligence",
    title: "LeetCode & GitHub Cognitive Audit",
    desc: "Connect your LeetCode & GitHub usernames to diagnose algorithmic blind spots, tag imbalances, and launch a 1-click targeted DSA quiz.",
    href: "/analyzer",
    cta: "Audit Your Code",
    icon: Code2,
    accent: "from-amber-500/20 to-orange-500/10 border-amber-400/30 text-amber-300",
    highlights: ["Live GraphQL Telemetry", "4-Step Visual Pipeline", "Curated Problem Roadmap"],
  },
];

export default function LiveShowcase() {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Cognitive Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Four AI engines working in one closed learning loop.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Jump straight into any live module below — built on Next.js 16, Express, Prisma, Supabase PostgreSQL, and Gemini AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 sm:p-7 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between gap-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r border ${mod.accent}`}>
                      <Sparkles className="w-3 h-3" />
                      {mod.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {mod.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {mod.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-slate-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={mod.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{mod.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[10px] font-mono text-slate-500">LIVE MODULE</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
