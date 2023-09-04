<template>
  <ScrollAreaRoot
    :type="type"
    :scrollHideDelay="scrollHideDelay"
    :dir="dir"
    :asChild="asChild"
    :class="styles({ class: props.class })"
  >
    <UIScrollAreaViewport>
      <slot></slot>
    </UIScrollAreaViewport>
    <UIScrollAreaScrollbar :orientation="orientation" />
    <UIScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script lang="ts" setup>
  import { ScrollAreaRootProps } from "radix-vue/dist/ScrollArea/ScrollAreaRoot";

  const props = defineProps<{
    type?: ScrollAreaRootProps["type"];
    scrollHideDelay?: ScrollAreaRootProps["scrollHideDelay"];
    dir?: ScrollAreaRootProps["dir"];
    asChild?: ScrollAreaRootProps["asChild"];
    orientation?: "vertical" | "horizontal";
    class?: any;
  }>();

  const styles = tv({
    base: "relative overflow-hidden",
  });
</script>
