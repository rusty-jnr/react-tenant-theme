import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type ThemeTokens = Record<string, string | number>;
type ThemeDefinition = {
    id: string;
    name: string;
    tokens: ThemeTokens;
};
type TenantDefinition = {
    id: string;
    name: string;
    themes: ThemeDefinition[];
    defaultThemeId: string;
};
type ThemeEngineConfig = {
    scope?: string;
    prefix?: string;
};

declare const applyThemeTokens: (theme: ThemeDefinition, config?: ThemeEngineConfig) => void;

type ThemeContextValue = {
    tenant: TenantDefinition;
    theme: ThemeDefinition;
    setTheme: (themeId: string) => void;
    setTenant: (tenantId: string) => void;
    tenants: TenantDefinition[];
};
type ThemeProviderProps = {
    tenants: TenantDefinition[];
    initialTenantId: string;
    config?: ThemeEngineConfig;
    children: React.ReactNode;
};
declare function ThemeProvider({ tenants, initialTenantId, config, children, }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare function useThemeEngine(): ThemeContextValue;

export { type TenantDefinition, type ThemeDefinition, type ThemeEngineConfig, ThemeProvider, type ThemeProviderProps, type ThemeTokens, applyThemeTokens, useThemeEngine };
