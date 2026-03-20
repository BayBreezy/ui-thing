<template>
  <Primitive
    :as
    :as-child
    data-slot="field-label"
    :class="fieldTitleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const fieldTitleStyles = tv({
    base: [
      "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
    ],
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
