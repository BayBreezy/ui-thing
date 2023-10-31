<template>
  <ProgressIndicator v-bind="props" :class="styles({ class: props.class })">
    <slot></slot>
  </ProgressIndicator>
</template>

<script lang="ts" setup>
  import { ProgressIndicator } from "radix-vue";
  import type { ProgressIndicatorProps } from "radix-vue";

  const props = defineProps<
    ProgressIndicatorProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "h-full w-full flex-1 rounded-full bg-primary transition-all",
  });
</script>
