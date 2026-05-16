import { useMemo, useState } from "react";
import { countCompletedDailyWords } from "../lib/daily-words";
import { getInterfaceCopy, type InterfaceCopy } from "../lib/i18n";
import { createProgressDashboard, type ProgressDashboard } from "../lib/progress";
import { createHomeSessionSnapshot } from "../lib/session";
import { defaultSettingsPreferences } from "../lib/settings";
import { defaultFluentStorageData, readFluentStorage } from "../lib/storage";
import type { FluentStorageData } from "../lib/storage/types";
import { getHomeWords } from "../lib/words";
import type { DailyProgress } from "../types/progress";
import type { SettingsPreferences } from "../types/settings";

export interface ProgressData {
  copy: InterfaceCopy;
  dashboard: ProgressDashboard;
  preferences: SettingsPreferences;
  progress: DailyProgress;
}

function getInitialStorage(): FluentStorageData {
  return readFluentStorage() ?? defaultFluentStorageData;
}

export function useProgressData(): ProgressData {
  const [storage] = useState(getInitialStorage);
  const preferences = storage.settings ?? defaultSettingsPreferences;
  const copy = getInterfaceCopy(preferences.interfaceLanguage);
  const words = useMemo(
    () => getHomeWords(preferences.learningLanguage, true),
    [preferences.learningLanguage],
  );
  const dailyWords = useMemo(
    () => getHomeWords(preferences.learningLanguage, preferences.includeDifficultWords),
    [preferences.includeDifficultWords, preferences.learningLanguage],
  );
  const session = useMemo(() => {
    const snapshot = createHomeSessionSnapshot({
      completedToday: storage.completedToday,
      currentWordIndex: storage.currentWordIndex,
      dailyGoal: storage.dailyGoal,
      streak: storage.streak,
      wordProgress: storage.wordProgress,
    });

    return {
      ...snapshot,
      completedToday: countCompletedDailyWords(snapshot, dailyWords),
    };
  }, [dailyWords, storage]);

  const dashboard = useMemo(
    () =>
      createProgressDashboard({
        referenceDate: new Date(),
        session,
        words,
      }),
    [session, words],
  );

  return {
    copy,
    dashboard,
    preferences,
    progress: {
      completed: dashboard.overview.completedToday,
      planned: dashboard.overview.dailyGoal,
      remaining: dashboard.overview.remainingToday,
      streak: dashboard.overview.streak,
    },
  };
}
