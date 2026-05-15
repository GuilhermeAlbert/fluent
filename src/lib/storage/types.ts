import type { WordStatus } from "../../types/word";

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
  wordProgress: Record<string, StorageWordProgress>;
}
