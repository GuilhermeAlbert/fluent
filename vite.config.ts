import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves this repository from /fluent/.
  // Keep this value in sync with the GitHub repository name.
  base: "/fluent/",
  plugins: [react()],
});
