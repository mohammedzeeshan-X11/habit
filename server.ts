import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { Habit, UserProfile } from "./src/types";

const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "habits-db.json");

// Default initial data representing Mohammed Zeeshan's setup
const DEFAULT_HABITS: Habit[] = [
  {
    id: "1",
    name: "Drink 2L Water",
    category: "Health",
    frequency: "Daily",
    reminderTime: "08:00 AM",
    notes: "Stay hydrated throughout the classes.",
    isActive: true,
    streakCurrent: 12,
    streakBest: 21,
    isCompletedToday: true,
    completedDates: [] // will be filled with today's date in the initializer
  },
  {
    id: "2",
    name: "Read 20 Minutes",
    category: "Study",
    frequency: "Daily",
    reminderTime: "10:00 PM",
    notes: "Current book: Atomic Habits by James Clear.",
    isActive: true,
    streakCurrent: 12,
    streakBest: 21,
    isCompletedToday: true,
    completedDates: []
  },
  {
    id: "3",
    name: "Morning Workout",
    category: "Fitness",
    frequency: "Daily",
    reminderTime: "06:30 AM",
    notes: "Home workout or quick runs in Rajanukunte.",
    isActive: true,
    streakCurrent: 4,
    streakBest: 15,
    isCompletedToday: false,
    completedDates: []
  },
  {
    id: "4",
    name: "No Phone after 10 PM",
    category: "Mind",
    frequency: "Daily",
    reminderTime: "10:00 PM",
    notes: "Avoid screen lights for better sleep quality.",
    isActive: true,
    streakCurrent: 0,
    streakBest: 7,
    isCompletedToday: false,
    completedDates: []
  }
];

const DEFAULT_PROFILE: UserProfile = {
  name: "Mohammed Zeeshan",
  usn: "1VA24IS059",
  institution: "SAI VIDYA INSTITUTE OF TECHNOLOGY",
  joinedDate: "August 2024",
  role: "B.E. Student - Information Science",
  avatarUrl: "",
  achievements: ["Streak Master (30 Days)", "Composter Supreme", "Serenity Now", "Alpha Builder"],
  totalHabitsTracked: 15,
  averageCompletionRate: 85,
  longestStreak: 45
};

// Date helper to get formatted strings for past days
function getPastDateString(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split("T")[0];
}

interface DBState {
  habits: Habit[];
  profile: UserProfile;
}

function loadDatabase(): DBState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error loading database:", error);
  }

  // Generate seed completions to support the streaks visually on initialize
  const todayStr = getPastDateString(0);
  const habitsSeed = JSON.parse(JSON.stringify(DEFAULT_HABITS)) as Habit[];
  
  // Setup completions for seeds
  habitsSeed.forEach((habit) => {
    const dates: string[] = [];
    const maxBack = habit.streakCurrent;
    
    // Add completed dates based on current streak
    for (let i = 0; i < maxBack; i++) {
      // If completed today is false, skip i = 0 (today)
      if (i === 0 && !habit.isCompletedToday) continue;
      dates.push(getPastDateString(i));
    }
    habit.completedDates = dates;
  });

  const state = { habits: habitsSeed, profile: DEFAULT_PROFILE };
  saveDatabase(state);
  return state;
}

function saveDatabase(state: DBState) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving database:", error);
  }
}

// Recalculates streak details for a single habit
function recalculateStreaks(completedDates: string[]): { current: number; best: number } {
  if (completedDates.length === 0) {
    return { current: 0, best: 0 };
  }

  // Sort dates descending
  const sorted = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));
  
  const todayStr = getPastDateString(0);
  const yesterdayStr = getPastDateString(1);

  let currentStreak = 0;
  let maxBest = 0;

  // Calculate current streak
  let checkDate = new Date();
  let hasToday = sorted.includes(todayStr);
  let hasYesterday = sorted.includes(yesterdayStr);

  if (!hasToday && !hasYesterday) {
    currentStreak = 0;
  } else {
    // Start counting from either today or yesterday
    let startOffset = hasToday ? 0 : 1;
    let tempStreak = 0;
    while (true) {
      const targetStr = getPastDateString(startOffset + tempStreak);
      if (sorted.includes(targetStr)) {
        tempStreak++;
      } else {
        break;
      }
    }
    currentStreak = tempStreak;
  }

  // Calculate maximum best streak historically
  let currentRun = 0;
  let prevDate: Date | null = null;
  const sortedAscObj = sorted.map(dStr => new Date(dStr)).sort((a,b) => a.getTime() - b.getTime());

  sortedAscObj.forEach((d) => {
    if (prevDate === null) {
      currentRun = 1;
    } else {
      const diffTime = Math.abs(d.getTime() - prevDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentRun++;
      } else if (diffDays > 1) {
        if (currentRun > maxBest) maxBest = currentRun;
        currentRun = 1;
      }
    }
    prevDate = d;
  });

  if (currentRun > maxBest) maxBest = currentRun;

  return {
    current: currentStreak,
    best: maxBest
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoints
  app.get("/api/habits", (req, res) => {
    const db = loadDatabase();
    // Dynamically update isCompletedToday flag
    const todayStr = getPastDateString(0);
    db.habits.forEach(h => {
      h.isCompletedToday = h.completedDates.includes(todayStr);
      const recalculated = recalculateStreaks(h.completedDates);
      h.streakCurrent = recalculated.current;
      h.streakBest = Math.max(h.streakBest, recalculated.best);
    });
    res.json(db.habits);
  });

  app.post("/api/habits", (req, res) => {
    const { name, category, frequency, reminderTime, notes } = req.body;
    if (!name || !category || !frequency) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const db = loadDatabase();
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      category,
      frequency,
      reminderTime: reminderTime || "08:00 AM",
      notes: notes || "",
      isActive: true,
      streakCurrent: 0,
      streakBest: 0,
      isCompletedToday: false,
      completedDates: []
    };

    db.habits.push(newHabit);
    saveDatabase(db);
    res.status(201).json(newHabit);
  });

  app.post("/api/habits/:id/toggle", (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    const habit = db.habits.find(h => h.id === id);
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const todayStr = getPastDateString(0);
    const dateIdx = habit.completedDates.indexOf(todayStr);

    if (dateIdx >= 0) {
      // Already completed today, so uncheck it
      habit.completedDates.splice(dateIdx, 1);
      habit.isCompletedToday = false;
    } else {
      // Complete it
      habit.completedDates.push(todayStr);
      habit.isCompletedToday = true;
    }

    // Recalculate streaks
    const { current, best } = recalculateStreaks(habit.completedDates);
    habit.streakCurrent = current;
    habit.streakBest = Math.max(habit.streakBest, best);

    // Also update global profile best if needed
    if (habit.streakCurrent > db.profile.longestStreak) {
      db.profile.longestStreak = habit.streakCurrent;
    }

    saveDatabase(db);
    res.json(habit);
  });

  app.delete("/api/habits/:id", (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    const cleanHabits = db.habits.filter(h => h.id !== id);
    db.habits = cleanHabits;
    saveDatabase(db);
    res.json({ success: true });
  });

  app.get("/api/profile", (req, res) => {
    const db = loadDatabase();
    
    // Dynamically align summary stats
    const totalCount = db.habits.length;
    const longest = db.habits.reduce((m, h) => Math.max(m, h.streakBest), db.profile.longestStreak);
    
    db.profile.totalHabitsTracked = totalCount;
    db.profile.longestStreak = longest;
    
    res.json(db.profile);
  });

  app.post("/api/reset", (req, res) => {
    // Recovers default seeded state
    const todayStr = getPastDateString(0);
    const habitsSeed = JSON.parse(JSON.stringify(DEFAULT_HABITS)) as Habit[];
    
    habitsSeed.forEach((habit) => {
      const dates: string[] = [];
      const maxBack = habit.streakCurrent;
      
      for (let i = 0; i < maxBack; i++) {
        if (i === 0 && !habit.isCompletedToday) continue;
        dates.push(getPastDateString(i));
      }
      habit.completedDates = dates;
    });

    const refreshedState = {
      habits: habitsSeed,
      profile: DEFAULT_PROFILE
    };
    saveDatabase(refreshedState);
    res.json({ success: true, habits: refreshedState.habits, profile: refreshedState.profile });
  });

  // Serve static files and handle dev routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
