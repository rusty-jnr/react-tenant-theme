import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import type {
  TenantDefinition,
  ThemeDefinition,
  ThemeEngineConfig,
} from "./types";
import { applyThemeTokens } from "./engine";

const STORAGE_KEY = "react-tenant-theme";

type PersistedState = {
  tenantId: string;
  themeId: string;
};

function loadState(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (
      typeof parsed?.tenantId !== "string" ||
      typeof parsed?.themeId !== "string"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveState(state: PersistedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

// Prevent SSR warnings
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type ThemeContextValue = {
  tenant: TenantDefinition;
  theme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  setTenant: (tenantId: string) => void;
  tenants: TenantDefinition[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = {
  tenants: TenantDefinition[];
  initialTenantId: string;
  config?: ThemeEngineConfig;
  children: React.ReactNode;
};

export function ThemeProvider({
  tenants,
  initialTenantId,
  config,
  children,
}: ThemeProviderProps) {
  const initialTenant =
    tenants.find((t) => t.id === initialTenantId) ?? tenants[0];

  if (!initialTenant) {
    throw new Error("ThemeProvider requires at least one tenant");
  }

  // Default state
  const [tenantId, setTenantId] = useState(initialTenant.id);
  const tenant =
    tenants.find((t) => t.id === tenantId) ?? initialTenant;

  const [themeId, setThemeId] = useState(tenant.defaultThemeId);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate BEFORE first paint (no flash)
  useIsomorphicLayoutEffect(() => {
    const persisted = loadState();
    if (!persisted) {
      setHydrated(true);
      return;
    }

    const nextTenant =
      tenants.find((t) => t.id === persisted.tenantId) ?? initialTenant;

    const nextThemeId = nextTenant.themes.some(
      (th) => th.id === persisted.themeId
    )
      ? persisted.themeId
      : nextTenant.defaultThemeId;

    setTenantId(nextTenant.id);
    setThemeId(nextThemeId);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure valid theme for selected tenant
  const effectiveThemeId = tenant.themes.some(
    (th) => th.id === themeId
  )
    ? themeId
    : tenant.defaultThemeId;

  const theme =
    tenant.themes.find((th) => th.id === effectiveThemeId) ??
    tenant.themes[0];

  // Apply tokens before paint (no flicker)
  useIsomorphicLayoutEffect(() => {
    if (!theme) return;

    applyThemeTokens(theme, config);

    if (hydrated) {
      saveState({ tenantId, themeId: effectiveThemeId });
    }
  }, [tenantId, effectiveThemeId, theme, config, hydrated]);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      tenant,
      theme: theme!,
      tenants,
      setTenant: (nextTenantId: string) => {
        const nextTenant = tenants.find(
          (t) => t.id === nextTenantId
        );
        if (!nextTenant) return;
        setTenantId(nextTenantId);
        setThemeId(nextTenant.defaultThemeId);
      },
      setTheme: (nextThemeId: string) =>
        setThemeId(nextThemeId),
    };
  }, [tenant, theme, tenants]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeEngine() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      "useThemeEngine must be used within ThemeProvider"
    );
  }
  return ctx;
}