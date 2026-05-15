import type { VocabularyWord } from "../../types/word";

export interface MarkdownWordMetadata {
  word: string;
  language: string;
  pronunciation: string;
  difficulty: string;
  frequency_rank?: number;
  tags: string[];
}

export interface MarkdownWordDocument {
  metadata: MarkdownWordMetadata;
  content: string;
}

export type HomeWordSeed = VocabularyWord;
