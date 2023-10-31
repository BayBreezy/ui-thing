<template>
  <DialogClose v-bind="props">
    <slot> </slot>
  </DialogClose>
</template>

<script lang="ts" setup>
  import { DialogClose, useForwardProps } from "radix-vue";
  import type { DialogCloseProps } from "radix-vue";

  const props = defineProps<DialogCloseProps>();
</script>
