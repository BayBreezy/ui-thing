<template>
  <ToastTitle :class="styles({ class: props.class })" v-bind="props">
    <slot>{{ title }}</slot>
  </ToastTitle>
</template>

<script lang="ts" setup>
  import { ToastTitle } from "radix-vue";
  import type { ToastTitleProps } from "radix-vue";

  const props = defineProps<
    ToastTitleProps & {
      title?: string;
      class?: any;
    }
  >();

  const styles = tv({
    base: "text-sm font-semibold",
  });
</script>
