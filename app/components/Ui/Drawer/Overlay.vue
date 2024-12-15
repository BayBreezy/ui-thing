<template>
  <DrawerOverlay v-bind="props" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  import { DrawerOverlay } from "vaul-vue";

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerOverlay>, "$props">> {}

  const props = defineProps<Props & { class?: any }>();

  const styles = tv({
    base: "fixed inset-0 z-50 bg-black/40 backdrop-blur",
  });
</script>
