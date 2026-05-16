import {
  BarChart3,
  CalendarDays,
  Flame,
  Flag,
  Home,
  Search,
  Settings,
} from "lucide-react";
import { NavItem } from "./nav-item";
import type { SidebarNavItem } from "./types";

const navItems: SidebarNavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Daily Words", to: "/daily-words", icon: CalendarDays },
  { label: "Explorer", to: "/explorer", icon: Search },
  { label: "Difficult Words", to: "/difficult-words", icon: Flag },
  { label: "Progress", to: "/progress", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="border-fluent-border bg-fluent-background/95 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:flex md:w-[302px] md:flex-col md:border-r">
      <div className="flex items-center gap-4 px-6 py-6 md:px-12 md:pb-10 md:pt-11">
        <div
          aria-hidden="true"
          className="relative h-10 w-9 items-center justify-center"
        >
          <img src="./public/favicon.png" alt="Fluent Logo" />
        </div>

        <span className="text-[32px] font-semibold leading-none tracking-normal text-[#070B1A]">
          Fluent
        </span>
      </div>

      <nav
        aria-label="Main navigation"
        className="flex gap-2 overflow-x-auto px-5 pb-4 md:flex-1 md:flex-col md:gap-4 md:px-6"
      >
        {navItems.map((item) => (
          <NavItem item={item} key={item.to} />
        ))}
      </nav>

      <div className="hidden px-8 pb-12 md:block">
        <div className="flex w-[162px] items-center gap-4 rounded-2xl border border-fluent-border bg-white p-5 shadow-sm">
          <Flame
            aria-hidden="true"
            className="h-8 w-8 text-[#FF7A1A]"
            fill="#FF7A1A"
            strokeWidth={1.7}
          />
          <div>
            <p className="text-2xl font-semibold leading-none text-[#070B1A]">
              12
            </p>
            <p className="mt-1 text-sm leading-none text-fluent-muted">
              day streak
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
