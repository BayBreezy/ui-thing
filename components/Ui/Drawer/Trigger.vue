<template>
  <DrawerTrigger v-bind="props">
    <slot />
  </DrawerTrigger>
</template>

<script lang="ts" setup>
  import { DrawerTrigger } from "vaul-vue";

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerTrigger>, "$props">> {}

  const props = defineProps<Props>();
</script>
