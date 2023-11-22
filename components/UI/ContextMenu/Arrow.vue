<template>
  <ContextMenuArrow v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ContextMenuArrow } from "radix-vue";
  import type { ContextMenuArrowProps } from "radix-vue";

  const props = defineProps<
    ContextMenuArrowProps & {
      /** Custom class(es) to add to teh arrow */
      class?: any;
    }
  >();
  const styles = tv({
    base: "border bg-muted",
  });
</script>
