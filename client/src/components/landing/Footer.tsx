"use client";

import React from "react";
import Link from "next/link";
import { Brain } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Brain className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Recall<span className="text-indigo-600">IQ</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 font-medium">
              Learn today. Remember tomorrow.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-semibold text-slate-600">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Product</Link>
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</Link>
            <Link href="#analytics" className="hover:text-indigo-600 transition-colors">Analytics</Link>
            <Link href="#faq" className="hover:text-indigo-600 transition-colors">About</Link>
            <Link href="#faq" className="hover:text-indigo-600 transition-colors">Contact</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors text-xs font-medium">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors text-xs font-medium">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors text-xs font-medium">Twitter</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors text-xs font-medium">YouTube</a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 RecallIQ. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Metacognitive Research</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
