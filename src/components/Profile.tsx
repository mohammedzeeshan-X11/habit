import React, { useState } from "react";
import { User, Award, Flame, RefreshCw, LogOut, CheckCircle, GraduationCap, ChevronRight, Activity } from "lucide-react";
import { UserProfile } from "../types";

interface ProfileProps {
  profile: UserProfile;
  onLogout: () => void;
  onResetData: () => Promise<void>;
}

export default function Profile({ profile, onLogout, onResetData }: ProfileProps) {
  const [isResetting, setIsResetting] = useState(false);
  const [resetFinished, setResetFinished] = useState(false);

  const handleResetClick = async () => {
    setIsResetting(true);
    try {
      await onResetData();
      setResetFinished(true);
      setTimeout(() => setResetFinished(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div id="profile-container" className="space-y-6 font-sans">
      
      {/* Profile Header Block */}
      <div id="profile-card-header" className="bg-gradient-to-br from-teal-800 to-[#2E7D6B] rounded-3xl p-6 text-white relative overflow-hidden shadow-md">
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500 rounded-full blend-multiply filter blur-xl opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-white rounded-full blend-overlay filter blur-xl opacity-15 -translate-x-1/3 translate-y-1/3"></div>

        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
          {/* Avatar sphere */}
          <div className="w-18 h-18 bg-white/20 border-2 border-white/60 text-white font-bold text-2xl rounded-full flex items-center justify-center shadow-lg select-none">
            {profile.name.split(" ").map(w => w[0]).join("")}
          </div>

          <div className="text-center sm:text-left space-y-1 flex-1">
            <h2 className="text-xl font-bold tracking-tight">{profile.name}</h2>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-teal-100 font-medium">
              <GraduationCap className="w-4 h-4 shrink-0 text-amber-300" />
              <span>{profile.role}</span>
            </div>
            <p className="text-[10px] text-teal-100 font-mono">
              {profile.institution} • Joined: {profile.joinedDate}
            </p>
          </div>

          <button 
            onClick={onLogout}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10 shrink-0 cursor-pointer flex items-center gap-1 text-xs font-semibold"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Habits Stats Overview Block (Chapter 5.3 Figure 5.3 Match) */}
      <div id="stats-overview" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
          <Activity className="w-4.5 h-4.5 text-teal-600" /> Habit Stats Overview
        </h3>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase block leading-tight">Total Tracked</span>
            <span className="font-bold text-slate-800 text-lg font-mono block mt-1">{profile.totalHabitsTracked}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase block leading-tight">Completion Rate</span>
            <span className="font-bold text-[#2E7D6B] text-lg font-mono block mt-1">{profile.averageCompletionRate}%</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 uppercase block leading-tight">Longest Streak</span>
            <span className="font-bold text-[#FF8A3D] text-lg font-mono block mt-1">{profile.longestStreak}d</span>
          </div>
        </div>
      </div>

      {/* Badges & Achievements lists */}
      <div id="achievements-section" className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 font-sans">
          <Award className="w-4.5 h-4.5 text-yellow-500" /> Unlockable Achievements
        </h3>

        <div className="space-y-2">
          {profile.achievements.map((achievement, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-all text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm select-none">🏆</span>
                <span className="font-bold text-slate-700">{achievement}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-0.5">
                <CheckCircle className="w-3 h-3 text-emerald-500" /> ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Academic / Sandbox Project reset controller */}
      <div id="sandbox-reset-controller" className="bg-slate-50 rounded-3xl p-5 border border-slate-100 space-y-3.5">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
            Academic Project Controls
          </h4>
          <p className="text-[11px] text-slate-500 leading-normal mt-1">
            Need to reset completion history for university project logs and demonstration streaks? Try restoring the default mock datasets below.
          </p>
        </div>

        <button
          onClick={handleResetClick}
          disabled={isResetting}
          className={`w-full py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all ${
            resetFinished 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
              : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? "RESTORING ENDPOINTS..." : resetFinished ? "RESTORE SUCCESS!" : "RESTORE SEED DATA"}</span>
        </button>
      </div>

    </div>
  );
}
