<template>
  <NavigationMenuList v-bind="props" :class="styles({ class: props.class })">
    <slot></slot>
  </NavigationMenuList>
</template>

<script lang="ts" setup>
  import { NavigationMenuList } from "radix-vue";
  import type { NavigationMenuListProps } from "radix-vue";

  const props = defineProps<
    NavigationMenuListProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "group flex flex-1 list-none items-center justify-center space-x-1",
  });
</script>
