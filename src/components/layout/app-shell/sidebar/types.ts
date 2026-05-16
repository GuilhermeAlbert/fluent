import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

export interface SidebarNavItem {
  label: string;
  to: string;
  icon: ComponentType<LucideProps>;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}
