import { NavLink } from "react-router-dom";
import { cn } from "../../../../../lib/styles";
import type { NavItemProps } from "./types";

export function NavItem({ item }: NavItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex h-11 min-w-fit items-center gap-3 rounded-xl px-3 text-sm font-medium transition md:w-full",
          isActive
            ? "bg-[#EEF2FF] text-fluent-accent"
            : "text-fluent-muted hover:bg-white hover:text-fluent-text",
        )
      }
      to={item.to}
    >
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
      <span>{item.label}</span>
    </NavLink>
  );
}
