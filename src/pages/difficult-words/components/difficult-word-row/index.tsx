import { ArrowRight, Flag, X } from "lucide-react";
import { cn } from "../../../../lib/styles";
import { difficultWordRowStyles } from "./styles";
import type { DifficultWordRowProps } from "./types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
});

function formatLastStudied(lastStudiedAt: string | null) {
  if (!lastStudiedAt) {
    return null;
  }

  const date = new Date(lastStudiedAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return dateFormatter.format(date);
}

export function DifficultWordRow({
  copy,
  item,
  onSelect,
  onSetDifficult,
}: DifficultWordRowProps) {
  const lastStudiedLabel = formatLastStudied(item.lastStudiedAt);
  const reasonLabel = item.reason === "marked"
    ? copy.difficultWords.reasonMarked
    : copy.difficultWords.reasonHard;

  return (
    <div className={difficultWordRowStyles.root}>
      <div className={difficultWordRowStyles.wordGroup}>
        <div className={difficultWordRowStyles.wordLine}>
          <p className={difficultWordRowStyles.word}>{item.word}</p>
          <span className={difficultWordRowStyles.badge}>{item.partOfSpeech}</span>
        </div>
        {item.pronunciation ? (
          <p className={difficultWordRowStyles.pronunciation}>{item.pronunciation}</p>
        ) : null}
      </div>

      <div>
        <p className={difficultWordRowStyles.meaning}>{item.meaning}</p>
        <div className={difficultWordRowStyles.meta}>
          <span
            className={cn(
              item.reason === "marked"
                ? difficultWordRowStyles.reason
                : difficultWordRowStyles.hardReason,
            )}
          >
            {reasonLabel}
          </span>
          <span>{copy.common.difficulty[item.difficulty]}</span>
          <span>
            {copy.difficultWords.lastStudied}:{" "}
            {lastStudiedLabel ?? copy.difficultWords.notStudiedYet}
          </span>
          {item.tags.slice(0, 2).map((tag) => (
            <span className={difficultWordRowStyles.tag} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className={difficultWordRowStyles.actions}>
        {item.isMarkedDifficult ? (
          <button
            aria-label={copy.difficultWords.removeDifficult(item.word)}
            className={difficultWordRowStyles.secondaryAction}
            onClick={() => onSetDifficult(item.id, false)}
            type="button"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        ) : (
          <button
            aria-label={copy.difficultWords.markDifficult(item.word)}
            className={difficultWordRowStyles.secondaryAction}
            onClick={() => onSetDifficult(item.id, true)}
            type="button"
          >
            <Flag aria-hidden="true" className="h-4 w-4" />
          </button>
        )}

        <button
          aria-label={copy.difficultWords.studyWord(item.word)}
          className={difficultWordRowStyles.primaryAction}
          onClick={() => onSelect(item.id)}
          type="button"
        >
          <span>{copy.difficultWords.startReview}</span>
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
