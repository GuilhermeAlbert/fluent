import { BookmarkPlus, MoveRight, Volume2 } from "lucide-react";
import { Badge } from "../../../../components/badge";
import { Button } from "../../../../components/button";
import { Card } from "../../../../components/card";
import type { WordStatus } from "../../../../types/word";
import type { CurrentWordCardProps } from "./types";

const statusLabels: Record<WordStatus, string> = {
  new: "New word",
  learning: "Learning",
  completed: "Completed",
  difficult: "Difficult",
};

export function CurrentWordCard({ word }: CurrentWordCardProps) {
  return (
    <Card className="h-full" elevated padding="lg">
      <div className="flex flex-col gap-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge variant="accent">{statusLabels[word.status]}</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-normal text-fluent-text sm:text-5xl">
              {word.word}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-fluent-muted">
              <span className="text-lg">{word.pronunciation}</span>
              <Badge variant="neutral">{word.partOfSpeech}</Badge>
            </div>
          </div>

          <button
            aria-label={`Play pronunciation for ${word.word}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-fluent-border bg-white text-fluent-text transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
            type="button"
          >
            <Volume2 aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <p className="max-w-xl text-lg leading-8 text-fluent-muted">{word.meaning}</p>

        <div className="border-t border-fluent-border pt-6">
          <p className="text-sm font-semibold text-fluent-text">Examples</p>
          <ul className="mt-4 space-y-3">
            {word.examples.map((example) => (
              <li className="flex gap-3 text-sm leading-6 text-fluent-text" key={example.id}>
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fluent-accent" />
                <span>{example.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-fluent-border pt-6 sm:flex-row">
          <Button className="sm:flex-1" icon={<MoveRight aria-hidden="true" className="h-4 w-4" />}>
            Continue learning
          </Button>
          <Button
            className="sm:flex-1"
            icon={<BookmarkPlus aria-hidden="true" className="h-4 w-4" />}
            variant="secondary"
          >
            Mark as difficult
          </Button>
        </div>
      </div>
    </Card>
  );
}
