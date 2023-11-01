<template>
  <ToastDescription :class="styles({ class: props.class })" v-bind="props">
    <slot>{{ description }}</slot>
  </ToastDescription>
</template>

<script lang="ts" setup>
  import { ToastDescription } from "radix-vue";
  import type { ToastDescriptionProps } from "radix-vue";

  const props = defineProps<
    ToastDescriptionProps & {
      description?: string;
      class?: any;
    }
  >();

  const styles = tv({
    base: "text-sm opacity-90",
  });
</script>
