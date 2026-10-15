"use client";

import React from "react";
import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";

const revisions = [
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

      {/* Revision List */}
      <div className="my-4 space-y-2.5">
        {revisions.map((item) => (
          <div
            key={item.topic}
            className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <h5 className="text-xs font-bold text-slate-900">{item.topic}</h5>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.dueColor}`}>
                  {item.due}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.risk}</p>
            </div>

            <Link
              href={item.href}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors shrink-0"
            >
              <span>Start</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>

      <div className="pt-2 text-right">
        <Link href="/revision" className="text-[11px] font-semibold text-slate-500 hover:text-slate-700">
          Sync with Calendar &rarr;
        </Link>
      </div>

    </div>
  );
}
