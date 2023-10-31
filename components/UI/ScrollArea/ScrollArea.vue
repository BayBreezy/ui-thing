<template>
  <ScrollAreaRoot v-bind="props" :class="styles({ class: props.class })">
    <UIScrollAreaViewport>
      <slot></slot>
    </UIScrollAreaViewport>
    <UIScrollAreaScrollbar :orientation="orientation" />
    <UIScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script lang="ts" setup>
  import { ScrollAreaRoot } from "radix-vue";
  import type { ScrollAreaRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaRootProps & {
        orientation?: "vertical" | "horizontal";
        class?: any;
      }
    >(),
    {
      orientation: "vertical",
    }
  );

  const styles = tv({
    base: "relative overflow-hidden",
  });
</script>
