import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import type { InterfaceCopy } from "../../../../lib/i18n";

export interface SidebarNavItem {
  label: string;
  to: string;
  icon: ComponentType<LucideProps>;
}

export interface SidebarProps {
  copy: InterfaceCopy;
  isOpen: boolean;
  onClose: () => void;
}
