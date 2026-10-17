<template>
  <Primitive
    data-slot="code-block-footer"
    v-bind="forwarded"
    :class="codeBlockFooterStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const codeBlockFooterStyles = tv({
    base: "text-muted-foreground flex min-w-0 shrink-0 items-center gap-2 px-3 pb-3 group-data-[size=sm]/code-block:px-2.5 group-data-[size=sm]/code-block:pb-2.5",
  });

  export type CodeBlockFooterProps = PrimitiveProps & {
    /** Custom class(es) to add to the footer. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<CodeBlockFooterProps>(), {
    as: "div",
  });

  const forwarded = reactiveOmit(props, "class");
</script>
