import type { TypesetFont } from "./fonts";

/**
 * Nuxt loads fonts through @nuxt/fonts. Families are declared explicitly rather than left to the
 * module's CSS scan, because typeset only ever names them through custom properties.
 */
export function getNuxtFontCode(fonts: TypesetFont[]) {
  return [
    "// nuxt.config.ts",
    "export default defineNuxtConfig({",
    "  modules: ['@nuxt/fonts'],",
    "  fonts: {",
    "    families: [",
    ...fonts.map((font) => `      { name: '${font.family}', provider: 'google' },`),
    "    ],",
    "  },",
    "})",
  ].join("\n");
}

/** The CSS vars every framework needs, whatever loaded the font files. */
export function getFontVariablesCss(fonts: TypesetFont[]) {
  return [
    "/* main.css */",
    ":root {",
    ...fonts.map((font) => `  ${font.cssVar}: ${font.value};`),
    "}",
  ].join("\n");
}
