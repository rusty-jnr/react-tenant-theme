import { Link } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { InlineCode } from "../components/Inline";

export function GettingStarted() {
  return (
    <div className="article">
      <h1>Getting Started</h1>
      <p className="subtitle">
        A minimal example of using <InlineCode>react-tenant-theme</InlineCode> in a multi-tenant React app.
      </p>

      <h2>Prerequisites</h2>
      <p>
        React 18+. TypeScript is optional but recommended for type-safe tenant and theme definitions.
      </p>

      <h2>Install</h2>
      <p>
        Install the package using your preferred package manager.
      </p>

      <CodeBlock
        lang="bash"
        title="Terminal"
        code={`pnpm add react-tenant-theme
# or
npm install react-tenant-theme
# or
yarn add react-tenant-theme`}
      />

      <h2>Minimal Example</h2>
      <p>
        Define tenants and themes as tokens, then wrap your app in the provider. Mount the provider at the root of your app (e.g. <InlineCode>main.tsx</InlineCode> or <InlineCode>_app.tsx</InlineCode>).
      </p>

      <CodeBlock
        lang="tsx"
        title="App setup"
        code={`import React from "react";
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
          "color-fg": "#111827",
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
  }
];

export default function Root() {
  return (
    <ThemeProvider tenants={tenants} initialTenantId="acme" config={{ prefix: "rt" }}>
      <App />
    </ThemeProvider>
  );
}`}
      />

      <p>
        The <InlineCode>config</InlineCode> option is optional: <InlineCode>prefix</InlineCode> (e.g. <InlineCode>"rt"</InlineCode>) scopes variable names to avoid clashes; <InlineCode>scope</InlineCode> defaults to <InlineCode>":root"</InlineCode>.
      </p>

      <h2>Use Tokens in CSS</h2>
      <p>
        Tokens become scoped CSS variables. With <InlineCode>prefix: "rt"</InlineCode>, a token <InlineCode>color-primary</InlineCode> becomes <InlineCode>--rt-color-primary</InlineCode>. Use them anywhere in your CSS.
      </p>

      <CodeBlock
        lang="css"
        title="index.css"
        code={`body {
  background: var(--rt-color-bg);
  color: var(--rt-color-fg);
}

a {
  color: var(--rt-color-primary);
}`}
      />

      <p>
        <strong>SCSS, Less, and other preprocessors</strong> — The library sets standard CSS custom properties; <InlineCode>var(--rt-*)</InlineCode> is plain CSS. Use the same <InlineCode>var()</InlineCode> in your <InlineCode>.scss</InlineCode> or <InlineCode>.less</InlineCode> files and it works. Preprocessors leave <InlineCode>var()</InlineCode> in the output; the browser resolves the values at runtime.
      </p>

      <p>
        If you’re used to <InlineCode>$purple</InlineCode>-style variables in SCSS, those are <strong>compile-time</strong> — one value per build. Here, token values are <strong>runtime</strong> (they change when the user switches theme/tenant). You can still get the same ergonomics by aliasing the runtime variables in SCSS:
      </p>

      <CodeBlock
        lang="scss"
        title="_tokens.scss"
        code={`// Point SCSS variables at the runtime CSS custom properties
$primary: var(--rt-color-primary);
$bg: var(--rt-color-bg);
$fg: var(--rt-color-fg);

.button {
  background: $primary;
  color: white;
}

.card {
  background: $bg;
  color: $fg;
}`}
      />

      <p>
        You keep using <InlineCode>$primary</InlineCode> (or <InlineCode>$purple</InlineCode>) in your styles; the actual value still comes from the theme engine at runtime. A future roadmap item may add tooling to generate these SCSS variables from your token definitions.
      </p>

      <h2>Switch Themes (and Tenants)</h2>
      <p>
        Use <InlineCode>useThemeEngine</InlineCode> to read the current tenant and theme, and to switch at runtime. <InlineCode>setTheme(themeId)</InlineCode> changes the theme for the current tenant; <InlineCode>setTenant(tenantId)</InlineCode> switches tenant and resets to that tenant’s default theme (handy when you have multiple tenants).
      </p>

      <CodeBlock
        lang="tsx"
        title="Switching"
        code={`import { useThemeEngine } from "react-tenant-theme";

export function ThemeSwitcher() {
  const { tenant, theme, setTheme } = useThemeEngine();

  return (
    <div>
      <p>Tenant: {tenant.name}</p>
      <p>Theme: {theme.name}</p>

      <button onClick={() => setTheme(theme.id === "light" ? "dark" : "light")}>
        Toggle theme
      </button>
    </div>
  );
}`}
      />

      <h2>Next steps</h2>
      <p>
        <Link to="/multi-tenant">Multi-tenant</Link> — switch between tenants and themes in the UI.{" "}
        <Link to="/async">Async config</Link> — load tenant config from an API before mounting the provider.
      </p>
    </div>
  );
}