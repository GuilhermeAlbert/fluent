import { AppShell } from "../../components/layout/app-shell";
import { useHomeData } from "../../hooks/use-home-data";
import { CurrentWordCard } from "./components/current-word-card";
import { ExamplesCard } from "./components/examples-card";
import { NotesCard } from "./components/notes-card";
import { StudyActions } from "./components/study-actions";
import { TodaySummary } from "./components/today-summary";

export function HomePage() {
  const {
    completeCurrentWord,
    copy,
    currentWord,
    dailyProgress,
    skipCurrentWord,
    speakCurrentWord,
    todaySummary,
  } = useHomeData();

  return (
    <AppShell
      copy={copy}
      headerAside={<TodaySummary copy={copy} progress={dailyProgress} summary={todaySummary} />}
      streak={dailyProgress.streak}
      title={copy.home.title}
    >
      <div className="space-y-6">
        <CurrentWordCard
          copy={copy}
          onPlayPronunciation={speakCurrentWord}
          word={currentWord}
        />

        <div className="grid gap-7 lg:grid-cols-2">
          <ExamplesCard copy={copy} examples={currentWord.examples} />
          <NotesCard copy={copy} note={currentWord.note} />
        </div>

        <StudyActions copy={copy} onNext={completeCurrentWord} onSkip={skipCurrentWord} />
      </div>
    </AppShell>
  );
}
