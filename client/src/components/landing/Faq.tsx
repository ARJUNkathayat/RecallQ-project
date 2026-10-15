"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is RecallIQ free to use?",
    a: "Yes! RecallIQ is 100% free for individual students. You can explore all subjects, take unlimited adaptive quizzes, and track your personalized forgetting curves with full retention insights."
  },
  {
    q: "Can I use RecallIQ on mobile?",
    a: "Absolutely. RecallIQ is designed with a responsive layout optimized for smartphones, tablets, laptops, and wide desktop screens."
  },
  {
    q: "What subjects are supported?",
    a: "We currently support core engineering and CS subjects including Data Structures & Algorithms (DSA), Database Management Systems (DBMS), Operating Systems (OS), and Computer Networks (CN), with more subjects regularly added."
  },
  {
    q: "Is my data safe?",
    a: "Yes. All user accounts, quiz attempts, and learning metrics are securely stored with bcrypt password hashing, JWT authentication, and SSL encrypted connections."
  },
  {
    q: "How does retention prediction work?",
    a: "RecallIQ uses a mathematical formulation based on the Ebbinghaus Forgetting Curve R(t) = e^(-t/S). Memory strength (S) is calculated dynamically from your quiz accuracy, prior confidence calibration, topic difficulty, and spaced revision history."
  },
  {
    q: "Can teachers or institutes use this?",
    a: "Yes, our Admin Panel and analytics infrastructure allow educators to manage custom question banks, create curriculum topics, and monitor aggregate student mastery and at-risk topics."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest mb-3">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        {/* 2-Column FAQ Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
