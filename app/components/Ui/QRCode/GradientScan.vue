<template>
  <Primitive
    :as
    :as-child
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    style="
      mask-image: radial-gradient(52.19% 100% at 50% 0%, #000 0%, rgba(0, 0, 0, 0) 95.31%);
      -webkit-mask-image: radial-gradient(52.19% 100% at 50% 0%, #000 0%, rgba(0, 0, 0, 0) 95.31%);
    "
  >
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const styles = tv({
    base: "absolute bottom-0 h-1/2 w-full border-t border-primary bg-primary/10",
  });

  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to apply to the FrameHandle component
       */
      class?: HTMLAttributes["class"];
    }
  >();
</script>
