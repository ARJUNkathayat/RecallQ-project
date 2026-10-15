"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rohan Mehta",
    role: "CSE, NIET",
    avatar: "RM",
    avatarBg: "bg-indigo-600",
    quote: "RecallIQ changed the way I study. I finally know what to revise and when."
  },
  {
    name: "Priya Sharma",
    role: "ECE, NIET",
    avatar: "PS",
    avatarBg: "bg-purple-600",
    quote: "The retention insights are super helpful. My scores and confidence have both improved!"
  },
  {
    name: "Kunal Verma",
    role: "CSE, AKTU",
    avatar: "KV",
    avatarBg: "bg-blue-600",
    quote: "Simple, clean and actually useful. Exactly what students need."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-3">
            What Students Say
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by learners like you
          </h2>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-1.5 rounded-[2rem] bg-gradient-to-b from-slate-100 to-slate-200/60 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="h-full p-6 sm:p-7 rounded-[calc(2rem-0.375rem)] bg-white border border-slate-100 flex flex-col justify-between">
                <div>
                  <p className="text-slate-700 text-sm sm:text-base font-normal leading-relaxed italic">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${r.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow-xs`}>
                      {r.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{r.name}</h4>
                      <p className="text-xs text-slate-500">{r.role}</p>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
