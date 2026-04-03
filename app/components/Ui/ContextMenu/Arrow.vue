<template>
  <ContextMenuArrow
    data-slot="context-menu-arrow"
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
  import { ContextMenuArrow } from "reka-ui";
  import type { ContextMenuArrowProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ContextMenuArrowProps & {
        /** Custom class(es) to add to the arrow */
        class?: HTMLAttributes["class"];
        /** Whether to render the arrow with a translucent surface */
        translucent?: boolean;
      }
    >(),
    {
      width: 12,
      height: 6,
    }
  );
  const forwarded = reactiveOmit(props, "class", "translucent");
  const styles = tv({
    base: "fill-popover stroke-border",
    variants: {
      translucent: {
        true: getTranslucentFloatingArrowClasses("popover"),
      },
    },
  });
</script>
