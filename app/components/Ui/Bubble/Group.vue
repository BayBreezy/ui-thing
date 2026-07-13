<template>
  <Primitive
    data-slot="bubble-group"
    v-bind="forwarded"
    :class="bubbleGroupStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const bubbleGroupStyles = tv({
    base: "flex min-w-0 flex-col gap-2",
  });

  export type BubbleGroupProps = PrimitiveProps & {
    /** Additional classes to apply to the group root. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<BubbleGroupProps>(), {});

  const forwarded = reactiveOmit(props, ["class"]);
</script>
