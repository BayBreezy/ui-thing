<template>
  <Primitive
    :as
    :as-child
    data-slot="field-content"
    :class="fieldContentStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const fieldContentStyles = tv({
    base: ["group/field-content flex flex-1 flex-col gap-1.5 leading-snug"],
  });
</script>
<script lang="ts" setup>
  const props = defineProps<
    PrimitiveProps & {
      /**
       * Additional classes to apply to the element.
       */
      class?: HTMLAttributes["class"];
    }
  >();
</script>
