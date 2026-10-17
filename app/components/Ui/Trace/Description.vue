<template>
  <Primitive
    data-slot="trace-description"
    v-bind="forwarded"
    :class="traceDescriptionStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceDescriptionStyles = tv({
    base: "text-muted-foreground/70 shrink-0 tabular-nums",
  });

  export type TraceDescriptionProps = PrimitiveProps & {
    /** Custom class(es) to add to the description. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceDescriptionProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, "class");
</script>
