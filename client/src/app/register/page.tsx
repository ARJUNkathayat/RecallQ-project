"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronDown
} from "lucide-react";

const interestsList = [
  "DSA",
  "Web Development",
  "DBMS",
  "AI/ML",
  "Operating Systems",
  "Other"
];

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [year, setYear] = useState("3rd Year");
  const [branch, setBranch] = useState("CSE");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["DSA"]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (item: string) => {
    if (selectedInterests.includes(item)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== item));
    } else {
      setSelectedInterests([...selectedInterests, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans antialiased">
      
      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-base text-slate-900 tracking-tight">RecallIQ</span>
            <span className="block text-[10px] text-slate-400 font-medium">Remember More. Forget Less.</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Already have an account?</span>
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-white transition-colors"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Main Split Container */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 max-w-lg mx-auto w-full"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get started</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Create your <br />
            <span className="text-indigo-600">account</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Join RecallIQ and start your personalized learning journey.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Arjun Kathayat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="arjun@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
                />
              </div>
            </div>

            {/* Password & Confirm Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Year & Branch Dropdowns */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Year (Optional)
                </label>
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Branch (Optional)
                </label>
                <div className="relative">
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-700 font-medium"
                  >
                    <option>CSE</option>
                    <option>IT</option>
                    <option>ECE</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Interests Multi-Select Chips */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
                What are you interested in? (Optional)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {interestsList.map((item) => {
                  const isSelected = selectedInterests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-indigo-600 text-white shadow-2xs"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-70"
            >
              <span>{loading ? "Creating Account..." : "Create account"}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-slate-50 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Google", icon: "G" },
                { name: "GitHub", icon: "GH" },
                { name: "Microsoft", icon: "MS" }
              ].map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => { window.location.href = "/dashboard"; }}
                  className="py-2 px-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <span className="font-bold text-slate-900 text-[11px]">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

            {/* Terms note */}
            <p className="text-[10px] text-slate-400 text-center mt-3">
              By creating an account, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>

          </form>

        </motion.div>


        {/* RIGHT COLUMN: Morning Mountain Journey Showcase Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 hidden lg:block"
        >
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-sky-100/90 via-indigo-50/70 to-slate-100/90 border border-slate-200/90 p-8 sm:p-10 text-slate-900 shadow-xl overflow-hidden min-h-[580px] flex flex-col justify-between">
            
            {/* Top Handwritten Note */}
            <div className="text-xs font-handwriting text-slate-500 italic">
              &ldquo;Same effort. A smarter you.&rdquo;
            </div>

            {/* Headline & 4 Feature Bullets */}
            <div className="my-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Build better learning habits <br />with RecallIQ
              </h2>

              <div className="mt-6 space-y-3">
                {[
                  "Track your progress",
                  "Get personalized insights",
                  "Know what to revise",
                  "Improve long-term retention"
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustration Viewpoint Card (Student looking forward) */}
            <div className="p-5 rounded-3xl bg-white/80 border border-slate-200/80 backdrop-blur-md shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">A Smarter You Ahead</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Continuous metacognitive calibration.</div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                ↗
              </div>
            </div>

            {/* Bottom 3 Metrics */}
            <div className="pt-4 border-t border-slate-200/60 grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-black text-slate-950">10K+</div>
                <div className="text-[10px] font-medium text-slate-500">Active Learners</div>
              </div>
              <div>
                <div className="text-lg font-black text-slate-950">4.8★</div>
                <div className="text-[10px] font-medium text-slate-500">User Rating</div>
              </div>
              <div>
                <div className="text-lg font-black text-slate-950">95%</div>
                <div className="text-[10px] font-medium text-slate-500">Feel More Confident</div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-2">
        © 2026 RecallIQ. All rights reserved.
      </footer>

    </div>
  );
}
