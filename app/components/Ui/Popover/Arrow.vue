<template>
  <PopoverArrow
    data-slot="popover-arrow"
    v-bind="forwarded"
    :class="
      styles({
        translucent: props.translucent,
        class: normalizeClass(props.class) || undefined,
      })
    "
  />
</template>

<script lang="ts" setup>
  import { PopoverArrow, useForwardProps } from "reka-ui";
  import type { PopoverArrowProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PopoverArrowProps & {
        class?: HTMLAttributes["class"];
        translucent?: boolean;
      }
    >(),
    {
      width: 12,
      height: 6,
    }
  );

  const forwarded = useForwardProps(reactiveOmit(props, "class", "translucent"));
  const styles = tv({
    base: "fill-popover stroke-border",
    variants: {
      translucent: {
        true: getTranslucentFloatingArrowClasses("popover"),
      },
    },
  });
</script>
