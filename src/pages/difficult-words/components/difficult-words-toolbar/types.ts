import type { DifficultWordsFilter } from "../../../../lib/difficult-words";
import type { InterfaceCopy } from "../../../../lib/i18n";
import type { LearningLanguage } from "../../../../types/settings";

export interface DifficultWordsToolbarProps {
  copy: InterfaceCopy;
  filter: DifficultWordsFilter;
  learningLanguage: LearningLanguage;
  onFilterChange: (filter: DifficultWordsFilter) => void;
  onLearningLanguageChange: (language: LearningLanguage) => void;
  onQueryChange: (query: string) => void;
  query: string;
}
