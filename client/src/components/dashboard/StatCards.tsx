"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  AlertTriangle,
  BookOpen,
  Flame,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { isArjunUser, getCurrentUser } from "@/lib/authHelper";
import { getQuizHistory } from "@/lib/geminiQuizService";

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
  const [statsData, setStatsData] = useState<{
    mastery: string;
    masteryTrend: string;
    masteryType: "positive" | "negative" | "streak";
    riskCount: string;
    riskTrend: string;
    riskType: "positive" | "negative" | "streak";
    topicsCount: string;
    topicsTrend: string;
    topicsType: "positive" | "negative" | "streak";
    streak: string;
    streakTrend: string;
    streakType: "positive" | "negative" | "streak";
  }>({
    mastery: "78%",
    masteryTrend: "12% from last month",
    masteryType: "positive",
    riskCount: "5",
    riskTrend: "2 from last week",
    riskType: "negative",
    topicsCount: "24",
    topicsTrend: "6 this month",
    topicsType: "positive",
    streak: "7 days",
    streakTrend: "Keep it going!",
    streakType: "streak",
  });

  useEffect(() => {
    try {
      const u = getCurrentUser();
      const isArjun = isArjunUser(u);

      if (!isArjun) {
        // New user stats calculation
        const history = getQuizHistory();
        const total = history.length;
        const uniqueTopics = new Set(history.map((h) => h.topicName)).size;
        const atRisk = history.filter((h) => (h.accuracy || 0) < 60).length;
        const streakDays = u?.streak || 1;

        if (total === 0) {
          setStatsData({
            mastery: "New Learner",
            masteryTrend: "Ready for first quiz",
            masteryType: "positive",
            riskCount: "0",
            riskTrend: "No topics at risk",
            riskType: "positive",
            topicsCount: "0",
            topicsTrend: "Start your journey",
            topicsType: "positive",
            streak: `${streakDays} day`,
            streakTrend: "Day 1 streak",
            streakType: "streak",
          });
        } else {
          const avgAcc = Math.round(history.reduce((a, b) => a + (b.accuracy || 0), 0) / total);
          setStatsData({
            mastery: `${avgAcc}%`,
            masteryTrend: `Across ${total} quizzes`,
            masteryType: avgAcc >= 70 ? "positive" : "negative",
            riskCount: String(atRisk),
            riskTrend: atRisk > 0 ? "Needs revision" : "Zero decay",
            riskType: atRisk > 0 ? "negative" : "positive",
            topicsCount: String(uniqueTopics),
            topicsTrend: `${total} attempts total`,
            topicsType: "positive",
            streak: `${streakDays} ${streakDays === 1 ? "day" : "days"}`,
            streakTrend: "Keep it going!",
            streakType: "streak",
          });
        }
      }
    } catch (e) {}
  }, []);

  const stats = [
    {
      title: "Overall Mastery",
      value: statsData.mastery,
      trend: statsData.masteryTrend,
      trendType: statsData.masteryType,
      icon: GraduationCap,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50"
    },
    {
      title: "Topics at Risk",
      value: statsData.riskCount,
      trend: statsData.riskTrend,
      trendType: statsData.riskType,
      icon: AlertTriangle,
      iconColor: "text-red-600",
      iconBg: "bg-red-50"
    },
    {
      title: "Topics Studied",
      value: statsData.topicsCount,
      trend: statsData.topicsTrend,
      trendType: statsData.topicsType,
      icon: BookOpen,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50"
    },
    {
      title: "Current Streak",
      value: statsData.streak,
      trend: statsData.streakTrend,
      trendType: statsData.streakType,
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
