import { ChevronDown } from "lucide-react";
import type { SettingsSelectProps } from "./types";

export function SettingsSelect<TValue extends string | number>({
  className,
  onChange,
  options,
  value,
  ...props
}: SettingsSelectProps<TValue>) {
  return (
    <label className="relative block w-full sm:w-[154px]">
      <select
        className="h-[51px] w-full appearance-none rounded-xl border border-fluent-border bg-white px-4 pr-10 text-base text-[#070B1A] outline-none transition hover:border-[#D1D5DB] focus:border-fluent-accent focus:ring-2 focus:ring-[#EEF2FF]"
        onChange={(event) => {
          const nextValue = options.find((option) => String(option.value) === event.target.value)
            ?.value;

          if (nextValue !== undefined) {
            onChange(nextValue);
          }
        }}
        value={String(value)}
        {...props}
      >
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fluent-muted"
      />
    </label>
  );
}
