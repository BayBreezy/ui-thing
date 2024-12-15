<template>
  <DialogRoot v-bind="forwarded">
    <slot />
  </DialogRoot>
</template>

<script lang="ts" setup>
  import { DialogRoot, useForwardPropsEmits } from "radix-vue";
  import type { DialogRootEmits, DialogRootProps } from "radix-vue";

  const props = defineProps<DialogRootProps>();
  const emit = defineEmits<DialogRootEmits>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
