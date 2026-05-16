import { useState } from "react";
import { appShellStyles } from "./styles";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import type { AppShellProps } from "./types";

export function AppShell({
  children,
  copy,
  description,
  headerAside,
  streak = 0,
  title,
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={appShellStyles.root}>
      <Sidebar
        copy={copy}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        streak={streak}
      />
      <div className={appShellStyles.content}>
        <main className={appShellStyles.main}>
          <Header
            copy={copy}
            description={description}
            onMenuClick={() => setIsSidebarOpen(true)}
            title={title}
          >
            {headerAside}
          </Header>
          {children}
        </main>
      </div>
    </div>
  );
}
