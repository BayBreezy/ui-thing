<template>
  <DrawerRoot v-bind="props">
    <slot />
  </DrawerRoot>
</template>

<script lang="ts" setup>
  import { DrawerRoot } from "vaul-vue";

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerRoot>, "$props">> {}
  const props = defineProps<Props>();
</script>
