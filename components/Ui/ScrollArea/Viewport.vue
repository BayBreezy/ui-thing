<template>
  <ScrollAreaViewport v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot />
  </ScrollAreaViewport>
</template>

<script lang="ts" setup>
  import { ScrollAreaViewport } from "radix-vue";
  import type { ScrollAreaViewportProps } from "radix-vue";

  const props = defineProps<
    ScrollAreaViewportProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const styles = tv({
    base: "h-full w-full rounded-[inherit]",
  });
</script>
