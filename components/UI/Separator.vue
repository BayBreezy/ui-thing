<template>
  <Separator
    :orientation="orientation"
    :decorative="decorative"
    :as-child="asChild"
    :class="styles({ orientation, class: props.class })"
  />
</template>

<script lang="ts" setup>
  import { type SeparatorProps } from "radix-vue/dist/Separator/Separator";

  const props = withDefaults(
    defineProps<{
      orientation?: SeparatorProps["orientation"];
      decorative?: SeparatorProps["decorative"];
      class?: any;
      asChild?: boolean;
    }>(),
    {
      orientation: "horizontal",
    }
  );

  const styles = tv({
    base: "shrink-0 bg-border",
    variants: {
      orientation: {
        horizontal: "h-[1px] w-full",
        vertical: "h-full w-[1px]",
      },
    },
  });
</script>
