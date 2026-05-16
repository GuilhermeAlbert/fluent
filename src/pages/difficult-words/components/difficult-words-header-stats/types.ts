import type { InterfaceCopy } from "../../../../lib/i18n";
import type { DifficultWordsStats } from "../../../../hooks/use-difficult-words-data";
import type { DailyProgress } from "../../../../types/progress";

export interface DifficultWordsHeaderStatsProps {
  copy: InterfaceCopy;
  progress: DailyProgress;
  stats: DifficultWordsStats;
}
