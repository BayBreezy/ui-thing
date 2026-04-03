<template>
  <TooltipArrow
    data-slot="tooltip-arrow"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  />
</template>

<script lang="ts" setup>
  import { TooltipArrow, useForwardProps } from "reka-ui";
  import type { TooltipArrowProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      TooltipArrowProps & {
        /** Additional classes for the tooltip arrow */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      width: 12,
      height: 6,
    }
  );

  const styles = tv({ base: "fill-popover stroke-border" });
  const forwarded = useForwardProps(reactiveOmit(props, "class"));
</script>
