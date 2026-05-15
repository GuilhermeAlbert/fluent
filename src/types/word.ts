export type WordDifficulty = "easy" | "medium" | "hard";

export type WordStatus = "new" | "learning" | "completed" | "difficult";

export interface WordExample {
  id: string;
  text: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  partOfSpeech: string;
  pronunciation: string;
  meaning: string;
  examples: WordExample[];
  difficulty: WordDifficulty;
  frequencyLabel: string;
  tags: string[];
  status: WordStatus;
}
