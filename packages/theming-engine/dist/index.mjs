// src/engine.ts
var normalizeVar = (key, prefix) => {
  const raw = key.startsWith("--") ? key.slice(2) : key;
  const withPrefix = prefix ? `${prefix}-${raw}` : raw;
  return `--${withPrefix}`;
};
var applyThemeTokens = (theme, config = {}) => {
  const scope = config.scope ?? ":root";
  const el = document.querySelector(scope);
  if (!el) return;
  const { prefix } = config;
  Object.entries(theme.tokens).forEach(([k, v]) => {
    el.style.setProperty(normalizeVar(k, prefix), String(v));
  });
  el.setAttribute("data-theme", theme.id);
};

// src/react.tsx
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useLayoutEffect
} from "react";
import { jsx } from "react/jsx-runtime";
var STORAGE_KEY = "react-tenant-theme";
function loadState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.tenantId !== "string" || typeof parsed?.themeId !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
function saveState(state) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
  }
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
var ThemeContext = createContext(null);
function ThemeProvider({
  tenants,
  initialTenantId,
  config,
  children
}) {
  const initialTenant = tenants.find((t) => t.id === initialTenantId) ?? tenants[0];
  if (!initialTenant) {
    throw new Error("ThemeProvider requires at least one tenant");
  }
  const [tenantId, setTenantId] = useState(initialTenant.id);
  const tenant = tenants.find((t) => t.id === tenantId) ?? initialTenant;
  const [themeId, setThemeId] = useState(tenant.defaultThemeId);
  const [hydrated, setHydrated] = useState(false);
  useIsomorphicLayoutEffect(() => {
    const persisted = loadState();
    if (!persisted) {
      setHydrated(true);
      return;
    }
    const nextTenant = tenants.find((t) => t.id === persisted.tenantId) ?? initialTenant;
    const nextThemeId = nextTenant.themes.some(
      (th) => th.id === persisted.themeId
    ) ? persisted.themeId : nextTenant.defaultThemeId;
    setTenantId(nextTenant.id);
    setThemeId(nextThemeId);
    setHydrated(true);
  }, []);
  const effectiveThemeId = tenant.themes.some(
    (th) => th.id === themeId
  ) ? themeId : tenant.defaultThemeId;
  const theme = tenant.themes.find((th) => th.id === effectiveThemeId) ?? tenant.themes[0];
  useIsomorphicLayoutEffect(() => {
    if (!theme) return;
    applyThemeTokens(theme, config);
    if (hydrated) {
      saveState({ tenantId, themeId: effectiveThemeId });
    }
  }, [tenantId, effectiveThemeId, theme, config, hydrated]);
  const value = useMemo(() => {
    return {
      tenant,
      theme,
      tenants,
      setTenant: (nextTenantId) => {
        const nextTenant = tenants.find(
          (t) => t.id === nextTenantId
        );
        if (!nextTenant) return;
        setTenantId(nextTenantId);
        setThemeId(nextTenant.defaultThemeId);
      },
      setTheme: (nextThemeId) => setThemeId(nextThemeId)
    };
  }, [tenant, theme, tenants]);
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value, children });
}
function useThemeEngine() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useThemeEngine must be used within ThemeProvider"
    );
  }
  return ctx;
}
export {
  ThemeProvider,
  applyThemeTokens,
  useThemeEngine
};
//# sourceMappingURL=index.mjs.map