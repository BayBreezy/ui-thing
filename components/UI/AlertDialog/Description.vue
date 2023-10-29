<template>
  <AlertDialogDescription v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>{{ description }}</slot>
  </AlertDialogDescription>
</template>

<script lang="ts" setup>
  import { AlertDialogDescription, useForwardProps } from "radix-vue";
  import type { AlertDialogDescriptionProps } from "radix-vue";

  const props = defineProps<
    AlertDialogDescriptionProps & {
      description?: string;
      class?: any;
    }
  >();

  const forwarded = useForwardProps(useOmit(props, ["description", "class"]));

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
