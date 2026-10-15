"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import StatCards from "@/components/dashboard/StatCards";
import RetentionChart from "@/components/dashboard/RetentionChart";
import ConfidenceInsight from "@/components/dashboard/ConfidenceInsight";
import TopicsAtRisk from "@/components/dashboard/TopicsAtRisk";
import UpcomingRevision from "@/components/dashboard/UpcomingRevision";
import RightPanel from "@/components/dashboard/RightPanel";
import StudyBanner from "@/components/dashboard/StudyBanner";
import SearchModal from "@/components/dashboard/SearchModal";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function DashboardPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/70 flex font-sans antialiased text-slate-900">
      
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay & Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-64 bg-white h-full shadow-2xl z-10"
            >
              <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Global Header */}
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Greeting Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
                <span>Good morning, Arjun</span>
                <span className="text-xl sm:text-2xl">👏</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Here&apos;s your learning and retention overview.
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs self-start sm:self-auto">
              Thu, 18 Sep 2026
            </div>
          </div>

          {/* 4 Top Stat Cards */}
          <StatCards />

          {/* Main Dashboard Grid + Right Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 8-9 Cols: Charts & Topic Cards */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Row 1: Retention Overview + Confidence Insight */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <RetentionChart />
                </div>
                <div className="md:col-span-5">
                  <ConfidenceInsight />
                </div>
              </div>

              {/* Row 2: Topics at Risk + Upcoming Revision */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7">
                  <TopicsAtRisk />
                </div>
                <div className="md:col-span-5">
                  <UpcomingRevision />
                </div>
              </div>

              {/* Bottom Wide Banner */}
              <StudyBanner />

            </div>

            {/* Right 4 Cols: Quick Actions & Recent Activity */}
            <div className="lg:col-span-4 space-y-6">
              <RightPanel />
            </div>

          </div>

          {/* Full Dashboard Footer */}
          <DashboardFooter />

        </main>
      </div>

      {/* Global Search Dialog Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

    </div>
  );
}
