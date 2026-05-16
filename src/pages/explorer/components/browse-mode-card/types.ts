import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import type { ExplorerBrowseMode } from "../../../../lib/explorer";

export interface BrowseModeCardProps {
  icon: ComponentType<LucideProps>;
  isActive: boolean;
  hint: string;
  mode: ExplorerBrowseMode;
  onSelect: (mode: ExplorerBrowseMode) => void;
  title: string;
}
