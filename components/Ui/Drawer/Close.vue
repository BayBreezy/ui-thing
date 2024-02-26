<template>
  <DrawerClose v-bind="props">
    <slot />
  </DrawerClose>
</template>

<script lang="ts" setup>
  import { DrawerClose } from "vaul-vue";

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerClose>, "$props">> {}
  const props = defineProps<Props>();
</script>
