import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { InlineCode } from "../components/Inline";

export function AsyncOrgConfig() {
  return (
    <div className="article">
      <h1>Async org config</h1>
      <p className="subtitle">
        Load tenant branding from your backend after auth, then mount the theme provider.
        This avoids flash of the wrong theme and keeps a single source of truth for org settings.
      </p>

      <h2>When to use this pattern</h2>
      <p>
        In production SaaS, tenant identity and branding often come from your API: after the user
        logs in, you fetch org/tenant config (name, logo URL, colors, default theme). You don’t
        want to render the app with a hardcoded default and then swap — that causes a visible
        flash. Instead, fetch config first, build <InlineCode>TenantDefinition[]</InlineCode>, then
        mount <InlineCode>ThemeProvider</InlineCode> once. The first paint already has the correct
        tenant and theme.
      </p>

      <h2>The pattern in three steps</h2>
      <ol style={{ margin: "10px 0 18px 24px", color: "var(--rt-color-muted)", lineHeight: 1.75 }}>
        <li style={{ margin: "6px 0" }}>Fetch org config from your API (e.g. after auth).</li>
        <li style={{ margin: "6px 0" }}>Convert the response into <InlineCode>TenantDefinition[]</InlineCode> with a small adapter.</li>
        <li style={{ margin: "6px 0" }}>Render <InlineCode>ThemeProvider</InlineCode> only when config is ready; show a splash or skeleton until then.</li>
      </ol>

      <h2>Define your API shape</h2>
      <p>
        Your backend might return org id, display name, default theme, and a palette. Type that
        response so the rest of your code stays type-safe. This docs site uses a minimal shape:
      </p>

      <CodeBlock
        lang="ts"
        title="orgConfig.ts (types + fetch)"
        code={`export type OrgConfigResponse = {
  orgId: string;
  orgName: string;
  defaultThemeId: string;
  colors: {
    bg: string;
    fg: string;
    primary: string;
  };
};

export async function fetchOrgConfig(): Promise<OrgConfigResponse> {
  const res = await fetch("/api/org-config");
  if (!res.ok) throw new Error("Failed to load org config");
  return res.json();
}`}
      />

      <h2>Build tenants from config</h2>
      <p>
        Map your API response to <InlineCode>TenantDefinition[]</InlineCode>. You can build one
        tenant per org (as here) or merge multiple orgs into one list. Each theme’s
        <InlineCode>tokens</InlineCode> can come from the API (e.g. <InlineCode>colors.primary</InlineCode>)
        or from your design system (e.g. fixed light palette with org primary).
      </p>

      <CodeBlock
        lang="tsx"
        title="buildTenant.ts"
        code={`import type { TenantDefinition } from "react-tenant-theme";
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
            "color-surface-1": "rgba(255,255,255,0.04)",
            "color-surface-2": "rgba(255,255,255,0.07)",
            "color-border": "rgba(255,255,255,0.12)",
            "color-muted": "rgba(229,231,235,0.72)",
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
            "radius": 14,
          },
        },
      ],
    },
  ];
}`}
      />

      <h2>Bootloader: mount provider when ready</h2>
      <p>
        A small wrapper component fetches config, builds tenants, and renders the provider only
        after the data is ready. Until then, show a splash screen or skeleton. No theme is
        applied until the correct tenant and theme are known, so there’s no flash.
      </p>

      <CodeBlock
        lang="tsx"
        title="Boot.tsx"
        code={`import { useState, useEffect } from "react";
import { ThemeProvider } from "react-tenant-theme";
import type { TenantDefinition } from "react-tenant-theme";
import { fetchOrgConfig } from "./orgConfig";
import { buildTenantsFromOrgConfig } from "./buildTenant";

export function Boot() {
  const [tenants, setTenants] = useState<TenantDefinition[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchOrgConfig()
      .then((cfg) => setTenants(buildTenantsFromOrgConfig(cfg)))
      .catch(setError);
  }, []);

  if (error) return <div>Failed to load: {error.message}</div>;
  if (!tenants) return <SplashScreen />;

  return (
    <ThemeProvider
      tenants={tenants}
      initialTenantId={tenants[0].id}
      config={{ prefix: "rt" }}
    >
      <App />
    </ThemeProvider>
  );
}`}
      />

      <p>
        Mount <InlineCode>Boot</InlineCode> at the root instead of <InlineCode>ThemeProvider</InlineCode>.
        Your app tree only renders once the right theme is available.
      </p>

      <h2>Why this matters</h2>
      <ul>
        <li><strong>No flash of default theme</strong> — the first paint uses the tenant/theme from your API.</li>
        <li><strong>SSR-friendly</strong> — you can fetch config on the server and pass tenants into the provider for a fully server-rendered first load.</li>
        <li><strong>Enterprise branding</strong> — colors, logo, and default theme live in your backend; no redeploy to change a customer’s look.</li>
      </ul>

      <h2>In this docs site</h2>
      <p>
        This docs app uses <strong>static tenants</strong> in <InlineCode>main.tsx</InlineCode> so you can
        switch Acme vs Globex from the sidebar without an API. The <InlineCode>orgConfig</InlineCode> and
        <InlineCode>buildTenantsFromOrgConfig</InlineCode> modules in the repo are here to show the
        shape and adapter; you can reuse the same pattern in production with a real
        <InlineCode>/api/org-config</InlineCode> (or similar) endpoint.
      </p>

      <h2>Next steps</h2>
      <p>
        <Link to="/getting-started">Getting started</Link> — minimal setup with static tenants.{" "}
        <Link to="/multi-tenant">Multi-tenant</Link> — switching tenants and themes at runtime.
      </p>
    </div>
  );
}
