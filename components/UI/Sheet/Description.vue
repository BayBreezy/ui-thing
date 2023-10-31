<template>
  <DialogDescription :class="styles({ class: props.class })" v-bind="props">
    <slot>{{ description }}</slot>
  </DialogDescription>
</template>

<script lang="ts" setup>
  import { DialogDescription } from "radix-vue";
  import type { DialogDescriptionProps } from "radix-vue";

  const props = defineProps<
    DialogDescriptionProps & {
      class?: any;
      description?: string;
    }
  >();

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
