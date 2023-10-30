<template>
  <ContextMenuSeparator :class="styles({ class: props.class })" v-bind="forwarded" />
</template>

<script lang="ts" setup>
  import { ContextMenuSeparator, useForwardProps } from "radix-vue";
  import type { ContextMenuSeparatorProps } from "radix-vue";

  const props = defineProps<
    ContextMenuSeparatorProps & {
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
