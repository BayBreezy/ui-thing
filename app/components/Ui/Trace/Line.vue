<template>
  <Primitive
    data-slot="trace-line"
    :data-status="status"
    :data-size="size"
    v-bind="forwarded"
    :class="traceLineStyles({ size, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export type TraceStatus = "running" | "error" | "pending" | "success" | "warning";

  export const traceLineStyles = tv({
    base: "group/trace-line text-muted-foreground in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=running]:*:data-[slot=trace-title]:shimmer flex w-fit max-w-full min-w-0 items-center transition-colors in-[a,button]:cursor-pointer data-[status=pending]:opacity-60 data-[status=success]:text-emerald-600 data-[status=success]:in-[a:hover,button:hover]:text-emerald-600 data-[status=warning]:text-amber-600 data-[status=warning]:in-[a:hover,button:hover]:text-amber-600 dark:data-[status=success]:text-emerald-400 dark:data-[status=success]:in-[a:hover,button:hover]:text-emerald-400 dark:data-[status=warning]:text-amber-400 dark:data-[status=warning]:in-[a:hover,button:hover]:text-amber-400",
    variants: {
      size: {
        default: "gap-2 text-sm",
        sm: "gap-1.5 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  });

  export type TraceLineProps = PrimitiveProps & {
    /** The state of the step. Drives the color and, while `running`, shimmers the title. */
    status?: TraceStatus;
    /** The size of the line. */
    size?: "default" | "sm";
    /** Custom class(es) to add to the line. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceLineProps>(), {
    as: "span",
    size: "default",
  });

  const forwarded = reactiveOmit(props, "class", "status", "size");
</script>
