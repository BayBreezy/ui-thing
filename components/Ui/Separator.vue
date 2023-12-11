<template>
  <Separator
    v-bind="useForwardProps(reactiveOmit(props, 'class'))"
    :class="styles({ orientation, class: props.class })"
  />
</template>

<script lang="ts" setup>
  import { Separator, useForwardProps } from "radix-vue";
  import type { SeparatorProps } from "radix-vue";

  const props = withDefaults(defineProps<SeparatorProps & { class?: any }>(), {
    orientation: "horizontal",
  });

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
