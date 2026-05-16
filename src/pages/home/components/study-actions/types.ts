import type { InterfaceCopy } from "../../../../lib/i18n";

export interface StudyActionsProps {
  copy: InterfaceCopy;
  onMarkDifficult: () => void;
  onNext: () => void;
  onSkip: () => void;
}
