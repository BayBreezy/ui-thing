<template>
  <ContextMenuArrow v-bind="props" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ContextMenuArrow } from "radix-vue";
  import type { ContextMenuArrowProps } from "radix-vue";

  const props = defineProps<
    ContextMenuArrowProps & {
      class?: any;
    }
  >();
  const styles = tv({
    base: "border bg-muted",
  });
</script>
