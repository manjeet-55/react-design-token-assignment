import { getResolvedValue } from "./resolver";
import light from "./theme/light.json";
import dark from "./theme/dark.json";
import alias from "./alias.json";
import core from "./core.json";
import web from "./Web.json";

/**
 * Creates resolved design tokens for a specific theme
 */
function createTokens(theme: typeof light | typeof dark) {
  return {
    // Colors
    bg: {
      default: getResolvedValue(theme.bg.default),
      "default-strong": getResolvedValue(theme.bg["default-strong"]),
      "default-stronger": getResolvedValue(theme.bg["default-stronger"]),
      disabled: getResolvedValue(theme.bg.disabled),
    },
    content: {
      primary: getResolvedValue(theme.content.primary),
      secondary: getResolvedValue(theme.content.secondary),
      disabled: getResolvedValue(theme.content.disabled),
    },
    fontWeight: {
      "400": getResolvedValue(core.fontWeights?.["400"]),
      "500": getResolvedValue(core.fontWeights?.["500"]),
      "600": getResolvedValue(core.fontWeights?.["600"]),
      "700": getResolvedValue(core.fontWeights?.["700"]),
    },
    border: {
      input: getResolvedValue(theme.border.input),
      "input-strong": getResolvedValue(theme.border["input-strong"]),
      active: getResolvedValue(theme.border.active),
      negative: getResolvedValue(theme.border.negative),
    },
    // Border width
    borderWidth: {
      s: getResolvedValue(core.borderWidth?.s),
      m: getResolvedValue(core.borderWidth?.m),
      l: getResolvedValue(core.borderWidth?.l),
      xl: getResolvedValue(core.borderWidth?.xl),
    },
    boxShadow: {
      l: getResolvedValue(web.boxShadow.l),
      m: getResolvedValue(web.boxShadow.m),
      s: getResolvedValue(web.boxShadow.s),
    },
    // Spacing
    spacing: {
      xs: getResolvedValue(core.spacing?.xs),
      s: getResolvedValue(core.spacing?.s),
      m: getResolvedValue(core.spacing?.m),
      l: getResolvedValue(core.spacing?.l),
      xl: getResolvedValue(core.spacing?.xl),
      xxl: getResolvedValue(core.spacing?.["2xl"]),
      "3xs": getResolvedValue(core.spacing?.["3xs"]),
      "2xs": getResolvedValue(core.spacing?.["2xs"]),
    },
    // Typography
    fontSizes: {
      m: getResolvedValue(core.fontSize?.m),
      l: getResolvedValue(core.fontSize?.l),
      xl: getResolvedValue(core.fontSize?.xl),
      s: getResolvedValue(core.fontSize?.s),
      xs: getResolvedValue(core.fontSize?.xs),
    },
    lineHeights: {
      m: getResolvedValue(core.lineHeights?.m),
      s: getResolvedValue(core.lineHeights?.s),
      xs: getResolvedValue(core.lineHeights?.xs),
    },
    fontFamilies: {
      body: getResolvedValue(core.fontFamilies?.body),
      title: getResolvedValue(core.fontFamilies?.title),
    },
    // Border radius
    borderRadius: {
      input: getResolvedValue(alias.borderRadius.input),
    },
    sizing: {
      s: getResolvedValue(core.sizing?.s),
      m: getResolvedValue(core.sizing?.m),
      l: getResolvedValue(core.sizing?.l),
      xl: getResolvedValue(core.sizing?.xl),
      "4xl": getResolvedValue(core.sizing?.["4xl"]),
    },
    // Component-specific tokens
    borders: {
      input: {
        primary: getResolvedValue(web.borders.input.primary),
        hover: getResolvedValue(web.borders.input.hover),
        active: getResolvedValue(web.borders.input.active),
        error: getResolvedValue(web.borders.input.error),
      },
    },
  } as const;
}

// Pre-resolved design tokens for both themes
export const lightTokens = createTokens(light);
export const darkTokens = createTokens(dark);

// Default export (light theme)
export const tokens = lightTokens;

// Helper functions for dynamic access
export function getBgToken(variant: string, themeTokens = tokens): string {
  return (
    (themeTokens.bg[variant as keyof typeof themeTokens.bg] as string) ??
    themeTokens.bg.default
  );
}

export function getSpacingToken(size: string, themeTokens = tokens): string {
  return (
    (themeTokens.spacing[size as keyof typeof themeTokens.spacing] as string) ??
    themeTokens.spacing.s
  );
}
