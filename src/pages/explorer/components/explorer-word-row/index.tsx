import { ChevronRight } from "lucide-react";
import type { WordDifficulty } from "../../../../types/word";
import { explorerWordRowStyles } from "./styles";
import type { ExplorerWordRowProps } from "./types";

const difficultyDotClasses: Record<WordDifficulty, string> = {
  easy: "bg-[#55C95A]",
  medium: "bg-fluent-warning",
  hard: "bg-red-500",
};

export function ExplorerWordRow({ copy, onSelect, word }: ExplorerWordRowProps) {
  return (
    <div className={explorerWordRowStyles.root}>
      <div className={explorerWordRowStyles.wordGroup}>
        <div className={explorerWordRowStyles.wordLine}>
          <p className={explorerWordRowStyles.word}>{word.word}</p>
          <span className={explorerWordRowStyles.badge}>{word.partOfSpeech}</span>
        </div>
        <p className="mt-1 text-sm leading-5 text-[#475467] sm:hidden">{word.meaning}</p>
      </div>

      <p className={explorerWordRowStyles.meaning}>{word.meaning}</p>

      <div className={explorerWordRowStyles.difficulty}>
        <span className={`${explorerWordRowStyles.dot} ${difficultyDotClasses[word.difficulty]}`} />
        <span>{copy.common.difficulty[word.difficulty]}</span>
      </div>

      <button
        aria-label={copy.explorer.openWord(word.word)}
        className={explorerWordRowStyles.action}
        onClick={() => onSelect(word.id)}
        type="button"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
}
