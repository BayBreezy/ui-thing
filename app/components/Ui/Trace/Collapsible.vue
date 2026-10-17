<template>
  <UiCollapsible
    v-slot="slotProps"
    data-slot="trace-collapsible"
    v-bind="forwarded"
    :class="traceCollapsibleStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot v-bind="slotProps" />
  </UiCollapsible>
</template>

<script lang="ts">
  import { useForwardPropsEmits } from "reka-ui";
  import type { CollapsibleRootEmits, CollapsibleRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceCollapsibleStyles = tv({
    base: "flex w-full min-w-0 flex-col",
  });

  export type TraceCollapsibleProps = CollapsibleRootProps & {
    /** Custom class(es) to add to the collapsible. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = defineProps<TraceCollapsibleProps>();
  const emits = defineEmits<CollapsibleRootEmits>();

  defineSlots<{
    /** The trigger and content. Receives the current `open` state. */
    default(props: { open: boolean }): any;
  }>();

  const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
</script>
