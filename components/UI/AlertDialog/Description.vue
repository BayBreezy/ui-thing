<template>
  <AlertDialogDescription v-bind="props" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </AlertDialogDescription>
</template>

<script lang="ts" setup>
  import { AlertDialogDescription } from "radix-vue";
  import type { AlertDialogDescriptionProps } from "radix-vue";

  const props = defineProps<
    AlertDialogDescriptionProps & {
      description?: string;
      class?: any;
    }
  >();

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
