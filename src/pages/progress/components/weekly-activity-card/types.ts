import type { InterfaceCopy } from "../../../../lib/i18n";
import type { ProgressWeeklyActivityItem } from "../../../../lib/progress";
import type { InterfaceLanguage } from "../../../../types/settings";

export interface WeeklyActivityCardProps {
  copy: InterfaceCopy;
  interfaceLanguage: InterfaceLanguage;
  items: ProgressWeeklyActivityItem[];
}
