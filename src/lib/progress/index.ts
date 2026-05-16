import type { HomeSessionSnapshot } from "../session";
import type { StorageWordProgress } from "../storage/types";
import type { VocabularyWord, WordStatus } from "../../types/word";

export type ProgressStatus = WordStatus | "new";

export interface ProgressOverview {
  completedToday: number;
  completedWords: number;
  dailyCompletionPercent: number;
  dailyGoal: number;
  difficultWords: number;
  learningWords: number;
  libraryCompletionPercent: number;
  newWords: number;
  remainingToday: number;
  streak: number;
  studiedWords: number;
  totalWords: number;
}

export interface ProgressStatusItem {
  count: number;
  percentage: number;
  status: ProgressStatus;
}

export interface ProgressActivityItem {
  id: string;
  lastStudiedAt: string;
  status: WordStatus;
  word: string;
}

export interface ProgressWeeklyActivityItem {
  count: number;
  date: string;
  dayLabel: string;
}

export interface ProgressDashboard {
  overview: ProgressOverview;
  recentActivity: ProgressActivityItem[];
  statusItems: ProgressStatusItem[];
  weeklyActivity: ProgressWeeklyActivityItem[];
}

export interface CreateProgressDashboardOptions {
  referenceDate: Date;
  session: HomeSessionSnapshot;
  words: VocabularyWord[];
}

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

function clampPercentage(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }

  return Math.min(Math.round((value / max) * 100), 100);
}

function getIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function getValidProgressByWord(
  session: HomeSessionSnapshot,
  words: VocabularyWord[],
): Array<StorageWordProgress & { word: VocabularyWord }> {
  const wordMap = new Map(words.map((word) => [word.id, word]));

  return Object.values(session.wordProgress)
    .map((progress) => {
      const word = wordMap.get(progress.wordId);
      return word ? { ...progress, word } : null;
    })
    .filter((progress): progress is StorageWordProgress & { word: VocabularyWord } =>
      Boolean(progress),
    );
}

export function createProgressDashboard({
  referenceDate,
  session,
  words,
}: CreateProgressDashboardOptions): ProgressDashboard {
  const validProgress = getValidProgressByWord(session, words);
  const totalWords = words.length;
  const completedWords = validProgress.filter((progress) => progress.status === "completed").length;
  const learningWords = validProgress.filter((progress) => progress.status === "learning").length;
  const difficultWords = validProgress.filter((progress) => progress.status === "difficult").length;
  const studiedWords = completedWords + learningWords + difficultWords;
  const newWords = Math.max(totalWords - studiedWords, 0);
  const completedToday = Math.min(session.completedToday, session.dailyGoal);

  const statusCounts: Array<Omit<ProgressStatusItem, "percentage">> = [
    { status: "completed", count: completedWords },
    { status: "learning", count: learningWords },
    { status: "difficult", count: difficultWords },
    { status: "new", count: newWords },
  ];
  const statusItems: ProgressStatusItem[] = statusCounts.map((item) => ({
    ...item,
    percentage: clampPercentage(item.count, totalWords),
  }));

  const recentActivity = validProgress
    .filter((progress) => progress.status !== "new")
    .sort((a, b) => b.lastStudiedAt.localeCompare(a.lastStudiedAt))
    .slice(0, 6)
    .map((progress) => ({
      id: progress.wordId,
      lastStudiedAt: progress.lastStudiedAt,
      status: progress.status,
      word: progress.word.word,
    }));

  const startDate = addDays(referenceDate, -6);
  const weeklyCounts = new Map<string, number>();

  for (let index = 0; index < 7; index += 1) {
    weeklyCounts.set(getIsoDate(addDays(startDate, index)), 0);
  }

  for (const progress of validProgress) {
    const studiedDate = new Date(progress.lastStudiedAt);

    if (Number.isNaN(studiedDate.getTime())) {
      continue;
    }

    const isoDate = getIsoDate(studiedDate);

    if (weeklyCounts.has(isoDate)) {
      weeklyCounts.set(isoDate, (weeklyCounts.get(isoDate) ?? 0) + 1);
    }
  }

  const weeklyActivity = Array.from(weeklyCounts.entries()).map(([date, count]) => {
    const day = new Date(`${date}T00:00:00.000Z`);

    return {
      count,
      date,
      dayLabel: dayFormatter.format(day),
    };
  });

  return {
    overview: {
      completedToday,
      completedWords,
      dailyCompletionPercent: clampPercentage(completedToday, session.dailyGoal),
      dailyGoal: session.dailyGoal,
      difficultWords,
      learningWords,
      libraryCompletionPercent: clampPercentage(completedWords, totalWords),
      newWords,
      remainingToday: Math.max(session.dailyGoal - completedToday, 0),
      streak: session.streak,
      studiedWords,
      totalWords,
    },
    recentActivity,
    statusItems,
    weeklyActivity,
  };
}
