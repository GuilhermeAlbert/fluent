import type { DailyWordsFilter } from "../../../../lib/daily-words";
import type { InterfaceCopy } from "../../../../lib/i18n";
import type { DailyProgress } from "../../../../types/progress";
import type { LearningLanguage } from "../../../../types/settings";

export interface DailyWordsToolbarProps {
  copy: InterfaceCopy;
  filter: DailyWordsFilter;
  learningLanguage: LearningLanguage;
  onFilterChange: (filter: DailyWordsFilter) => void;
  onLearningLanguageChange: (language: LearningLanguage) => void;
  progress: DailyProgress;
}
