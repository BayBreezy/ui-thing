<template>
  <ScrollAreaViewport v-bind="props" :class="styles({ class: props.class })">
    <slot></slot>
  </ScrollAreaViewport>
</template>

<script lang="ts" setup>
  import { ScrollAreaViewport } from "radix-vue";
  import type { ScrollAreaViewportProps } from "radix-vue";

  const props = defineProps<
    ScrollAreaViewportProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "h-full w-full rounded-[inherit]",
  });
</script>
