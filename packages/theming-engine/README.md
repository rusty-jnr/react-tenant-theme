# react-tenant-theme

> A lightweight, production-ready theming engine for multi-tenant React applications.

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)]()
[![React](https://img.shields.io/badge/React-18%2B-61dafb)]()
[![License](https://img.shields.io/badge/License-MIT-green)]()

**Docs:** [Live documentation & examples](https://react-tenant-theme-docs.vercel.app) · **npm:** [react-tenant-theme](https://www.npmjs.com/package/react-tenant-theme) · **Repo:** [GitHub](https://github.com/rusty-jnr/react-tenant-theme)

---

## ✨ Why This Exists

Modern SaaS applications often require:

- Multi-tenant branding
- Light/Dark mode per tenant
- Scalable design token systems
- SSR compatibility
- Zero visual flicker on reload

Most theming solutions become fragile at scale.

**react-tenant-theme** provides a clean, architecture-first approach to solving this problem using CSS variables and a structured tenant → theme → token model.

---

## 🔑 Key Features

- ✅ Multi-tenant support
- ✅ Per-tenant theme switching
- ✅ Type-safe token definitions
- ✅ CSS variable-based design tokens
- ✅ SSR-safe (Next.js compatible)
- ✅ No flash of default theme
- ✅ LocalStorage persistence
- ✅ Minimal runtime overhead

---

## 📦 Installation

```bash
npm install react-tenant-theme
# or
pnpm add react-tenant-theme
# or
yarn add react-tenant-theme
```

---

## 🚀 Quick Start

### 1️⃣ Define Tenants & Themes

```tsx
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
  }
];
```

---

### 2️⃣ Wrap Your Application

```tsx
import { ThemeProvider } from "react-tenant-theme";

<ThemeProvider
  tenants={tenants}
  initialTenantId="acme"
  config={{ prefix: "rt" }}
>
  <App />
</ThemeProvider>
```

---

### 3️⃣ Use the Hook

```tsx
import { useThemeEngine } from "react-tenant-theme";

const { tenant, theme, setTenant, setTheme } = useThemeEngine();
```

---

## 🎨 Styling with CSS Variables

The library generates scoped CSS variables:

```css
body {
  background: var(--rt-color-bg);
  color: var(--rt-color-fg);
}

button {
  background: var(--rt-color-primary);
}
```

Switching tenant or theme updates all tokens instantly.

---

## 🏗 Architecture Overview

react-tenant-theme is structured into three layers:

### 1️⃣ Tenant Layer
Represents a SaaS customer or brand.

### 2️⃣ Theme Layer
Represents visual variants (light, dark, brand).

### 3️⃣ Token Layer
Maps tokens to scoped CSS variables:

```
color-primary → --rt-color-primary
```

The runtime engine:

- Validates tenant/theme relationships
- Applies tokens safely
- Persists user preferences
- Prevents hydration mismatches

---

## ⚡ SSR & Hydration Safety

- Uses an isomorphic layout effect
- Hydrates before first paint
- Avoids flash-of-default-theme
- Safe for Next.js / Vite SSR

---

## 💾 Persistence Strategy

Saved to:

```
localStorage["react-tenant-theme"]
```

Format:

```json
{
  "tenantId": "acme",
  "themeId": "dark"
}
```

---

## 🧠 Real-World Use Cases

- White-label SaaS dashboards
- Enterprise admin panels
- Multi-brand B2B platforms
- Internal enterprise tools
- Client-customizable UI systems

---

## 🛣 Roadmap

- [ ] Configurable storage key
- [ ] Cookie-based persistence
- [ ] Pre-hydration inline script
- [ ] DevTools extension
- [ ] Tailwind plugin integration
- [ ] Token validation utilities

---

## 🤝 Contributing

Contributions welcome. See [GitHub](https://github.com/rusty-jnr/react-tenant-theme) to fork, open issues, or submit PRs.

---

## 📄 License

MIT

---

Built to address real-world multi-tenant theming challenges in scalable React applications.
