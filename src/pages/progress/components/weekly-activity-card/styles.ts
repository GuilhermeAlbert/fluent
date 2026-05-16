export const weeklyActivityCardStyles = {
  root:
    "rounded-2xl border border-fluent-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]",
  header: "flex items-center justify-between gap-4",
  title: "text-lg font-semibold leading-6 text-[#070B1A]",
  meta: "text-sm font-medium text-fluent-muted",
  chart: "mt-6 grid h-[190px] grid-cols-7 items-end gap-3",
  barGroup: "flex h-full min-w-0 flex-col justify-end gap-2",
  barWrap: "flex min-h-[132px] items-end rounded-full bg-[#F3F4F6] p-1",
  bar:
    "w-full rounded-full bg-fluent-accent transition-all duration-500 ease-out",
  label: "truncate text-center text-xs font-medium text-fluent-muted",
};
