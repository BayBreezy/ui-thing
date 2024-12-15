<template>
  <ScrollAreaThumb v-bind="forwarded" :class="styles({ orientation, class: props.class })">
    <slot />
  </ScrollAreaThumb>
</template>

<script lang="ts" setup>
  import { ScrollAreaThumb } from "radix-vue";
  import type { ScrollAreaThumbProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      ScrollAreaThumbProps & {
        /** Custom class(es) to add to the parent */
        class?: any;
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
