"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  User as UserIcon,
  Settings,
  Sparkles
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export default function Header({ onOpenSearch, onToggleMobileMenu }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    year?: string;
    branch?: string;
  }>({
    name: "Arjun Kathayat",
    email: "arjun@example.com",
    year: "3rd Year",
    branch: "CSE",
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recallq_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name) {
          setCurrentUser({
            name: u.name,
            email: u.email || "student@recallq.io",
            year: u.year || "3rd Year",
            branch: u.branch || "CSE",
          });
        }
      }
    } catch (e) {}
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("recallq_token");
      localStorage.removeItem("recallq_user");
    } catch (e) {}
    window.location.href = "/login";
  };

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "AQ";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
      
      {/* Mobile Toggle + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar Input / Trigger */}
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-xs text-slate-400 transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-medium">Search topics, subjects...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-white border border-slate-200 rounded-lg shadow-2xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Notification Bell */}
        <button
          onClick={() => setHasNotifications(false)}
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/60 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </button>

        {/* User Profile Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {initials}
            </div>

            <div className="hidden sm:block text-left leading-tight">
              <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 font-medium">{currentUser.year} &middot; {currentUser.branch}</div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl p-2 shadow-xl z-50 text-xs"
              >
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-400">{currentUser.email}</p>
                </div>

                <div className="py-1 space-y-0.5">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/analytics"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Retention Insights</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-red-600 hover:bg-red-50 font-medium text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </header>
  );
}
