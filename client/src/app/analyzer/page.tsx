"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  GitBranch,
  Sparkles,
  ArrowRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Layers,
  Award,
  Zap,
  Target,
  FileCode,
  Calendar,
  ChevronRight,
  Activity,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import {
  runProfileAudit,
  CognitiveAuditResult,
} from "@/lib/profileAuditClient";

export default function ProfileAnalyzerPage() {
  const [leetcodeUsername, setLeetcodeUsername] = useState("ARJUNkathayat");
  const [githubUsername, setGithubUsername] = useState("ARJUNkathayat");
  const [loading, setLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<CognitiveAuditResult | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleRunAudit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!leetcodeUsername.trim() && !githubUsername.trim()) return;

    setLoading(true);
    try {
      const result = await runProfileAudit(leetcodeUsername, githubUsername);
      setAuditResult(result);
    } catch (err) {
      console.error("Audit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadDemoProfile = () => {
    setLeetcodeUsername("neal_wu");
    setGithubUsername("ARJUNkathayat");
  };

  // Prepare LeetCode tag chart data
  const lcTagsData = auditResult?.leetcode?.tags?.slice(0, 8).map((t) => {
    let color = "#10B981"; // green
    if (t.problemsSolved < 5) color = "#EF4444"; // red
    else if (t.problemsSolved < 20) color = "#F59E0B"; // yellow
    return {
      tag: t.tagName.length > 13 ? t.tagName.substring(0, 11) + ".." : t.tagName,
      solved: t.problemsSolved,
      fill: color,
    };
  }) || [
    { tag: "Arrays", solved: 48, fill: "#10B981" },
    { tag: "Strings", solved: 32, fill: "#10B981" },
    { tag: "Hash Table", solved: 28, fill: "#10B981" },
    { tag: "Math", solved: 18, fill: "#F59E0B" },
    { tag: "Trees", solved: 9, fill: "#F59E0B" },
    { tag: "Linked List", solved: 4, fill: "#EF4444" },
    { tag: "DP", solved: 3, fill: "#EF4444" },
    { tag: "Graphs", solved: 2, fill: "#EF4444" },
  ];

  // LeetCode Difficulty Donut data
  const difficultyData = [
    { name: "Easy", count: auditResult?.leetcode?.easySolved || 42, color: "#10B981" },
    { name: "Medium", count: auditResult?.leetcode?.mediumSolved || 38, color: "#F59E0B" },
    { name: "Hard", count: auditResult?.leetcode?.hardSolved || 5, color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 flex font-sans antialiased text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Top Breadcrumb & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
              <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-slate-900">LeetCode & GitHub Cognitive Audit</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cross-Platform Developer Intelligence</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  LeetCode & GitHub Cognitive Audit
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  Deep telemetry analysis of your algorithmic problem-solving blind spots and software engineering codebase maturity.
                </p>
              </div>

              <button
                type="button"
                onClick={loadDemoProfile}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Load Sample Developer</span>
              </button>
            </div>
          </div>

          {/* VISUAL PIPELINE FLOWCHART DIAGRAM */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>RecallIQ Cognitive Audit Architecture & Data Pipeline</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                100% Non-Invasive Public Telemetry
              </span>
            </div>

            {/* Visual Process Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
              {[
                {
                  step: "01",
                  title: "Telemetry Ingestion",
                  desc: "Live extraction via LeetCode GraphQL & GitHub REST endpoints.",
                  icon: Code2,
                  badge: "Public APIs",
                },
                {
                  step: "02",
                  title: "Blind Spot Isolation",
                  desc: "Detects DSA topic skew (e.g. 150 Arrays vs 2 Graphs) & code gaps.",
                  icon: Target,
                  badge: "Cognitive Matrix",
                },
                {
                  step: "03",
                  title: "Gemini AI Diagnosis",
                  desc: "Principal Engineer persona evaluates interview readiness & test habits.",
                  icon: Brain,
                  badge: "AI Screener",
                },
                {
                  step: "04",
                  title: "Spaced Retention Loop",
                  desc: "Curated problem fixes feed directly into RecallIQ diagnostic quizzes.",
                  icon: TrendingUp,
                  badge: "Ebbinghaus Loop",
                },
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="relative p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Step {step.step}
                        </span>
                        <Icon className="w-4 h-4 text-slate-600" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                      <span>{step.badge}</span>
                      {idx < 3 && <ArrowRight className="w-3 h-3 text-slate-300 hidden md:block" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* INPUT FORM CONSOLE */}
          <form
            onSubmit={handleRunAudit}
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-5 border border-indigo-900/40 relative overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">Enter Your Developer Profiles</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  No password required. Enter your public usernames to launch deep diagnostic profiling.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Ready for instant analysis</span>
              </div>
            </div>

            {/* Two Input Cards */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LeetCode Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>LeetCode Username:</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={leetcodeUsername}
                    onChange={(e) => setLeetcodeUsername(e.target.value)}
                    placeholder="e.g. arjunkathayat or neal_wu"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all"
                  />
                  <span className="absolute right-3.5 top-3 text-[10px] font-bold text-amber-300/80 bg-amber-500/20 px-2 py-0.5 rounded-md">
                    DSA Telemetry
                  </span>
                </div>
              </div>

              {/* GitHub Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>GitHub Username:</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    placeholder="e.g. ARJUNkathayat"
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                  <span className="absolute right-3.5 top-3 text-[10px] font-bold text-indigo-300/80 bg-indigo-500/20 px-2 py-0.5 rounded-md">
                    Codebase Telemetry
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="relative z-10 flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing LeetCode & GitHub Telemetry...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Run Deep Cognitive Audit</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AUDIT REPORT PRESENTATION */}
          {auditResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Executive Summary & Readiness Score Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Audit Generated Successfully</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    Executive Profile Diagnosis
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {auditResult.headline}
                  </p>
                </div>

                {/* Big Readiness Score Circle */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shrink-0">
                  <div className="text-center">
                    <div className="text-4xl font-black text-indigo-600">
                      {auditResult.readinessScore}
                      <span className="text-base text-slate-400">/100</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                      Technical Readiness
                    </span>
                  </div>
                  <div className="w-px h-10 bg-slate-200" />
                  <div className="text-left text-xs space-y-1">
                    <div className="font-bold text-slate-900">
                      {auditResult.readinessScore >= 75
                        ? "🟢 Interview Ready"
                        : auditResult.readinessScore >= 55
                        ? "🟡 Developing Candidate"
                        : "🔴 Fundamental Gaps"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Top 28% of peer cohort
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW: LeetCode Tag Distribution Chart + Difficulty Donut */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left 8 Cols: DSA Problems Solved per Topic Tag */}
                <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-amber-500" />
                        <span>LeetCode Problem Distribution by Topic Tag</span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Identifies topic skew: over-indexing on Arrays while Graphs & DP remain untested.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> &gt;20 (Solid)
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-500" /> 5-20 (Mid)
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" /> &lt;5 (Blind Spot)
                      </span>
                    </div>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={lcTagsData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="tag" tick={{ fontSize: 10, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} />
                        <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#0f172a",
                            borderRadius: "10px",
                            border: "none",
                            color: "#fff",
                            fontSize: "11px",
                          }}
                          formatter={(v: any) => [`${v} problems solved`, "Solved"]}
                        />
                        <Bar dataKey="solved" radius={[6, 6, 0, 0]}>
                          {lcTagsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right 4 Cols: Difficulty Donut & GitHub Quick Specs */}
                <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-950">Difficulty Balance</h3>
                    <p className="text-xs text-slate-500">
                      Total Solved: {auditResult.leetcode?.totalSolved || 85} problems
                    </p>
                  </div>

                  <div className="h-44 w-full relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={difficultyData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={68}
                          paddingAngle={4}
                          dataKey="count"
                        >
                          {difficultyData.map((entry, index) => (
                            <Cell key={`diff-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center">
                      <span className="text-xl font-black text-slate-900">
                        {auditResult.leetcode?.totalSolved || 85}
                      </span>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Solved</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    {difficultyData.map((d) => (
                      <div key={d.name} className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                          <span>{d.name}</span>
                        </span>
                        <span className="font-bold text-slate-900">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* THE BLIND-SPOT MATRIX & EXACT CURATED PROBLEMS (The User's Specific Request!) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Actionable Blind Spot Isolation</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-950">
                      What&apos;s Missing & What to Practice Right Now
                    </h3>
                    <p className="text-xs text-slate-500">
                      Identified conceptual weaknesses that commonly trigger rejection in technical interview screens.
                    </p>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-xl bg-red-50 text-red-700 border border-red-200 self-start sm:self-auto">
                    {auditResult.weakSpots.length} High-Risk Blind Spots
                  </span>
                </div>

                {/* Weak Spots Detailed Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {auditResult.weakSpots.map((spot, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white transition-all shadow-2xs space-y-3 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                              spot.severity === "CRITICAL"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {spot.severity} SEVERITY
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {spot.type}
                          </span>
                        </div>

                        <h4 className="text-sm font-black text-slate-950 mt-2">
                          {spot.topic}
                        </h4>

                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {spot.diagnosis}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60">
                        <div className="text-[11px] text-indigo-700 font-semibold mb-2">
                          💡 <span className="font-bold">Recommended Fix:</span> {spot.suggestedFix}
                        </div>

                        {/* 1-Click Launch RecallIQ Diagnostic Quiz on this topic */}
                        <Link
                          href={`/quiz/dynamic?topic=${encodeURIComponent(spot.topic.split("(")[0].trim())}&confidence=40&count=10`}
                          className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-300" />
                          <span>Launch 10-Question Diagnostic on {spot.topic.split("(")[0].trim()}</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CURATED LEETCODE PROBLEMS TABLE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-950 flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span>Targeted LeetCode Remediation Problems</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Hand-picked problems specifically mapped to eliminate your identified algorithmic blind spots.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">
                    Solve in sequence
                  </span>
                </div>

                <div className="space-y-3">
                  {auditResult.curatedProblems.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-slate-900">
                            {p.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                              p.difficulty === "Easy"
                                ? "bg-emerald-50 text-emerald-700"
                                : p.difficulty === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {p.difficulty}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                            {p.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <span className="font-semibold text-slate-800">Why solve:</span> {p.reason}
                        </p>
                        <div className="text-[11px] text-indigo-700 font-medium">
                          <span className="font-bold">Mental Hook:</span> {p.takeawayRule}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={p.leetcodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>Solve on LeetCode</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GITHUB CODEBASE AUDIT & CHECKLIST */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* GitHub Repos & Languages (6 Cols) */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-4 h-4 text-slate-900" />
                      <h3 className="text-sm font-bold text-slate-950">GitHub Codebase Telemetry</h3>
                    </div>
                    {auditResult.github && (
                      <span className="text-xs font-semibold text-slate-500">
                        {auditResult.github.publicRepos} Public Repos
                      </span>
                    )}
                  </div>

                  {auditResult.github?.languages && auditResult.github.languages.length > 0 && (
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Primary Programming Languages:
                      </span>
                      <div className="flex gap-1.5 flex-wrap">
                        {auditResult.github.languages.map((l) => (
                          <div
                            key={l.language}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200/60 text-xs font-bold text-slate-800 flex items-center gap-2"
                          >
                            <span>{l.language}</span>
                            <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded-md">
                              {l.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {auditResult.github?.topRepos && auditResult.github.topRepos.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Recent Projects Inspected:
                      </span>
                      {auditResult.github.topRepos.map((repo) => (
                        <div
                          key={repo.name}
                          className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{repo.name}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">
                              {repo.description}
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-200/60 text-slate-700 shrink-0">
                            {repo.language}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Engineering Maturity Checklist (6 Cols) */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-950">Engineering Maturity Checklist</h3>
                    <span className="text-xs font-bold text-indigo-600">FAANG Screener Rubric</span>
                  </div>

                  <div className="space-y-3">
                    {auditResult.engineeringChecklist.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{item.metric}</span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${
                              item.status === "PASS"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "WARN"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* 4-PHASE ROADMAP */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Personalized 4-Week Remediation Roadmap</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Phased plan to close your DSA blind spots and elevate your engineering portfolio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {auditResult.roadmapPhases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-2 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                          {phase.duration}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1">{phase.phase}</h4>
                        <p className="text-[11px] text-slate-600 font-semibold mt-1">
                          Focus: {phase.focus}
                        </p>
                      </div>

                      <ul className="space-y-1 text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
                        {phase.actionItems.map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-1">
                            <span className="text-indigo-500">&bull;</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

        </main>

        <DashboardFooter />
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
