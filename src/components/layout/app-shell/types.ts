import type { ReactNode } from "react";
import type { InterfaceCopy } from "../../../lib/i18n";

export interface AppShellProps {
  children: ReactNode;
  title: string;
  description?: string;
  headerAside?: ReactNode;
  copy: InterfaceCopy;
}
