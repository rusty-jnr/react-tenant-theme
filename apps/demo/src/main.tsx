import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "react-tenant-theme";
import type { TenantDefinition } from "react-tenant-theme";

const tenants: TenantDefinition[] = [
  {
    id: "acme",
    name: "Acme Inc",
    defaultThemeId: "light",
    themes: [
      {
        id: "light",
        name: "Light",
        tokens: {
          "color-bg": "#ffffff",
          "color-fg": "#111111",
          "color-primary": "#2563eb"
        }
      },
      {
        id: "dark",
        name: "Dark",
        tokens: {
          "color-bg": "#0b1020",
          "color-fg": "#e5e7eb",
          "color-primary": "#60a5fa"
        }
      }
    ]
  },
  {
    id: "globex",
    name: "Globex",
    defaultThemeId: "brand",
    themes: [
      {
        id: "brand",
        name: "Globex Brand",
        tokens: {
          "color-bg": "#fff7ed",
          "color-fg": "#1f2937",
          "color-primary": "#f97316"
        }
      }
    ]
  }
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider tenants={tenants} initialTenantId="acme" config={{ prefix: "te" }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);