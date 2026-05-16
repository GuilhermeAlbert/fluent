import type { ReactNode } from "react";
import type { InterfaceCopy } from "../../../lib/i18n";

export interface AppShellProps {
  children: ReactNode;
  copy: InterfaceCopy;
  description?: string;
  headerAside?: ReactNode;
  streak?: number;
  title: string;
}
