import type { HomeSessionSnapshot } from "../session";
import type { StorageWordProgress } from "../storage/types";
import type { VocabularyWord, WordStatus } from "../../types/word";

export type DailyWordsFilter = "all" | "remaining" | "completed";

export interface DailyWordItem {
  id: string;
  position: number;
  word: string;
  partOfSpeech: string;
  meaning: string;
  status: WordStatus;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface CreateDailyWordItemsOptions {
  filter: DailyWordsFilter;
  session: HomeSessionSnapshot;
  words: VocabularyWord[];
}

export interface DailyWordStudyTarget {
  route: "/";
  session: HomeSessionSnapshot;
}

function createProgress(
  wordId: string,
  status: StorageWordProgress["status"],
  storedAt: string,
  completedToday: boolean,
): StorageWordProgress {
  return {
    wordId,
    status,
    lastStudiedAt: storedAt,
    completedToday,
  };
}

function countCompletedToday(wordProgress: HomeSessionSnapshot["wordProgress"]) {
  return Object.values(wordProgress).filter((progress) => progress.completedToday).length;
}

export function countCompletedDailyWords(
  session: HomeSessionSnapshot,
  words: VocabularyWord[],
): number {
  const plannedWordIds = new Set(words.slice(0, session.dailyGoal).map((word) => word.id));

  return Object.values(session.wordProgress).filter(
    (progress) => plannedWordIds.has(progress.wordId) && progress.completedToday,
  ).length;
}

export function createDailyWordItems({
  filter,
  session,
  words,
}: CreateDailyWordItemsOptions): DailyWordItem[] {
  const plannedWords = words.slice(0, session.dailyGoal);

  return plannedWords
    .map((word, index) => {
      const progress = session.wordProgress[word.id];
      const isCompleted = progress?.completedToday === true;

      return {
        id: word.id,
        position: index + 1,
        word: word.word,
        partOfSpeech: word.partOfSpeech,
        meaning: word.meaning,
        status: progress?.status ?? word.status,
        isCompleted,
        isCurrent: index === session.currentWordIndex,
      };
    })
    .filter((item) => {
      if (filter === "completed") {
        return item.isCompleted;
      }

      if (filter === "remaining") {
        return !item.isCompleted;
      }

      return true;
    });
}

export function setDailyWordCompleted(
  state: HomeSessionSnapshot,
  wordId: string,
  completed: boolean,
  storedAt: string,
): HomeSessionSnapshot {
  const wordProgress = {
    ...state.wordProgress,
    [wordId]: createProgress(wordId, completed ? "completed" : "learning", storedAt, completed),
  };
  const completedToday = Math.min(countCompletedToday(wordProgress), state.dailyGoal);

  return {
    ...state,
    completedToday,
    streak: completedToday > 0 ? 1 : 0,
    wordProgress,
  };
}

export function setCurrentDailyWord(
  state: HomeSessionSnapshot,
  currentWordIndex: number,
): HomeSessionSnapshot {
  return {
    ...state,
    currentWordIndex: Math.max(0, Math.min(currentWordIndex, state.dailyGoal - 1)),
  };
}

export function selectDailyWordForStudy(
  state: HomeSessionSnapshot,
  position: number,
): DailyWordStudyTarget {
  return {
    route: "/",
    session: setCurrentDailyWord(state, position - 1),
  };
}
