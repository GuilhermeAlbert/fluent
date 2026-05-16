import { cn } from "../../../../lib/styles";
import type { SettingsToggleProps } from "./types";

export function SettingsToggle({ checked, label, onChange }: SettingsToggleProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={cn(
        "flex h-8 w-[52px] items-center rounded-full p-1 transition",
        checked ? "bg-fluent-accent" : "bg-[#E5E7EB]",
      )}
      onClick={() => onChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={cn(
          "h-6 w-6 rounded-full bg-white shadow-sm transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}
