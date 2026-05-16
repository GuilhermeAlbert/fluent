import { useNavigate } from "react-router-dom";
import { AppShell } from "../../components/layout/app-shell";
import { useExplorerData } from "../../hooks/use-explorer-data";
import { AlphabetBrowser } from "./components/alphabet-browser";
import { BrowseModeGrid } from "./components/browse-mode-grid";
import { ExplorerControls } from "./components/explorer-controls";
import { ExplorerHeaderStats } from "./components/explorer-header-stats";

export function ExplorerPage() {
  const navigate = useNavigate();
  const {
    alphabet,
    browseMode,
    copy,
    difficulty,
    filteredWords,
    preferences,
    progress,
    query,
    selectedLetter,
    setBrowseMode,
    setDifficulty,
    setLearningLanguage,
    setQuery,
    setSelectedLetter,
    selectWordForStudy,
    totalWords,
  } = useExplorerData();

  const handleSelectWord = (wordId: string) => {
    navigate(selectWordForStudy(wordId));
  };

  return (
    <AppShell
      copy={copy}
      description={copy.explorer.description}
      headerAside={<ExplorerHeaderStats copy={copy} progress={progress} />}
      streak={progress.streak}
      title={copy.explorer.title}
    >
      <div className="space-y-8">
        <ExplorerControls
          copy={copy}
          difficulty={difficulty}
          learningLanguage={preferences.learningLanguage}
          onDifficultyChange={setDifficulty}
          onLearningLanguageChange={setLearningLanguage}
          onQueryChange={setQuery}
          query={query}
        />

        <BrowseModeGrid activeMode={browseMode} copy={copy} onSelectMode={setBrowseMode} />

        <AlphabetBrowser
          alphabet={alphabet}
          browseMode={browseMode}
          copy={copy}
          onSelectLetter={setSelectedLetter}
          onSelectWord={handleSelectWord}
          selectedLetter={selectedLetter}
          totalWords={totalWords}
          words={filteredWords}
        />
      </div>
    </AppShell>
  );
}
