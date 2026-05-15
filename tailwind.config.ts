import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fluent: {
          background: "#FAFAF8",
          card: "#FFFFFF",
          text: "#111111",
          muted: "#6B7280",
          border: "#E5E7EB",
          accent: "#4F46E5",
          success: "#10B981",
          warning: "#F59E0B",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(17, 17, 17, 0.06)",
      },
    },
  },
  plugins: [],
} satisfies Config;
