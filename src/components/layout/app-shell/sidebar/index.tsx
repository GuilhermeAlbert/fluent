import {
  BarChart3,
  BookOpen,
  CalendarDays,
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
    <aside className="border-fluent-border bg-fluent-background/95 backdrop-blur md:fixed md:inset-y-0 md:left-0 md:flex md:w-72 md:flex-col md:border-r">
      <div className="flex items-center gap-3 px-5 py-5 md:px-8 md:py-7">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-fluent-accent text-white">
          <img src="./public/favicon.png" alt="Fluent logo" draggable="false" />
        </div>

        <span className="text-xl font-semibold tracking-normal text-fluent-text">
          Fluent
        </span>
      </div>

      <nav
        aria-label="Main navigation"
        className="flex gap-2 overflow-x-auto px-5 pb-4 md:flex-1 md:flex-col md:px-6"
      >
        {navItems.map((item) => (
          <NavItem item={item} key={item.to} />
        ))}
      </nav>

      <div className="hidden px-6 pb-7 md:block">
        <div className="rounded-2xl border border-fluent-border bg-white p-4">
          <p className="text-sm font-semibold text-fluent-text">4 day streak</p>
          <p className="mt-1 text-xs leading-5 text-fluent-muted">
            A quiet rhythm is building.
          </p>
        </div>
      </div>
    </aside>
  );
}
