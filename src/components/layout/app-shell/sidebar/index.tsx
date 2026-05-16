import {
  BarChart3,
  CalendarDays,
  Flame,
  Flag,
  Home,
  Search,
  Settings,
  X,
} from "lucide-react";
import { cn } from "../../../../lib/styles";
import { NavItem } from "./nav-item";
import type { SidebarNavItem, SidebarProps } from "./types";

const navItems: SidebarNavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Daily Words", to: "/daily-words", icon: CalendarDays },
  { label: "Explorer", to: "/explorer", icon: Search },
  { label: "Difficult Words", to: "/difficult-words", icon: Flag },
  { label: "Progress", to: "/progress", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <button
        aria-label="Close navigation menu"
        className={cn(
          "fixed inset-0 z-40 bg-[#111111]/20 opacity-0 transition-opacity md:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
        )}
        onClick={onClose}
        type="button"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[302px] flex-col border-r border-fluent-border bg-fluent-background/95 backdrop-blur transition-transform duration-200 ease-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-4 px-6 py-6 md:px-12 md:pb-10 md:pt-11">
          <div
            aria-hidden="true"
            className="relative h-10 w-9 shrink-0 text-fluent-accent"
          >
            <img src="./public/favicon.png" alt="Fluent logo" />
          </div>

          <span className="text-[32px] font-semibold leading-none tracking-normal text-[#070B1A]">
            Fluent
          </span>

          <button
            aria-label="Close navigation menu"
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-fluent-border bg-white text-[#070B1A] shadow-sm md:hidden"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 pb-4 md:px-6"
        >
          {navItems.map((item) => (
            <NavItem item={item} key={item.to} onNavigate={onClose} />
          ))}
        </nav>

        <div className="px-8 pb-12">
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
    </>
  );
}
