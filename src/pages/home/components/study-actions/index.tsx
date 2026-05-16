import { ArrowRight, RotateCcw } from "lucide-react";

export function StudyActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_1.08fr]">
      <button
        className="grid h-[77px] grid-cols-[58px_1fr_58px] items-center rounded-2xl border border-fluent-border bg-white px-3 text-center text-base font-semibold text-fluent-muted shadow-sm transition hover:border-[#D1D5DB] hover:text-[#070B1A]"
        type="button"
      >
        <span className="flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-fluent-border bg-white text-fluent-muted">
          <RotateCcw aria-hidden="true" className="h-5 w-5" />
        </span>
        <span>Skip</span>
        <span />
      </button>

      <button
        className="grid h-[77px] grid-cols-[58px_1fr_58px] items-center rounded-2xl bg-fluent-accent px-3 text-center text-lg font-semibold text-white shadow-sm transition hover:bg-[#4338CA]"
        type="button"
      >
        <span />
        <span>Next Word</span>
        <ArrowRight aria-hidden="true" className="justify-self-center h-7 w-7" />
      </button>
    </div>
  );
}
