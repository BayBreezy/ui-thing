<template>
  <Primitive
    data-slot="code-block-header"
    v-bind="forwarded"
    :class="codeBlockHeaderStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const codeBlockHeaderStyles = tv({
    base: "text-muted-foreground group-data-[variant=destructive]/code-block:text-destructive flex min-w-0 shrink-0 items-center gap-2 px-3 pt-3 group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pt-2.5 group-data-[variant=success]/code-block:text-emerald-700 group-data-[variant=warning]/code-block:text-amber-700 *:has-[>[data-slot=code-block-title]]:min-w-0 dark:group-data-[variant=success]/code-block:text-emerald-400 dark:group-data-[variant=warning]/code-block:text-amber-400",
  });

  export type CodeBlockHeaderProps = PrimitiveProps & {
    /** Custom class(es) to add to the header. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<CodeBlockHeaderProps>(), {
    as: "div",
  });

  const forwarded = reactiveOmit(props, "class");
</script>
