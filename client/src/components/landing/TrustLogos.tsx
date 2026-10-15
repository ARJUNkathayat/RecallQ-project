"use client";

import React from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "NIET", label: "NIET Greater Noida" },
  { name: "Google", label: "Google" },
  { name: "Microsoft", label: "Microsoft" },
  { name: "Coursera", label: "Coursera" },
  { name: "Notion", label: "Notion" },
  { name: "GitHub", label: "GitHub" },
  { name: "Figma", label: "Figma" }
];

export default function TrustLogos() {
  return (
    <section className="py-12 border-y border-slate-100 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
          Trusted by Learners Everywhere
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {partners.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="flex items-center gap-2 text-slate-600 font-semibold tracking-tight text-base sm:text-lg hover:text-indigo-600 transition-colors cursor-default"
            >
              <div className="w-6 h-6 rounded-md bg-slate-200/80 flex items-center justify-center text-xs font-bold text-slate-700">
                {p.name.charAt(0)}
              </div>
              <span>{p.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
