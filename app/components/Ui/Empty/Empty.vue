<template>
  <Primitive
    data-slot="empty"
    :class="emptyStyles({ class: normalizeClass(props.class) || undefined })"
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

  export const emptyStyles = tv({
    base: "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
  });

  export type EmptyProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the empty state container.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<EmptyProps>();
  const forwarded = reactiveOmit(props, ["class"]);
</script>
