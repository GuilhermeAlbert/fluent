import { useCallback, useMemo, useState } from "react";
import {
  countCompletedDailyWords,
  createDailyWordItems,
  selectDailyWordForStudy,
  setDailyWordCompleted,
  type DailyWordItem,
  type DailyWordsFilter,
} from "../lib/daily-words";
import { getInterfaceCopy, type InterfaceCopy } from "../lib/i18n";
import { createHomeSessionSnapshot, type HomeSessionSnapshot } from "../lib/session";
import { defaultSettingsPreferences } from "../lib/settings";
import { defaultFluentStorageData, readFluentStorage, writeFluentStorage } from "../lib/storage";
import type { FluentStorageData } from "../lib/storage/types";
import { getHomeWords } from "../lib/words";
import type { DailyProgress } from "../types/progress";
import type { LearningLanguage, SettingsPreferences } from "../types/settings";

export interface DailyWordsData {
  copy: InterfaceCopy;
  filter: DailyWordsFilter;
  items: DailyWordItem[];
  preferences: SettingsPreferences;
  progress: DailyProgress;
  setFilter: (filter: DailyWordsFilter) => void;
  setLearningLanguage: (language: LearningLanguage) => void;
  selectWordForStudy: (position: number) => "/";
  setWordCompleted: (wordId: string, completed: boolean) => void;
}

function getInitialStorage(): FluentStorageData {
  return readFluentStorage() ?? defaultFluentStorageData;
}

function createSessionFromStorage(storage: FluentStorageData): HomeSessionSnapshot {
  return createHomeSessionSnapshot({
    completedToday: storage.completedToday,
    currentWordIndex: storage.currentWordIndex,
    dailyGoal: storage.dailyGoal,
    streak: storage.streak,
    wordProgress: storage.wordProgress,
  });
}

function countCompletedForPreferences(storage: FluentStorageData, preferences: SettingsPreferences) {
  const words = getHomeWords(preferences.learningLanguage, preferences.includeDifficultWords);
  const session = createSessionFromStorage({
    ...storage,
    currentWordIndex: 0,
    dailyGoal: preferences.dailyGoal,
    settings: preferences,
  });

  return countCompletedDailyWords(session, words);
}

function persistStorageWithSession(
  storage: FluentStorageData,
  session: HomeSessionSnapshot,
): FluentStorageData {
  return {
    ...storage,
    completedToday: session.completedToday,
    currentWordIndex: session.currentWordIndex,
    dailyGoal: session.dailyGoal,
    streak: session.streak,
    wordProgress: session.wordProgress,
  };
}

export function useDailyWordsData(): DailyWordsData {
  const [storage, setStorage] = useState(getInitialStorage);
  const [filter, setFilter] = useState<DailyWordsFilter>("all");

  const preferences = storage.settings ?? defaultSettingsPreferences;
  const copy = getInterfaceCopy(preferences.interfaceLanguage);
  const words = useMemo(
    () => getHomeWords(preferences.learningLanguage, preferences.includeDifficultWords),
    [preferences.includeDifficultWords, preferences.learningLanguage],
  );
  const session = useMemo(() => createSessionFromStorage(storage), [storage]);
  const allItems = useMemo(
    () => createDailyWordItems({ filter: "all", session, words }),
    [session, words],
  );
  const items = useMemo(
    () => createDailyWordItems({ filter, session, words }),
    [filter, session, words],
  );

  const completed = allItems.filter((item) => item.isCompleted).length;
  const planned = allItems.length;

  const setWordCompleted = useCallback((wordId: string, isCompleted: boolean) => {
    setStorage((currentStorage) => {
      const nextSession = setDailyWordCompleted(
        createSessionFromStorage(currentStorage),
        wordId,
        isCompleted,
        new Date().toISOString(),
      );
      const completedToday = countCompletedForPreferences(
        persistStorageWithSession(currentStorage, nextSession),
        currentStorage.settings ?? defaultSettingsPreferences,
      );
      const nextStorage = {
        ...persistStorageWithSession(currentStorage, nextSession),
        completedToday,
      };

      writeFluentStorage(nextStorage);
      return nextStorage;
    });
  }, []);

  const selectWordForStudy = useCallback((position: number) => {
    let route: "/" = "/";

    setStorage((currentStorage) => {
      const target = selectDailyWordForStudy(createSessionFromStorage(currentStorage), position);
      const nextStorage = persistStorageWithSession(currentStorage, target.session);

      route = target.route;
      writeFluentStorage(nextStorage);
      return nextStorage;
    });

    return route;
  }, []);

  const setLearningLanguage = useCallback((learningLanguage: LearningLanguage) => {
    setStorage((currentStorage) => {
      const nextPreferences = {
        ...(currentStorage.settings ?? defaultSettingsPreferences),
        learningLanguage,
      };
      const completedToday = countCompletedForPreferences(currentStorage, nextPreferences);
      const nextStorage = {
        ...currentStorage,
        completedToday,
        currentWordIndex: 0,
        dailyGoal: nextPreferences.dailyGoal,
        settings: nextPreferences,
      };

      writeFluentStorage(nextStorage);
      return nextStorage;
    });
  }, []);

  return {
    copy,
    filter,
    items,
    preferences,
    progress: {
      completed,
      planned,
      remaining: Math.max(planned - completed, 0),
      streak: session.streak,
    },
    selectWordForStudy,
    setFilter,
    setLearningLanguage,
    setWordCompleted,
  };
}
