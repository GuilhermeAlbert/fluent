import { cn } from "../../lib/styles";
import { badgeBaseClasses, badgeVariantClasses } from "./styles";
import type { BadgeProps } from "./types";

export function Badge({ children, className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span className={cn(badgeBaseClasses, badgeVariantClasses[variant], className)} {...props}>
      {children}
    </span>
  );
}
