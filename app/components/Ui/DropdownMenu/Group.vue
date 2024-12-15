<template>
  <DropdownMenuGroup v-bind="props">
    <slot />
  </DropdownMenuGroup>
</template>

<script lang="ts" setup>
  import { DropdownMenuGroup } from "radix-vue";
  import type { DropdownMenuGroupProps } from "radix-vue";

  const props = defineProps<DropdownMenuGroupProps>();
</script>
