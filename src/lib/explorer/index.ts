import type { HomeSessionSnapshot } from "../session";
import type { VocabularyWord, WordDifficulty } from "../../types/word";

export type ExplorerBrowseMode = "alphabet" | "categories" | "tags" | "difficulty" | "frequency";
export type ExplorerDifficultyFilter = "all" | WordDifficulty;
export type ExplorerLetterFilter = "all" | string;

export interface ExplorerFilters {
  difficulty: ExplorerDifficultyFilter;
  letter: ExplorerLetterFilter;
  query: string;
}

export interface ExplorerStudyTarget {
  route: "/";
  session: HomeSessionSnapshot;
}

export const explorerAlphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
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

function matchesLetter(word: VocabularyWord, letter: ExplorerLetterFilter) {
  if (letter === "all") {
    return true;
  }

  return normalizeSearchValue(word.word).startsWith(letter);
}

export function filterExplorerWords(
  words: VocabularyWord[],
  filters: ExplorerFilters,
): VocabularyWord[] {
  return words
    .filter((word) => matchesQuery(word, filters.query))
    .filter((word) => matchesLetter(word, filters.letter))
    .filter((word) => filters.difficulty === "all" || word.difficulty === filters.difficulty)
    .sort((a, b) => a.word.localeCompare(b.word));
}

export function getExplorerTags(words: VocabularyWord[]): string[] {
  return Array.from(new Set(words.flatMap((word) => word.tags))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function selectExplorerWordForStudy(
  state: HomeSessionSnapshot,
  wordId: string,
  words: VocabularyWord[],
): ExplorerStudyTarget {
  const wordIndex = words.findIndex((word) => word.id === wordId);

  return {
    route: "/",
    session: wordIndex >= 0 ? { ...state, currentWordIndex: wordIndex } : state,
  };
}
