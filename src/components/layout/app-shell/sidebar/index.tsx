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

export function Sidebar({ copy, isOpen, onClose, streak }: SidebarProps) {
  const navItems: SidebarNavItem[] = [
    { label: copy.navigation.home, to: "/", icon: Home },
    { label: copy.navigation.dailyWords, to: "/daily-words", icon: CalendarDays },
    { label: copy.navigation.explorer, to: "/explorer", icon: Search },
    { label: copy.navigation.difficultWords, to: "/difficult-words", icon: Flag },
    { label: copy.navigation.progress, to: "/progress", icon: BarChart3 },
    { label: copy.navigation.settings, to: "/settings", icon: Settings },
  ];

  return (
    <>
      <button
        aria-label={copy.navigation.closeMenu}
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
            <img alt="Fluent logo" src={`${import.meta.env.BASE_URL}favicon.png`} />
          </div>

          <span className="text-[32px] font-semibold leading-none tracking-normal text-[#070B1A]">
            Fluent
          </span>

          <button
            aria-label={copy.navigation.closeMenu}
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
                {streak}
              </p>
              <p className="mt-1 text-sm leading-none text-fluent-muted">
                {copy.navigation.dayStreak}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
