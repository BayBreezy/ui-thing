<template>
  <ContextMenuItemIndicator v-bind="forwarded">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </ContextMenuItemIndicator>
</template>

<script lang="ts" setup>
  import { ContextMenuItemIndicator, useForwardProps } from "radix-vue";
  import type { ContextMenuItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    ContextMenuItemIndicatorProps & {
      icon?: string;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["icon"]));
</script>
