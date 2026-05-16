import { useCallback, useMemo, useState } from "react";
import { defaultFluentStorageData, readFluentStorage, writeFluentStorage } from "../lib/storage";
import {
  completeCurrentWord,
  createHomeSessionSnapshot,
  resetHomeSession,
  skipCurrentWord,
  type HomeSessionSnapshot,
} from "../lib/session";
import { homeWordSeeds } from "../lib/words";
import type { DailyProgress, QuickAction, RecentWord, TodaySummary } from "../types/progress";
import type { VocabularyWord } from "../types/word";

export interface HomeData {
  todaySummary: TodaySummary;
  currentWord: VocabularyWord;
  dailyProgress: DailyProgress;
  recentWords: RecentWord[];
  quickActions: QuickAction[];
  completeCurrentWord: () => void;
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

function getInitialSession(): HomeSessionSnapshot {
  const stored = readFluentStorage() ?? defaultFluentStorageData;

  return createHomeSessionSnapshot({
    completedToday: Math.min(stored.completedToday, stored.dailyGoal),
    currentWordIndex: stored.currentWordIndex % homeWordSeeds.length,
    dailyGoal: Math.min(stored.dailyGoal, homeWordSeeds.length),
    streak: stored.streak,
    wordProgress: stored.wordProgress,
  });
}

function getRecentWordsFromSession(session: HomeSessionSnapshot): RecentWord[] {
  const wordMap = new Map(homeWordSeeds.map((word) => [word.id, word]));

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
  const [session, setSession] = useState(getInitialSession);

  const currentWordIndex = session.currentWordIndex % homeWordSeeds.length;
  const wordSeed = homeWordSeeds[currentWordIndex];
  const storedWordProgress = session.wordProgress[wordSeed.id];

  const currentWord: VocabularyWord = useMemo(
    () => ({
      ...wordSeed,
      status: storedWordProgress?.status ?? wordSeed.status,
    }),
    [storedWordProgress?.status, wordSeed],
  );

  const persistSession = useCallback((nextSession: HomeSessionSnapshot) => {
    writeFluentStorage({
      version: 1,
      completedToday: nextSession.completedToday,
      currentWordIndex: nextSession.currentWordIndex,
      dailyGoal: nextSession.dailyGoal,
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
      completeCurrentWord(currentSession, homeWordSeeds[currentSession.currentWordIndex].id, new Date().toISOString()),
    );
  }, [updateSession]);

  const skipWord = useCallback(() => {
    updateSession((currentSession) =>
      skipCurrentWord(currentSession, homeWordSeeds[currentSession.currentWordIndex].id, new Date().toISOString()),
    );
  }, [updateSession]);

  const resetSession = useCallback(() => {
    updateSession(resetHomeSession);
  }, [updateSession]);

  const speakCurrentWord = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }, [currentWord.word]);

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
      dailyProgress: {
        completed: session.completedToday,
        planned: session.dailyGoal,
        remaining: Math.max(session.dailyGoal - session.completedToday, 0),
        streak: session.streak,
      },
      recentWords: getRecentWordsFromSession(session).length
        ? getRecentWordsFromSession(session)
        : recentWords,
      quickActions,
      completeCurrentWord: completeWord,
      resetSession,
      skipCurrentWord: skipWord,
      speakCurrentWord,
    };
  }, [completeWord, currentWord, resetSession, session, skipWord, speakCurrentWord]);
}
