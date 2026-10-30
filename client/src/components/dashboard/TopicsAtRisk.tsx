"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Info, Database, GitBranch, Terminal, ArrowRight, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { isArjunUser, getCurrentUser } from "@/lib/authHelper";
import { getQuizHistory } from "@/lib/geminiQuizService";

const defaultTopics = [
  {
    id: "dbms-norm",
    name: "DBMS Normalization",
    mastery: "61%",
    risk: "High Risk",
    riskColor: "text-red-700 bg-red-50 border-red-200",
    riskDot: "bg-red-500",
    lastRevised: "Last revised 6 days ago",
    action: "Revise Now",
    icon: Database,
    iconColor: "text-red-600 bg-red-50",
    href: "/revision"
  },
  {
    id: "binary-trees",
    name: "Binary Trees",
    mastery: "82%",
    risk: "Low Risk",
    riskColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    riskDot: "bg-emerald-500",
    lastRevised: "Last revised 2 days ago",
    action: "Practice Now",
    icon: GitBranch,
    iconColor: "text-emerald-600 bg-emerald-50",
    href: "/quiz/dynamic?topic=Binary%20Trees&confidence=80&count=20"
  },
  {
    id: "operating-systems",
    name: "Operating Systems",
    mastery: "74%",
    risk: "Medium Risk",
    riskColor: "text-amber-700 bg-amber-50 border-amber-200",
    riskDot: "bg-amber-500",
    lastRevised: "Last revised 4 days ago",
    action: "Review Now",
    icon: Terminal,
    iconColor: "text-amber-600 bg-amber-50",
    href: "/revision"
  }
];

export default function TopicsAtRisk() {
  const [topics, setTopics] = useState(defaultTopics);
  const [isNewLearnerEmpty, setIsNewLearnerEmpty] = useState(false);

  useEffect(() => {
    try {
      const u = getCurrentUser();
      const isArjun = isArjunUser(u);

      if (!isArjun) {
        const history = getQuizHistory();
        if (history.length === 0) {
          setIsNewLearnerEmpty(true);
        } else {
          setIsNewLearnerEmpty(false);
          const mapped = history.slice(0, 3).map((h, i) => {
            const isHigh = h.accuracy < 60;
            const isLow = h.accuracy >= 80;
            return {
              id: h.id,
              name: h.topicName,
              mastery: `${h.accuracy}%`,
              risk: isHigh ? "High Risk" : isLow ? "Low Risk" : "Medium Risk",
              riskColor: isHigh
                ? "text-red-700 bg-red-50 border-red-200"
                : isLow
                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                : "text-amber-700 bg-amber-50 border-amber-200",
              riskDot: isHigh ? "bg-red-500" : isLow ? "bg-emerald-500" : "bg-amber-500",
              lastRevised: "Recent diagnostic quiz",
              action: isHigh ? "Revise Now" : "Practice More",
              icon: i === 0 ? GitBranch : i === 1 ? Database : Terminal,
              iconColor: isHigh ? "text-red-600 bg-red-50" : isLow ? "text-emerald-600 bg-emerald-50" : "text-amber-600 bg-amber-50",
              href: `/quiz/dynamic?topic=${encodeURIComponent(h.topicName)}&confidence=75&count=20`,
            };
          });
          setTopics(mapped);
        }
      }
    } catch (e) {}
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs h-full flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <span>Topics at Risk</span>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 rounded-xl bg-slate-900 text-white text-[10px] shadow-lg z-20">
                Retention calculated by Ebbinghaus model based on time elapsed and last test accuracy.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Subject to active memory decay.
          </p>
        </div>

        <Link
          href="/revision"
          className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Topics List or Clean Slate */}
      {isNewLearnerEmpty ? (
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-2">
          <Sparkles className="w-5 h-5 text-indigo-500 mx-auto" />
          <p className="text-xs font-semibold text-slate-800">No topics at risk</p>
          <p className="text-[11px] text-slate-500">Your memory retention index is healthy. Explore CSE curriculum topics.</p>
          <Link
            href="/subjects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <span>Explore Subjects</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${topic.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {topic.name}
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${topic.riskColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${topic.riskDot}`} />
                        <span>{topic.risk}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                      <span>Mastery: <b className="text-slate-800">{topic.mastery}</b></span>
                      <span>&middot;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{topic.lastRevised}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={topic.href}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:text-indigo-600 hover:border-indigo-200 transition-colors text-center shrink-0 shadow-2xs"
                >
                  {topic.action}
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer Alert Note */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Dynamic retention scoring</span>
        <span className="font-semibold text-slate-700">R(t) = e^(-t/S)</span>
      </div>
    </div>
  );
}
