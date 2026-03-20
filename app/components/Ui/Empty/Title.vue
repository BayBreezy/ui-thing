<template>
  <Primitive
    data-slot="empty-title"
    :class="emptyTitleStyles({ class: normalizeClass(props.class) || undefined })"
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

  export const emptyTitleStyles = tv({
    base: "text-lg font-medium tracking-tight",
  });

  export type EmptyTitleProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<EmptyTitleProps>();
  const forwarded = reactiveOmit(props, ["class"]);
</script>
