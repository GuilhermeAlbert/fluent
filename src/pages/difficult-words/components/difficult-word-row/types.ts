import type { DifficultWordItem } from "../../../../lib/difficult-words";
import type { InterfaceCopy } from "../../../../lib/i18n";

export interface DifficultWordRowProps {
  copy: InterfaceCopy;
  item: DifficultWordItem;
  onSelect: (wordId: string) => void;
  onSetDifficult: (wordId: string, isDifficult: boolean) => void;
}
