import type { InterfaceCopy } from "../../../../lib/i18n";
import type { ProgressActivityItem } from "../../../../lib/progress";
import type { InterfaceLanguage } from "../../../../types/settings";

export interface RecentActivityCardProps {
  copy: InterfaceCopy;
  interfaceLanguage: InterfaceLanguage;
  items: ProgressActivityItem[];
}
