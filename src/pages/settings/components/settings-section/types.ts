import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

export interface SettingsSectionProps {
  children: ReactNode;
  icon: ComponentType<LucideProps>;
  title: string;
}
