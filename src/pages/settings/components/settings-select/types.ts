import type { SelectHTMLAttributes } from "react";

export interface SettingsSelectOption<TValue extends string | number> {
  label: string;
  value: TValue;
}

export interface SettingsSelectProps<TValue extends string | number>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  options: Array<SettingsSelectOption<TValue>>;
  value: TValue;
  onChange: (value: TValue) => void;
}
