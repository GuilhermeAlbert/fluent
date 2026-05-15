import { useMemo } from "react";
import { currentWordSeed } from "../lib/words";
import type { DailyProgress, QuickAction, RecentWord, TodaySummary } from "../types/progress";
import type { VocabularyWord } from "../types/word";
import { useLocalProgress } from "./use-local-progress";

export interface HomeData {
  todaySummary: TodaySummary;
  currentWord: VocabularyWord;
  dailyProgress: DailyProgress;
  recentWords: RecentWord[];
  quickActions: QuickAction[];
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

export function useHomeData(): HomeData {
  const progress = useLocalProgress();

  return useMemo(() => {
    const todaySummary: TodaySummary = {
      dateLabel: dateFormatter.format(new Date()),
      focusLabel: "Today's focus",
      dailyGoal: progress.dailyGoal,
      wordsPlannedToday: progress.wordsPlannedToday,
      completedToday: progress.completedToday,
    };

    return {
      todaySummary,
      currentWord: currentWordSeed,
      dailyProgress: {
        completed: progress.completedToday,
        planned: progress.wordsPlannedToday,
        remaining: Math.max(progress.wordsPlannedToday - progress.completedToday, 0),
        streak: progress.streak,
      },
      recentWords,
      quickActions,
    };
  }, [progress]);
}
