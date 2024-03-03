<template>
  <DrawerRoot v-bind="forwarded">
    <slot />
  </DrawerRoot>
</template>

<script lang="ts" setup>
  import { useForwardPropsEmits } from "radix-vue";
  import { DrawerRoot } from "vaul-vue";
  import type { DrawerRootEmits, DrawerRootProps } from "vaul-vue";

  const props = defineProps<DrawerRootProps>();
  const emits = defineEmits<DrawerRootEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
