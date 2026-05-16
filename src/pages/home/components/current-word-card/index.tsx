import { BarChart3, Tag, Volume2 } from "lucide-react";
import { Badge } from "../../../../components/badge";
import { Card } from "../../../../components/card";
import type { WordStatus } from "../../../../types/word";
import type { CurrentWordCardProps } from "./types";

const statusLabels: Record<WordStatus, string> = {
  new: "New word",
  learning: "Learning",
  completed: "Completed",
  difficult: "Difficult",
};

const difficultyLabels = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function CurrentWordCard({ onPlayPronunciation, word }: CurrentWordCardProps) {
  return (
    <Card className="min-h-[488px] shadow-sm" padding="lg">
      <div className="flex h-full flex-col items-center justify-center py-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-fluent-accent">
          {statusLabels[word.status]}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <h2 className="text-6xl font-semibold leading-none tracking-normal text-[#070B1A] sm:text-[86px]">
            {word.word}
          </h2>
          <button
            aria-label={`Play pronunciation for ${word.word}`}
            className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-2xl border border-fluent-border bg-white text-[#070B1A] transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB]"
            onClick={onPlayPronunciation}
            type="button"
          >
            <Volume2 aria-hidden="true" className="h-7 w-7" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <span className="text-[29px] leading-none text-fluent-muted">{word.pronunciation}</span>
          <Badge className="px-5 py-2 text-base" variant="accent">
            {word.partOfSpeech}
          </Badge>
        </div>

        <p className="mt-10 max-w-[520px] text-center text-[22px] leading-9 text-[#4B5563]">
          {word.meaning}
        </p>

        <div className="mt-8 h-px w-full max-w-[488px] bg-fluent-border" />

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-9 gap-y-3 text-base text-fluent-muted">
          <Badge className="px-6 py-3 text-sm text-[#228B22]" variant="success">
            {difficultyLabels[word.difficulty]}
          </Badge>
          <span className="flex items-center gap-3">
            <BarChart3 aria-hidden="true" className="h-5 w-5" />
            {word.frequencyLabel}
          </span>
          <span className="flex items-center gap-3">
            <Tag aria-hidden="true" className="h-5 w-5" />
            {word.tags.join(", ")}
          </span>
        </div>
      </div>
    </Card>
  );
}
