<template>
  <Primitive
    data-slot="trace-icon"
    aria-hidden="true"
    v-bind="forwarded"
    :class="traceIconStyles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <Icon v-if="name" :name="name" class="size-full" />
    </slot>
  </Primitive>
</template>

<script lang="ts">
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  export const traceIconStyles = tv({
    base: "flex size-4 shrink-0 items-center justify-center group-data-[size=sm]/trace-line:size-3.5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-full [[data-slot=trace-title]~&]:-ml-1",
  });

  export type TraceIconProps = PrimitiveProps & {
    /** An Iconify icon name. Used when no default slot content is passed. */
    name?: string;
    /** Custom class(es) to add to the icon wrapper. */
    class?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  const props = withDefaults(defineProps<TraceIconProps>(), {
    as: "span",
  });

  const forwarded = reactiveOmit(props, "class", "name");
</script>
