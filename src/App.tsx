import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { SettingsPage } from "./pages/settings";

export default function App() {
  return (
    <HashRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<SettingsPage />} path="/settings" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </HashRouter>
  );
}
