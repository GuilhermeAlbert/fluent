import type { WordStatus } from "./word";

export interface LocalProgress {
  dailyGoal: number;
  wordsPlannedToday: number;
  completedToday: number;
  streak: number;
}

export interface TodaySummary {
  dateLabel: string;
  focusLabel: string;
  dailyGoal: number;
  wordsPlannedToday: number;
  completedToday: number;
}

export interface DailyProgress {
  completed: number;
  planned: number;
  remaining: number;
  streak: number;
}

export interface RecentWord {
  id: string;
  word: string;
  status: WordStatus;
  lastStudiedLabel: string;
}

export interface QuickAction {
  id: "daily-practice" | "browse-words" | "difficult-words";
  title: string;
  description: string;
  to: string;
}
