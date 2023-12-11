<template>
  <MenubarItemIndicator v-bind="reactiveOmit(props, 'icon')">
    <slot>
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
    </slot>
  </MenubarItemIndicator>
</template>

<script lang="ts" setup>
  import { MenubarItemIndicator } from "radix-vue";
  import type { MenubarItemIndicatorProps } from "radix-vue";

  const props = defineProps<
    MenubarItemIndicatorProps & {
      icon?: string;
    }
  >();
</script>
