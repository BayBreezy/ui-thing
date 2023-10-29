<template>
  <AlertDialogCancel v-bind="forwarded">
    <slot>{{ text }}</slot>
  </AlertDialogCancel>
</template>

<script lang="ts" setup>
  import { AlertDialogCancel, useForwardProps } from "radix-vue";
  import type { AlertDialogCancelProps } from "radix-vue";

  const props = defineProps<
    AlertDialogCancelProps & {
      text?: string;
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["text", "class"]));
</script>
