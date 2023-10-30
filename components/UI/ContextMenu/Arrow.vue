<template>
  <ContextMenuArrow v-bind="forwarded" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { ContextMenuArrow, useForwardProps } from "radix-vue";
  import type { ContextMenuArrowProps } from "radix-vue";

  const props = defineProps<
    ContextMenuArrowProps & {
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "border bg-muted",
  });
</script>
