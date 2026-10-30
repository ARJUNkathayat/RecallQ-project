"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Info, ArrowRight, Sparkles } from "lucide-react";
import { isArjunUser, getCurrentUser } from "@/lib/authHelper";
import { getQuizHistory } from "@/lib/geminiQuizService";

const defaultRevisions = [
  {
    topic: "DBMS Normalization",
    due: "Today",
    dueColor: "bg-red-100 text-red-700 border-red-200",
    risk: "High Risk · 61% Mastery",
    href: "/revision/dbms-norm"
  },
  {
    topic: "Process Scheduling",
    due: "Tomorrow",
    dueColor: "bg-amber-100 text-amber-700 border-amber-200",
    risk: "Medium Risk · 68% Mastery",
    href: "/revision/os-scheduling"
  },
  {
    topic: "SQL Joins",
    due: "In 2 days",
    dueColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
    risk: "Medium Risk · 72% Mastery",
    href: "/revision/sql-joins"
  }
];

export default function UpcomingRevision() {
  const [revisions, setRevisions] = useState(defaultRevisions);
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
          const mapped = history.slice(0, 3).map((h) => ({
            topic: h.topicName,
            due: h.accuracy < 60 ? "Today" : "In 2 days",
            dueColor: h.accuracy < 60 ? "bg-red-100 text-red-700 border-red-200" : "bg-amber-100 text-amber-700 border-amber-200",
            risk: `${h.forgettingRisk} Risk · ${h.accuracy}% Mastery`,
            href: `/quiz/dynamic?topic=${encodeURIComponent(h.topicName)}&confidence=75&count=20`,
          }));
          setRevisions(mapped);
        }
      }
    } catch (e) {}
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs h-full flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <span>Upcoming Revision</span>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 rounded-xl bg-slate-900 text-white text-[10px] shadow-lg z-20">
                Calculated spaced revision intervals to prevent knowledge decay below 60%.
              </div>
            </div>
          </div>

          <Link href="/revision" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-xs text-slate-500">Based on your forgetting risk.</p>
      </div>

      {/* Revision List or Clean Onboarding State */}
      {isNewLearnerEmpty ? (
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center space-y-2">
          <Sparkles className="w-5 h-5 text-indigo-500 mx-auto" />
          <p className="text-xs font-semibold text-slate-800">Revision queue is clean</p>
          <p className="text-[11px] text-slate-500">Take your first quiz to activate spaced retention intervals.</p>
          <Link
            href="/quiz/dynamic?topic=Linked%20List&confidence=75&count=20"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <span>Start Practice</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ) : (
        <div className="my-4 space-y-2.5">
          {revisions.map((item) => (
            <div
              key={item.topic}
              className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {item.topic}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.dueColor}`}>
                    {item.due}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  {item.risk}
                </div>
              </div>

              <Link
                href={item.href}
                className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-slate-200 transition-all shadow-2xs"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Spaced Retrieval Micro-Insight */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Target: 80% Retained</span>
        <span className="font-semibold text-indigo-600">Ebbinghaus Model</span>
      </div>
    </div>
  );
}
