import { useCallback, useMemo, useState } from "react";
import {
  explorerAlphabet,
  filterExplorerWords,
  selectExplorerWordForStudy,
  type ExplorerBrowseMode,
  type ExplorerDifficultyFilter,
  type ExplorerLetterFilter,
} from "../lib/explorer";
import { countCompletedDailyWords } from "../lib/daily-words";
import { getInterfaceCopy, type InterfaceCopy } from "../lib/i18n";
import { createHomeSessionSnapshot } from "../lib/session";
import { defaultSettingsPreferences } from "../lib/settings";
import { defaultFluentStorageData, readFluentStorage, writeFluentStorage } from "../lib/storage";
import type { FluentStorageData } from "../lib/storage/types";
import { getHomeWords } from "../lib/words";
import type { DailyProgress } from "../types/progress";
import type { LearningLanguage, SettingsPreferences } from "../types/settings";
import type { VocabularyWord } from "../types/word";

export interface ExplorerData {
  alphabet: string[];
  browseMode: ExplorerBrowseMode;
  copy: InterfaceCopy;
  difficulty: ExplorerDifficultyFilter;
  filteredWords: VocabularyWord[];
  preferences: SettingsPreferences;
  progress: DailyProgress;
  query: string;
  selectedLetter: ExplorerLetterFilter;
  setBrowseMode: (mode: ExplorerBrowseMode) => void;
  setDifficulty: (difficulty: ExplorerDifficultyFilter) => void;
  setLearningLanguage: (language: LearningLanguage) => void;
  setQuery: (query: string) => void;
  setSelectedLetter: (letter: ExplorerLetterFilter) => void;
  selectWordForStudy: (wordId: string) => "/";
  totalWords: number;
}

function getInitialStorage(): FluentStorageData {
  return readFluentStorage() ?? defaultFluentStorageData;
}

function createSessionFromStorage(storage: FluentStorageData) {
  return createHomeSessionSnapshot({
    completedToday: storage.completedToday,
    currentWordIndex: storage.currentWordIndex,
    dailyGoal: storage.dailyGoal,
    streak: storage.streak,
    wordProgress: storage.wordProgress,
  });
}

export function useExplorerData(): ExplorerData {
  const [storage, setStorage] = useState(getInitialStorage);
  const [browseMode, setBrowseModeState] = useState<ExplorerBrowseMode>("alphabet");
  const [difficulty, setDifficulty] = useState<ExplorerDifficultyFilter>("all");
  const [query, setQueryState] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<ExplorerLetterFilter>("a");

  const preferences = storage.settings ?? defaultSettingsPreferences;
  const copy = getInterfaceCopy(preferences.interfaceLanguage);
  const words = useMemo(
    () => getHomeWords(preferences.learningLanguage, preferences.includeDifficultWords),
    [preferences.includeDifficultWords, preferences.learningLanguage],
  );
  const session = useMemo(() => createSessionFromStorage(storage), [storage]);
  const completed = countCompletedDailyWords(session, words);

  const filteredWords = useMemo(
    () =>
      filterExplorerWords(words, {
        difficulty,
        letter: browseMode === "alphabet" ? selectedLetter : "all",
        query,
      }),
    [browseMode, difficulty, query, selectedLetter, words],
  );

  const setBrowseMode = useCallback((mode: ExplorerBrowseMode) => {
    setBrowseModeState(mode);
    if (mode !== "alphabet") {
      setSelectedLetter("all");
    }
  }, []);

  const setQuery = useCallback((nextQuery: string) => {
    setQueryState(nextQuery);
    if (nextQuery.trim()) {
      setSelectedLetter("all");
    }
  }, []);

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
    setSelectedLetter("a");
  }, []);

  const selectWordForStudy = useCallback(
    (wordId: string) => {
      let route: "/" = "/";

      setStorage((currentStorage) => {
        const target = selectExplorerWordForStudy(createSessionFromStorage(currentStorage), wordId, words);
        const nextStorage = {
          ...currentStorage,
          currentWordIndex: target.session.currentWordIndex,
        };

        route = target.route;
        writeFluentStorage(nextStorage);
        return nextStorage;
      });

      return route;
    },
    [words],
  );

  return {
    alphabet: explorerAlphabet,
    browseMode,
    copy,
    difficulty,
    filteredWords,
    preferences,
    progress: {
      completed,
      planned: preferences.dailyGoal,
      remaining: Math.max(preferences.dailyGoal - completed, 0),
      streak: session.streak,
    },
    query,
    selectedLetter,
    setBrowseMode,
    setDifficulty,
    setLearningLanguage,
    setQuery,
    setSelectedLetter,
    selectWordForStudy,
    totalWords: words.length,
  };
}
