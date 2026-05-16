import { useMemo } from "react";
import { defaultFluentStorageData, readFluentStorage } from "../lib/storage";
import type { LocalProgress } from "../types/progress";

export function useLocalProgress(): LocalProgress {
  return useMemo(() => {
    const storedProgress = readFluentStorage() ?? defaultFluentStorageData;

    return {
      dailyGoal: storedProgress.dailyGoal,
      wordsPlannedToday: storedProgress.dailyGoal,
      completedToday: Math.min(storedProgress.completedToday, storedProgress.dailyGoal),
      streak: storedProgress.streak,
    };
  }, []);
}
