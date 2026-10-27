"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Sparkles,
  Award,
  BookOpen,
  Target,
  RefreshCw,
  Flame,
  ShieldCheck,
  Bell,
  Sliders,
  CheckCircle2,
  Lock,
  LogOut,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function ProfilePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [name, setName] = useState("Arjun Kathayat");
  const [email, setEmail] = useState("arjun@example.com");
  const [branch, setBranch] = useState("Computer Science & Engineering (CSE)");
  const [year, setYear] = useState("3rd Year");
  const [college, setCollege] = useState("NIET Greater Noida");
  const [dailyTarget, setDailyTarget] = useState("3 Quizzes / Day");
  const [retentionTarget, setRetentionTarget] = useState("80% Baseline");
  const [notifications, setNotifications] = useState(true);
  const [spacedAlerts, setSpacedAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const statBadges = [
    { label: "Quizzes Completed", value: "28", icon: BookOpen, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Spaced Revisions", value: "14", icon: RefreshCw, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Avg Accuracy", value: "84%", icon: Target, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Avg Confidence", value: "88%", icon: Sparkles, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
    { label: "Topics Mastered", value: "18", icon: Award, color: "text-amber-600 bg-amber-50 border-amber-100" },
    { label: "Current Streak", value: "7 Days", icon: Flame, color: "text-red-600 bg-red-50 border-red-100" }
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 flex font-sans antialiased text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header */}
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          
          {/* Top Banner Card */}
          <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-indigo-50/80 via-blue-50/40 to-transparent pointer-events-none -z-0" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-[1.4rem] bg-slate-950 flex items-center justify-center font-black text-white text-2xl">
                      AK
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      {name}
                    </h1>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Active Student
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {branch} &middot; {year} &middot; {college}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Member since September 2026 &middot; Learning ID: #RCQ-9482
                  </p>
                </div>
              </div>

              {/* Metacognitive Calibration Badge */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-3 self-start md:self-auto">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Calibration Status</div>
                  <div className="text-sm font-black text-slate-900">Highly Calibrated (4% Gap)</div>
                  <div className="text-[10px] text-slate-500">Confidence aligns with accuracy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Lifetime Learning Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {statBadges.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                >
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center mb-2 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-950">{stat.value}</div>
                    <div className="text-[10px] font-semibold text-slate-500 mt-0.5 leading-tight">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2-Column Split: Personal Information Left, Preferences & Security Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT 7 COLS: Personal Information & Academics */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSave} className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    <span>Personal & Academic Information</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update your details to calibrate personalized course recommendations.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium"
                    />
                  </div>

                  {/* Branch */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Branch / Specialization
                    </label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium"
                    />
                  </div>

                  {/* Year */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Academic Year
                    </label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year / Final</option>
                    </select>
                  </div>

                  {/* College */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      College / Institute
                    </label>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {savedSuccess ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Profile updated successfully!</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Changes automatically synchronize with revision models.
                    </span>
                  )}

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>

              {/* Study Subject Interests */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Enrolled Knowledge Tracks</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Data Structures & Algorithms", topics: 12, mastery: "82%", color: "border-emerald-200 bg-emerald-50/50" },
                    { name: "Database Management Systems", topics: 8, mastery: "68%", color: "border-indigo-200 bg-indigo-50/50" },
                    { name: "Operating Systems", topics: 10, mastery: "74%", color: "border-blue-200 bg-blue-50/50" },
                    { name: "Computer Networks", topics: 9, mastery: "60%", color: "border-purple-200 bg-purple-50/50" }
                  ].map((sub) => (
                    <div key={sub.name} className={`p-3.5 rounded-2xl border ${sub.color} flex items-center justify-between`}>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{sub.name}</div>
                        <div className="text-[10px] text-slate-500">{sub.topics} Topics Covered</div>
                      </div>
                      <span className="text-xs font-black text-slate-950">{sub.mastery}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: Learning Preferences & Security */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Learning Preferences */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-5">
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <span>Retention Engine Preferences</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Daily Learning Goal
                    </label>
                    <select
                      value={dailyTarget}
                      onChange={(e) => setDailyTarget(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-800 font-medium"
                    >
                      <option>1 Quiz / Day (Light)</option>
                      <option>3 Quizzes / Day (Recommended)</option>
                      <option>5 Quizzes / Day (Intensive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Target Retention Floor
                    </label>
                    <select
                      value={retentionTarget}
                      onChange={(e) => setRetentionTarget(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-800 font-medium"
                    >
                      <option>70% Baseline (Standard)</option>
                      <option>80% Baseline (High Retention)</option>
                      <option>90% Baseline (Mastery Focus)</option>
                    </select>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 font-medium">Daily Revision Reminders</span>
                      <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-slate-700 font-medium">Forgetting Risk Early Warnings</span>
                      <input
                        type="checkbox"
                        checked={spacedAlerts}
                        onChange={(e) => setSpacedAlerts(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 accent-indigo-600"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Account Security & Actions */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Account & Security</span>
                </h3>

                <div className="space-y-2 text-xs">
                  <button className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold flex items-center justify-between border border-slate-200 transition-colors">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Change Password</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <a
                    href="/login"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-red-50 hover:bg-red-100/80 text-red-600 font-semibold flex items-center justify-between border border-red-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out from RecallIQ</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Footer */}
          <DashboardFooter />

        </main>
      </div>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}