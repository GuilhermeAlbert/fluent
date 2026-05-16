export const dailyWordRowStyles = {
  root:
    "grid min-h-[76px] grid-cols-[28px_42px_1fr_36px] items-center gap-3 border-b border-fluent-border px-4 py-4 last:border-b-0 sm:grid-cols-[34px_48px_minmax(180px,260px)_1fr_42px] sm:gap-5 sm:px-5",
  current: "bg-[#F7F6FF]",
  position: "text-sm font-medium text-[#475467]",
  toggle:
    "grid h-9 w-9 place-items-center rounded-full text-[#9CA3AF] transition hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-fluent-accent/20",
  toggleCompleted: "bg-[#ECFDF3] text-[#22C55E] hover:bg-[#DCFCE7]",
  wordGroup: "min-w-0",
  wordLine: "flex min-w-0 flex-wrap items-center gap-3",
  word: "text-lg font-semibold leading-6 text-[#070B1A]",
  badge: "rounded-lg bg-[#EFECFF] px-3 py-1 text-xs font-medium text-fluent-accent",
  currentBadge: "rounded-lg bg-white px-3 py-1 text-xs font-medium text-[#475467]",
  meaning: "hidden text-[15px] leading-6 text-[#475467] sm:block",
  action:
    "grid h-9 w-9 place-items-center rounded-full text-[#475467] transition hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-fluent-accent/20",
};
