<template>
  <ScrollAreaRoot
    data-slot="scroll-area"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <UiScrollAreaViewport>
      <slot />
    </UiScrollAreaViewport>
    <UiScrollAreaScrollbar :orientation="orientation" />
    <UiScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script lang="ts" setup>
  import { ScrollAreaRoot } from "reka-ui";
  import type { ScrollAreaRootProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaRootProps & {
        /** Orientation for scrolling */
        orientation?: "vertical" | "horizontal";
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      orientation: "vertical",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "relative",
  });
</script>
