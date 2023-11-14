<template>
  <AlertDialogTitle v-bind="props" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </AlertDialogTitle>
</template>

<script lang="ts" setup>
  import { AlertDialogTitle } from "radix-vue";
  import type { AlertDialogTitleProps } from "radix-vue";

  const props = defineProps<
    AlertDialogTitleProps & {
      title?: string;
      class?: any;
    }
  >();

  const styles = tv({
    base: "text-lg font-semibold",
  });
</script>
