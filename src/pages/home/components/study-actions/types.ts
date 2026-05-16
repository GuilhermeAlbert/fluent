import type { InterfaceCopy } from "../../../../lib/i18n";

export interface StudyActionsProps {
  copy: InterfaceCopy;
  onNext: () => void;
  onSkip: () => void;
}
