import { ChevronDown } from "lucide-react";
import { cn } from "../../../../lib/styles";
import { ExplorerWordRow } from "../explorer-word-row";
import { alphabetBrowserStyles } from "./styles";
import type { AlphabetBrowserProps } from "./types";

function getPanelTitle(copy: AlphabetBrowserProps["copy"], mode: AlphabetBrowserProps["browseMode"]) {
  if (mode === "categories") {
    return copy.explorer.categories;
  }

  if (mode === "tags") {
    return copy.explorer.tags;
  }

  if (mode === "difficulty") {
    return copy.explorer.difficulty;
  }

  if (mode === "frequency") {
    return copy.explorer.frequency;
  }

  return copy.explorer.browseByAlphabet;
}

export function AlphabetBrowser({
  alphabet,
  browseMode,
  copy,
  onSelectLetter,
  onSelectWord,
  selectedLetter,
  totalWords,
  words,
}: AlphabetBrowserProps) {
  const summaryTitle =
    selectedLetter === "all"
      ? copy.explorer.wordsCount(words.length)
      : copy.explorer.wordsStartingWith(selectedLetter);

  return (
    <section className={alphabetBrowserStyles.root}>
      <div className="space-y-5">
        <h2 className={alphabetBrowserStyles.title}>{getPanelTitle(copy, browseMode)}</h2>

        {browseMode === "alphabet" ? (
          <div className={alphabetBrowserStyles.alphabet}>
            <button
              className={cn(
                alphabetBrowserStyles.letter,
                selectedLetter === "all" ? alphabetBrowserStyles.letterActive : "",
              )}
              onClick={() => onSelectLetter("all")}
              type="button"
            >
              {copy.explorer.all}
            </button>
            {alphabet.map((letter) => (
              <button
                className={cn(
                  alphabetBrowserStyles.letter,
                  selectedLetter === letter ? alphabetBrowserStyles.letterActive : "",
                )}
                key={letter}
                onClick={() => onSelectLetter(letter)}
                type="button"
              >
                {letter.toUpperCase()}
              </button>
            ))}
          </div>
        ) : null}

        <div className={alphabetBrowserStyles.summary}>
          <h3 className={alphabetBrowserStyles.summaryTitle}>{summaryTitle}</h3>
          <p className={alphabetBrowserStyles.summaryCount}>{copy.explorer.wordsCount(words.length)}</p>
        </div>

        {words.length ? (
          <div>
            {words.map((word) => (
              <ExplorerWordRow copy={copy} key={word.id} onSelect={onSelectWord} word={word} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-sm text-fluent-muted">
            {copy.explorer.noWords}
          </div>
        )}

        <button className={alphabetBrowserStyles.viewAll} onClick={() => onSelectLetter("all")} type="button">
          {copy.explorer.viewAllWords(totalWords)}
          <ChevronDown aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
