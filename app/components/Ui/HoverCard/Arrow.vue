<template>
  <HoverCardArrow
    :class="
      styles({
        translucent: props.translucent,
        class: normalizeClass(props.class) || undefined,
      })
    "
    v-bind="forwarded"
  />
</template>

<script lang="ts" setup>
  import { HoverCardArrow } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HoverCardArrowProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      HoverCardArrowProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
        /** Whether to render the arrow with a translucent surface */
        translucent?: boolean;
      }
    >(),
    {
      height: 6,
      width: 12,
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
