import { useCallback, useMemo, useState } from "react";
import { countCompletedDailyWords } from "../lib/daily-words";
import { defaultFluentStorageData, readFluentStorage, writeFluentStorage } from "../lib/storage";
import { defaultSettingsPreferences } from "../lib/settings";
import { getInterfaceCopy, type InterfaceCopy } from "../lib/i18n";
import {
  completeCurrentWord,
  createHomeSessionSnapshot,
  markCurrentWordDifficult,
  resetHomeSession,
  skipCurrentWord,
  type HomeSessionSnapshot,
} from "../lib/session";
import { getHomeWords } from "../lib/words";
import type { DailyProgress, QuickAction, RecentWord, TodaySummary } from "../types/progress";
import type { VocabularyWord } from "../types/word";
import type { SettingsPreferences } from "../types/settings";

export interface HomeData {
  todaySummary: TodaySummary;
  currentWord: VocabularyWord;
  dailyProgress: DailyProgress;
  recentWords: RecentWord[];
  quickActions: QuickAction[];
  copy: InterfaceCopy;
  completeCurrentWord: () => void;
  markCurrentWordDifficult: () => void;
  resetSession: () => void;
  skipCurrentWord: () => void;
  speakCurrentWord: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const recentWords: RecentWord[] = [
  {
    id: "advice",
    word: "Advice",
    status: "learning",
    lastStudiedLabel: "Today",
  },
  {
    id: "by",
    word: "By",
    status: "completed",
    lastStudiedLabel: "Yesterday",
  },
  {
    id: "again",
    word: "Again",
    status: "difficult",
    lastStudiedLabel: "2 days ago",
  },
  {
    id: "context",
    word: "Context",
    status: "learning",
    lastStudiedLabel: "This week",
  },
];

const quickActions: QuickAction[] = [
  {
    id: "daily-practice",
    title: "Start daily practice",
    description: "Continue the words planned for today.",
    to: "/daily-words",
  },
  {
    id: "browse-words",
    title: "Browse words",
    description: "Explore the Markdown-ready word library.",
    to: "/explorer",
  },
  {
    id: "difficult-words",
    title: "Review difficult words",
    description: "Revisit words that need another pass.",
    to: "/difficult-words",
  },
];

function getInitialPreferences(): SettingsPreferences {
  return readFluentStorage()?.settings ?? defaultSettingsPreferences;
}

function getInitialSession(): HomeSessionSnapshot {
  const stored = readFluentStorage() ?? defaultFluentStorageData;
  const settings = stored.settings ?? defaultSettingsPreferences;
  const words = getHomeWords(settings.learningLanguage, settings.includeDifficultWords);
  const snapshot = createHomeSessionSnapshot({
    completedToday: Math.min(stored.completedToday, stored.dailyGoal),
    currentWordIndex: stored.currentWordIndex,
    dailyGoal: stored.dailyGoal,
    streak: stored.streak,
    wordProgress: stored.wordProgress,
  });

  return {
    ...snapshot,
    completedToday: countCompletedDailyWords(snapshot, words),
  };
}

function getRecentWordsFromSession(
  session: HomeSessionSnapshot,
  words: VocabularyWord[],
): RecentWord[] {
  const wordMap = new Map(words.map((word) => [word.id, word]));

  return Object.values(session.wordProgress)
    .filter((progress) => wordMap.has(progress.wordId))
    .sort((a, b) => b.lastStudiedAt.localeCompare(a.lastStudiedAt))
    .slice(0, 4)
    .map((progress) => ({
      id: progress.wordId,
      word: wordMap.get(progress.wordId)?.word ?? progress.wordId,
      status: progress.status,
      lastStudiedLabel: progress.completedToday ? "Today" : "Skipped today",
    }));
}

export function useHomeData(): HomeData {
  const [preferences] = useState(getInitialPreferences);
  const [session, setSession] = useState(getInitialSession);
  const copy = getInterfaceCopy(preferences.interfaceLanguage);
  const words = useMemo(
    () => getHomeWords(preferences.learningLanguage, preferences.includeDifficultWords),
    [preferences.includeDifficultWords, preferences.learningLanguage],
  );

  const currentWordIndex = session.currentWordIndex % words.length;
  const wordSeed = words[currentWordIndex];
  const storedWordProgress = session.wordProgress[wordSeed.id];

  const currentWord: VocabularyWord = useMemo(
    () => ({
      ...wordSeed,
      status: storedWordProgress?.status ?? wordSeed.status,
    }),
    [storedWordProgress?.status, wordSeed],
  );

  const persistSession = useCallback((nextSession: HomeSessionSnapshot) => {
    const settings = readFluentStorage()?.settings ?? defaultSettingsPreferences;

    writeFluentStorage({
      version: 1,
      completedToday: nextSession.completedToday,
      currentWordIndex: nextSession.currentWordIndex,
      dailyGoal: nextSession.dailyGoal,
      settings: {
        ...settings,
        dailyGoal:
          nextSession.dailyGoal === 5 ||
          nextSession.dailyGoal === 10 ||
          nextSession.dailyGoal === 15 ||
          nextSession.dailyGoal === 20
            ? nextSession.dailyGoal
            : settings.dailyGoal,
      },
      streak: nextSession.streak,
      wordProgress: nextSession.wordProgress,
    });
  }, []);

  const updateSession = useCallback(
    (createNextSession: (session: HomeSessionSnapshot) => HomeSessionSnapshot) => {
      setSession((currentSession) => {
        const nextSession = createNextSession(currentSession);
        persistSession(nextSession);
        return nextSession;
      });
    },
    [persistSession],
  );

  const completeWord = useCallback(() => {
    updateSession((currentSession) =>
      completeCurrentWord(
        currentSession,
        words[currentSession.currentWordIndex % words.length].id,
        new Date().toISOString(),
      ),
    );
  }, [updateSession, words]);

  const skipWord = useCallback(() => {
    updateSession((currentSession) =>
      skipCurrentWord(
        currentSession,
        words[currentSession.currentWordIndex % words.length].id,
        new Date().toISOString(),
      ),
    );
  }, [updateSession, words]);

  const markDifficult = useCallback(() => {
    updateSession((currentSession) =>
      markCurrentWordDifficult(
        currentSession,
        words[currentSession.currentWordIndex % words.length].id,
        new Date().toISOString(),
      ),
    );
  }, [updateSession, words]);

  const resetSession = useCallback(() => {
    updateSession(resetHomeSession);
  }, [updateSession]);

  const speakCurrentWord = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = preferences.learningLanguage === "spanish" ? "es-ES" : "en-US";
    window.speechSynthesis.speak(utterance);
  }, [currentWord.word, preferences.learningLanguage]);

  return useMemo(() => {
    const todaySummary: TodaySummary = {
      dateLabel: dateFormatter.format(new Date()),
      focusLabel: "Today's focus",
      dailyGoal: session.dailyGoal,
      wordsPlannedToday: session.dailyGoal,
      completedToday: session.completedToday,
    };

    return {
      todaySummary,
      currentWord,
      copy,
      dailyProgress: {
        completed: session.completedToday,
        planned: session.dailyGoal,
        remaining: Math.max(session.dailyGoal - session.completedToday, 0),
        streak: session.streak,
      },
      recentWords: getRecentWordsFromSession(session, words).length
        ? getRecentWordsFromSession(session, words)
        : recentWords,
      quickActions,
      completeCurrentWord: completeWord,
      markCurrentWordDifficult: markDifficult,
      resetSession,
      skipCurrentWord: skipWord,
      speakCurrentWord,
    };
  }, [completeWord, copy, currentWord, markDifficult, resetSession, session, skipWord, speakCurrentWord, words]);
}
