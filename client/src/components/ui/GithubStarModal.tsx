"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Sparkles, Heart, ExternalLink } from "lucide-react";

export default function GithubStarModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show after 1.2 seconds if not dismissed in current session
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem("recallq_github_star_seen");
      if (!isDismissed) {
        setIsOpen(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("recallq_github_star_seen", "true");
    setIsOpen(false);
  };

  const handleOpenGithub = () => {
    sessionStorage.setItem("recallq_github_star_seen", "true");
    window.open("https://github.com/ARJUNkathayat", "_blank");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-2 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative p-1 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          >
            {/* Inner Core */}
            <div className="p-5 rounded-[calc(1.5rem-0.125rem)] bg-slate-950 text-white border border-slate-800/80 backdrop-blur-xl">
              
              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header with Avatar & Badge */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 p-0.5 shadow-lg">
                    <div className="w-full h-full rounded-[0.9rem] bg-slate-900 flex items-center justify-center font-black text-indigo-400 text-sm">
                      AK
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-extrabold text-white">Arjun Kathayat</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                      Author
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Creator of RecallIQ</p>
                </div>
              </div>

              {/* Message */}
              <p className="text-xs text-slate-300 leading-relaxed">
                Enjoying the <span className="text-white font-bold">RecallIQ</span> experience? Star the project repository and check out my GitHub profile for more engineering builds!
              </p>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={handleOpenGithub}
                  className="flex-1 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-indigo-600/30 transition-all active:scale-[0.98]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>Star on GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </button>

                <button
                  onClick={handleDismiss}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors"
                >
                  Later
                </button>
              </div>

              {/* Mini Footer */}
              <div className="mt-2.5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-current" />
                <span>for modern learners</span>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}