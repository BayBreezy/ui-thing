<template>
  <DropdownMenuItemIndicator v-bind="reactiveOmit(props, 'icon')">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </DropdownMenuItemIndicator>
</template>

<script lang="ts" setup>
  import { DropdownMenuItemIndicator } from "radix-vue";
  import type { DropdownMenuItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    DropdownMenuItemIndicatorProps & {
      icon?: string;
    }
  >();
</script>
