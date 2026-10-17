<template>
  <UiCollapsibleContent data-slot="trace-collapsible-content" v-bind="forwarded" class="min-w-0">
    <div
      data-slot="trace-collapsible-content-inner"
      :data-bordered="bordered ? '' : undefined"
      :class="
        traceCollapsibleContentStyles({ bordered, class: normalizeClass(props.class) || undefined })
      "
    >
      <slot />
    </div>
  </UiCollapsibleContent>
</template>

<script lang="ts">
  import { useForwardProps } from "reka-ui";
  import type { CollapsibleContentProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceCollapsibleContentStyles = tv({
    base: "text-muted-foreground mt-2 mb-1 min-w-0 leading-relaxed wrap-break-word",
    variants: {
      bordered: {
        true: "ml-[calc(--spacing(2)-1px)] border-l pr-1 pl-4",
        false: "pl-0",
      },
    },
    defaultVariants: {
      bordered: true,
    },
  });

  export type TraceCollapsibleContentProps = CollapsibleContentProps & {
    /** Custom class(es) to add to the content wrapper (the element inside the animated container). */
    class?: HTMLAttributes["class"];
    /** Show the vertical rule and indent on the left of the content. */
    bordered?: boolean;
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceCollapsibleContentProps>(), {
    bordered: true,
  });

  const forwarded = useForwardProps(reactiveOmit(props, "class", "bordered"));
</script>
