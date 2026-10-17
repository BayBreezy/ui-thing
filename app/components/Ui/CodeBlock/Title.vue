<template>
  <Primitive
    data-slot="code-block-title"
    v-bind="forwarded"
    :class="codeBlockTitleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="icon" :name="icon" />
      {{ text ?? context?.filename.value }}
    </slot>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  import { codeBlockInjectionKey } from "./CodeBlock.vue";

  export const codeBlockTitleStyles = tv({
    base: "text-foreground group-data-[variant=destructive]/code-block:text-destructive min-w-0 truncate font-sans text-sm font-medium group-data-[size=sm]/code-block:text-xs group-data-[variant=success]/code-block:text-emerald-700 group-data-[variant=warning]/code-block:text-amber-700 dark:group-data-[variant=success]/code-block:text-emerald-400 dark:group-data-[variant=warning]/code-block:text-amber-400 [&_svg]:pointer-events-none [&_svg]:inline-block [&_svg]:align-middle [&_svg:not([class*='size-'])]:size-3.5 *:[svg]:me-1.5",
  });

  export type CodeBlockTitleProps = PrimitiveProps & {
    /**
     * The title text. Used when no default slot content is passed. Falls back to the `filename` set
     * on `UiCodeBlock`.
     */
    text?: string;
    /** An Iconify icon shown before the text. Used when no default slot content is passed. */
    icon?: string;
    /** Custom class(es) to add to the title. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<CodeBlockTitleProps>(), {
    as: "div",
  });

  const forwarded = reactiveOmit(props, "class", "text", "icon");
  const context = inject(codeBlockInjectionKey, null);
</script>
