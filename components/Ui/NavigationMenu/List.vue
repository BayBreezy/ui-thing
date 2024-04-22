<template>
  <NavigationMenuList v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot />
  </NavigationMenuList>
</template>

<script lang="ts" setup>
  import { NavigationMenuList } from "radix-vue";
  import type { NavigationMenuListProps } from "radix-vue";

  const props = defineProps<
    NavigationMenuListProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();

  const styles = tv({
    base: "group flex flex-1 list-none items-center justify-center space-x-1",
  });
</script>
