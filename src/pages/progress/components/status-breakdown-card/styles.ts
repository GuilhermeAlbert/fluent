export const statusBreakdownCardStyles = {
  root:
    "rounded-2xl border border-fluent-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]",
  title: "text-lg font-semibold leading-6 text-[#070B1A]",
  list: "mt-6 space-y-5",
  row: "space-y-2",
  rowHeader: "flex items-center justify-between gap-4 text-sm",
  labelGroup: "flex items-center gap-3",
  dot: "h-2.5 w-2.5 rounded-full",
  label: "font-medium text-[#344054]",
  value: "font-semibold text-[#070B1A]",
  track: "h-2 overflow-hidden rounded-full bg-[#EEF0F3]",
  fill: "h-full rounded-full transition-all duration-500 ease-out",
};

export const statusDotClasses = {
  completed: "bg-fluent-success",
  difficult: "bg-fluent-warning",
  learning: "bg-fluent-accent",
  new: "bg-[#CBD5E1]",
};

export const statusFillClasses = {
  completed: "bg-fluent-success",
  difficult: "bg-fluent-warning",
  learning: "bg-fluent-accent",
  new: "bg-[#CBD5E1]",
};
