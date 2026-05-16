import { AppShell } from "../../components/layout/app-shell";
import { useHomeData } from "../../hooks/use-home-data";
import { CurrentWordCard } from "./components/current-word-card";
import { ExamplesCard } from "./components/examples-card";
import { NotesCard } from "./components/notes-card";
import { StudyActions } from "./components/study-actions";
import { TodaySummary } from "./components/today-summary";

export function HomePage() {
  const { currentWord, dailyProgress, todaySummary } = useHomeData();

  return (
    <AppShell
      headerAside={<TodaySummary progress={dailyProgress} summary={todaySummary} />}
      title="Today’s Word"
    >
      <div className="space-y-6">
        <CurrentWordCard word={currentWord} />

        <div className="grid gap-7 lg:grid-cols-2">
          <ExamplesCard examples={currentWord.examples} />
          <NotesCard note={currentWord.note} />
        </div>

        <StudyActions />
      </div>
    </AppShell>
  );
}
