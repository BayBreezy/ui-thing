<template>
  <Primitive
    data-slot="trace"
    v-bind="forwarded"
    :class="traceStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceStyles = tv({
    base: "*:has-[>[data-slot=trace-line]]:focus-visible:ring-ring/50 flex w-full min-w-0 flex-col gap-2 *:has-[>[data-slot=trace-line]]:flex *:has-[>[data-slot=trace-line]]:w-fit *:has-[>[data-slot=trace-line]]:max-w-full *:has-[>[data-slot=trace-line]]:min-w-0 *:has-[>[data-slot=trace-line]]:rounded-md *:has-[>[data-slot=trace-line]]:text-left *:has-[>[data-slot=trace-line]]:outline-none *:has-[>[data-slot=trace-line]]:focus-visible:ring-3",
  });

  export type TraceProps = PrimitiveProps & {
    /** Custom class(es) to add to the trace. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceProps>(), {
    as: "div",
  });

  const forwarded = reactiveOmit(props, "class");
</script>
