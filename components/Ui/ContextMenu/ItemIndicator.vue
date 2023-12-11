<template>
  <ContextMenuItemIndicator v-bind="reactiveOmit(props, 'icon')">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </ContextMenuItemIndicator>
</template>

<script lang="ts" setup>
  import { ContextMenuItemIndicator } from "radix-vue";
  import type { ContextMenuItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    ContextMenuItemIndicatorProps & {
      /** The icon to display */
      icon?: string;
    }
  >();
</script>
