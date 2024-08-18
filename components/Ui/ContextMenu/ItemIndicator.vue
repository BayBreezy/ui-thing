<template>
  <ContextMenuItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">
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
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "icon");

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
