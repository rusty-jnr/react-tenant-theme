import type { TenantDefinition } from "react-tenant-theme";
import type { OrgConfigResponse } from "./orgConfig";

export function buildTenantsFromOrgConfig(cfg: OrgConfigResponse): TenantDefinition[] {
  return [
    {
      id: cfg.orgId,
      name: cfg.orgName,
      defaultThemeId: cfg.defaultThemeId,
      themes: [
        {
          id: "brand",
          name: "Brand",
          tokens: {
            "color-bg": cfg.colors.bg,
            "color-fg": cfg.colors.fg,
            "color-primary": cfg.colors.primary,

            // docs surfaces
            "color-surface-1": "rgba(255,255,255,0.04)",
            "color-surface-2": "rgba(255,255,255,0.07)",
            "color-border": "rgba(255,255,255,0.12)",
            "color-muted": "rgba(229,231,235,0.72)",
            "color-code-bg": "rgba(0,0,0,0.35)",

            // sizing
            "radius": 14,
          },
        },
        {
          id: "light",
          name: "Light",
          tokens: {
            "color-bg": "#ffffff",
            "color-fg": "#111827",
            "color-primary": cfg.colors.primary,

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
  ];
}