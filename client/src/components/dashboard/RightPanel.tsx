"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  FileQuestion,
  BarChart3,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Clock,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function RightPanel() {
  const quickActions = [
    { title: "Study a Topic", icon: BookOpen, color: "text-blue-600 bg-blue-50 border-blue-100", href: "/subjects" },
    { title: "Take a Quiz", icon: FileQuestion, color: "text-purple-600 bg-purple-50 border-purple-100", href: "/quiz/dynamic?topic=Linked%20List&confidence=75&count=20" },
    { title: "View Analytics", icon: BarChart3, color: "text-emerald-600 bg-emerald-50 border-emerald-100", href: "/analytics" },
    { title: "Revision Plan", icon: Calendar, color: "text-indigo-600 bg-indigo-50 border-indigo-100", href: "/revision" }
  ];

  const recentActivity = [
    {
      title: "Completed quiz",
      subtitle: "Binary Trees",
      time: "2 hours ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Revised topic",
      subtitle: "SQL Joins",
      time: "1 day ago",
      icon: RefreshCw,
      iconColor: "text-purple-600 bg-purple-50"
    },
    {
      title: "Completed quiz",
      subtitle: "DBMS Normalization",
      time: "3 days ago",
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Studied topic",
      subtitle: "Operating Systems",
      time: "4 days ago",
      icon: BookOpen,
      iconColor: "text-blue-600 bg-blue-50"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Date & Discipline Quote Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Thu, 18 Sep 2026
        </div>
        <p className="mt-2 text-xs font-medium text-slate-700 italic font-handwriting">
          &ldquo;Discipline today brings results tomorrow.&rdquo;
        </p>
      </div>

      {/* Quick Actions (4 Grid) */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <h4 className="text-xs font-bold text-slate-900 mb-3.5">Quick Actions</h4>
        
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.title}
                href={act.href}
                className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-slate-300 shadow-2xs transition-all flex flex-col items-center text-center group"
              >
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-2 ${act.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 leading-tight">
                  {act.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-900">Recent Activity</h4>
          <Link href="/analytics" className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-0.5">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentActivity.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${act.iconColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800 leading-tight">
                    {act.title}
                  </div>
                  <div className="text-[11px] text-slate-500">{act.subtitle}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{act.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
