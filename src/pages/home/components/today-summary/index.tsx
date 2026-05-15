import { CalendarDays, CheckCircle2, Target } from "lucide-react";
import { Card } from "../../../../components/card";
import type { TodaySummaryProps } from "./types";

export function TodaySummary({ summary }: TodaySummaryProps) {
  return (
    <Card className="mb-6" elevated padding="lg">
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-medium text-fluent-accent">{summary.focusLabel}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-fluent-muted">
            <CalendarDays aria-hidden="true" className="h-4 w-4" />
            {summary.dateLabel}
          </p>
        </div>

        <div className="border-t border-fluent-border pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <p className="flex items-center gap-2 text-sm text-fluent-muted">
            <Target aria-hidden="true" className="h-4 w-4 text-fluent-warning" />
            Daily goal
          </p>
          <p className="mt-2 text-2xl font-semibold text-fluent-text">
            {summary.wordsPlannedToday} words planned
          </p>
        </div>

        <div className="border-t border-fluent-border pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <p className="flex items-center gap-2 text-sm text-fluent-muted">
            <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-fluent-success" />
            Completed today
          </p>
          <p className="mt-2 text-2xl font-semibold text-fluent-text">
            {summary.completedToday} completed
          </p>
        </div>
      </div>
    </Card>
  );
}
