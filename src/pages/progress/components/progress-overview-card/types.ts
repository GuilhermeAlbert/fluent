import type { LucideIcon } from "lucide-react";

export interface ProgressOverviewCardProps {
  icon: LucideIcon;
  label: string;
  meta: string;
  tone?: "accent" | "success" | "warning" | "neutral";
  value: string | number;
}
