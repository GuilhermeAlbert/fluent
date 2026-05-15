import { AppShell } from "../../components/layout/app-shell";
import { useHomeData } from "../../hooks/use-home-data";
import { CurrentWordCard } from "./components/current-word-card";
import { DailyProgressCard } from "./components/daily-progress-card";
import { QuickActions } from "./components/quick-actions";
import { RecentWords } from "./components/recent-words";
import { TodaySummary } from "./components/today-summary";

export function HomePage() {
  const { currentWord, dailyProgress, quickActions, recentWords, todaySummary } = useHomeData();

  return (
    <AppShell description="Build fluency, one word at a time." title="Home">
      <TodaySummary summary={todaySummary} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
        <CurrentWordCard word={currentWord} />

        <div className="space-y-6">
          <DailyProgressCard progress={dailyProgress} />
          <QuickActions actions={quickActions} />
        </div>
      </div>

      <div className="mt-6">
        <RecentWords words={recentWords} />
      </div>
    </AppShell>
  );
}
