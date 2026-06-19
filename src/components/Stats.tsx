import React, { useState } from "react";
import { Award, Zap, TrendingUp, Calendar, CalendarCheck, BarChart2, Smile } from "lucide-react";
import { Habit } from "../types";

interface StatsProps {
  habits: Habit[];
}

export default function Stats({ habits }: StatsProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // M, T, W, T, F, S, S completion rates for the last week
  const weekDays = [
    { label: "M", rating: 65, completed: 3, total: 4 },
    { label: "T", rating: 90, completed: 4, total: 4 },
    { label: "W", rating: 50, completed: 2, total: 4 },
    { label: "T", rating: 80, completed: 4, total: 5 },
    { label: "F", rating: 75, completed: 3, total: 4 },
    { label: "S", rating: 30, completed: 1, total: 4 },
    { label: "S", rating: 85, completed: 3, total: 4 }
  ];

  // Dynamic calculations based on active habits
  const activeCount = habits.filter(h => h.isActive).length;
  const completedTodayCount = habits.filter(h => h.isCompletedToday).length;
  const averageRate = activeCount > 0 ? Math.round((completedTodayCount / activeCount) * 100) : 0;
  
  // Outstanding best streak across all habits
  const overallBestStreak = habits.reduce((max, h) => h.streakBest > max ? h.streakBest : max, 0);

  // Preset badges from Chapter 8.3/2.4
  const availableBadges = [
    {
      id: "b1",
      name: "7-Day Streak",
      description: "Maintained a habit for 7 consecutive days",
      iconName: "🔥",
      unlocked: overallBestStreak >= 7,
      hint: "Requires a 7-day best streak"
    },
    {
      id: "b2",
      name: "30-Day Streak",
      description: "Exceptional consistency for a full month",
      iconName: "👑",
      unlocked: overallBestStreak >= 30,
      hint: "Requires a 30-day best streak"
    },
    {
      id: "b3",
      name: "Early Bird",
      description: "Marked a habit complete before 8:00 AM",
      iconName: "🌅",
      unlocked: true, // preconfigured for Alex/Zeeshan
      hint: "Unlocked automatically"
    },
    {
      id: "b4",
      name: "Habit Master",
      description: "Tracked and kept 5+ habits active at once",
      iconName: "💡",
      unlocked: habits.length >= 5,
      hint: "Have 5 active habits in list"
    }
  ];

  return (
    <div id="stats-view-container" className="space-y-6 font-sans">
      
      {/* 1. Header and Quick Metrics Row */}
      <div id="stats-header" className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-sans">My Progress</h2>
          <p className="text-xs text-slate-400 font-light mt-0.5">Slight daily gains compound massively</p>
        </div>
        <div className="bg-teal-50 text-[#2E7D6B] px-3.5 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 border border-teal-100">
          <TrendingUp className="w-4 h-4" />
          <span>Active Tracking</span>
        </div>
      </div>

      {/* 2. Visual Weekly Completion Card (Chapter 6.4 Wireframe Match) */}
      <div id="weekly-completion-card" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-sans">
          <CalendarCheck className="w-4.5 h-4.5 text-teal-600" /> Weekly Completion Stats
        </h3>

        {/* Custom High-Fidelity SVG Bar Chart */}
        <div className="bg-purple-50/5 hover:bg-slate-50/50 p-4 rounded-2xl border border-slate-100 transition-all">
          <div className="flex justify-between items-end h-40 pt-4 px-2 select-none">
            {weekDays.map((day, idx) => {
              // Scale bar height
              const barHeightPct = day.rating;
              return (
                <div 
                  key={day.label} 
                  className="flex flex-col items-center flex-1 cursor-pointer group"
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="h-full w-full flex items-end justify-center relative px-2 sm:px-4">
                    {/* Tooltip on Hover */}
                    {hoveredBar === idx && (
                      <div className="absolute bottom-full mb-2 bg-[#2D7C6A] text-white text-[10px] py-1.5 px-3 rounded-lg shadow-md z-10 whitespace-nowrap animate-fadeIn font-mono">
                        <div className="font-bold">{day.completed}/{day.total} Done</div>
                        <div>{day.rating}% Rate</div>
                      </div>
                    )}
                    {/* Bar graphic */}
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 ease-out ${
                        hoveredBar === idx 
                          ? "bg-[#FF8A3D] opacity-100" 
                          : "bg-[#2E7D6B] opacity-80 group-hover:opacity-100"
                      }`}
                      style={{ height: `${barHeightPct}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 mt-2 font-sans">{day.label}</span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 text-center text-xs text-slate-500 divide-x divide-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Weekly Average</span>
              <span className="font-bold text-slate-800 text-sm font-mono">70% Rate</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Most Active Day</span>
              <span className="font-bold text-[#2E7D6B] text-sm">Tuesday (90%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Habit-Wise Streaks Board */}
      <div id="habit-wise-streaks" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-sans">
          <Zap className="w-4.5 h-4.5 text-amber-500" /> Active Habit Streaks
        </h3>

        <div className="space-y-2.5">
          {habits.map((habit) => (
            <div 
              key={habit.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-100 transition-all text-xs font-sans"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base select-none">
                  {habit.category === 'Health' ? '🥛' : habit.category === 'Study' ? '📚' : habit.category === 'Mind' ? '🧘' : '🏃'}
                </span>
                <div>
                  <h4 className="font-bold text-slate-700">{habit.name}</h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">{habit.frequency} • {habit.reminderTime}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#2E7D6B] font-mono text-sm">{habit.streakCurrent} days</div>
                <div className="text-[9px] text-slate-400 font-light">best: {habit.streakBest} days</div>
              </div>
            </div>
          ))}

          {habits.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-xs">
              < Smile className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span>No habits registered yet. Navigate to Add to list some.</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. Badges & Game Rewards (Chapter 8.2 / Chapter 2.4 Details) */}
      <div id="badges-earned-card" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 font-sans">
          <Award className="w-4.5 h-4.5 text-[#FF8A3D]" /> Badges & Mile Rewards
        </h3>

        <div className="grid grid-cols-2 gap-3.5">
          {availableBadges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-4 rounded-2xl border text-center relative group transition-all duration-300 ${
                badge.unlocked 
                  ? "bg-amber-50/15 border-amber-100 hover:shadow-md" 
                  : "bg-slate-50/80 border-slate-100 opacity-60"
              }`}
            >
              {/* Unlock Indicator */}
              <div className="absolute top-2.5 right-2.5">
                <span className={`text-[9px] py-0.5 px-1.5 font-bold font-mono rounded ${
                  badge.unlocked ? "bg-amber-100 text-amber-800" : "bg-slate-200 text-slate-400"
                }`}>
                  {badge.unlocked ? "UNLOCKED" : "LOCKED"}
                </span>
              </div>

              {/* Badge Visual Emoji Circle */}
              <div className={`w-11 h-11 rounded-full mx-auto my-2 flex items-center justify-center text-xl shadow-inner border transition-all group-hover:scale-110 ${
                badge.unlocked 
                  ? "bg-amber-100 border-amber-200 text-amber-900" 
                  : "bg-slate-200 border-slate-300 text-slate-400"
              }`}>
                {badge.iconName}
              </div>

              <div className="text-xs font-bold text-slate-700 mt-1">{badge.name}</div>
              <p className="text-[10px] text-slate-400 leading-normal mt-0.5">{badge.description}</p>
              
              <div className="text-[9px] font-mono text-slate-400/90 mt-2 block border-t border-black/5 pt-1.5">
                {badge.hint}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
