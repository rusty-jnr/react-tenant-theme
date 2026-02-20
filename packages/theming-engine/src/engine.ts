import type { ThemeDefinition, ThemeEngineConfig } from "./types";

const normalizeVar = (key: string, prefix?: string) => {
  const raw = key.startsWith("--") ? key.slice(2) : key;
  const withPrefix = prefix ? `${prefix}-${raw}` : raw;
  return `--${withPrefix}`;
};

export const applyThemeTokens = (
  theme: ThemeDefinition,
  config: ThemeEngineConfig = {}
) => {
  const scope = config.scope ?? ":root";
  const el = document.querySelector(scope) as HTMLElement | null;
  if (!el) return;

  const { prefix } = config;

  Object.entries(theme.tokens).forEach(([k, v]) => {
    el.style.setProperty(normalizeVar(k, prefix), String(v));
  });

  el.setAttribute("data-theme", theme.id);
};