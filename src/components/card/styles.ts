import type { CardPadding } from "./types";

export const cardBaseClasses = "rounded-2xl border border-fluent-border bg-fluent-card";

export const cardPaddingClasses: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};
