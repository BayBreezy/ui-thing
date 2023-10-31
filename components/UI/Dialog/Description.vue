<template>
  <DialogDescription :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ description }}</slot>
  </DialogDescription>
</template>

<script lang="ts" setup>
  import { DialogDescription, useForwardProps } from "radix-vue";
  import type { DialogDescriptionProps } from "radix-vue";

  const props = defineProps<
    DialogDescriptionProps & {
      class?: any;
      description?: string;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["description", "class"]));

  const styles = tv({
    base: "text-sm text-muted-foreground",
  });
</script>
