<template>
  <AlertDialogDescription v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </AlertDialogDescription>
</template>

<script lang="ts" setup>
  import { AlertDialogDescription } from "radix-vue";
  import type { AlertDialogDescriptionProps } from "radix-vue";

  const props = defineProps<
    AlertDialogDescriptionProps & {
      /** Text to display in the description */
      description?: string;
      /** Custom class(es) to add to the description */
      class?: any;
    }
  >();

  const forwarded = reactiveOmit(props, "class", "description");

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
