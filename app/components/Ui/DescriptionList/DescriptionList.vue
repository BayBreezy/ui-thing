<template>
  <Primitive
    data-slot="description-list"
    v-bind="reactiveOmit(props, 'class')"
    :class="descriptionListDetailsStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>
<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { Primitive } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PrimitiveProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export type DescriptionDetailsProps = PrimitiveProps & {
    /**
     * Custom class(es) to add to the element
     */
    class?: HTMLAttributes["class"];
  };

  export const descriptionListDetailsStyles = tv({
    base: "grid grid-cols-1 text-sm/6 sm:grid-cols-2",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {
    as: "dl",
  });
</script>
