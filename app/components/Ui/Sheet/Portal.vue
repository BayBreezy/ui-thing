<template>
  <DialogPortal v-bind="props">
    <slot />
  </DialogPortal>
</template>

<script lang="ts" setup>
  import { DialogPortal } from "radix-vue";
  import type { DialogPortalProps } from "radix-vue";

  const props = defineProps<DialogPortalProps>();
</script>
