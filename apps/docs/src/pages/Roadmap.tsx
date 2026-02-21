import { Link } from "react-router-dom";
import { InlineCode } from "../components/Inline";

export function Roadmap() {
  return (
    <div className="article">
      <h1>Roadmap</h1>
      <p className="subtitle">
        Planned improvements and integrations for <InlineCode>react-tenant-theme</InlineCode>.
      </p>

      <h2>Planned</h2>
      <ul>
        <li><strong>Configurable storage key</strong> — Allow a custom <InlineCode>localStorage</InlineCode> key so multiple apps on the same origin don’t clash.</li>
        <li><strong>Cookie-based persistence</strong> — Option to persist tenant/theme in a cookie for SSR or cross-tab use.</li>
        <li><strong>Pre-hydration inline script</strong> — Small script you can inject in <InlineCode>&lt;head&gt;</InlineCode> to read persisted state and set a class or variables before React boots, for even earlier themed paint.</li>
        <li><strong>DevTools extension</strong> — Inspect and change tenant/theme from the browser DevTools.</li>
        <li><strong>Tailwind plugin integration</strong> — Generate or map design tokens for use with Tailwind’s theme config.</li>
        <li><strong>SCSS/Sass variable generation</strong> — Generate SCSS variables (e.g. <InlineCode>$primary: var(--rt-color-primary)</InlineCode>) from your token set so teams used to <InlineCode>$purple</InlineCode>-style variables get the same ergonomics while values still resolve at runtime.</li>
        <li><strong>Token validation utilities</strong> — Helpers to validate token shapes or warn on missing keys.</li>
      </ul>

      <p>
        These are not committed timelines — they reflect likely directions. If you need one of these for a project, opening an issue or PR helps prioritize.
      </p>

      <h2>Next steps</h2>
      <p>
        <Link to="/api">API Reference</Link> — current exports and behavior.{" "}
        <Link to="/getting-started">Getting started</Link> — install and minimal setup.
      </p>
    </div>
  );
}
