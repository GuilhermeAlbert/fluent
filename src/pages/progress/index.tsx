import { AppShell } from "../../components/layout/app-shell";
import { useProgressData } from "../../hooks/use-progress-data";
import { ProgressHeaderStats } from "./components/progress-header-stats";
import { ProgressOverviewGrid } from "./components/progress-overview-grid";
import { RecentActivityCard } from "./components/recent-activity-card";
import { StatusBreakdownCard } from "./components/status-breakdown-card";
import { WeeklyActivityCard } from "./components/weekly-activity-card";

export function ProgressPage() {
  const { copy, dashboard, preferences, progress } = useProgressData();

  return (
    <AppShell
      copy={copy}
      description={copy.progress.description}
      headerAside={<ProgressHeaderStats copy={copy} overview={dashboard.overview} />}
      streak={progress.streak}
      title={copy.progress.title}
    >
      <div className="space-y-6">
        <ProgressOverviewGrid
          copy={copy}
          learningLanguage={preferences.learningLanguage}
          overview={dashboard.overview}
        />

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <StatusBreakdownCard copy={copy} items={dashboard.statusItems} />
          <WeeklyActivityCard
            copy={copy}
            interfaceLanguage={preferences.interfaceLanguage}
            items={dashboard.weeklyActivity}
          />
        </div>

        <RecentActivityCard
          copy={copy}
          interfaceLanguage={preferences.interfaceLanguage}
          items={dashboard.recentActivity}
        />
      </div>
    </AppShell>
  );
}
