"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Brain,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Clock,
  Target,
  BookOpen,
  Award,
  Layers,
  ArrowUpRight,
  Info,
  Calendar,
  CheckCircle2,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { getQuizHistory, SavedQuizRecord } from "@/lib/geminiQuizService";

// Mock Analytical Datasets for Presentation
const monthlyMasteryTrend = [
  { month: "May", mastery: 45, retention: 38 },
  { month: "Jun", mastery: 54, retention: 48 },
  { month: "Jul", mastery: 63, retention: 56 },
  { month: "Aug", mastery: 71, retention: 64 },
  { month: "Sep", mastery: 78, retention: 72 },
  { month: "Oct", mastery: 84, retention: 80 }
];

const subjectMasteryData = [
  { subject: "DSA", mastery: 82, benchmark: 75, fill: "#4F46E5" },
  { subject: "DBMS", mastery: 74, benchmark: 70, fill: "#3B82F6" },
  { subject: "Operating Systems", mastery: 68, benchmark: 65, fill: "#06B6D4" },
  { subject: "Computer Networks", mastery: 71, benchmark: 68, fill: "#8B5CF6" }
];

const confidenceVsAccuracyQuizzes = [
  { quiz: "Arrays", confidence: 85, accuracy: 88, gap: 3 },
  { quiz: "Linked Lists", confidence: 80, accuracy: 78, gap: 2 },
  { quiz: "Binary Trees", confidence: 90, accuracy: 65, gap: 25 },
  { quiz: "DBMS 1NF-BCNF", confidence: 88, accuracy: 60, gap: 28 },
  { quiz: "SQL Joins", confidence: 75, accuracy: 74, gap: 1 },
  { quiz: "OS Scheduling", confidence: 80, accuracy: 72, gap: 8 },
  { quiz: "TCP/IP Handshake", confidence: 92, accuracy: 88, gap: 4 }
];

const riskDistributionData = [
  { name: "Low Risk", value: 18, color: "#10B981" },
  { name: "Medium Risk", value: 7, color: "#F59E0B" },
  { name: "High Risk", value: 3, color: "#EF4444" }
];

const revisionImpactTopics = [
  { topic: "DBMS Normalization", before: 38, after: 84, gain: "+46%" },
  { topic: "Binary Search Trees", before: 54, after: 92, gain: "+38%" },
  { topic: "Virtual Memory Paging", before: 44, after: 86, gain: "+42%" },
  { topic: "Dijkstra Routing", before: 35, after: 80, gain: "+45%" }
];

export default function AnalyticsPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("Last 6 Months");
  const [userQuizzes, setUserQuizzes] = useState<SavedQuizRecord[]>([]);

  useEffect(() => {
    const history = getQuizHistory();
    setUserQuizzes(history);
  }, []);

  // Merge real user quiz attempts into confidence vs accuracy dataset
  const combinedQuizzes = [
    ...userQuizzes.map((q) => ({
      quiz: q.topicName.length > 14 ? q.topicName.substring(0, 12) + ".." : q.topicName,
      confidence: q.confidence,
      accuracy: q.accuracy,
      gap: q.confidenceGap,
    })),
    ...confidenceVsAccuracyQuizzes,
  ];

  const totalQuizzesCount = 28 + userQuizzes.length;
  const highRiskCount = 3 + userQuizzes.filter((q) => q.forgettingRisk === "HIGH").length;
  const avgGap =
    userQuizzes.length > 0
      ? (
          (6.2 * 28 + userQuizzes.reduce((acc, q) => acc + q.confidenceGap, 0)) /
          (28 + userQuizzes.length)
        ).toFixed(1)
      : "6.2";

  return (
    <div className="min-h-screen bg-slate-50/70 flex font-sans antialiased text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Deep Retention Intelligence</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Metacognitive & Retention Analytics
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Analyze calibration gap, memory decay slopes, and spaced revision efficacy.
              </p>
            </div>

            {/* Time Filter Controls */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
              {["Last 30 Days", "Last 6 Months", "All Time"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeRange(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeRange === tab
                      ? "bg-slate-950 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Core Metrics Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              { label: "Overall Mastery", val: "78%", sub: "+12% this term", icon: Award, color: "text-indigo-600 bg-indigo-50" },
              {
                label: "Quizzes Completed",
                val: `${totalQuizzesCount}`,
                sub: userQuizzes.length > 0 ? `+${userQuizzes.length} custom AI quizzes` : "92% completion rate",
                icon: BookOpen,
                color: "text-blue-600 bg-blue-50",
              },
              {
                label: "Avg Confidence Gap",
                val: `${avgGap}%`,
                sub: Number(avgGap) < 15 ? "Well calibrated" : "Overconfidence risk",
                icon: Target,
                color: "text-emerald-600 bg-emerald-50",
              },
              { label: "Revisions Done", val: "14", sub: "+38% retention lift", icon: RefreshCw, color: "text-purple-600 bg-purple-50" },
              {
                label: "At-Risk Topics",
                val: `${highRiskCount}`,
                sub: "Requires attention",
                icon: AlertTriangle,
                color: "text-red-600 bg-red-50",
              },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">{metric.label}</span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${metric.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-black text-slate-950">{metric.val}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">{metric.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROW 1: Overall Mastery Trend Area Chart + Subject Mastery Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Cols: Overall Mastery & Retention Growth */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Mastery & Retention Growth Over Time</h3>
                  <p className="text-xs text-slate-500">Tracking long-term learning trajectory and retention persistence.</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  +39% Total Growth
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyMasteryTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="anMasteryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="anRetGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${v}%`} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                      formatter={(val: any) => [`${val}%`, ""]}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                    <Area type="monotone" name="Mastery Score (M)" dataKey="mastery" stroke="#4F46E5" strokeWidth={2.5} fill="url(#anMasteryGrad)" />
                    <Area type="monotone" name="Estimated Retention (R)" dataKey="retention" stroke="#06B6D4" strokeWidth={2} fill="url(#anRetGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right 5 Cols: Mastery by Subject Bar Chart */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Mastery by Subject</h3>
                  <p className="text-xs text-slate-500">Performance vs academic benchmark.</p>
                </div>
                <span className="text-[11px] font-bold text-indigo-600">Avg 73.7%</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectMasteryData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${v}%`} />
                    <YAxis dataKey="subject" type="category" tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderRadius: "10px", border: "none", color: "#fff", fontSize: "11px" }}
                      formatter={(val: any) => [`${val}% Mastery`, ""]}
                    />
                    <Bar dataKey="mastery" radius={[0, 8, 8, 0]}>
                      {subjectMasteryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* ROW 2: Confidence vs Accuracy Calibration (Central USP) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-950">
                    Confidence vs. Actual Accuracy Across Quizzes
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                    Core RecallIQ Differentiator
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Identifies illusion of competence where self-confidence significantly exceeds actual exam accuracy.
                </p>
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-4">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Confidence</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Accuracy</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedQuizzes} margin={{ top: 15, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="quiz" tick={{ fontSize: 11, fill: "#475569" }} axisLine={{ stroke: "#e2e8f0" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#94a3b8" }} tickFormatter={(v) => `${v}%`} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                  />
                  <Bar dataKey="confidence" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Confidence Rating (%)" />
                  <Bar dataKey="accuracy" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Actual Accuracy (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Diagnostic Alert Callout */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Metacognitive Diagnosis:</span>
                <p className="mt-0.5 text-amber-800">
                  Notice the large gap on <strong>Binary Trees (25% Gap)</strong> and <strong>DBMS Normalization (28% Gap)</strong>. While your confidence was ~90%, accuracy averaged 62%. RecallIQ automatically prioritizes these 2 topics in your Revision Queue to prevent cognitive decay.
                </p>
              </div>
            </div>
          </div>

          {/* YOUR AI DIAGNOSTIC ATTEMPTS & SUBTOPIC BREAKDOWN (Real-time student history) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Real-Time Diagnostic History</span>
                </div>
                <h3 className="text-base font-bold text-slate-950">
                  Your AI MCQ Assessments & Granular Weak Spots
                </h3>
                <p className="text-xs text-slate-500">
                  Every quiz you take dynamically registers its score, confidence calibration, and weak subtopics here.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Take New AI Quiz</span>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>

            {userQuizzes.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50/80 border border-dashed border-slate-200 text-center space-y-3">
                <Brain className="w-10 h-10 text-indigo-400 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">No Custom AI Quizzes Taken Yet</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Type or speak any topic (e.g. &ldquo;Linked List&rdquo;, &ldquo;French Revolution&rdquo;, &ldquo;Three-Phase Induction Motor&rdquo;) on your Dashboard to generate your first adaptive assessment!
                  </p>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>Go to Dashboard & Start Quiz</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userQuizzes.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white transition-all shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{attempt.date}</span>
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                            attempt.forgettingRisk === "HIGH"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : attempt.forgettingRisk === "MEDIUM"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {attempt.forgettingRisk} RISK
                        </span>
                      </div>

                      <h4 className="text-base font-black text-slate-950 mt-1.5 tracking-tight">
                        {attempt.topicName}
                      </h4>

                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Accuracy</span>
                          <span className="font-black text-blue-600">{attempt.accuracy}%</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div>
                          <span className="text-slate-400 text-[10px] block">Confidence</span>
                          <span className="font-black text-indigo-600">{attempt.confidence}%</span>
                        </div>
                        <div className="w-px h-6 bg-slate-200" />
                        <div>
                          <span className="text-slate-400 text-[10px] block">Gap</span>
                          <span className={`font-black ${attempt.confidenceGap >= 15 ? "text-red-600" : "text-emerald-600"}`}>
                            {attempt.confidenceGap}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Subtopic Weak Spots */}
                    <div className="pt-2.5 border-t border-slate-200/70">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                        Identified Weak Subtopics:
                      </span>
                      {attempt.weakSubtopics && attempt.weakSubtopics.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {attempt.weakSubtopics.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200 text-[10px] font-semibold"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>All tested subtopics mastered!</span>
                        </span>
                      )}
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/quiz/dynamic?topic=${encodeURIComponent(attempt.topicName)}&confidence=${attempt.confidence}&count=${attempt.totalQuestions}`}
                        className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold text-center block transition-all"
                      >
                        Retake / Practice This Topic
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ROW 3: Risk Distribution Donut + Spaced Revision Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Risk Distribution Donut (4 Cols) */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-950">Forgetting Risk Distribution</h3>
                <p className="text-xs text-slate-500">28 total active topics tracked.</p>

                <div className="h-48 w-full relative flex items-center justify-center my-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="absolute text-center">
                    <span className="text-2xl font-black text-slate-900">28</span>
                    <p className="text-[10px] text-slate-400 font-semibold">Topics</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk</span>
                  <span className="font-bold text-slate-800">18 Topics (64%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk</span>
                  <span className="font-bold text-slate-800">7 Topics (25%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> High Risk</span>
                  <span className="font-bold text-red-600">3 Topics (11%)</span>
                </div>
              </div>
            </div>

            {/* Spaced Revision Impact (8 Cols) */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">Spaced Revision Impact Proof</h3>
                  <p className="text-xs text-slate-500">Measurable retention jump before vs after personalized revision.</p>
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  Avg Lift: +42.8%
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {revisionImpactTopics.map((item) => (
                  <div key={item.topic} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.topic}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Before: <span className="font-semibold text-red-600">{item.before}%</span> &rarr; After Revision: <span className="font-semibold text-emerald-600">{item.after}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.after}%` }} />
                      </div>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {item.gain}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <DashboardFooter />

        </main>
      </div>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}