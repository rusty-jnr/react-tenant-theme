export type ThemeTokens = Record<string, string | number>;

export type ThemeDefinition = {
  id: string;
  name: string;
  tokens: ThemeTokens;
};

export type TenantDefinition = {
  id: string;
  name: string;
  themes: ThemeDefinition[];
  defaultThemeId: string;
};

export type ThemeEngineConfig = {
  scope?: string;
  prefix?: string;
};