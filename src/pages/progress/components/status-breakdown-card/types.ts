import type { InterfaceCopy } from "../../../../lib/i18n";
import type { ProgressStatusItem } from "../../../../lib/progress";

export interface StatusBreakdownCardProps {
  copy: InterfaceCopy;
  items: ProgressStatusItem[];
}
