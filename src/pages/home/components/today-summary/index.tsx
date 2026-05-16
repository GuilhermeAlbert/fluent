import { Flame } from "lucide-react";
import type { TodaySummaryProps } from "./types";

export function TodaySummary({ progress, summary }: TodaySummaryProps) {
  const percentage =
    summary.dailyGoal > 0
      ? Math.min(Math.max((summary.completedToday / summary.dailyGoal) * 100, 0), 100)
      : 0;

  return (
    <div className="hidden items-center gap-10 sm:flex">
      <div className="flex items-center gap-3">
        <Flame aria-hidden="true" className="h-8 w-8 text-fluent-accent" fill="#4F46E5" strokeWidth={1.6} />
        <div>
          <p className="text-2xl font-semibold leading-none text-[#070B1A]">{progress.streak}</p>
          <p className="mt-1 text-sm text-fluent-muted">day streak</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div
          aria-label={`${summary.completedToday} of ${summary.dailyGoal} words completed today`}
          className="relative h-12 w-12 rounded-full"
          role="img"
          style={{
            background: `conic-gradient(#4F46E5 ${percentage}%, #E5E7EB 0)`,
          }}
        >
          <div className="absolute inset-[7px] rounded-full bg-fluent-background" />
        </div>
        <div>
          <p className="text-lg font-medium leading-none text-[#374151]">
            {summary.completedToday} / {summary.dailyGoal}
          </p>
          <p className="mt-1 text-sm text-fluent-muted">today</p>
        </div>
      </div>
    </div>
  );
}
