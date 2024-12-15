<template>
  <DropdownMenuPortal v-bind="props">
    <slot />
  </DropdownMenuPortal>
</template>

<script lang="ts" setup>
  import { DropdownMenuPortal } from "radix-vue";
  import type { DropdownMenuPortalProps } from "radix-vue";

  const props = defineProps<DropdownMenuPortalProps>();
</script>
