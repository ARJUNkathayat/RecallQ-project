"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Flame,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  RefreshCw,
  User,
  Bell
} from "lucide-react";

export default function ImpactSection() {
  return (
    <section id="analytics" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Dark Navy Interactive Dashboard UI (Matching the uploaded image) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative"
          >
            {/* Double bezel frame */}
            <div className="p-2 sm:p-3 rounded-[2.5rem] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-2xl">
              
              <div className="bg-[#0B132B] rounded-[2rem] border border-slate-800/80 p-5 sm:p-6 text-white flex flex-col md:flex-row gap-5 min-h-[460px]">
                
                {/* Mini Left Nav */}
                <div className="w-full md:w-36 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                        R
                      </div>
                      <span className="font-bold text-xs text-slate-200">RecallIQ</span>
                    </div>

                    <div className="space-y-1">
                      {[
                        { label: "Dashboard", active: true },
                        { label: "Subjects", active: false },
                        { label: "Analytics", active: false },
                        { label: "Revision", active: false },
                        { label: "Profile", active: false }
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`text-[11px] px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                            item.active
                              ? "bg-indigo-600/30 text-indigo-400 font-semibold border border-indigo-500/30"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500">v2.4 Active</div>
                </div>

                {/* Main Content Pane */}
                <div className="flex-1 flex flex-col justify-between">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">Dashboard</h4>
                      <p className="text-[10px] text-slate-400">Here&apos;s your learning overview.</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Bell className="w-3.5 h-3.5" />
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
                        A
                      </div>
                    </div>
                  </div>

                  {/* Middle Grid: Subject Mastery + Forgetting Risk Donut */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    
                    {/* Subject Mastery List */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[11px] font-bold text-slate-300 mb-3">Subject Mastery</div>
                      <div className="space-y-2.5">
                        {[
                          { name: "DSA", pct: 82, color: "bg-blue-500" },
                          { name: "DBMS", pct: 68, color: "bg-indigo-500" },
                          { name: "Operating Systems", pct: 74, color: "bg-emerald-500" },
                          { name: "Computer Networks", pct: 60, color: "bg-purple-500" }
                        ].map((sub) => (
                          <div key={sub.name}>
                            <div className="flex justify-between text-[10px] text-slate-300 mb-1">
                              <span>{sub.name}</span>
                              <span className="font-bold">{sub.pct}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${sub.color} rounded-full`}
                                style={{ width: `${sub.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Forgetting Risk Donut Card */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                      <div className="text-[11px] font-bold text-slate-300">Forgetting Risk</div>
                      
                      <div className="flex items-center justify-center my-2 relative">
                        {/* Custom SVG Donut */}
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle cx="40" cy="40" r="30" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                          <circle
                            cx="40" cy="40" r="30"
                            stroke="#EF4444" strokeWidth="6" fill="transparent"
                            strokeDasharray="188.4" strokeDashoffset="140"
                          />
                          <circle
                            cx="40" cy="40" r="30"
                            stroke="#F59E0B" strokeWidth="6" fill="transparent"
                            strokeDasharray="188.4" strokeDashoffset="100"
                          />
                          <circle
                            cx="40" cy="40" r="30"
                            stroke="#10B981" strokeWidth="6" fill="transparent"
                            strokeDasharray="188.4" strokeDashoffset="50"
                          />
                        </svg>
                        <div className="absolute text-center">
                          <span className="text-base font-extrabold text-white">5</span>
                          <p className="text-[8px] text-slate-400">At Risk</p>
                        </div>
                      </div>

                      <div className="flex justify-around text-[9px] text-slate-400 pt-1 border-t border-slate-800">
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> High: 5</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Med: 7</span>
                        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Low: 12</span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom: Upcoming Revision + Recent Activity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                    
                    {/* Upcoming */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="font-bold text-slate-300 mb-2">Upcoming Revision</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                          <span>DBMS Normalization</span>
                          <span className="text-[9px] font-bold text-red-400">In 2 days</span>
                        </div>
                        <div className="flex items-center justify-between p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          <span>Binary Trees</span>
                          <span className="text-[9px] font-bold text-amber-400">In 3 days</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent */}
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="font-bold text-slate-300 mb-2">Recent Activity</div>
                      <div className="space-y-1.5 text-slate-300">
                        <div className="flex items-center justify-between">
                          <span>Quiz: Trees</span>
                          <span className="text-emerald-400 font-bold">92%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Revised: SQL Joins</span>
                          <span className="text-slate-400">2 days ago</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </motion.div>

          {/* RIGHT: Real Impact Copy & Feature Bullets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
              Real Impact
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Turn learning into lasting knowledge
            </h2>

            <p className="mt-4 text-slate-600 text-base leading-relaxed">
              RecallIQ helps you understand your learning patterns, identify weak areas and build a consistent revision habit — so you remember more and perform better.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { title: "Track your progress in real-time", desc: "Live retention scores updated after every single interaction." },
                { title: "Identify topics at risk of being forgotten", desc: "Scientific early warning system before memory decay hits zero." },
                { title: "Get personalized revision recommendations", desc: "Algorithmically optimized review intervals calibrated to you." },
                { title: "Build long-term knowledge retention", desc: "Convert short-term memorization into permanent mental models." }
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
