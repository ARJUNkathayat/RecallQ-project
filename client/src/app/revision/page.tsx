"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Check,
  ChevronDown,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const revisionQueue = [
  {
    id: "dbms-norm",
    topic: "DBMS Normalization (1NF to BCNF)",
    subject: "Database Management Systems",
    priority: "HIGH",
    priorityColor: "bg-red-50 text-red-700 border-red-200",
    due: "Due Today",
    mastery: 61,
    retentionBefore: 38,
    retentionAfter: 84,
    summary: "Normalization reduces data redundancy and insertion/update/deletion anomalies by organizing relational tables.",
    keyPoints: [
      "1NF: Atomic attribute values only (no repeating groups/arrays).",
      "2NF: 1NF + No partial dependencies (all non-prime attributes fully dependent on candidate key).",
      "3NF: 2NF + No transitive dependencies (X -> Y where Y is non-prime => X is superkey or Y is prime).",
      "BCNF: For every functional dependency X -> Y, X must strictly be a Super Key."
    ],
    pitfalls: "Confusing 3NF with BCNF when multiple overlapping candidate keys exist."
  },
  {
    id: "binary-trees-trav",
    topic: "Binary Trees & BST Traversals",
    subject: "Data Structures & Algorithms",
    priority: "MEDIUM",
    priorityColor: "bg-amber-50 text-amber-700 border-amber-200",
    due: "Due in 2 Days",
    mastery: 82,
    retentionBefore: 54,
    retentionAfter: 92,
    summary: "Binary tree traversal strategies categorize into Depth First Search (Inorder, Preorder, Postorder) and Breadth First Search (Level Order).",
    keyPoints: [
      "Inorder on BST always outputs strictly sorted sequence.",
      "Level order traversal utilizes a Queue (FIFO).",
      "Tree height max nodes formula: 2^h - 1.",
      "AVL Balance factor: Height(Left) - Height(Right) must be in {-1, 0, +1}."
    ],
    pitfalls: "Forgetting to balance AVL trees during post-deletion recursive unwinding."
  },
  {
    id: "os-sched",
    topic: "CPU Process Scheduling Algorithms",
    subject: "Operating Systems",
    priority: "MEDIUM",
    priorityColor: "bg-amber-50 text-amber-700 border-amber-200",
    due: "Due in 3 Days",
    mastery: 68,
    retentionBefore: 48,
    retentionAfter: 88,
    summary: "CPU schedulers allocate execution time slices across ready-queue processes to optimize throughput and turnaround time.",
    keyPoints: [
      "FCFS (First-Come, First-Served): Simple FIFO queue, prone to Convoy Effect.",
      "SJF (Shortest Job First): Optimal average waiting time, but requires knowing burst time in advance.",
      "Round Robin (RR): Time quantum preemption; large quantum degenerates into FCFS, tiny quantum causes heavy context switch overhead."
    ],
    pitfalls: "Assuming Shortest Remaining Time First (SRTF) is non-preemptive."
  }
];

export default function RevisionPage() {
  const [activeTopic, setActiveTopic] = useState(revisionQueue[0]);
  const [confidencePost, setConfidencePost] = useState(90);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleCompleteRevision = () => {
    setSessionCompleted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleResetSession = () => {
    setSessionCompleted(false);
  };

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
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Spaced Revision Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Your Personalized Revision Queue
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Revise topics at the exact point of forgetting to maximize long-term memory strength.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                3 Topics in Queue
              </span>
            </div>
          </div>

          {/* Main 2-Column Split: Topic List Left, Interactive Session Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT 5 COLS: Revision Cards List */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Priority Revision Queue
              </h3>

              {revisionQueue.map((item) => {
                const isSelected = activeTopic.id === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    onClick={() => {
                      setActiveTopic(item);
                      setSessionCompleted(false);
                    }}
                    className={`p-5 rounded-3xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md"
                        : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${item.priorityColor}`}>
                        {item.priority} PRIORITY &middot; {item.due}
                      </span>
                      <span className="text-xs font-bold text-slate-900">{item.mastery}% Mastery</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.topic}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.subject}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="text-[11px] text-slate-500">
                        Retention: <span className="font-bold text-red-600">{item.retentionBefore}%</span> (Decaying)
                      </div>
                      <span className="font-bold text-indigo-600 flex items-center gap-1 text-[11px]">
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>


            {/* RIGHT 7 COLS: Interactive Revision Session Sheet */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
                
                {/* Session Header */}
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      Interactive Flash Review
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight mt-0.5">
                      {activeTopic.topic}
                    </h3>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${activeTopic.priorityColor}`}>
                    {activeTopic.due}
                  </span>
                </div>

                {sessionCompleted ? (
                  /* Revision Elevated Success Card */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-slate-950">
                        Memory Strength Boosted!
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                        Your spaced revision session for <strong>{activeTopic.topic}</strong> is recorded. Retention has been algorithmically recalculated.
                      </p>
                    </div>

                    {/* Before vs After Retention Comparison */}
                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
                        <div className="text-xs font-bold text-slate-500">Before Revision</div>
                        <div className="text-2xl font-black text-red-600 mt-1">{activeTopic.retentionBefore}%</div>
                        <div className="text-[10px] text-slate-400">High Risk</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-emerald-300 shadow-2xs text-center ring-2 ring-emerald-500/20">
                        <div className="text-xs font-bold text-emerald-700">After Revision</div>
                        <div className="text-2xl font-black text-emerald-600 mt-1">{activeTopic.retentionAfter}%</div>
                        <div className="text-[10px] text-emerald-600 font-semibold">+46% Elevated</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <Link
                        href={`/quiz/binary-trees`}
                        className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
                      >
                        Take Re-Quiz
                      </Link>

                      <button
                        onClick={handleResetSession}
                        className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Review Material Again
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Active Review Content */
                  <div className="space-y-6">
                    {/* Summary */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Core Concept Summary
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {activeTopic.summary}
                      </p>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                        Important Rules & Formulas
                      </h5>
                      <div className="space-y-2">
                        {activeTopic.keyPoints.map((pt, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                            <div className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <span className="leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pitfall Alert */}
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Common Exam Mistake:</span>
                        <p className="mt-0.5 text-amber-800">{activeTopic.pitfalls}</p>
                      </div>
                    </div>

                    {/* Post-Revision Confidence Check */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-900">
                          How confident do you feel after this revision?
                        </span>
                        <span className="text-xs font-black text-indigo-600">{confidencePost}%</span>
                      </div>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={confidencePost}
                        onChange={(e) => setConfidencePost(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    {/* Complete Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <Link
                        href="/quiz/binary-trees"
                        className="text-xs font-bold text-slate-600 hover:text-indigo-600"
                      >
                        Skip to Re-Quiz &rarr;
                      </Link>

                      <button
                        onClick={handleCompleteRevision}
                        className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                      >
                        <Check className="w-4 h-4 text-white" />
                        <span>Complete Revision & Update Retention</span>
                      </button>
                    </div>
                  </div>
                )}

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