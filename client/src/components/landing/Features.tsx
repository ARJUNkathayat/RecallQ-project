"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, LineChart, Target, CalendarClock, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Adaptive Learning",
    description: "Personalized recommendations based on your performance and retention patterns.",
    color: "from-purple-500/10 to-indigo-500/5",
    border: "border-purple-200/60",
    iconBg: "bg-purple-100 text-purple-700",
    pill: "Adaptive"
  },
  {
    icon: LineChart,
    title: "Retention Prediction",
    description: "Know what you're likely to forget before you forget it using mathematical decay curves.",
    color: "from-emerald-500/10 to-teal-500/5",
    border: "border-emerald-200/60",
    iconBg: "bg-emerald-100 text-emerald-700",
    pill: "e^(-t/S)"
  },
  {
    icon: Target,
    title: "Confidence Analysis",
    description: "Compare your confidence with actual performance to eliminate illusion of competence.",
    color: "from-orange-500/10 to-amber-500/5",
    border: "border-orange-200/60",
    iconBg: "bg-orange-100 text-orange-700",
    pill: "Metacognition"
  },
  {
    icon: CalendarClock,
    title: "Smart Revision",
    description: "Get timely revision suggestions to strengthen weak topics before forgetting accelerates.",
    color: "from-blue-500/10 to-indigo-500/5",
    border: "border-blue-200/60",
    iconBg: "bg-blue-100 text-blue-700",
    pill: "Spaced"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-3">
            Features
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to learn better
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Powerful tools to help you track, understand and improve your learning retention.
          </p>
        </div>

        {/* 4 Feature Cards Grid (Double-Bezel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-1.5 rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200/60 border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Inner Core */}
                <div className={`h-full p-6 rounded-[calc(2rem-0.375rem)] bg-gradient-to-br ${f.color} bg-white border ${f.border} flex flex-col justify-between`}>
                  <div>
                    {/* Top row: Icon + Pill */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-600 shadow-2xs">
                        {f.pill}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {f.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100/80 flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:text-indigo-700">
                    <span>Learn more</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
