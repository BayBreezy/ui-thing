<template>
  <DropdownMenuItemIndicator v-bind="forwarded" :class="styles({ class: props.class })">
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
      /** The icon to display */
      icon?: string;
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon");

  const styles = tv({
    base: "flex items-center justify-center",
  });
</script>
