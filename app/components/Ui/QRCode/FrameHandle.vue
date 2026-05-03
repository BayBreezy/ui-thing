<template>
  <Primitive :as :as-child :class="styles({ class: normalizeClass(props.class) || undefined })">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "border-primary dark:border-border size-3 rounded-tl border-t-2 border-l-2",
  });

  const props = defineProps<
    PrimitiveProps & {
      /** Additional classes to apply to the FrameHandle component. */
      class?: HTMLAttributes["class"];
    }
  >();
</script>
