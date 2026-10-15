"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, TrendingUp, HelpCircle, Clock } from "lucide-react";

const metrics = [
  {
    icon: BookOpen,
    stat: "98%",
    label: "Students felt more confident",
    color: "text-indigo-600 bg-indigo-50 border-indigo-100"
  },
  {
    icon: TrendingUp,
    stat: "3x",
    label: "Better long-term retention",
    color: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    icon: HelpCircle,
    stat: "50+",
    label: "Practice questions per topic",
    color: "text-sky-600 bg-sky-50 border-sky-100"
  },
  {
    icon: Clock,
    stat: "24/7",
    label: "Learn anytime, anywhere",
    color: "text-purple-600 bg-purple-50 border-purple-100"
  }
];

export default function MetricsBanner() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${m.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{m.stat}</div>
                  <div className="text-xs text-slate-600 font-medium">{m.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
