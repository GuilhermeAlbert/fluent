import { useNavigate } from "react-router-dom";
import { AppShell } from "../../components/layout/app-shell";
import { useDifficultWordsData } from "../../hooks/use-difficult-words-data";
import { DifficultWordsEmptyState } from "./components/difficult-words-empty-state";
import { DifficultWordsHeaderStats } from "./components/difficult-words-header-stats";
import { DifficultWordsReviewCard } from "./components/difficult-words-review-card";
import { DifficultWordsToolbar } from "./components/difficult-words-toolbar";
import { DifficultWordRow } from "./components/difficult-word-row";

export function DifficultWordsPage() {
  const navigate = useNavigate();
  const {
    copy,
    filter,
    items,
    preferences,
    progress,
    query,
    selectWordForStudy,
    setFilter,
    setLearningLanguage,
    setQuery,
    setWordDifficult,
    stats,
  } = useDifficultWordsData();
  const firstWordId = items[0]?.id ?? null;

  const handleSelectWord = (wordId: string) => {
    navigate(selectWordForStudy(wordId));
  };

  return (
    <AppShell
      copy={copy}
      description={copy.difficultWords.description}
      headerAside={
        <DifficultWordsHeaderStats copy={copy} progress={progress} stats={stats} />
      }
      streak={progress.streak}
      title={copy.difficultWords.title}
    >
      <div className="space-y-6">
        <DifficultWordsReviewCard
          copy={copy}
          firstWordId={firstWordId}
          onStartReview={handleSelectWord}
          stats={stats}
        />

        <DifficultWordsToolbar
          copy={copy}
          filter={filter}
          learningLanguage={preferences.learningLanguage}
          onFilterChange={setFilter}
          onLearningLanguageChange={setLearningLanguage}
          onQueryChange={setQuery}
          query={query}
        />

        <section className="overflow-hidden rounded-2xl border border-fluent-border bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
          {items.length ? (
            <div>
              {items.map((item) => (
                <DifficultWordRow
                  copy={copy}
                  item={item}
                  key={item.id}
                  onSelect={handleSelectWord}
                  onSetDifficult={setWordDifficult}
                />
              ))}
            </div>
          ) : (
            <DifficultWordsEmptyState
              copy={copy}
              onBrowseWords={() => navigate("/explorer")}
            />
          )}
        </section>
      </div>
    </AppShell>
  );
}
