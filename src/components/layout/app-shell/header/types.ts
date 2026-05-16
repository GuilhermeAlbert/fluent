import type { ReactNode } from "react";
import type { InterfaceCopy } from "../../../../lib/i18n";

export interface HeaderProps {
  title: string;
  copy: InterfaceCopy;
  description?: string;
  children?: ReactNode;
  onMenuClick?: () => void;
}
