"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  FileQuestion,
  BarChart3,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { isArjunUser, getCurrentUser } from "@/lib/authHelper";
import { getQuizHistory } from "@/lib/geminiQuizService";

export default function RightPanel() {
  const quickActions = [
    { title: "Study a Topic", icon: BookOpen, color: "text-blue-600 bg-blue-50 border-blue-100", href: "/subjects" },
    { title: "Take a Quiz", icon: FileQuestion, color: "text-purple-600 bg-purple-50 border-purple-100", href: "/quiz/dynamic?topic=Linked%20List&confidence=75&count=20" },
    { title: "View Analytics", icon: BarChart3, color: "text-emerald-600 bg-emerald-50 border-emerald-100", href: "/analytics" },
    { title: "Revision Plan", icon: Calendar, color: "text-indigo-600 bg-indigo-50 border-indigo-100", href: "/revision" }
  ];

  const defaultRecentActivity = [
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

  const [activities, setActivities] = useState(defaultRecentActivity);

  useEffect(() => {
    try {
      const u = getCurrentUser();
      const isArjun = isArjunUser(u);

      if (!isArjun) {
        const history = getQuizHistory();
        if (history.length > 0) {
          const mapped = history.slice(0, 4).map((h) => ({
            title: "Completed quiz",
            subtitle: h.topicName,
            time: `${h.accuracy}% score`,
            icon: CheckCircle2,
            iconColor: "text-emerald-600 bg-emerald-50"
          }));
          setActivities(mapped);
        } else {
          setActivities([
            {
              title: "Account Created",
              subtitle: "Welcome to RecallIQ",
              time: "Just now",
              icon: CheckCircle2,
              iconColor: "text-emerald-600 bg-emerald-50"
            },
            {
              title: "Adaptive Profiler",
              subtitle: "Calibrate understanding",
              time: "Ready",
              icon: Sparkles,
              iconColor: "text-indigo-600 bg-indigo-50"
            }
          ]);
        }
      }
    } catch (e) {}
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Date & Discipline Quote Card */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>Active Streak</span>
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
        </div>
        <p className="text-xs text-slate-700 italic leading-relaxed">
          &quot;Spaced repetition turns short-term effort into permanent cognitive mastery.&quot;
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col items-center text-center gap-2 group shadow-2xs"
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {action.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Activity
          </h3>
          <Link href="/analytics" className="text-xs font-semibold text-indigo-600 hover:underline">
            History
          </Link>
        </div>

        <div className="space-y-3">
          {activities.map((act, i) => {
            const Icon = act.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl ${act.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {act.title}: <span className="font-semibold text-slate-600">{act.subtitle}</span>
                  </p>
                  <p className="text-[10px] text-slate-400">{act.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
