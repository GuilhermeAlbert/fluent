import type { ExplorerDifficultyFilter } from "../../../../lib/explorer";
import type { InterfaceCopy } from "../../../../lib/i18n";
import type { LearningLanguage } from "../../../../types/settings";

export interface ExplorerControlsProps {
  copy: InterfaceCopy;
  difficulty: ExplorerDifficultyFilter;
  learningLanguage: LearningLanguage;
  onDifficultyChange: (difficulty: ExplorerDifficultyFilter) => void;
  onLearningLanguageChange: (language: LearningLanguage) => void;
  onQueryChange: (query: string) => void;
  query: string;
}
