<template>
  <AlertDialogPortal v-bind="props">
    <slot />
  </AlertDialogPortal>
</template>

<script lang="ts" setup>
  import { AlertDialogPortal } from "radix-vue";
  import type { AlertDialogPortalProps } from "radix-vue";

  const props = defineProps<AlertDialogPortalProps>();
</script>
