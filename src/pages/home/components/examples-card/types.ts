import type { InterfaceCopy } from "../../../../lib/i18n";
import type { WordExample } from "../../../../types/word";

export interface ExamplesCardProps {
  copy: InterfaceCopy;
  examples: WordExample[];
}
