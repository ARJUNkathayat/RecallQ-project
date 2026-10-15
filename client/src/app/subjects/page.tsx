"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  BookOpen,
  GitBranch,
  Database,
  Terminal,
  Network,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const subjectsData = [
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    shortName: "DSA",
    icon: GitBranch,
    iconColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    topicsCount: 12,
    overallMastery: 82,
    topics: [
      {
        id: "binary-trees",
        name: "Binary Trees & BST",
        difficulty: "Medium",
        mastery: 82,
        retention: 64,
        risk: "Low Risk",
        riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        riskDot: "bg-emerald-500",
        quizHref: "/quiz/binary-trees",
        desc: "Tree traversals, height, lowest common ancestor, and balance factors."
      },
      {
        id: "graphs-dfs-bfs",
        name: "Graphs (DFS & BFS)",
        difficulty: "Hard",
        mastery: 75,
        retention: 58,
        risk: "Medium Risk",
        riskColor: "text-amber-700 bg-amber-50 border-amber-200",
        riskDot: "bg-amber-500",
        quizHref: "/quiz/binary-trees",
        desc: "Adjacency list, cycle detection, topological sort, and Dijkstra."
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        difficulty: "Hard",
        mastery: 60,
        retention: 45,
        risk: "High Risk",
        riskColor: "text-red-700 bg-red-50 border-red-200",
        riskDot: "bg-red-500",
        quizHref: "/quiz/binary-trees",
        desc: "0/1 Knapsack, longest common subsequence, and memoization."
      },
      {
        id: "arrays-strings",
        name: "Arrays & Sliding Window",
        difficulty: "Easy",
        mastery: 92,
        retention: 88,
        risk: "Low Risk",
        riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        riskDot: "bg-emerald-500",
        quizHref: "/quiz/binary-trees",
        desc: "Two pointer technique, sliding window maximum, and prefix sums."
      }
    ]
  },
  {
    id: "dbms",
    name: "Database Management Systems",
    shortName: "DBMS",
    icon: Database,
    iconColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
    topicsCount: 8,
    overallMastery: 68,
    topics: [
      {
        id: "dbms-normalization",
        name: "DBMS Normalization (1NF to BCNF)",
        difficulty: "Hard",
        mastery: 61,
        retention: 38,
        risk: "High Risk",
        riskColor: "text-red-700 bg-red-50 border-red-200",
        riskDot: "bg-red-500",
        quizHref: "/quiz/binary-trees",
        desc: "Functional dependencies, candidate keys, 3NF, and lossless joins."
      },
      {
        id: "sql-joins",
        name: "SQL Queries & Complex Joins",
        difficulty: "Medium",
        mastery: 72,
        retention: 60,
        risk: "Medium Risk",
        riskColor: "text-amber-700 bg-amber-50 border-amber-200",
        riskDot: "bg-amber-500",
        quizHref: "/quiz/binary-trees",
        desc: "Inner, outer, cross joins, aggregate functions, and nested subqueries."
      },
      {
        id: "transactions-acid",
        name: "ACID Properties & Concurrency",
        difficulty: "Medium",
        mastery: 70,
        retention: 52,
        risk: "Medium Risk",
        riskColor: "text-amber-700 bg-amber-50 border-amber-200",
        riskDot: "bg-amber-500",
        quizHref: "/quiz/binary-trees",
        desc: "Serializability, two-phase locking (2PL), and deadlock recovery."
      }
    ]
  },
  {
    id: "os",
    name: "Operating Systems",
    shortName: "OS",
    icon: Terminal,
    iconColor: "text-blue-600 bg-blue-50 border-blue-200",
    topicsCount: 10,
    overallMastery: 74,
    topics: [
      {
        id: "process-scheduling",
        name: "Process Scheduling Algorithms",
        difficulty: "Medium",
        mastery: 68,
        retention: 50,
        risk: "Medium Risk",
        riskColor: "text-amber-700 bg-amber-50 border-amber-200",
        riskDot: "bg-amber-500",
        quizHref: "/quiz/binary-trees",
        desc: "Round Robin, SJF, Priority Scheduling, and context switching."
      },
      {
        id: "memory-management",
        name: "Virtual Memory & Paging",
        difficulty: "Hard",
        mastery: 65,
        retention: 44,
        risk: "High Risk",
        riskColor: "text-red-700 bg-red-50 border-red-200",
        riskDot: "bg-red-500",
        quizHref: "/quiz/binary-trees",
        desc: "Page replacement algorithms (LRU, FIFO), TLB, and segmentation."
      },
      {
        id: "deadlocks",
        name: "Deadlocks & Banker's Algorithm",
        difficulty: "Medium",
        mastery: 78,
        retention: 71,
        risk: "Low Risk",
        riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        riskDot: "bg-emerald-500",
        quizHref: "/quiz/binary-trees",
        desc: "Necessary conditions for deadlock, avoidance, and resource allocation graphs."
      }
    ]
  },
  {
    id: "cn",
    name: "Computer Networks",
    shortName: "CN",
    icon: Network,
    iconColor: "text-purple-600 bg-purple-50 border-purple-200",
    topicsCount: 9,
    overallMastery: 60,
    topics: [
      {
        id: "tcp-ip-osi",
        name: "OSI & TCP/IP Model Layers",
        difficulty: "Easy",
        mastery: 80,
        retention: 74,
        risk: "Low Risk",
        riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
        riskDot: "bg-emerald-500",
        quizHref: "/quiz/binary-trees",
        desc: "Encapsulation, protocol headers, socket addressing, and layer duties."
      },
      {
        id: "routing-protocols",
        name: "Routing Algorithms (OSPF & BGP)",
        difficulty: "Hard",
        mastery: 55,
        retention: 35,
        risk: "High Risk",
        riskColor: "text-red-700 bg-red-50 border-red-200",
        riskDot: "bg-red-500",
        quizHref: "/quiz/binary-trees",
        desc: "Distance vector vs link state routing, Dijkstra shortest path."
      }
    ]
  }
];

export default function SubjectsPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const displayedSubjects = selectedSubjectId === "all"
    ? subjectsData
    : subjectsData.filter((s) => s.id === selectedSubjectId);

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
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curriculum & Knowledge Base</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Subjects & Topics
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select a topic to start adaptive calibration and take an active quiz.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setSelectedSubjectId("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubjectId === "all"
                    ? "bg-slate-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Subjects
              </button>
              {subjectsData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubjectId(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubjectId === s.id
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {s.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Subjects List */}
          <div className="space-y-8">
            {displayedSubjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6"
                >
                  {/* Subject Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${sub.iconColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-slate-950 tracking-tight">
                          {sub.name}
                        </h2>
                        <span className="text-xs text-slate-500 font-medium">
                          {sub.topicsCount} Topics &middot; Comprehensive Curriculum
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-black text-slate-950">{sub.overallMastery}%</div>
                        <div className="text-[10px] font-semibold text-slate-400">Subject Mastery</div>
                      </div>
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${sub.overallMastery}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sub.topics.map((t) => (
                      <motion.div
                        key={t.id}
                        whileHover={{ y: -3, transition: { duration: 0.2 } }}
                        className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-slate-300 shadow-2xs transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                              {t.difficulty}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.riskColor}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${t.riskDot}`} />
                              <span>{t.risk}</span>
                            </span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {t.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {t.desc}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                          <div className="text-[11px] text-slate-600">
                            <span className="font-bold text-slate-900">{t.mastery}%</span> Mastery
                            <span className="text-slate-400 mx-1">&middot;</span>
                            <span className="font-bold text-indigo-600">{t.retention}%</span> Retention
                          </div>

                          <Link
                            href={t.quizHref}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98]"
                          >
                            <span>Take Quiz</span>
                            <ArrowRight className="w-3 h-3 text-white" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                </div>
              );
            })}
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