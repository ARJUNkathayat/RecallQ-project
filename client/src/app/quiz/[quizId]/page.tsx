"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Layers,
  BookOpen,
  RefreshCw,
  BarChart3,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  GitBranch,
  Timer,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import QuizResultView from "@/components/quiz/QuizResultView";

// High-quality CS questions for Binary Trees & DSA
const sampleQuestions = [
  {
    id: 1,
    question: "Which of the following tree traversal algorithms utilizes a Queue data structure (FIFO)?",
    options: [
      "Depth First Search (DFS)",
      "Breadth First Search (BFS) / Level Order",
      "Inorder Traversal",
      "Postorder Traversal"
    ],
    correctAnswer: 1,
    explanation: "Breadth First Search (Level Order Traversal) uses a queue to visit nodes level-by-level."
  },
  {
    id: 2,
    question: "In a strictly Binary Search Tree (BST), which traversal always produces keys in non-decreasing sorted order?",
    options: [
      "Preorder Traversal",
      "Postorder Traversal",
      "Inorder Traversal",
      "Level Order Traversal"
    ],
    correctAnswer: 2,
    explanation: "Inorder traversal visits Left subtree, Root, then Right subtree, producing elements in sorted order for a BST."
  },
  {
    id: 3,
    question: "What is the maximum number of nodes in a binary tree of depth/height 'h' (root at height 1)?",
    options: [
      "2^(h - 1)",
      "2^h - 1",
      "2^(h + 1) - 1",
      "h^2"
    ],
    correctAnswer: 1,
    explanation: "A binary tree of height h has at most 2^0 + 2^1 + ... + 2^(h-1) = 2^h - 1 nodes."
  },
  {
    id: 4,
    question: "What is the worst-case time complexity of searching an element in an unbalanced Binary Search Tree (skewed)?",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N log N)"
    ],
    correctAnswer: 2,
    explanation: "In a degenerate or skewed BST (like a linked list), searching takes linear time O(N)."
  },
  {
    id: 5,
    question: "What is the balance factor of an AVL tree node defined as?",
    options: [
      "Height(Left) - Height(Right)",
      "Height(Right) * Height(Left)",
      "Count(Left) - Count(Right)",
      "Depth(Node) - 1"
    ],
    correctAnswer: 0,
    explanation: "Balance Factor = Height of Left Subtree - Height of Right Subtree (must be -1, 0, or +1 in AVL)."
  },
  {
    id: 6,
    question: "Which property is TRUE for a Full Binary Tree?",
    options: [
      "All leaves are at the exact same depth",
      "Every node has either 0 or 2 children",
      "All levels are completely filled except possibly the last",
      "Every node must have exactly 2 children"
    ],
    correctAnswer: 1,
    explanation: "In a Full Binary Tree (or strictly binary tree), every internal node has exactly 2 children (no node has 1 child)."
  },
  {
    id: 7,
    question: "To reconstruct a unique binary tree, which pair of traversals is sufficient?",
    options: [
      "Inorder and Preorder",
      "Preorder and Postorder",
      "Level order and Postorder",
      "Inorder alone"
    ],
    correctAnswer: 0,
    explanation: "Inorder along with either Preorder or Postorder is mandatory to uniquely reconstruct a binary tree."
  },
  {
    id: 8,
    question: "What is the lowest common ancestor (LCA) of nodes 4 and 5 in a standard BST where root=6, left child=2 with children (0, 4), right child=8?",
    options: [
      "Node 6",
      "Node 2",
      "Node 4",
      "Node 8"
    ],
    correctAnswer: 1,
    explanation: "Both nodes 4 and 5 (or within that subtree) diverge at node 2, making 2 their lowest common ancestor."
  },
  {
    id: 9,
    question: "What is the time complexity to find the diameter of a binary tree in a single optimized bottom-up postorder pass?",
    options: [
      "O(N^2)",
      "O(N)",
      "O(log N)",
      "O(1)"
    ],
    correctAnswer: 1,
    explanation: "By computing height and diameter simultaneously in bottom-up recursion, diameter takes O(N) linear time."
  },
  {
    id: 10,
    question: "Which of the following binary tree variants guarantees self-balancing with red-black color invariants?",
    options: [
      "B-Tree",
      "Red-Black Tree",
      "Trie",
      "Segment Tree"
    ],
    correctAnswer: 1,
    explanation: "Red-Black Trees maintain balance through node color properties and rotations, guaranteeing O(log N) operations."
  }
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  // Quiz State
  const [confidence, setConfidence] = useState(85);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({ 0: 1, 1: 2, 2: 1 }); // Seeded first 3 attempted for quick demo
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (quizSubmitted) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [quizSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(600);
    setQuizSubmitted(false);
  };

  const attemptedCount = Object.keys(selectedAnswers).length;
  const remainingCount = sampleQuestions.length - attemptedCount;
  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const progressPct = Math.round(((currentQuestionIndex + 1) / sampleQuestions.length) * 100);

  // Correct calculation
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, ans]) => {
    return acc + (sampleQuestions[Number(qIdx)]?.correctAnswer === ans ? 1 : 0);
  }, 0);

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

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/subjects" className="hover:text-indigo-600 transition-colors">Subjects</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/subjects" className="hover:text-indigo-600 transition-colors">Data Structures & Algorithms</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-800">Binary Trees</span>
          </div>

          {/* Topic Hero Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  Binary Trees
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Test your understanding and see how well you really know this topic.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 self-start md:self-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 w-full md:w-auto justify-between md:justify-end">
              <div className="text-center">
                <span className="text-sm font-black text-slate-900">10</span>
                <span className="block text-[10px] text-slate-400 font-medium">Questions</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-sm font-black text-slate-900">~ 10 min</span>
                <span className="block text-[10px] text-slate-400 font-medium">Estimated time</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="text-center">
                <span className="text-sm font-black text-amber-600">Medium</span>
                <span className="block text-[10px] text-slate-400 font-medium">Difficulty</span>
              </div>
            </div>
          </div>

          {/* If Quiz is Submitted -> Show Diagnostic Retention Result View */}
          {quizSubmitted ? (
            <QuizResultView
              topicName="Binary Trees"
              subjectName="Data Structures & Algorithms"
              totalQuestions={sampleQuestions.length}
              correctCount={correctCount}
              confidence={confidence}
              timeSpentSec={600 - timeRemaining}
              onRetake={handleRetake}
            />
          ) : (
            /* Main Quiz Experience: 2 Columns (Main Quiz Left + Progress Sidebar Right) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT 8-9 COLS: Steps 1 & 2 */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* STEP 1: Confidence Rating Slider Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Slider Column */}
                    <div className="md:col-span-8">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                        Step 1 of 2
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                        How confident are you about Binary Trees?
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Be honest! Your confidence helps RecallIQ understand how well you know what you know.
                      </p>

                      {/* Interactive Precision Slider */}
                      <div className="mt-8 relative px-2">
                        
                        {/* Floating Percentage Tooltip on Handle */}
                        <div
                          className="absolute -top-7 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-black text-[11px] shadow-md pointer-events-none transition-all"
                          style={{ left: `${confidence}%` }}
                        >
                          {confidence}%
                        </div>

                        {/* Slider Input */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={confidence}
                          onChange={(e) => setConfidence(Number(e.target.value))}
                          className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
                        />

                        {/* Axis Marks */}
                        <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-2">
                          <span>0%</span>
                          <span>25%</span>
                          <span>50%</span>
                          <span>75%</span>
                          <span>100%</span>
                        </div>

                        <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                          <span>Not confident</span>
                          <span>Very confident</span>
                        </div>

                      </div>
                    </div>

                    {/* Right Quote Badge */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center justify-center">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2 shadow-2xs">
                        <Brain className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-slate-600 italic font-handwriting">
                        &ldquo;Self-awareness is the first step towards mastery.&rdquo;
                      </p>
                    </div>

                  </div>
                </motion.div>


                {/* STEP 2: Active Quiz Runner Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6"
                >
                  {/* Step 2 Header + Timer */}
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1">
                        Step 2 of 2
                      </div>
                      <h3 className="text-lg font-black text-slate-950 tracking-tight">Quiz Time</h3>
                      <p className="text-xs text-slate-500">Choose the best answer for each question.</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-600 hidden sm:inline">
                        Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                      </span>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-bold text-xs shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-red-500" />
                        <span>{formatTimer(timeRemaining)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{progressPct}%</span>
                  </div>

                  {/* Question Prompt */}
                  <div className="pt-2">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentQuestion.question}
                    </h4>
                  </div>

                  {/* 4 Interactive Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {currentQuestion.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                      const optLetter = String.fromCharCode(65 + optIdx);

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(optIdx)}
                          className={`p-4 rounded-2xl text-left border text-xs sm:text-sm font-semibold transition-all duration-200 flex items-start gap-3 group active:scale-[0.99] ${
                            isSelected
                              ? "bg-indigo-50/70 border-indigo-600 text-indigo-950 ring-2 ring-indigo-500/20 shadow-xs"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                              isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}
                          >
                            {optLetter}
                          </div>

                          <span className="mt-0.5 leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentQuestionIndex === 0}
                      className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    {currentQuestionIndex === sampleQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleSubmitQuiz}
                        className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98]"
                      >
                        <span>Submit Quiz & Analyze</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98]"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </motion.div>

              </div>


              {/* RIGHT 4 COLS: Progress Ring, Topic Info & Motivational Card */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Your Progress Panel */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center text-center">
                  <h4 className="text-xs font-bold text-slate-900 self-start mb-4">Your Progress</h4>
                  
                  {/* Circular Progress Ring */}
                  <div className="relative w-28 h-28 flex items-center justify-center my-2">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="46" stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="56" cy="56" r="46"
                        stroke="#4F46E5" strokeWidth="8" strokeLinecap="round" fill="transparent"
                        strokeDasharray="289"
                        strokeDashoffset={289 - (289 * (attemptedCount / sampleQuestions.length))}
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black text-slate-900">{attemptedCount}/{sampleQuestions.length}</span>
                      <p className="text-[9px] text-slate-400 font-semibold">Questions Attempted</p>
                    </div>
                  </div>

                  {/* Progress Details */}
                  <div className="w-full space-y-2.5 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Attempted</span>
                      </span>
                      <span className="font-bold text-slate-900">{attemptedCount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span>Remaining</span>
                      </span>
                      <span className="font-bold text-slate-900">{remainingCount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Time Left</span>
                      </span>
                      <span className="font-bold text-slate-900">{formatTimer(timeRemaining)}</span>
                    </div>
                  </div>
                </div>

                {/* Topic Info Panel */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                  <h4 className="text-xs font-bold text-slate-900">Topic Info</h4>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <GitBranch className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Binary Trees</div>
                        <div className="text-[10px] text-slate-400">Data Structures & Algorithms</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Key Concepts</div>
                        <div className="text-[10px] text-slate-500">Traversal, BST, Height, LCA</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Recommended Study Time</div>
                        <div className="text-[10px] text-slate-500">2–3 hours</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Your Previous Score</div>
                        <div className="text-[10px] text-slate-500">72% (2 weeks ago)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Scenic Motivational Card */}
                <div className="relative rounded-3xl p-5 bg-gradient-to-br from-indigo-100 via-sky-50 to-blue-100 border border-indigo-200/60 shadow-xs flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-2xl bg-white text-indigo-700 flex items-center justify-center mb-2 shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-bold text-slate-800 font-handwriting italic">
                    &ldquo;Practice today. A stronger you tomorrow.&rdquo;
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* Footer */}
          <DashboardFooter />

        </main>
      </div>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

    </div>
  );
}