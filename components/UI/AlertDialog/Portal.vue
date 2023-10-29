<template>
  <AlertDialogPortal v-bind="forwarded">
    <slot></slot>
  </AlertDialogPortal>
</template>

<script lang="ts" setup>
  import { AlertDialogPortal, useForwardProps } from "radix-vue";
  import type { AlertDialogPortalProps } from "radix-vue";

  const props = defineProps<AlertDialogPortalProps>();
  const forwarded = useForwardProps(props);
</script>
