<template>
  <DropdownMenuItemIndicator v-bind="forwarded">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </DropdownMenuItemIndicator>
</template>

<script lang="ts" setup>
  import { DropdownMenuItemIndicator, useForwardProps } from "radix-vue";
  import type { DropdownMenuItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuItemIndicatorProps & {
      icon?: string;
    }
  >();
  const forwarded = useForwardProps(props);
</script>
