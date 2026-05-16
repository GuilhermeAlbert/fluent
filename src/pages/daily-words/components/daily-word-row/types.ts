import type { DailyWordItem } from "../../../../lib/daily-words";
import type { InterfaceCopy } from "../../../../lib/i18n";

export interface DailyWordRowProps {
  copy: InterfaceCopy;
  item: DailyWordItem;
  onSelect: (position: number) => void;
  onToggleCompleted: (wordId: string, completed: boolean) => void;
}
