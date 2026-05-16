import { appShellStyles } from "./styles";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import type { AppShellProps } from "./types";

export function AppShell({ children, description, headerAside, title }: AppShellProps) {
  return (
    <div className={appShellStyles.root}>
      <Sidebar />
      <div className={appShellStyles.content}>
        <main className={appShellStyles.main}>
          <Header description={description} title={title}>
            {headerAside}
          </Header>
          {children}
        </main>
      </div>
    </div>
  );
}
