import { Badge } from "../../../../components/badge";
import { Card } from "../../../../components/card";
import type { WordStatus } from "../../../../types/word";
import type { RecentWordsProps } from "./types";

const statusCopy: Record<WordStatus, string> = {
  new: "New",
  learning: "Learning",
  completed: "Completed",
  difficult: "Difficult",
};

const statusVariant: Record<WordStatus, "accent" | "success" | "warning" | "neutral"> = {
  new: "accent",
  learning: "accent",
  completed: "success",
  difficult: "warning",
};

export function RecentWords({ words }: RecentWordsProps) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-fluent-text">Recent words</h2>
          <p className="mt-1 text-sm text-fluent-muted">A short trail of recent study.</p>
        </div>
      </div>

      <div className="divide-y divide-fluent-border">
        {words.map((word) => (
          <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0" key={word.id}>
            <div>
              <p className="font-medium text-fluent-text">{word.word}</p>
              <p className="mt-1 text-sm text-fluent-muted">Last studied {word.lastStudiedLabel}</p>
            </div>
            <Badge variant={statusVariant[word.status]}>{statusCopy[word.status]}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
