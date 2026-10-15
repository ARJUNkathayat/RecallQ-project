"use client";

import React from "react";
import Link from "next/link";
import { Info, Database, GitBranch, Terminal, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const topics = [
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
    href: "/revision/dbms-norm"
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
    href: "/quiz/binary-trees"
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
    href: "/topics/os"
  }
];

export default function TopicsAtRisk() {
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
                Topics prioritized by forgetting risk probability and elapsed days without revision.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">These topics need your attention.</p>
        </div>

        <Link href="/revision" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5">
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 3 Topic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        {topics.map((t, idx) => {
          const Icon = t.icon;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:border-slate-300 shadow-2xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${t.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.riskColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${t.riskDot}`} />
                    <span>{t.risk}</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 truncate">{t.name}</h4>
                <div className="text-xs font-extrabold text-slate-900 mt-1">{t.mastery} Mastery</div>

                <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{t.lastRevised}</span>
                </div>
              </div>

              <Link
                href={t.href}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>{t.action}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
