import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "react-tenant-theme";
import type { TenantDefinition } from "react-tenant-theme";

const tenants: TenantDefinition[] = [
  {
    id: "acme",
    name: "Acme Inc",
    defaultThemeId: "light",
    themes: [
      {
        id: "dark",
        name: "Dark",
        tokens: {
          "color-bg": "#0b1020",
          "color-fg": "#e5e7eb",
          "color-primary": "#60a5fa",
          "color-surface-1": "rgba(255,255,255,0.04)",
          "color-surface-2": "rgba(255,255,255,0.07)",
          "color-border": "rgba(255,255,255,0.12)",
          "color-muted": "rgba(229,231,235,0.72)",
          "color-code-bg": "rgba(0,0,0,0.35)",
          "radius": 14,
        },
      },
      {
        id: "light",
        name: "Light",
        tokens: {
          "color-bg": "#ffffff",
          "color-fg": "#111827",
          "color-primary": "#2563eb",
          "color-surface-1": "#ffffff",
          "color-surface-2": "#f8fafc",
          "color-border": "#e5e7eb",
          "color-muted": "#6b7280",
          "color-code-bg": "#0b10201a",
          "radius": 14,
        },
      },
    ],
  },
  {
    id: "globex",
    name: "Globex Corp",
    defaultThemeId: "light",
    themes: [
      {
        id: "light",
        name: "Light",
        tokens: {
          "color-bg": "#ffffff",
          "color-fg": "#0f172a",
          "color-primary": "#7c3aed",
          "color-surface-1": "#ffffff",
          "color-surface-2": "#faf5ff",
          "color-border": "#e9d5ff",
          "color-muted": "#6b7280",
          "color-code-bg": "#2e106514",
          "radius": 14,
        },
      },
      {
        id: "dark",
        name: "Dark",
        tokens: {
          "color-bg": "#0f0b1a",
          "color-fg": "#f1f5f9",
          "color-primary": "#c084fc",
          "color-surface-1": "rgba(255,255,255,0.04)",
          "color-surface-2": "rgba(255,255,255,0.07)",
          "color-border": "rgba(255,255,255,0.12)",
          "color-muted": "rgba(241,245,249,0.72)",
          "color-code-bg": "rgba(0,0,0,0.35)",
          "radius": 14,
        },
      },
    ],
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider tenants={tenants} initialTenantId="acme" config={{ prefix: "rt" }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);