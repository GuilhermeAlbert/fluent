import { BookOpen, CheckCircle2, Languages, Target } from "lucide-react";
import { ProgressBar } from "../../../../components/progress-bar";
import { ProgressOverviewCard } from "../progress-overview-card";
import type { ProgressOverviewGridProps } from "./types";

export function ProgressOverviewGrid({
  copy,
  learningLanguage,
  overview,
}: ProgressOverviewGridProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
      <article className="rounded-2xl border border-fluent-border bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-fluent-muted">
              {copy.progress.todayGoal}
            </p>
            <h2 className="mt-2 text-3xl font-semibold leading-none text-[#070B1A]">
              {overview.completedToday} / {overview.dailyGoal}
            </h2>
          </div>
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#DDD6FE] bg-[#F5F3FF] text-fluent-accent">
            <Target aria-hidden="true" className="h-5 w-5" />
          </span>
        </div>
        <div className="mt-6">
          <ProgressBar
            label={copy.progress.completedToday(overview.completedToday, overview.dailyGoal)}
            max={overview.dailyGoal}
            value={overview.completedToday}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="font-medium text-[#344054]">
            {overview.dailyCompletionPercent}%
          </span>
          <span className="text-fluent-muted">
            {overview.remainingToday} {copy.progress.remainingToday.toLowerCase()}
          </span>
        </div>
      </article>

      <ProgressOverviewCard
        icon={BookOpen}
        label={copy.progress.studiedWords}
        meta={copy.progress.studiedOfTotal(overview.studiedWords, overview.totalWords)}
        tone="accent"
        value={overview.studiedWords}
      />

      <ProgressOverviewCard
        icon={CheckCircle2}
        label={copy.progress.completedWords}
        meta={`${overview.libraryCompletionPercent}% ${copy.progress.completionRate.toLowerCase()}`}
        tone="success"
        value={overview.completedWords}
      />

      <ProgressOverviewCard
        icon={Languages}
        label={copy.progress.activeLanguage}
        meta={copy.progress.words(overview.totalWords)}
        tone="neutral"
        value={copy.common.languageNames[learningLanguage]}
      />
    </section>
  );
}
