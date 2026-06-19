import React, { useState, useEffect } from "react";
import { 
  Check, 
  Plus, 
  Trash2, 
  Calendar, 
  Zap, 
  ChevronRight, 
  Home as HomeIcon, 
  BarChart2, 
  PlusCircle, 
  User, 
  BookOpen,
  X,
  Sparkles,
  RefreshCw,
  GraduationCap
} from "lucide-react";
import { Habit, UserProfile } from "./types";
import Login from "./components/Login";
import CompanionPanel from "./components/CompanionPanel";
import AddHabit from "./components/AddHabit";
import Stats from "./components/Stats";
import Profile from "./components/Profile";

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'stats' | 'add' | 'profile' | 'academic'>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAcademicIntro, setShowAcademicIntro] = useState(true);

  // Load user from local storage on mount if exists
  useEffect(() => {
    const savedUser = localStorage.getItem("ht_logged_in_user");
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  // Fetch habits and profile from our Express backend API
  const fetchData = async () => {
    if (!currentUser) return;
    setIsRefreshing(true);
    try {
      const hResponse = await fetch("/api/habits");
      if (hResponse.ok) {
        const hData = await hResponse.json();
        setHabits(hData);
      }

      const pResponse = await fetch("/api/profile");
      if (pResponse.ok) {
        const pData = await pResponse.json();
        
        // Dynamically override local profile name if user logged in as someone else (Anjali, Ravi)
        const updatedProfile = { ...pData };
        if (currentUser && currentUser !== "Mohammed Zeeshan") {
          updatedProfile.name = currentUser;
          updatedProfile.usn = currentUser === "Ravi Kumar" ? "N/A (Industry Guest)" : "1VA24IS002";
          updatedProfile.role = currentUser === "Ravi Kumar" ? "Working Professional - Developer" : "2nd Year B.E. Student - ISE";
          updatedProfile.achievements = currentUser === "Ravi Kumar" 
            ? ["Night Owl", "Code Sprint Champion", "Early Bird"] 
            : ["Study Gladiator", "Serenity Now", "7-Day Streak"];
        }
        setUserProfile(updatedProfile);
      }
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching project API data:", error);
      setErrorMessage("API offline or slow to sync. Visual simulation is running locally.");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    localStorage.setItem("ht_logged_in_user", username);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ht_logged_in_user");
    setHabits([]);
    setUserProfile(null);
  };

  // APIs handles
  const handleToggleHabit = async (id: string) => {
    try {
      // Optimistic state update
      setHabits(prev => prev.map(h => {
        if (h.id === id) {
          const isCompleted = !h.isCompletedToday;
          const streakCurrent = isCompleted ? h.streakCurrent + 1 : Math.max(0, h.streakCurrent - 1);
          return {
            ...h,
            isCompletedToday: isCompleted,
            streakCurrent
          };
        }
        return h;
      }));

      const res = await fetch(`/api/habits/${id}/toggle`, {
        method: "POST"
      });
      if (res.ok) {
        // Refetch to sync actual streak counts
        const updatedHabit = await res.json();
        setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateHabit = async (habitData: Omit<Habit, "id" | "isActive" | "streakCurrent" | "streakBest" | "isCompletedToday" | "completedDates">) => {
    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData)
      });
      if (res.ok) {
        await fetchData();
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const handleDeleteHabit = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card touch events
    if (!confirm("Are you sure you want to remove this habit from your checklist?")) return;
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setHabits(prev => prev.filter(h => h.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetData = async () => {
    try {
      const res = await fetch("/api/reset", {
        method: "POST"
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Get current date representation matching Page 18 screenshot "Thu, 19 June 2026"
  const getTodayDateString = () => {
    const d = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayName = days[d.getDay()];
    const dateNum = d.getDate();
    const monthName = months[d.getMonth()];
    const yearNum = d.getFullYear();
    return `${dayName}, ${dateNum} ${monthName} ${yearNum}`;
  };

  if (isLoading) {
    return (
      <div id="loader-screen" className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#2E7D6B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-500 font-mono">Initializing Academic Prototype Sandbox...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const activeHabits = habits.filter(h => h.isActive);
  const currentStreakVal = habits.reduce((max, h) => h.streakCurrent > max ? h.streakCurrent : max, 0);
  const maxStreakVal = habits.reduce((max, h) => h.streakBest > max ? h.streakBest : max, 0);

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-teal-100 selection:text-teal-900">
      
      {/* 1. Academic Showcase Ribbon header (Perfect for project presentation!) */}
      {showAcademicIntro && (
        <div id="academic-intro-ribbon" className="bg-[#1e5246] text-white py-3 px-4 text-xs font-sans border-b border-teal-800/20 relative z-40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="bg-amber-400 text-[#1e5246] px-1.5 py-0.5 font-bold rounded font-mono text-[9px] uppercase">
                V-SEM LAB PROTOTYPE
              </span>
              <span>
                Mini Project: <span className="font-bold underline">Daily Habit Tracker & Productivity App</span> by <span className="font-bold text-amber-300">Mohammed Zeeshan (1VA24IS059)</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setActiveTab('academic'); }}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 hover:text-white rounded text-[10px] font-bold border border-white/20 transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Show Presentation Slides</span>
              </button>
              <button
                onClick={() => setShowAcademicIntro(false)}
                className="p-1 text-teal-200 hover:text-white rounded hover:bg-white/5 transition-all cursor-pointer"
                title="Hide details info banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top Navigation Bar with app logo and logged-in status */}
      <header id="main-header" className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-[#2E7D6B] text-white rounded-xl font-bold flex items-center justify-center shadow-md select-none text-base">
              HT
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">Habit Tracker</h1>
              <p className="text-[10px] text-slate-400 font-light font-mono select-none">UI/UX (BCS456C) mini prototype</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Sync Status Button */}
            {activeTab !== 'academic' && (
              <button 
                onClick={fetchData}
                disabled={isRefreshing}
                className="p-2 hover:bg-slate-50 text-slate-400 hover:text-[#2E7D6B] rounded-xl transition-all cursor-pointer"
                title="Refresh endpoint database"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#2E7D6B]' : ''}`} />
              </button>
            )}

            {/* Quick Profile Widget with account swapper */}
            <div 
              onClick={() => setActiveTab('profile')} 
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-1 px-2.5 rounded-2xl cursor-pointer transition-all border border-slate-100 select-none group"
            >
              <div className="w-6.5 h-6.5 bg-[#FF8A3D] text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                {currentUser.split(" ").map(w => w[0]).join("")}
              </div>
              <span className="text-xs font-semibold text-slate-600 hidden md:inline group-hover:text-slate-800 transition-colors">
                {currentUser}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Primary Full-Stack Page Body */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-24">
        
        {errorMessage && (
          <div className="bg-amber-50 text-amber-800 p-3.5 rounded-2xl border border-amber-200/50 mb-6 text-xs flex justify-between items-center gap-2">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="font-bold underline text-amber-900 cursor-pointer text-[10px]">DISMISS</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Interactive Screen Segment */}
          <div id="interactive-screen-panel" className="lg:col-span-12 xl:col-span-8 space-y-6">
            
            {/* Home Checklist tab */}
            {activeTab === 'home' && (
              <div id="screen-home" className="space-y-6">
                
                {/* Greeting banner (Chapter 6.2 Wireframe Match) */}
                <div id="greeting-banner" className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 font-sans">Hello, {currentUser.split(" ")[0]}</h2>
                    <p className="text-xs text-slate-400 font-light mt-0.5">{getTodayDateString()}</p>
                  </div>
                  {/* Floating Academic USN on Mobile */}
                  {currentUser === "Mohammed Zeeshan" && (
                    <span className="bg-teal-50 text-[#2E7D6B] px-3.5 py-1.5 rounded-2xl text-[10px] font-bold border border-teal-100 md:hidden">
                      USN: 1VA24IS059
                    </span>
                  )}
                </div>

                {/* Combined Streak Board metrics (Figure 8.1 Match) */}
                <div id="streak-board-metrics" className="grid grid-cols-2 gap-4 bg-[#2E7D6B]/5 border border-[#2E7D6B]/10 rounded-3xl p-5 select-none">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block leading-tight font-sans">
                        Current Streak
                      </span>
                      <span className="text-[#2E7D6B] font-bold font-mono text-2xl inline-block mt-2">
                        {currentStreakVal} Days
                      </span>
                    </div>
                    <p className="text-[10px] text-[#2E7D6B]/60 mt-2 font-medium leading-normal">Keep practicing to hold streak.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block leading-tight font-sans">
                        Best Streak
                      </span>
                      <span className="text-[#2E7D6B] font-bold font-mono text-2xl inline-block mt-2">
                        {maxStreakVal} Days
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium leading-normal">All-time record is {maxStreakVal} days.</p>
                  </div>
                </div>

                {/* Interactive Habit Checklist */}
                <div id="habit-checklist-section" className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <h3 className="font-bold text-slate-400 uppercase tracking-widest mb-1">
                      TODAY'S HABITS
                    </h3>
                    <span className="text-slate-400 font-medium">
                      {habits.filter(h => h.isCompletedToday).length}/{habits.length} Completed
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeHabits.map((habit) => (
                      <div 
                        key={habit.id}
                        onClick={() => handleToggleHabit(habit.id)}
                        className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                          habit.isCompletedToday 
                            ? "bg-emerald-50/20 border-emerald-100 shadow-sm" 
                            : "bg-white border-slate-200/80 hover:border-teal-200 hover:shadow"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Left Visual Status Check Circle */}
                          <div id={`toggle-check-${habit.id}`} className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border ${
                            habit.isCompletedToday 
                              ? "bg-teal-700 border-teal-700 text-white scale-110" 
                              : "bg-white border-slate-300 text-transparent group-hover:border-teal-600"
                          }`}>
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>

                          <div>
                            <h4 className={`text-sm font-bold transition-all ${
                              habit.isCompletedToday ? "text-slate-500 line-through" : "text-slate-800"
                            }`}>
                              {habit.name}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[9px] rounded font-mono font-medium uppercase tracking-wider">
                                {habit.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-light">
                                • {habit.reminderTime}
                              </span>
                              {habit.notes && (
                                <span className="text-[10px] text-slate-400 hidden sm:inline font-light max-w-xs truncate">
                                  • "{habit.notes}"
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right side streak indicator or delete */}
                        <div className="flex items-center gap-2 text-right">
                          <div className="mr-2">
                            <span className="text-[11px] font-bold text-[#2E7D6B] font-mono leading-none block">
                              {habit.streakCurrent}d
                            </span>
                            <span className="text-[9px] text-slate-400 block mt-0.5">streak</span>
                          </div>
                          
                          {/* Delete capability button */}
                          <button
                            onClick={(e) => handleDeleteHabit(habit.id, e)}
                            className="p-1 px-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded"
                            title="Remove habit"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {activeHabits.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-3xl border border-slate-100">
                        <p className="text-sm text-slate-400">All clean! Tap + Add New Habit to configure tracking goals.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Add Habits Widget */}
                <div className="pt-4 flex items-center justify-center">
                  <button
                    onClick={() => setActiveTab('add')}
                    className="py-4 px-8 bg-[#FF8A3D] hover:bg-[#e4762c] text-white font-semibold rounded-2xl text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Plus className="w-4.5 h-4.5 stroke-[2]" />
                    <span>Add New Habit</span>
                  </button>
                </div>

              </div>
            )}

            {/* Stats View tab */}
            {activeTab === 'stats' && <Stats habits={habits} />}

            {/* Add Habit form Tab */}
            {activeTab === 'add' && (
              <AddHabit 
                onAddHabit={handleCreateHabit} 
                onCancel={() => setActiveTab('home')} 
              />
            )}

            {/* User profile tab */}
            {activeTab === 'profile' && userProfile && (
              <Profile 
                profile={userProfile} 
                onLogout={handleLogout} 
                onResetData={handleResetData} 
              />
            )}

            {/* Academic Companion slide tab */}
            {activeTab === 'academic' && <CompanionPanel />}

          </div>

          {/* Desktop Right Sidebar (Only shows Academic Presentation slideshow for extremely professional appearance!) */}
          <div id="desktop-academic-sidecard" className="hidden xl:block xl:col-span-4 space-y-6">
            <div className="sticky top-24">
              <CompanionPanel />
            </div>
          </div>

        </div>

      </main>

      {/* 4. Thumb-Friendly Bottom Navigation Bar (Chapter 9.5 Navigation guidelines matching) */}
      <nav id="bottom-tabs-navigation" className="bg-white border-t border-slate-100 py-3.5 px-6 fixed bottom-0 left-0 right-0 z-40 shadow-xl select-none">
        <div className="max-w-md mx-auto flex items-center justify-around text-center">
          
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'home' ? "text-[#2E7D6B] font-bold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] tracking-wide font-sans leading-none">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'stats' ? "text-[#2E7D6B] font-bold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-[10px] tracking-wide font-sans leading-none">Stats</span>
          </button>

          <button 
            onClick={() => setActiveTab('add')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'add' ? "text-[#2E7D6B] font-bold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <PlusCircle className="w-5 h-5 text-[#FF8A3D]" />
            <span className="text-[10px] tracking-wide font-sans leading-none text-slate-500">Add</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'profile' ? "text-[#2E7D6B] font-bold" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] tracking-wide font-sans leading-none">Profile</span>
          </button>

          <button 
            onClick={() => setActiveTab('academic')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 cursor-pointer transition-colors ${
              activeTab === 'academic' ? "text-[#2E7D6B] font-bold" : "text-teal-600 hover:text-teal-800"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] tracking-wide font-sans leading-none">Academic</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
