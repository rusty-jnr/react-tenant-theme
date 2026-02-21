import { Link } from "react-router-dom";
import { useThemeEngine } from "react-tenant-theme";
import { CodeBlock } from "../components/CodeBlock";
import { InlineCode } from "../components/Inline";

export function MultiTenant() {
  const { tenant, theme } = useThemeEngine();

  return (
    <div className="article">
      <h1>Multi-tenant</h1>
      <p className="subtitle">
        One app, many customers: each tenant gets its own branding and theme set.
        Switch tenant and theme from the sidebar to see this page update in real time.
      </p>

      <h2>What “multi-tenant” means here</h2>
      <p>
        A <strong>tenant</strong> is a customer or organization (e.g. Acme Inc, Globex Corp).
        Each tenant has its own list of <strong>themes</strong> (e.g. Light, Dark) and
        <strong> design tokens</strong> (colors, radius, etc.). The same React tree
        renders for every tenant; only the CSS variables change. No duplicate components
        or tenant-specific branches — just one codebase and a different token set per tenant.
      </p>

      <h2>Tenants in this docs site</h2>
      <p>
        This docs app is wired with two tenants so you can see the effect immediately:
      </p>
      <ul>
        <li>
          <strong>Acme Inc</strong> — blue primary (<InlineCode>#2563eb</InlineCode> / <InlineCode>#60a5fa</InlineCode> in dark).
        </li>
        <li>
          <strong>Globex Corp</strong> — purple primary (<InlineCode>#7c3aed</InlineCode> / <InlineCode>#c084fc</InlineCode> in dark), with a different surface and border palette.
        </li>
      </ul>
      <p>
        Each tenant has Light and Dark themes. Use the dropdowns in the sidebar to switch
        tenant and theme; the whole layout (background, text, links, code blocks, sidebar)
        updates because they all use <InlineCode>var(--rt-*)</InlineCode> tokens.
      </p>

      <h2>Live context</h2>
      <p>
        Right now you’re viewing:
      </p>
      <div className="row" style={{ marginBottom: 18 }}>
        <span className="badge">Tenant: {tenant.name}</span>
        <span className="badge">Theme: {theme.name}</span>
      </div>
      <p>
        Changing the tenant resets the theme to that tenant’s <InlineCode>defaultThemeId</InlineCode>.
        Changing the theme only affects the current tenant.
      </p>

      <h2>How it’s wired</h2>
      <p>
        Pass an array of <InlineCode>TenantDefinition</InlineCode> to <InlineCode>ThemeProvider</InlineCode> and
        an <InlineCode>initialTenantId</InlineCode>. Any component under the provider can call
        <InlineCode>useThemeEngine()</InlineCode> to read <InlineCode>tenant</InlineCode>, <InlineCode>theme</InlineCode>,
        <InlineCode>tenants</InlineCode>, <InlineCode>setTenant</InlineCode>, and <InlineCode>setTheme</InlineCode>.
      </p>

      <CodeBlock
        lang="tsx"
        title="Provider with multiple tenants"
        code={`const tenants: TenantDefinition[] = [
  {
    id: "acme",
    name: "Acme Inc",
    defaultThemeId: "light",
    themes: [
      { id: "light", name: "Light", tokens: { "color-primary": "#2563eb", ... } },
      { id: "dark", name: "Dark", tokens: { "color-primary": "#60a5fa", ... } }
    ]
  },
  {
    id: "globex",
    name: "Globex Corp",
    defaultThemeId: "light",
    themes: [
      { id: "light", name: "Light", tokens: { "color-primary": "#7c3aed", ... } },
      { id: "dark", name: "Dark", tokens: { "color-primary": "#c084fc", ... } }
    ]
  }
];

<ThemeProvider tenants={tenants} initialTenantId="acme" config={{ prefix: "rt" }}>
  <App />
</ThemeProvider>`}
      />

      <CodeBlock
        lang="tsx"
        title="Switcher component"
        code={`import { useThemeEngine } from "react-tenant-theme";

export function TenantThemeSwitcher() {
  const { tenants, tenant, theme, setTenant, setTheme } = useThemeEngine();

  return (
    <>
      <select
        value={tenant.id}
        onChange={(e) => setTenant(e.target.value)}
      >
        {tenants.map((t) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
      <select
        value={theme.id}
        onChange={(e) => setTheme(e.target.value)}
      >
        {tenant.themes.map((th) => (
          <option key={th.id} value={th.id}>{th.name}</option>
        ))}
      </select>
    </>
  );
}`}
      />

      <h2>Why this scales</h2>
      <ul>
        <li>Design tokens are centralized per tenant; no scattered hex codes or magic strings.</li>
        <li>UI components stay stateless and token-driven; they don’t need to know which tenant is active.</li>
        <li>Theme and tenant switches only update CSS variables, so layout and logic don’t re-render unnecessarily.</li>
        <li>Easy to plug in backend org config: fetch tenant list and tokens from your API, then pass them into the provider (see <Link to="/async">Async config</Link>).</li>
      </ul>

      <h2>Next steps</h2>
      <p>
        <Link to="/async">Async org config</Link> — load tenant definitions from an API (e.g. after auth) and mount the provider only when config is ready, avoiding flash and enabling per-org branding from your backend.
      </p>
    </div>
  );
}
