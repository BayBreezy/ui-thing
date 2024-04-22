<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>

<script lang="ts" setup>
  import { DialogClose } from "radix-vue";
  import type { DialogCloseProps } from "radix-vue";

  const props = defineProps<DialogCloseProps>();
</script>
