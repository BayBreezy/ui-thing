<template>
  <Primitive
    data-slot="description-list-details"
    v-bind="reactiveOmit(props, 'class', 'text')"
    :class="descriptionListDetailsStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>{{ text }}</slot>
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
     * Text to display in the description details
     */
    text?: string;
    /**
     * Custom class(es) to add to the element
     */
    class?: HTMLAttributes["class"];
  };

  export const descriptionListDetailsStyles = tv({
    base: "pt-1 pb-3 text-foreground sm:border-t sm:py-3 sm:nth-2:border-none",
  });
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<DescriptionDetailsProps>(), {
    as: "dd",
  });
</script>
