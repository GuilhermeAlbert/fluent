import type { ButtonSize, ButtonVariant } from "./types";

export const buttonBaseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fluent-accent disabled:pointer-events-none disabled:opacity-50";

export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: "bg-fluent-accent text-white shadow-sm hover:bg-[#4338CA]",
  secondary:
    "border border-fluent-border bg-white text-fluent-text hover:border-[#D1D5DB] hover:bg-[#F9FAFB]",
  ghost: "text-fluent-muted hover:bg-[#F3F4F6] hover:text-fluent-text",
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};
