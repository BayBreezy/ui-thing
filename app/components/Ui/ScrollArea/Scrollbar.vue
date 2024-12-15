<template>
  <ScrollAreaScrollbar v-bind="forwarded" :class="styles({ orientation, class: props.class })">
    <slot />
    <UiScrollAreaThumb />
  </ScrollAreaScrollbar>
</template>

<script lang="ts" setup>
  import { ScrollAreaScrollbar } from "radix-vue";
  import type { ScrollAreaScrollbarProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaScrollbarProps & {
        /** Class to apply to the scrollbar */
        class?: any;
      }
    >(),
    {
      orientation: "vertical",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex touch-none select-none transition-colors",
    variants: {
      orientation: {
        vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",
        horizontal: "h-2.5 border-t border-t-transparent p-[1px]",
      },
    },
  });
</script>
