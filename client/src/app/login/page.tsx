"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  BookOpen,
  LineChart,
  Target,
  CheckCircle2
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

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
          <span className="text-slate-500">New here?</span>
          <Link
            href="/register"
            className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-white transition-colors"
          >
            Create account
          </Link>
        </div>
      </header>

      {/* Main Split Container */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 max-w-md mx-auto w-full"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Log in to <br />
            <span className="text-indigo-600">RecallIQ</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Continue your learning journey and keep building a stronger you.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
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
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="font-medium">Remember me</span>
              </label>

              <Link href="#" className="font-semibold text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] disabled:opacity-70"
            >
              <span>{loading ? "Authenticating..." : "Log in"}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Divider */}
            <div className="relative my-5 text-center">
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
                  className="py-2.5 px-3 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <span className="font-bold text-slate-900 text-[11px]">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>

          </form>

          {/* Quote Footnote */}
          <div className="mt-8 text-xs text-slate-400 font-handwriting italic">
            &ldquo;Small steps today, better retention tomorrow.&rdquo;
          </div>

        </motion.div>


        {/* RIGHT COLUMN: Moody Dark Studio Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-6 hidden lg:block"
        >
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 sm:p-10 text-white shadow-2xl overflow-hidden min-h-[560px] flex flex-col justify-between">
            
            {/* Ambient Background Lights */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />

            {/* Top Text */}
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                A more mindful way <br />to learn
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Track. Understand. Retain. RecallIQ helps you learn smarter with AI-powered insights.
              </p>
            </div>

            {/* Center Graphic: Ambient study scene mockup with laptop & book stack */}
            <div className="my-6 relative z-10 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 backdrop-blur-xl flex items-center justify-between gap-6">
              
              <div className="space-y-2 text-xs">
                <div className="px-3 py-1.5 rounded-lg bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 font-medium">
                  📚 Learn &middot; Practice &middot; Revise
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-blue-900/60 border border-blue-700/50 text-blue-300 font-medium">
                  💡 Better Students, Brighter Futures
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-center shadow-lg">
                <div className="text-xs font-bold text-slate-300">RecallIQ Engine</div>
                <div className="text-indigo-400 text-sm font-black mt-1">Good ideas last longer.</div>
              </div>

            </div>

            {/* Bottom 3 Badges */}
            <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-center text-xs">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400">Personalized Learning</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-400">
                  <LineChart className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400">Retention Insights</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-purple-400">
                  <Target className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-slate-400">Achieve More</span>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 text-center text-[11px] text-slate-500 mt-3">
              Join thousands of learners building a better tomorrow.
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
