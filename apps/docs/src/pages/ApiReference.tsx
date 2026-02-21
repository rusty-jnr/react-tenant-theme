import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { InlineCode } from "../components/Inline";

export function ApiReference() {
  return (
    <div className="article">
      <h1>API Reference</h1>
      <p className="subtitle">
        Exports, types, and behavior of <InlineCode>react-tenant-theme</InlineCode>.
      </p>

      <h2>ThemeProvider</h2>
      <p>
        Wraps your app (or a subtree) and provides the current tenant, theme, and setters.
        Apply tokens and persist selection only after hydration to avoid flash and SSR mismatches.
      </p>

      <CodeBlock
        lang="tsx"
        title="Usage"
        code={`import { ThemeProvider } from "react-tenant-theme";

<ThemeProvider
  tenants={tenants}
  initialTenantId="acme"
  config={{ prefix: "rt", scope: ":root" }}
>
  <App />
</ThemeProvider>`}
      />

      <h3>Props</h3>
      <ul>
        <li><strong>tenants</strong> — <InlineCode>TenantDefinition[]</InlineCode>. At least one tenant required.</li>
        <li><strong>initialTenantId</strong> — <InlineCode>string</InlineCode>. Tenant id used before hydration or when no persisted state exists.</li>
        <li><strong>config</strong> — <InlineCode>ThemeEngineConfig</InlineCode> (optional). <InlineCode>prefix</InlineCode> and <InlineCode>scope</InlineCode> for CSS variables.</li>
        <li><strong>children</strong> — <InlineCode>React.ReactNode</InlineCode>.</li>
      </ul>

      <h2>useThemeEngine</h2>
      <p>
        Hook to read and update the current tenant and theme. Must be used inside <InlineCode>ThemeProvider</InlineCode>.
      </p>

      <CodeBlock
        lang="tsx"
        title="Return value"
        code={`const {
  tenant,    // TenantDefinition — current tenant
  theme,     // ThemeDefinition — current theme for that tenant
  tenants,   // TenantDefinition[] — full list (e.g. for a tenant dropdown)
  setTenant, // (tenantId: string) => void — switch tenant; resets to tenant's defaultThemeId
  setTheme,  // (themeId: string) => void — switch theme for current tenant
} = useThemeEngine();`}
      />

      <h2>Types</h2>

      <h3>TenantDefinition</h3>
      <CodeBlock
        lang="ts"
        title="Type"
        code={`type TenantDefinition = {
  id: string;
  name: string;
  defaultThemeId: string;  // id of the theme to use when this tenant is selected
  themes: ThemeDefinition[];
};`}
      />

      <h3>ThemeDefinition</h3>
      <CodeBlock
        lang="ts"
        title="Type"
        code={`type ThemeDefinition = {
  id: string;
  name: string;
  tokens: ThemeTokens;  // Record<string, string | number>
};`}
      />

      <h3>ThemeTokens</h3>
      <p>
        A flat object of token names to values. Keys become CSS variable names (with optional prefix);
        values are written as strings (numbers are coerced). Example: <InlineCode>{"{ \"color-primary\": \"#2563eb\", \"radius\": 14 }"}</InlineCode>.
      </p>

      <h3>ThemeEngineConfig</h3>
      <CodeBlock
        lang="ts"
        title="Type"
        code={`type ThemeEngineConfig = {
  prefix?: string;  // e.g. "rt" → --rt-color-primary (default: no prefix)
  scope?: string;   // CSS selector to apply variables (default: ":root")
};`}
      />

      <h2>Config</h2>
      <p>
        Pass <InlineCode>config</InlineCode> to <InlineCode>ThemeProvider</InlineCode> to control how tokens are applied:
      </p>
      <ul>
        <li><strong>prefix</strong> — Prepended to every token name when setting CSS variables. Token <InlineCode>color-primary</InlineCode> with <InlineCode>prefix: "rt"</InlineCode> becomes <InlineCode>--rt-color-primary</InlineCode>. Use this to avoid clashing with other systems.</li>
        <li><strong>scope</strong> — DOM selector for the element that receives the variables. Default is <InlineCode>:root</InlineCode>. Use a different selector (e.g. a class on a wrapper) to scope theming to a subtree.</li>
      </ul>
      <p>
        The element matched by <InlineCode>scope</InlineCode> also gets <InlineCode>data-theme</InlineCode> set to the current theme id (e.g. <InlineCode>data-theme="dark"</InlineCode>) when tokens are applied. You can use that for CSS (e.g. <InlineCode>[data-theme="dark"]</InlineCode>) or for testing.
      </p>

      <h2>SSR & hydration</h2>
      <p>
        The provider is built to work with server-rendered apps (Next.js, Vite SSR) and to avoid a flash of the wrong theme. It uses an <strong>isomorphic layout effect</strong>: on the server, a no-op; on the client, <InlineCode>useLayoutEffect</InlineCode>. That way, token application and persistence restore run in the same tick as paint, after hydration.
      </p>
      <ul>
        <li>Persisted state is read in the layout effect before the first paint, so the correct theme is applied immediately.</li>
        <li>State is only written to <InlineCode>localStorage</InlineCode> after hydration, so you don’t get hydration mismatches.</li>
        <li>Combined with the async config pattern (fetch tenant config, then mount the provider), you can achieve a fully themed first paint with no flash.</li>
      </ul>

      <h2>Persistence</h2>
      <p>
        The provider persists the current tenant and theme so the next visit keeps the user’s choice.
      </p>
      <ul>
        <li><strong>Storage</strong> — <InlineCode>localStorage</InlineCode>.</li>
        <li><strong>Key</strong> — <InlineCode>react-tenant-theme</InlineCode> (fixed for now; configurable key is on the roadmap).</li>
        <li><strong>Format</strong> — JSON: <InlineCode>{"{ \"tenantId\": string, \"themeId\": string }"}</InlineCode>.</li>
      </ul>
      <CodeBlock
        lang="json"
        title="Stored value example"
        code={`{
  "tenantId": "acme",
  "themeId": "dark"
}`}
      />
      <p>
        State is read in a layout effect before first paint and written whenever tenant or theme changes after hydration, so there’s no flash of the default theme.
      </p>

      <h2>Other exports</h2>
      <p>
        <InlineCode>applyThemeTokens(theme, config?)</InlineCode> — Low-level function that applies a theme’s tokens to the configured scope. The provider uses this internally; you only need it for headless or non-React usage.
      </p>

      <h2>Next steps</h2>
      <p>
        <Link to="/getting-started">Getting started</Link> — install and minimal setup.{" "}
        <Link to="/multi-tenant">Multi-tenant</Link> — switching tenants and themes in the UI.
      </p>
    </div>
  );
}
