import { NavLink } from "react-router-dom";
import { cn } from "../../../../../lib/styles";
import type { NavItemProps } from "./types";

export function NavItem({ item, onNavigate }: NavItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex h-[58px] min-w-fit items-center gap-5 rounded-2xl px-5 text-[17px] font-medium transition md:w-full",
          isActive
            ? "bg-[#EFECFF] text-fluent-accent"
            : "text-[#111827] hover:bg-white hover:text-fluent-accent",
        )
      }
      onClick={onNavigate}
      to={item.to}
    >
      <Icon aria-hidden="true" className="h-6 w-6 shrink-0" strokeWidth={2} />
      <span>{item.label}</span>
    </NavLink>
  );
}
