import { useMemo } from "react";
import { readFluentStorage } from "../lib/storage";
import type { LocalProgress } from "../types/progress";

const fallbackProgress: LocalProgress = {
  dailyGoal: 10,
  wordsPlannedToday: 10,
  completedToday: 3,
  streak: 12,
};

export function useLocalProgress(): LocalProgress {
  return useMemo(() => {
    const storedProgress = readFluentStorage();

    if (!storedProgress) {
      return fallbackProgress;
    }

    return {
      dailyGoal: storedProgress.dailyGoal,
      wordsPlannedToday: storedProgress.dailyGoal,
      completedToday: Math.min(storedProgress.completedToday, storedProgress.dailyGoal),
      streak: storedProgress.streak,
    };
  }, []);
}
