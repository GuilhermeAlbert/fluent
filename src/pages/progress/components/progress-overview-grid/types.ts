import type { InterfaceCopy } from "../../../../lib/i18n";
import type { ProgressOverview } from "../../../../lib/progress";
import type { LearningLanguage } from "../../../../types/settings";

export interface ProgressOverviewGridProps {
  copy: InterfaceCopy;
  learningLanguage: LearningLanguage;
  overview: ProgressOverview;
}
