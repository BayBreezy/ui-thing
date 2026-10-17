<template>
  <Primitive
    as="pre"
    data-slot="code-block-content"
    :data-wrap="isWrap || undefined"
    :data-numbered="lineNumbers || undefined"
    :data-collapsed="isCollapsed || undefined"
    dir="ltr"
    tabindex="0"
    :style="{
      counterReset: `line ${startLine - 1}`,
      maxHeight: isCollapsed ? `calc(${limit}lh + 1.5rem)` : undefined,
    }"
    :class="codeBlockContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <Primitive
      as="code"
      data-slot="code-block-code"
      class="grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
    >
      <template v-if="hasCode">
        <UiCodeBlockLine
          v-for="(tokens, i) in tokenLines"
          :key="i"
          :variant="lineVariant(i)"
          :marker="!isDiff"
        >
          <UiCodeBlockToken v-for="(token, j) in tokens" :key="j" :token="token" />
        </UiCodeBlockLine>
      </template>
      <template v-else>
        <template v-for="(lines, i) in [getLines()]" :key="i">
          <template v-if="lines">
            <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
              {{ line }}
            </UiCodeBlockLine>
          </template>
          <slot v-else />
        </template>
      </template>
    </Primitive>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { Comment, Fragment, Text, normalizeClass, useSlots } from "vue";
  import type { HTMLAttributes, VNode } from "vue";

  import type { CodeBlockThemes } from "~/utils/code-highlighter";

  import { codeBlockInjectionKey } from "./CodeBlock.vue";
  import type { CodeBlockLineVariant } from "./Line.vue";

  export const codeBlockContentStyles = tv({
    base: "scroll-fade-x data-wrap:scroll-fade-y min-h-0 min-w-0 scrollbar-thin overflow-auto px-3 py-3 text-start font-mono leading-relaxed outline-none group-has-data-[slot=code-block-footer]/code-block:pb-2 group-has-data-[slot=code-block-header]/code-block:pt-2 group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:py-2.5 group-data-[size=sm]/code-block:group-has-data-[slot=code-block-header]/code-block:pt-1.5 data-collapsed:overflow-y-hidden data-collapsed:[mask-image:linear-gradient(to_bottom,black_calc(100%-3rem),transparent)] data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap",
  });

  export type CodeBlockContentProps = {
    /** The code to render and highlight. Falls back to the `code` set on `UiCodeBlock`. */
    code?: string;
    /** The language of the code. Falls back to the `language` set on `UiCodeBlock`. */
    language?: string;
    /** The shiki themes. Falls back to the `themes` set on `UiCodeBlock`. */
    themes?: CodeBlockThemes;
    /** Wrap long lines. Falls back to the `wrap` state of `UiCodeBlock`. */
    wrap?: boolean;
    /** Show line numbers. */
    lineNumbers?: boolean;
    /** The number of the first line. */
    startLine?: number;
    /** Lines to highlight. Numbers or ranges such as `"3-5"`, using the displayed line numbers. */
    highlightLines?: (number | string)[];
    /**
     * Style lines that start with `+` as added and with `-` as removed. Turned on automatically for
     * the `diff` language.
     */
    diff?: boolean;
    /** Show only this many lines until expanded. Falls back to `maxLines` of `UiCodeBlock`. */
    maxLines?: number;
    /** Custom class(es) to add to the `pre`. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<CodeBlockContentProps>(), {
    wrap: undefined,
    diff: undefined,
    lineNumbers: false,
    startLine: 1,
  });

  defineSlots<{
    /** Plain text, or `UiCodeBlockLine` and `UiCodeBlockToken` elements, when no `code` is set. */
    default(): any;
  }>();

  const slots = useSlots();
  const context = inject(codeBlockInjectionKey, null);

  const source = computed(() => props.code ?? context?.code.value);
  const hasCode = computed(() => source.value !== undefined);
  const language = computed(() => props.language ?? context?.language.value);
  const isWrap = computed(() => props.wrap ?? context?.wrap.value ?? false);
  const limit = computed(() => props.maxLines ?? context?.maxLines.value);

  const tokenLines = useHighlightedCode(
    () => source.value ?? "",
    language,
    () => props.themes ?? context?.themes.value
  );

  const rawLines = computed(() => (source.value ?? "").replace(/\n$/, "").split("\n"));
  const isDiff = computed(() => props.diff ?? language.value?.toLowerCase() === "diff");

  const highlighted = computed(() => {
    const lines = new Set<number>();
    for (const item of props.highlightLines ?? []) {
      if (typeof item === "number") {
        lines.add(item);
        continue;
      }
      const [from, to] = item.split("-").map((n) => Number.parseInt(n.trim(), 10));
      if (Number.isNaN(from)) continue;
      for (let n = from!; n <= (to ?? from!); n++) lines.add(n);
    }
    return lines;
  });

  function lineVariant(index: number): CodeBlockLineVariant {
    if (isDiff.value) {
      const line = rawLines.value[index] ?? "";
      if (line.startsWith("+") && !line.startsWith("+++")) return "added";
      if (line.startsWith("-") && !line.startsWith("---")) return "removed";
    }
    return highlighted.value.has(props.startLine + index) ? "highlighted" : "default";
  }

  // Plain text content of the default slot, or null when the slot renders elements.
  function getText(nodes: VNode[]): string | null {
    let text = "";
    for (const node of nodes) {
      if (node.type === Comment) continue;
      if (node.type === Text) {
        text += node.children as string;
      } else if (node.type === Fragment && Array.isArray(node.children)) {
        const nested = getText(node.children as VNode[]);
        if (nested === null) return null;
        text += nested;
      } else {
        return null;
      }
    }
    return text;
  }

  function getLines() {
    if (!props.lineNumbers) return null;
    const text = getText(slots.default?.() ?? []);
    return text === null ? null : text.replace(/\n$/, "").split("\n");
  }

  const lineCount = computed(() => (hasCode.value ? rawLines.value.length : 0));
  const isCollapsed = computed(
    () => !!limit.value && !context?.expanded.value && lineCount.value > limit.value
  );

  // Lets `UiCodeBlockExpandButton` know whether there is anything to expand
  watchEffect(() => {
    if (context) context.lineCount.value = lineCount.value;
  });
</script>
