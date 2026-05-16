import type {
  ExplorerBrowseMode,
  ExplorerLetterFilter,
} from "../../../../lib/explorer";
import type { InterfaceCopy } from "../../../../lib/i18n";
import type { VocabularyWord } from "../../../../types/word";

export interface AlphabetBrowserProps {
  alphabet: string[];
  browseMode: ExplorerBrowseMode;
  copy: InterfaceCopy;
  onSelectLetter: (letter: ExplorerLetterFilter) => void;
  onSelectWord: (wordId: string) => void;
  selectedLetter: ExplorerLetterFilter;
  totalWords: number;
  words: VocabularyWord[];
}
