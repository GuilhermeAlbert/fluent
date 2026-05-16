import type { InterfaceCopy } from "../../../../lib/i18n";
import type { VocabularyWord } from "../../../../types/word";

export interface CurrentWordCardProps {
  copy: InterfaceCopy;
  onPlayPronunciation: () => void;
  word: VocabularyWord;
}
