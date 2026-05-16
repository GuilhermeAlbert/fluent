import type { HomeSessionSnapshot } from "../session";
import type { StorageWordProgress } from "../storage/types";
import type { VocabularyWord } from "../../types/word";

export type DifficultWordsFilter = "all" | "marked" | "hard";

export type DifficultWordReason = "marked" | "hard";

export interface DifficultWordItem {
  id: string;
  difficulty: VocabularyWord["difficulty"];
  frequencyLabel: string;
  isMarkedDifficult: boolean;
  lastStudiedAt: string | null;
  meaning: string;
  partOfSpeech: string;
  pronunciation: string;
  reason: DifficultWordReason;
  status: VocabularyWord["status"];
  tags: string[];
  word: string;
}

export interface CreateDifficultWordItemsOptions {
  filter: DifficultWordsFilter;
  query: string;
  session: HomeSessionSnapshot;
  words: VocabularyWord[];
}

export interface DifficultWordStudyTarget {
  route: "/";
  session: HomeSessionSnapshot;
}

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function createProgress(
  wordId: string,
  status: StorageWordProgress["status"],
  storedAt: string,
): StorageWordProgress {
  return {
    wordId,
    status,
    lastStudiedAt: storedAt,
    completedToday: false,
  };
}

function countCompletedToday(wordProgress: HomeSessionSnapshot["wordProgress"]) {
  return Object.values(wordProgress).filter((progress) => progress.completedToday).length;
}

function matchesQuery(word: VocabularyWord, query: string) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableValues = [
    word.word,
    word.meaning,
    word.partOfSpeech,
    word.frequencyLabel,
    ...word.tags,
    ...word.examples.map((example) => example.text),
  ];

  return searchableValues.some((value) =>
    normalizeSearchValue(value).includes(normalizedQuery),
  );
}

export function createDifficultWordItems({
  filter,
  query,
  session,
  words,
}: CreateDifficultWordItemsOptions): DifficultWordItem[] {
  return words
    .filter((word) => {
      const isMarkedDifficult = session.wordProgress[word.id]?.status === "difficult";
      const isHard = word.difficulty === "hard";

      if (filter === "marked") {
        return isMarkedDifficult;
      }

      if (filter === "hard") {
        return isHard;
      }

      return isMarkedDifficult || isHard;
    })
    .filter((word) => matchesQuery(word, query))
    .map((word) => {
      const progress = session.wordProgress[word.id];
      const isMarkedDifficult = progress?.status === "difficult";
      const reason: DifficultWordReason = isMarkedDifficult ? "marked" : "hard";

      return {
        id: word.id,
        difficulty: word.difficulty,
        frequencyLabel: word.frequencyLabel,
        isMarkedDifficult,
        lastStudiedAt: progress?.lastStudiedAt ?? null,
        meaning: word.meaning,
        partOfSpeech: word.partOfSpeech,
        pronunciation: word.pronunciation,
        reason,
        status: progress?.status ?? word.status,
        tags: word.tags,
        word: word.word,
      };
    })
    .sort((a, b) => {
      if (a.isMarkedDifficult !== b.isMarkedDifficult) {
        return a.isMarkedDifficult ? -1 : 1;
      }

      if (a.lastStudiedAt && b.lastStudiedAt && a.lastStudiedAt !== b.lastStudiedAt) {
        return b.lastStudiedAt.localeCompare(a.lastStudiedAt);
      }

      return a.word.localeCompare(b.word);
    });
}

export function setDifficultWordStatus(
  state: HomeSessionSnapshot,
  wordId: string,
  isDifficult: boolean,
  storedAt: string,
): HomeSessionSnapshot {
  const wordProgress = {
    ...state.wordProgress,
    [wordId]: createProgress(wordId, isDifficult ? "difficult" : "learning", storedAt),
  };
  const completedToday = Math.min(countCompletedToday(wordProgress), state.dailyGoal);

  return {
    ...state,
    completedToday,
    streak: completedToday > 0 ? 1 : 0,
    wordProgress,
  };
}

export function selectDifficultWordForStudy(
  state: HomeSessionSnapshot,
  wordId: string,
  words: VocabularyWord[],
): DifficultWordStudyTarget {
  const wordIndex = words.findIndex((word) => word.id === wordId);

  return {
    route: "/",
    session: wordIndex >= 0 ? { ...state, currentWordIndex: wordIndex } : state,
  };
}
