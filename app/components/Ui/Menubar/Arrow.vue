<template>
  <MenubarArrow
    data-slot="menubar-arrow"
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
  import { MenubarArrow } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { MenubarArrowProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      MenubarArrowProps & {
        class?: HTMLAttributes["class"];
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
