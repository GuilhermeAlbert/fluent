import { Flame, ListChecks, TimerReset } from "lucide-react";
import { Card } from "../../../../components/card";
import { ProgressBar } from "../../../../components/progress-bar";
import type { DailyProgressCardProps } from "./types";

export function DailyProgressCard({ progress }: DailyProgressCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-fluent-muted">Daily progress</p>
          <h2 className="mt-2 text-xl font-semibold text-fluent-text">
            {progress.completed} of {progress.planned} words completed
          </h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF2FF] text-fluent-accent">
          <ListChecks aria-hidden="true" className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-6">
        <ProgressBar
          label={`${progress.completed} of ${progress.planned} words completed`}
          max={progress.planned}
          value={progress.completed}
        />
      </div>

      <div className="mt-6 space-y-4 border-t border-fluent-border pt-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-fluent-muted">
            <TimerReset aria-hidden="true" className="h-4 w-4" />
            Remaining words
          </span>
          <span className="font-medium text-fluent-text">{progress.remaining}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="flex items-center gap-2 text-fluent-muted">
            <Flame aria-hidden="true" className="h-4 w-4 text-fluent-warning" />
            Daily streak
          </span>
          <span className="font-medium text-fluent-text">{progress.streak} day streak</span>
        </div>
      </div>
    </Card>
  );
}
