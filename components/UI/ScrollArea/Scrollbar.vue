<template>
  <ScrollAreaScrollbar
    :as-child="asChild"
    :orientation="orientation"
    :class="styles({ orientation, class: props.class })"
  >
    <slot></slot>
    <UIScrollAreaThumb />
  </ScrollAreaScrollbar>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      asChild?: boolean;
      class?: any;
      orientation?: "vertical" | "horizontal";
    }>(),
    {
      orientation: "vertical",
    }
  );

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
