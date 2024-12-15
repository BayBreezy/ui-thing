<template>
  <PopoverPortal v-bind="forwarded">
    <slot />
  </PopoverPortal>
</template>

<script lang="ts" setup>
  import { PopoverPortal, useForwardProps } from "radix-vue";
  import type { PopoverPortalProps } from "radix-vue";

  const props = defineProps<PopoverPortalProps>();
  const forwarded = useForwardProps(props);
</script>
