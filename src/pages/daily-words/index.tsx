import { useNavigate } from "react-router-dom";
import { AppShell } from "../../components/layout/app-shell";
import { useDailyWordsData } from "../../hooks/use-daily-words-data";
import { DailyWordRow } from "./components/daily-word-row";
import { DailyWordsHeaderStats } from "./components/daily-words-header-stats";
import { DailyWordsToolbar } from "./components/daily-words-toolbar";

export function DailyWordsPage() {
  const navigate = useNavigate();
  const {
    copy,
    filter,
    items,
    preferences,
    progress,
    selectWordForStudy,
    setFilter,
    setLearningLanguage,
    setWordCompleted,
  } = useDailyWordsData();

  const handleSelectWord = (position: number) => {
    navigate(selectWordForStudy(position));
  };

  return (
    <AppShell
      copy={copy}
      description={copy.dailyWords.description}
      headerAside={<DailyWordsHeaderStats copy={copy} progress={progress} />}
      streak={progress.streak}
      title={copy.dailyWords.title}
    >
      <section className="overflow-hidden rounded-2xl border border-fluent-border bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
        <DailyWordsToolbar
          copy={copy}
          filter={filter}
          learningLanguage={preferences.learningLanguage}
          onFilterChange={setFilter}
          onLearningLanguageChange={setLearningLanguage}
          progress={progress}
        />

        {items.length ? (
          <div>
            {items.map((item) => (
              <DailyWordRow
                copy={copy}
                item={item}
                key={item.id}
                onSelect={handleSelectWord}
                onToggleCompleted={setWordCompleted}
              />
            ))}
          </div>
        ) : (
          <div className="px-6 py-14 text-center text-sm text-fluent-muted">
            {copy.dailyWords.noWords}
          </div>
        )}
      </section>
    </AppShell>
  );
}
