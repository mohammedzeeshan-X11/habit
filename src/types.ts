export interface Habit {
  id: string;
  name: string;
  category: 'Health' | 'Study' | 'Mind' | 'Fitness';
  frequency: 'Daily' | 'Weekdays' | 'Custom';
  reminderTime: string;
  notes?: string;
  isActive: boolean;
  streakCurrent: number;
  streakBest: number;
  isCompletedToday: boolean;
  completedDates: string[]; // YYYY-MM-DD
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  type: '7-day' | '30-day' | 'early' | 'consistency';
}

export interface UserProfile {
  name: string;
  usn: string;
  institution: string;
  joinedDate: string;
  role: string;
  avatarUrl?: string;
  achievements: string[];
  totalHabitsTracked: number;
  averageCompletionRate: number;
  longestStreak: number;
}
