import { cn } from "../../../../lib/styles";
import type { SettingsRowProps } from "./types";

export function SettingsRow({
  action,
  description,
  icon: Icon,
  title,
  tone = "default",
}: SettingsRowProps) {
  return (
    <div className="grid gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[34px_1fr_auto] sm:items-center">
      <Icon
        aria-hidden="true"
        className={cn("h-6 w-6", tone === "danger" ? "text-red-500" : "text-fluent-muted")}
      />
      <div>
        <p className="font-semibold text-[#070B1A]">{title}</p>
        <p className="mt-1 text-sm leading-5 text-fluent-muted">{description}</p>
      </div>
      {action ? <div className="sm:justify-self-end">{action}</div> : null}
    </div>
  );
}
