<template>
  <DialogTitle :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ title }}</slot>
  </DialogTitle>
</template>

<script lang="ts" setup>
  import { DialogTitle } from "radix-vue";
  import type { DialogTitleProps } from "radix-vue";

  const props = defineProps<
    DialogTitleProps & {
      /** Custom class(es) to add to parent element */
      class?: any;
      /** Title text */
      title?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "text-lg font-semibold text-foreground",
  });
</script>
