import { ArrowUpRight, BarChart3, Grid2X2, ListFilter, Tags } from "lucide-react";
import type { ExplorerBrowseMode } from "../../../../lib/explorer";
import { BrowseModeCard } from "../browse-mode-card";
import type { BrowseModeGridProps } from "./types";

export function BrowseModeGrid({ activeMode, copy, onSelectMode }: BrowseModeGridProps) {
  const modes: Array<{
    hint: string;
    icon: typeof ListFilter;
    mode: ExplorerBrowseMode;
    title: string;
  }> = [
    {
      hint: copy.explorer.alphabetHint,
      icon: ListFilter,
      mode: "alphabet",
      title: copy.explorer.alphabet,
    },
    {
      hint: copy.explorer.categoriesHint,
      icon: Grid2X2,
      mode: "categories",
      title: copy.explorer.categories,
    },
    {
      hint: copy.explorer.tagsHint,
      icon: Tags,
      mode: "tags",
      title: copy.explorer.tags,
    },
    {
      hint: copy.explorer.difficultyHint,
      icon: BarChart3,
      mode: "difficulty",
      title: copy.explorer.difficulty,
    },
    {
      hint: copy.explorer.frequencyHint,
      icon: ArrowUpRight,
      mode: "frequency",
      title: copy.explorer.frequency,
    },
  ];

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-semibold text-[#070B1A]">{copy.explorer.browseBy}</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {modes.map((mode) => (
          <BrowseModeCard
            hint={mode.hint}
            icon={mode.icon}
            isActive={activeMode === mode.mode}
            key={mode.mode}
            mode={mode.mode}
            onSelect={onSelectMode}
            title={mode.title}
          />
        ))}
      </div>
    </section>
  );
}
