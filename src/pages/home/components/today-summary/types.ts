import type { InterfaceCopy } from "../../../../lib/i18n";
import type { DailyProgress, TodaySummary } from "../../../../types/progress";

export interface TodaySummaryProps {
  copy: InterfaceCopy;
  summary: TodaySummary;
  progress: DailyProgress;
}
