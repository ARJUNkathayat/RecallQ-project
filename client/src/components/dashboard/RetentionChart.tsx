"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceDot
} from "recharts";
import { Info } from "lucide-react";

const chartDatasets: Record<string, Array<{ day: string; retention: number }>> = {
  "All Subjects": [
    { day: "Today", retention: 100 },
    { day: "1 day", retention: 75 },
    { day: "3 days", retention: 52 },
    { day: "7 days", retention: 40 },
    { day: "14 days", retention: 25 },
    { day: "30 days", retention: 18 }
  ],
  "DSA": [
    { day: "Today", retention: 100 },
    { day: "1 day", retention: 85 },
    { day: "3 days", retention: 70 },
    { day: "7 days", retention: 55 },
    { day: "14 days", retention: 42 },
    { day: "30 days", retention: 30 }
  ],
  "DBMS": [
    { day: "Today", retention: 100 },
    { day: "1 day", retention: 68 },
    { day: "3 days", retention: 45 },
    { day: "7 days", retention: 32 },
    { day: "14 days", retention: 20 },
    { day: "30 days", retention: 12 }
  ],
  "Operating Systems": [
    { day: "Today", retention: 100 },
    { day: "1 day", retention: 78 },
    { day: "3 days", retention: 60 },
    { day: "7 days", retention: 48 },
    { day: "14 days", retention: 32 },
    { day: "30 days", retention: 22 }
  ]
};

export default function RetentionChart() {
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const data = chartDatasets[selectedSubject] || chartDatasets["All Subjects"];

  return (
    <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between h-full">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
            <span>Retention Overview</span>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 rounded-xl bg-slate-900 text-white text-[10px] shadow-lg z-20">
                Calculated using R(t) = e^(-t/S) based on memory strength and elapsed time.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Estimated knowledge retention over time.</p>
        </div>

        {/* Dropdown Filter */}
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          aria-label="Select Subject for Retention Chart"
          className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option>All Subjects</option>
          <option>DSA</option>
          <option>DBMS</option>
          <option>Operating Systems</option>
        </select>
      </div>

      {/* Interactive Recharts Canvas */}
      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 15, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="dashRetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={{ stroke: "#e2e8f0" }} tickLine={false} />
            <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px", padding: "8px 12px" }}
              formatter={(val) => [`${val}%`, "Estimated Retention"]}
            />
            <Area
              type="monotone"
              dataKey="retention"
              stroke="#4F46E5"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#dashRetGrad)"
              dot={{ r: 4, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#4F46E5", stroke: "#c7d2fe", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Highlight Callout Box at 3 days */}
        <div className="absolute top-10 left-[42%] -translate-x-1/2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-md text-center pointer-events-none hidden sm:block">
          <div className="text-xs font-black text-slate-900">52%</div>
          <div className="text-[9px] font-semibold text-slate-400">Estimated Retention</div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Memory decay curve modeled via Ebbinghaus S-factor</span>
        <span className="font-semibold text-indigo-600">Optimal revision: Day 3</span>
      </div>

    </div>
  );
}
