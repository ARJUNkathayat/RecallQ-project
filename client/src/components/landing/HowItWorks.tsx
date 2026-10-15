"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, BarChart2, FileQuestion, LineChart, RefreshCw, ArrowRight } from "lucide-react";

const steps = [
  {
    num: 1,
    title: "Study",
    desc: "Learn a topic at your own pace.",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    badgeColor: "bg-blue-600 text-white"
  },
  {
    num: 2,
    title: "Rate Confidence",
    desc: "Tell us how confident you feel.",
    icon: BarChart2,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    badgeColor: "bg-purple-600 text-white"
  },
  {
    num: 3,
    title: "Take Quiz",
    desc: "Test your knowledge with curated questions.",
    icon: FileQuestion,
    color: "bg-sky-50 text-sky-600 border-sky-200",
    badgeColor: "bg-sky-600 text-white"
  },
  {
    num: 4,
    title: "Get Insights",
    desc: "See mastery, retention and forgetting risk.",
    icon: LineChart,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    badgeColor: "bg-emerald-600 text-white"
  },
  {
    num: 5,
    title: "Revise & Improve",
    desc: "Follow personalized revision plans.",
    icon: RefreshCw,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    badgeColor: "bg-orange-600 text-white"
  }
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="how-it-works" className="py-24 bg-slate-50/60 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-3">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            A simple process. A smarter you.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From study to long-term retention — all in one seamless flow.
          </p>
        </div>

        {/* 5 Steps Interactive Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.num;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setActiveStep(step.num)}
                className="flex flex-col items-center text-center cursor-pointer group relative"
              >
                {/* Connecting Arrow for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-7 -right-3 text-slate-300 z-10">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                {/* Big Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-sm ${step.color} ${
                    isSelected
                      ? "ring-4 ring-indigo-500/20 scale-105 shadow-md"
                      : "group-hover:scale-105"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Number Badge + Title */}
                <div className="mt-4 flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step.badgeColor}`}>
                    {step.num}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-xs text-slate-500 leading-relaxed max-w-[190px]">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
