<template>
  <ScrollAreaRoot v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <UiScrollAreaViewport>
      <slot />
    </UiScrollAreaViewport>
    <UiScrollAreaScrollbar :orientation="orientation" />
    <UiScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script lang="ts" setup>
  import { ScrollAreaRoot } from "radix-vue";
  import type { ScrollAreaRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaRootProps & {
        /** Orientation for scrolling */
        orientation?: "vertical" | "horizontal";
        /** Custom class(es) to add to the parent */
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
