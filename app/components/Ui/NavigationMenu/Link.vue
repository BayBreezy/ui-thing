<template>
  <NavigationMenuLink v-bind="forwarded">
    <slot />
  </NavigationMenuLink>
</template>

<script lang="ts" setup>
  import { NavigationMenuLink, useForwardPropsEmits } from "radix-vue";
  import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "radix-vue";

  const props = defineProps<NavigationMenuLinkProps>();
  const emits = defineEmits<NavigationMenuLinkEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
