"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ThemeProvider: () => ThemeProvider,
  applyThemeTokens: () => applyThemeTokens,
  useThemeEngine: () => useThemeEngine
});
module.exports = __toCommonJS(index_exports);

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
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
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
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var ThemeContext = (0, import_react.createContext)(null);
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
  const [tenantId, setTenantId] = (0, import_react.useState)(initialTenant.id);
  const tenant = tenants.find((t) => t.id === tenantId) ?? initialTenant;
  const [themeId, setThemeId] = (0, import_react.useState)(tenant.defaultThemeId);
  const [hydrated, setHydrated] = (0, import_react.useState)(false);
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
  const value = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value, children });
}
function useThemeEngine() {
  const ctx = (0, import_react.useContext)(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useThemeEngine must be used within ThemeProvider"
    );
  }
  return ctx;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeProvider,
  applyThemeTokens,
  useThemeEngine
});
//# sourceMappingURL=index.js.map