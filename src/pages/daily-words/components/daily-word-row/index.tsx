import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "../../../../lib/styles";
import { dailyWordRowStyles } from "./styles";
import type { DailyWordRowProps } from "./types";

export function DailyWordRow({
  copy,
  item,
  onSelect,
  onToggleCompleted,
}: DailyWordRowProps) {
  return (
    <div className={cn(dailyWordRowStyles.root, item.isCurrent ? dailyWordRowStyles.current : "")}>
      <p className={dailyWordRowStyles.position}>{item.position}</p>

      <button
        aria-label={
          item.isCompleted
            ? copy.dailyWords.markIncomplete(item.word)
            : copy.dailyWords.markComplete(item.word)
        }
        className={cn(
          dailyWordRowStyles.toggle,
          item.isCompleted ? dailyWordRowStyles.toggleCompleted : "",
        )}
        onClick={() => onToggleCompleted(item.id, !item.isCompleted)}
        type="button"
      >
        {item.isCompleted ? (
          <Check aria-hidden="true" className="h-5 w-5" strokeWidth={2.6} />
        ) : (
          <Circle aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
        )}
      </button>

      <div className={dailyWordRowStyles.wordGroup}>
        <div className={dailyWordRowStyles.wordLine}>
          <p className={dailyWordRowStyles.word}>{item.word}</p>
          <span className={dailyWordRowStyles.badge}>{item.partOfSpeech}</span>
          {item.isCurrent ? (
            <span className={dailyWordRowStyles.currentBadge}>{copy.dailyWords.current}</span>
          ) : null}
        </div>
        <p className="mt-1 text-sm leading-5 text-[#475467] sm:hidden">{item.meaning}</p>
      </div>

      <p className={dailyWordRowStyles.meaning}>{item.meaning}</p>

      <button
        aria-label={copy.dailyWords.openWord(item.word)}
        className={dailyWordRowStyles.action}
        onClick={() => onSelect(item.position)}
        type="button"
      >
        <ChevronRight aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
}
