<template>
  <Primitive
    data-slot="empty-content"
    :class="emptyContentStyles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const emptyContentStyles = tv({
    base: "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
  });

  export type EmptyContentProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<EmptyContentProps>();
  const forwarded = reactiveOmit(props, ["class"]);
</script>
