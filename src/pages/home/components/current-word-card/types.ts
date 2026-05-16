import type { VocabularyWord } from "../../../../types/word";

export interface CurrentWordCardProps {
  onPlayPronunciation: () => void;
  word: VocabularyWord;
}
