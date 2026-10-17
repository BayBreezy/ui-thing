<template>
  <UiCollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    v-bind="forwarded"
    :class="traceCollapsibleTriggerStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
    <slot v-if="chevron" name="chevron">
      <UiTraceIcon
        :name="chevronIcon"
        class="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90"
      />
    </slot>
  </UiCollapsibleTrigger>
</template>

<script lang="ts">
  import { useForwardProps } from "reka-ui";
  import type { CollapsibleTriggerProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceCollapsibleTriggerStyles = tv({
    base: "group/trace-collapsible-trigger text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 has-[[data-status=error]]:text-destructive flex w-fit max-w-full min-w-0 cursor-pointer items-center gap-1 rounded-md text-left transition-colors outline-none focus-visible:ring-3",
  });

  export type TraceCollapsibleTriggerProps = CollapsibleTriggerProps & {
    /** Custom class(es) to add to the trigger. */
    class?: HTMLAttributes["class"];
    /** Show the trailing chevron. */
    chevron?: boolean;
    /** Iconify icon used for the chevron. */
    chevronIcon?: string;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceCollapsibleTriggerProps>(), {
    chevron: true,
    chevronIcon: "lucide:chevron-right",
  });

  defineSlots<{
    /** The trace line. */
    default(): any;
    /** Replaces the chevron. It is not rendered when `chevron` is `false`. */
    chevron(): any;
  }>();

  const forwarded = useForwardProps(reactiveOmit(props, "class", "chevron", "chevronIcon"));
</script>
