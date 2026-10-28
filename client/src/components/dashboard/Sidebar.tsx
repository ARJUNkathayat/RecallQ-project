"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Brain,
  Layers,
  BookOpen,
  RefreshCw,
  BarChart3,
  User,
  ArrowRight,
  Target,
  Code2,
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export default function Sidebar({ onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Layers },
    { name: "Adaptive Quiz", href: "/quiz/dynamic?topic=Linked%20List&confidence=75&count=20", icon: Target },
    { name: "Code & DSA Audit", href: "/analyzer", icon: Code2, badge: "AI" },
    { name: "Subjects", href: "/subjects", icon: BookOpen },
    { name: "Revision", href: "/revision", icon: RefreshCw },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Profile", href: "/profile", icon: User }
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between select-none">
      
      {/* Top Brand */}
      <div>
        <Link href="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base text-slate-900 tracking-tight flex items-center">
              Recall<span className="text-indigo-600">IQ</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-medium tracking-tight">
              Remember More. Forget Less.
            </span>
          </div>
        </Link>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                <span className="flex-1">{item.name}</span>

                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-md bg-indigo-50 text-indigo-700 text-[9px] font-black border border-indigo-200/80">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute right-2 w-1.5 h-4 bg-indigo-600 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Scenic Card & Quote */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        
        {/* Scenic Landscape Card */}
        <Link
          href="/quiz/binary-trees"
          className="block relative rounded-2xl overflow-hidden p-4 bg-gradient-to-br from-indigo-100 via-sky-50 to-blue-100 border border-indigo-200/60 shadow-xs group cursor-pointer"
        >
          <div className="relative z-10">
            <p className="text-xs font-bold text-slate-800 leading-snug">
              Small steps today, better retention tomorrow.
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-bold text-indigo-700 shadow-2xs group-hover:translate-x-0.5 transition-transform">
              <span>Start Calibration</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </Link>

        {/* Inspirational Quote */}
        <div className="text-[11px] text-slate-400 font-handwriting italic px-1">
          &ldquo;The expert in anything was once a beginner.&rdquo; <br />
          <span className="text-[10px] text-slate-400 not-italic">— Helen Hayes</span>
        </div>

      </div>

    </aside>
  );
}