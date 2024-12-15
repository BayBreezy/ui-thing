<template>
  <DrawerTitle v-bind="props" :class="styles({ class: props.class })">
    <slot>
      {{ props.text }}
    </slot>
  </DrawerTitle>
</template>

<script lang="ts" setup>
  import { DrawerTitle } from "vaul-vue";

  interface Props
    extends /* @vue-ignore */ Partial<Pick<InstanceType<typeof DrawerTitle>, "$props">> {
    class?: any;
    text?: string;
  }

  const props = defineProps<Props>();

  const styles = tv({
    base: "text-lg font-semibold leading-none tracking-tight",
  });
</script>
