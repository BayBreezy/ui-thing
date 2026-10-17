<template>
  <Primitive
    data-slot="trace-title"
    v-bind="forwarded"
    :class="traceTitleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceTitleStyles = tv({
    base: "motion-reduce:shimmer-none min-w-0 truncate",
  });

  export type TraceTitleProps = PrimitiveProps & {
    /** Custom class(es) to add to the title. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceTitleProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, "class");
</script>
