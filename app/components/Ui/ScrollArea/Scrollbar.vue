<template>
  <ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    v-bind="forwarded"
    :class="styles({ orientation, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
    <UiScrollAreaThumb />
  </ScrollAreaScrollbar>
</template>

<script lang="ts" setup>
  import { ScrollAreaScrollbar } from "reka-ui";
  import type { ScrollAreaScrollbarProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaScrollbarProps & {
        /** Class to apply to the scrollbar */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      orientation: "vertical",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex touch-none transition-colors select-none",
    variants: {
      orientation: {
        vertical: "h-full w-2.5 border-l border-l-transparent px-px",
        horizontal: "h-2.5 flex-col border-t border-t-transparent px-px",
      },
    },
  });
</script>
