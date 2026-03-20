<template>
  <Primitive
    data-slot="empty-header"
    :class="emptyHeaderStyles({ class: normalizeClass(props.class) || undefined })"
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

  export const emptyHeaderStyles = tv({
    base: "flex max-w-sm flex-col items-center gap-2 text-center",
  });

  export type EmptyHeaderProps = PrimitiveProps & {
    /**
     * Additional classes to apply to the parent element.
     */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<EmptyHeaderProps>();
  const forwarded = reactiveOmit(props, ["class"]);
</script>
