<template>
  <ScrollAreaThumb
    data-slot="scroll-area-thumb"
    v-bind="forwarded"
    :class="styles({ orientation, class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </ScrollAreaThumb>
</template>

<script lang="ts" setup>
  import { ScrollAreaThumb } from "reka-ui";
  import type { ScrollAreaThumbProps } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaThumbProps & {
        /** Custom class(es) to add to the parent */
        class?: HTMLAttributes["class"];
        orientation?: "vertical" | "horizontal";
      }
    >(),
    {
      orientation: "vertical",
    }
  );
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "relative flex-1 rounded-full bg-border",
    variants: {
      orientation: {
        vertical: "flex-1",
        horizontal: "",
      },
    },
  });
</script>
