import { useCallback, useMemo, useState } from "react";
import {
  createDifficultWordItems,
  selectDifficultWordForStudy,
  setDifficultWordStatus,
  type DifficultWordItem,
  type DifficultWordsFilter,
} from "../lib/difficult-words";
import { countCompletedDailyWords } from "../lib/daily-words";
import { getInterfaceCopy, type InterfaceCopy } from "../lib/i18n";
import { createHomeSessionSnapshot, type HomeSessionSnapshot } from "../lib/session";
import { defaultSettingsPreferences } from "../lib/settings";
import { defaultFluentStorageData, readFluentStorage, writeFluentStorage } from "../lib/storage";
import type { FluentStorageData } from "../lib/storage/types";
import { getHomeWords } from "../lib/words";
import type { DailyProgress } from "../types/progress";
import type { LearningLanguage, SettingsPreferences } from "../types/settings";

export interface DifficultWordsStats {
  hardCount: number;
  markedCount: number;
  totalCount: number;
}

export interface DifficultWordsData {
  copy: InterfaceCopy;
  filter: DifficultWordsFilter;
  items: DifficultWordItem[];
  preferences: SettingsPreferences;
  progress: DailyProgress;
  query: string;
  stats: DifficultWordsStats;
  selectWordForStudy: (wordId: string) => "/";
  setFilter: (filter: DifficultWordsFilter) => void;
  setLearningLanguage: (language: LearningLanguage) => void;
  setQuery: (query: string) => void;
  setWordDifficult: (wordId: string, isDifficult: boolean) => void;
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

export function useDifficultWordsData(): DifficultWordsData {
  const [storage, setStorage] = useState(getInitialStorage);
  const [filter, setFilter] = useState<DifficultWordsFilter>("all");
  const [query, setQuery] = useState("");

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
  const session = useMemo(() => createSessionFromStorage(storage), [storage]);
  const completed = countCompletedDailyWords(session, dailyWords);

  const items = useMemo(
    () => createDifficultWordItems({ filter, query, session, words }),
    [filter, query, session, words],
  );
  const markedItems = useMemo(
    () => createDifficultWordItems({ filter: "marked", query: "", session, words }),
    [session, words],
  );
  const hardItems = useMemo(
    () => createDifficultWordItems({ filter: "hard", query: "", session, words }),
    [session, words],
  );
  const allItems = useMemo(
    () => createDifficultWordItems({ filter: "all", query: "", session, words }),
    [session, words],
  );

  const setWordDifficult = useCallback((wordId: string, isDifficult: boolean) => {
    setStorage((currentStorage) => {
      const nextSession = setDifficultWordStatus(
        createSessionFromStorage(currentStorage),
        wordId,
        isDifficult,
        new Date().toISOString(),
      );
      const nextStorage = persistStorageWithSession(currentStorage, nextSession);

      writeFluentStorage(nextStorage);
      return nextStorage;
    });
  }, []);

  const selectWordForStudy = useCallback(
    (wordId: string) => {
      let route: "/" = "/";

      setStorage((currentStorage) => {
        const target = selectDifficultWordForStudy(
          createSessionFromStorage(currentStorage),
          wordId,
          words,
        );
        const nextStorage = persistStorageWithSession(currentStorage, target.session);

        route = target.route;
        writeFluentStorage(nextStorage);
        return nextStorage;
      });

      return route;
    },
    [words],
  );

  const setLearningLanguage = useCallback((learningLanguage: LearningLanguage) => {
    setStorage((currentStorage) => {
      const nextSettings = {
        ...(currentStorage.settings ?? defaultSettingsPreferences),
        learningLanguage,
      };
      const nextStorage = {
        ...currentStorage,
        currentWordIndex: 0,
        settings: nextSettings,
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
      planned: preferences.dailyGoal,
      remaining: Math.max(preferences.dailyGoal - completed, 0),
      streak: session.streak,
    },
    query,
    selectWordForStudy,
    setFilter,
    setLearningLanguage,
    setQuery,
    setWordDifficult,
    stats: {
      hardCount: hardItems.length,
      markedCount: markedItems.length,
      totalCount: allItems.length,
    },
  };
}
