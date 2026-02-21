import { useThemeEngine } from "react-tenant-theme";
import { InlineCode } from "../components/Inline";

export function Home() {
  const { tenant, theme } = useThemeEngine();

  return (
    <div className="article">
      <h1>React Tenant Theme</h1>
      <p className="subtitle">
        A production-ready theming engine for multi-tenant React applications.
        Designed for SaaS platforms that need dynamic branding, tenant-based themes,
        and scalable design tokens.
      </p>

      <h2>The Problem</h2>
      <p>
        In real-world SaaS apps, different customers (tenants) require their own
        branding and themes. Hardcoding styles quickly becomes unmaintainable, and
        many theming solutions become fragile at scale.
      </p>

      <h2>Architecture</h2>
      <p>
        <InlineCode>react-tenant-theme</InlineCode> uses a simple three-layer model:
        tenant → theme → tokens. Tokens are converted into scoped CSS variables
        (e.g. <InlineCode>--rt-color-primary</InlineCode>), so when the theme changes,
        variables update and the entire UI follows — without re-rendering components.
      </p>

      <div className="codeShell">
        <div className="codeHeader">
          <span>Structure</span>
        </div>
        <pre className="codePre" style={{ margin: 0, padding: "12px 14px" }}>
{`Tenant
   ├── Theme (light / dark / brand)
   │      └── Tokens (color-bg, color-primary, etc.)
   └── Default Theme

Tokens → CSS variables → entire UI updates instantly`}
        </pre>
      </div>

      <p>
        Your components stay static; the design system adapts dynamically via CSS.
      </p>

      <h2>Live context</h2>
      <p>
        This docs site is wired to the theme engine. Use the sidebar controls to
        switch tenant or theme — the layout and colors update automatically.
      </p>

      <div className="row" style={{ marginBottom: 18 }}>
        <span className="badge">Tenant: {tenant.name}</span>
        <span className="badge">Theme: {theme.name}</span>
      </div>

      <h2>Use cases</h2>
      <p>
        This approach fits well for:
      </p>
      <ul>
        <li>White-label SaaS dashboards</li>
        <li>Enterprise admin panels</li>
        <li>Multi-brand B2B platforms</li>
        <li>Internal enterprise tools</li>
        <li>Client-customizable UI systems</li>
      </ul>

      <h2>Why this approach?</h2>
      <ul>
        <li>No runtime style recalculation or CSS-in-JS overhead</li>
        <li>SSR-safe (Next.js compatible, no flash of default theme)</li>
        <li>Persistence built-in (localStorage)</li>
        <li>Scales across large SaaS dashboards and white-label products</li>
      </ul>
    </div>
  );
}
