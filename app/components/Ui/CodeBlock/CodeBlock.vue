<template>
  <Primitive
    data-slot="code-block"
    :data-variant="variant"
    :data-size="size"
    v-bind="forwarded"
    :class="codeBlockStyles({ variant, class: normalizeClass(props.class) || undefined })"
  >
    <slot :wrap="wrap" :expanded="expanded" :copy-value="code" />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes, InjectionKey, Ref } from "vue";

  import type { CodeBlockThemes } from "~/utils/code-highlighter";

  export type CodeBlockVariant = "default" | "destructive" | "success" | "warning";
  export type CodeBlockSize = "default" | "sm";

  export type CodeBlockContext = {
    /** The code set on the root, used as the fallback of the content, copy and download parts. */
    code: Ref<string | undefined>;
    /** The language set on the root. */
    language: Ref<string | undefined>;
    /** The file name set on the root. */
    filename: Ref<string | undefined>;
    /** The themes set on the root. */
    themes: Ref<CodeBlockThemes | undefined>;
    /** Wrap long lines instead of scrolling. */
    wrap: Ref<boolean>;
    /** Whether the content is fully expanded. Only matters when `maxLines` is set. */
    expanded: Ref<boolean>;
    /** The number of lines shown while collapsed. */
    maxLines: Ref<number | undefined>;
    /** The number of lines in the content. Reported by `UiCodeBlockContent`. */
    lineCount: Ref<number>;
  };

  /** Used by the parts to read what is set on the root. */
  export const codeBlockInjectionKey: InjectionKey<CodeBlockContext> = Symbol("code-block");

  export const codeBlockStyles = tv({
    base: "group/code-block has-[>[data-slot=code-block-content]:focus-visible]:ring-ring/50 relative flex w-full min-w-0 flex-col overflow-hidden rounded-lg text-sm has-[>[data-slot=code-block-content]:focus-visible]:ring-3 data-[size=sm]:text-xs",
    variants: {
      variant: {
        default:
          "border-input text-foreground dark:bg-input/30 has-[>[data-slot=code-block-content]:focus-visible]:border-ring border",
        destructive: "border-destructive/30 text-destructive dark:border-destructive/40 border",
        success:
          "border border-emerald-500/30 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-400",
        warning:
          "border border-amber-500/30 text-amber-700 dark:border-amber-500/40 dark:text-amber-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  export type CodeBlockProps = PrimitiveProps & {
    /** The color treatment of the block. */
    variant?: CodeBlockVariant;
    /** The size of the block. */
    size?: CodeBlockSize;
    /**
     * The code in the block. The content, copy and download parts fall back to it, so you do not
     * have to pass it to each of them.
     */
    code?: string;
    /** The language of `code`, for example `ts` or `vue`. */
    language?: string;
    /** The file name used by the download button. */
    filename?: string;
    /** The shiki themes for the light and dark mode. Defaults to GitHub light and dark. */
    themes?: CodeBlockThemes;
    /** Show only this many lines until the block is expanded. */
    maxLines?: number;
    /** Custom class(es) to add to the block. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<CodeBlockProps>(), {
    as: "div",
    variant: "default",
    size: "default",
  });

  /** Wrap long lines instead of scrolling. */
  const wrap = defineModel<boolean>("wrap", { default: false });
  /** Whether the content is fully expanded. Only matters when `maxLines` is set. */
  const expanded = defineModel<boolean>("expanded", { default: false });

  defineSlots<{
    default(props: { wrap: boolean; expanded: boolean; copyValue: string | undefined }): any;
  }>();

  const forwarded = reactiveOmit(
    props,
    "class",
    "variant",
    "size",
    "code",
    "language",
    "filename",
    "themes",
    "maxLines"
  );

  const lineCount = ref(0);

  provide(codeBlockInjectionKey, {
    code: toRef(props, "code"),
    language: toRef(props, "language"),
    filename: toRef(props, "filename"),
    themes: toRef(props, "themes"),
    maxLines: toRef(props, "maxLines"),
    wrap,
    expanded,
    lineCount,
  });
</script>
