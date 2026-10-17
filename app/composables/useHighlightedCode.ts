import type { GrammarState } from "shiki/core";
import { computed, shallowRef, toValue, watch } from "vue";
import type { MaybeRefOrGetter } from "vue";

import type { CodeBlockThemes, CodeHighlighter, HighlightedToken } from "~/utils/code-highlighter";

/**
 * Highlights `value` with shiki and returns the tokens of every line. The plain lines are returned
 * until the highlighter has loaded, and on the server. While the code streams, only the new lines
 * are tokenized.
 */
export function useHighlightedCode(
  value: MaybeRefOrGetter<string>,
  language: MaybeRefOrGetter<string | undefined>,
  themes?: MaybeRefOrGetter<CodeBlockThemes | undefined>
) {
  const highlighter = shallowRef<CodeHighlighter | null>(null);

  watch(
    () => [toValue(language), toValue(themes)?.light, toValue(themes)?.dark] as const,
    ([lang, light, dark], _, onCleanup) => {
      // Highlighting runs in the browser. The server renders the plain lines.
      if (import.meta.server) return;

      let cancelled = false;
      onCleanup(() => (cancelled = true));
      highlighter.value = null;

      if (!lang) return;

      loadHighlighter(lang, light && dark ? { light, dark } : undefined)
        .then((next) => {
          if (!cancelled) highlighter.value = next;
        })
        .catch(() => {});
    },
    { immediate: true }
  );

  // The complete lines, highlighted. While the code streams, only the new
  // lines are tokenized, starting from the grammar state of the last one.
  let done: {
    highlighter: CodeHighlighter | null;
    text: string;
    lines: HighlightedToken[][];
    state?: GrammarState;
  } = { highlighter: null, text: "", lines: [] };

  return computed<HighlightedToken[][]>(() => {
    const raw = toValue(value) ?? "";
    // A trailing newline would render as an extra empty line.
    const code = raw.endsWith("\n") ? raw.slice(0, -1) : raw;
    const current = highlighter.value;

    if (!current) return code.split("\n").map((line) => (line ? [{ content: line }] : []));

    if (done.highlighter !== current || !code.startsWith(done.text)) {
      done = { highlighter: current, text: "", lines: [] };
    }

    const end = code.lastIndexOf("\n") + 1;

    if (end > done.text.length) {
      const result = current.highlight(code.slice(done.text.length, end - 1), done.state);

      done = {
        highlighter: current,
        text: code.slice(0, end),
        lines: [...done.lines, ...result.lines],
        state: result.state,
      };
    }

    // The last line is still being written, so it is tokenized on every change.
    const tail = current.highlight(code.slice(end), done.state).lines[0] ?? [];

    return [...done.lines, tail];
  });
}
