import type { HTMLAttributes } from "react";

export type BadgeVariant = "accent" | "success" | "warning" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}
