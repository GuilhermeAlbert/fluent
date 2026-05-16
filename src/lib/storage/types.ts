import type { WordStatus } from "../../types/word";
import type { SettingsPreferences } from "../../types/settings";

export interface StorageWordProgress {
  wordId: string;
  status: WordStatus;
  lastStudiedAt: string;
  completedToday?: boolean;
}

export interface FluentStorageData {
  version: 1;
  dailyGoal: number;
  completedToday: number;
  streak: number;
  currentWordIndex: number;
  settings: SettingsPreferences;
  wordProgress: Record<string, StorageWordProgress>;
}
