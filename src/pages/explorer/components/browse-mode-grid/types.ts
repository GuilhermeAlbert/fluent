import type { ExplorerBrowseMode } from "../../../../lib/explorer";
import type { InterfaceCopy } from "../../../../lib/i18n";

export interface BrowseModeGridProps {
  activeMode: ExplorerBrowseMode;
  copy: InterfaceCopy;
  onSelectMode: (mode: ExplorerBrowseMode) => void;
}
