import type { InterfaceCopy } from "../../../../lib/i18n";
import type { VocabularyWord } from "../../../../types/word";

export interface ExplorerWordRowProps {
  copy: InterfaceCopy;
  onSelect: (wordId: string) => void;
  word: VocabularyWord;
}
