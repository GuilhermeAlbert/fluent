import { useState } from "react";
import { appShellStyles } from "./styles";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import type { AppShellProps } from "./types";

export function AppShell({ children, description, headerAside, title }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={appShellStyles.root}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className={appShellStyles.content}>
        <main className={appShellStyles.main}>
          <Header
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
