<template>
  <DialogTitle :class="styles({ class: props.class })" v-bind="props">
    <slot>{{ title }}</slot>
  </DialogTitle>
</template>

<script lang="ts" setup>
  import { DialogTitle } from "radix-vue";
  import type { DialogTitleProps } from "radix-vue";

  const props = defineProps<
    DialogTitleProps & {
      class?: any;
      title?: string;
    }
  >();

  const styles = tv({
    base: "text-lg font-semibold text-foreground",
  });
</script>
