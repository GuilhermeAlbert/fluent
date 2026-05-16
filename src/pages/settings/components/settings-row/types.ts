import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

export interface SettingsRowProps {
  action?: ReactNode;
  description: string;
  icon: ComponentType<LucideProps>;
  tone?: "default" | "danger";
  title: string;
}
