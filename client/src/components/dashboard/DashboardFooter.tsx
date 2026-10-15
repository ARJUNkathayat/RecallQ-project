"use client";

import React from "react";
import Link from "next/link";
import { Brain, Heart } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer className="mt-12 py-6 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
          <Brain className="w-3 h-3" />
        </div>
        <span className="font-bold text-slate-800">RecallIQ</span>
        <span>&middot; Adaptive Knowledge-Retention Platform</span>
      </div>

      <div className="flex items-center gap-6 text-[11px] text-slate-500 font-medium">
        <Link href="/analytics" className="hover:text-indigo-600 transition-colors">Analytics</Link>
        <Link href="/revision" className="hover:text-indigo-600 transition-colors">Revision Queue</Link>
        <Link href="/subjects" className="hover:text-indigo-600 transition-colors">Subjects Catalog</Link>
        <Link href="/" className="hover:text-indigo-600 transition-colors">Public Site</Link>
      </div>

      <div className="text-[11px] text-slate-400">
        &copy; 2026 RecallIQ. Built with precision.
      </div>
    </footer>
  );
}
