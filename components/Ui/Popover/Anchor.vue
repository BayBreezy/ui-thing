<template>
  <PopoverAnchor v-bind="forwarded">
    <slot />
  </PopoverAnchor>
</template>

<script lang="ts" setup>
  import { PopoverAnchor, useForwardProps } from "radix-vue";
  import type { PopoverAnchorProps } from "radix-vue";

  const props = defineProps<PopoverAnchorProps>();
  const forwarded = useForwardProps(props);
</script>
