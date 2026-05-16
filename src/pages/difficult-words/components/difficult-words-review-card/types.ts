import type { InterfaceCopy } from "../../../../lib/i18n";
import type { DifficultWordsStats } from "../../../../hooks/use-difficult-words-data";

export interface DifficultWordsReviewCardProps {
  copy: InterfaceCopy;
  firstWordId: string | null;
  onStartReview: (wordId: string) => void;
  stats: DifficultWordsStats;
}
