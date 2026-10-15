"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  AlertTriangle,
  BookOpen,
  Flame,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  trend: string;
  trendType: "positive" | "negative" | "streak";
  iconColor: string;
  iconBg: string;
  index: number;
}

function StatCard({
  icon: Icon,
  title,
  value,
  trend,
  trendType,
  iconColor,
  iconBg,
  index
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-2xs`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-slate-600 truncate">{title}</span>
      </div>

      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          {value}
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold">
          {trendType === "positive" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <TrendingUp className="w-3 h-3" />
              <span>{trend}</span>
            </span>
          )}

          {trendType === "negative" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-100">
              <AlertTriangle className="w-3 h-3" />
              <span>{trend}</span>
            </span>
          )}

          {trendType === "streak" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              <CheckCircle2 className="w-3 h-3" />
              <span>{trend}</span>
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function StatCards() {
  const stats = [
    {
      title: "Overall Mastery",
      value: "78%",
      trend: "12% from last month",
      trendType: "positive" as const,
      icon: GraduationCap,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50"
    },
    {
      title: "Topics at Risk",
      value: "5",
      trend: "2 from last week",
      trendType: "negative" as const,
      icon: AlertTriangle,
      iconColor: "text-red-600",
      iconBg: "bg-red-50"
    },
    {
      title: "Topics Studied",
      value: "24",
      trend: "6 this month",
      trendType: "positive" as const,
      icon: BookOpen,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50"
    },
    {
      title: "Current Streak",
      value: "7 days",
      trend: "Keep it going!",
      trendType: "streak" as const,
      icon: Flame,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <StatCard key={s.title} {...s} index={i} />
      ))}
    </div>
  );
}
