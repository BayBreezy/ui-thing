<template>
  <NavigationMenuSub v-bind="forwarded">
    <slot />
  </NavigationMenuSub>
</template>

<script lang="ts" setup>
  import { NavigationMenuSub, useForwardPropsEmits } from "radix-vue";
  import type { NavigationMenuSubEmits, NavigationMenuSubProps } from "radix-vue";

  const props = defineProps<NavigationMenuSubProps>();
  const emits = defineEmits<NavigationMenuSubEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
