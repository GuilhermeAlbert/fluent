import type { BadgeVariant } from "./types";

export const badgeBaseClasses =
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-none";

export const badgeVariantClasses: Record<BadgeVariant, string> = {
  accent: "bg-[#EEF2FF] text-fluent-accent",
  success: "bg-[#ECFDF5] text-[#047857]",
  warning: "bg-[#FFFBEB] text-[#B45309]",
  neutral: "bg-[#F3F4F6] text-fluent-muted",
};
