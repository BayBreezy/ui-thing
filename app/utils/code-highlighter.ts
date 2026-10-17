import { createHighlighterCore } from "shiki/core";
import type { GrammarState, HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

export interface HighlightedToken {
  content: string;
  htmlStyle?: Record<string, string>;
}

/** A pair of shiki theme names. The light one is used by default, the dark one under `.dark`. */
export interface CodeBlockThemes {
  light: string;
  dark: string;
}

type Loader = () => Promise<any>;

export const defaultCodeThemes: CodeBlockThemes = {
  light: "github-light",
  dark: "github-dark",
};

// Each language and theme loads the first time it is used. Add your own with
// `registerCodeLanguage` and `registerCodeTheme`.
const languages: Record<string, Loader> = {
  astro: () => import("shiki/langs/astro.mjs"),
  bash: () => import("shiki/langs/shellscript.mjs"),
  c: () => import("shiki/langs/c.mjs"),
  cpp: () => import("shiki/langs/cpp.mjs"),
  csharp: () => import("shiki/langs/csharp.mjs"),
  css: () => import("shiki/langs/css.mjs"),
  dart: () => import("shiki/langs/dart.mjs"),
  diff: () => import("shiki/langs/diff.mjs"),
  docker: () => import("shiki/langs/docker.mjs"),
  go: () => import("shiki/langs/go.mjs"),
  graphql: () => import("shiki/langs/graphql.mjs"),
  html: () => import("shiki/langs/html.mjs"),
  ini: () => import("shiki/langs/ini.mjs"),
  java: () => import("shiki/langs/java.mjs"),
  javascript: () => import("shiki/langs/javascript.mjs"),
  json: () => import("shiki/langs/json.mjs"),
  jsonc: () => import("shiki/langs/jsonc.mjs"),
  jsx: () => import("shiki/langs/jsx.mjs"),
  kotlin: () => import("shiki/langs/kotlin.mjs"),
  lua: () => import("shiki/langs/lua.mjs"),
  markdown: () => import("shiki/langs/markdown.mjs"),
  php: () => import("shiki/langs/php.mjs"),
  powershell: () => import("shiki/langs/powershell.mjs"),
  prisma: () => import("shiki/langs/prisma.mjs"),
  python: () => import("shiki/langs/python.mjs"),
  ruby: () => import("shiki/langs/ruby.mjs"),
  rust: () => import("shiki/langs/rust.mjs"),
  scss: () => import("shiki/langs/scss.mjs"),
  sql: () => import("shiki/langs/sql.mjs"),
  svelte: () => import("shiki/langs/svelte.mjs"),
  swift: () => import("shiki/langs/swift.mjs"),
  toml: () => import("shiki/langs/toml.mjs"),
  tsx: () => import("shiki/langs/tsx.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  vue: () => import("shiki/langs/vue.mjs"),
  xml: () => import("shiki/langs/xml.mjs"),
  yaml: () => import("shiki/langs/yaml.mjs"),
};

const themes: Record<string, Loader> = {
  "catppuccin-latte": () => import("shiki/themes/catppuccin-latte.mjs"),
  "catppuccin-mocha": () => import("shiki/themes/catppuccin-mocha.mjs"),
  dracula: () => import("shiki/themes/dracula.mjs"),
  "github-dark": () => import("shiki/themes/github-dark.mjs"),
  "github-light": () => import("shiki/themes/github-light.mjs"),
  "min-dark": () => import("shiki/themes/min-dark.mjs"),
  "min-light": () => import("shiki/themes/min-light.mjs"),
  "one-dark-pro": () => import("shiki/themes/one-dark-pro.mjs"),
  "tokyo-night": () => import("shiki/themes/tokyo-night.mjs"),
  "vitesse-dark": () => import("shiki/themes/vitesse-dark.mjs"),
  "vitesse-light": () => import("shiki/themes/vitesse-light.mjs"),
};

const aliases: Record<string, string> = {
  cs: "csharp",
  dockerfile: "docker",
  js: "javascript",
  md: "markdown",
  mjs: "javascript",
  ps1: "powershell",
  py: "python",
  rb: "ruby",
  rs: "rust",
  sh: "bash",
  shell: "bash",
  shellscript: "bash",
  ts: "typescript",
  yml: "yaml",
  zsh: "bash",
};

/** Makes a language available. `loader` is a dynamic import of a shiki language module. */
export function registerCodeLanguage(name: string, loader: Loader, ...nameAliases: string[]) {
  languages[name.toLowerCase()] = loader;
  nameAliases.forEach((alias) => (aliases[alias.toLowerCase()] = name.toLowerCase()));
}

/** Makes a theme available. `loader` is a dynamic import of a shiki theme module. */
export function registerCodeTheme(name: string, loader: Loader) {
  themes[name] = loader;
}

let highlighter: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighter ??= createHighlighterCore({
    themes: [],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });

  return highlighter;
}

function getLanguage(language: string) {
  const name = language.toLowerCase();

  if (name === "ansi") return name;
  if (name in languages) return name;

  return aliases[name] ?? null;
}

/**
 * Loads a language (and its themes) and returns a highlighter for it, or null for an unknown
 * language.
 */
export async function loadHighlighter(language: string, pair: CodeBlockThemes = defaultCodeThemes) {
  const lang = getLanguage(language);

  if (!lang) return null;

  const shiki = await getHighlighter();
  const loadedThemes = shiki.getLoadedThemes();

  for (const name of new Set([pair.light, pair.dark])) {
    const loader = themes[name];
    if (!loadedThemes.includes(name) && loader) await shiki.loadTheme(loader);
  }

  if (lang !== "ansi" && !shiki.getLoadedLanguages().includes(lang)) {
    await shiki.loadLanguage(languages[lang]!);
  }

  return {
    // Returns the tokens of each line, and the grammar state after the last
    // line. Pass that state back to continue where the code left off.
    highlight(code: string, state?: GrammarState) {
      const tokenize = (text: string) =>
        shiki.codeToTokens(text, {
          lang: lang as any,
          themes: { light: pair.light, dark: pair.dark },
          defaultColor: false,
          grammarState: state,
        }).tokens;

      // ANSI has no grammar state, so each line is tokenized on its own and
      // gets the same colors whether it arrives in one piece or streams.
      const tokens =
        lang === "ansi" ? code.split("\n").flatMap((line) => tokenize(line)) : tokenize(code);

      return {
        lines: tokens.map((line) =>
          line.map((token): HighlightedToken => ({
            content: token.content,
            htmlStyle: token.htmlStyle as Record<string, string> | undefined,
          }))
        ),
        state: shiki.getLastGrammarState(tokens),
      };
    },
  };
}

export type CodeHighlighter = NonNullable<Awaited<ReturnType<typeof loadHighlighter>>>;

/**
 * Returns the tokens of each line, or null for a language that is not listed. Safe to use on the
 * server.
 */
export async function highlightCode(code: string, language: string, pair?: CodeBlockThemes) {
  const instance = await loadHighlighter(language, pair);

  return instance ? instance.highlight(code).lines : null;
}
