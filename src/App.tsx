import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { DailyWordsPage } from "./pages/daily-words";
import { ExplorerPage } from "./pages/explorer";
import { HomePage } from "./pages/home";
import { SettingsPage } from "./pages/settings";

export default function App() {
  return (
    <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<DailyWordsPage />} path="/daily-words" />
        <Route element={<ExplorerPage />} path="/explorer" />
        <Route element={<SettingsPage />} path="/settings" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </HashRouter>
  );
}
