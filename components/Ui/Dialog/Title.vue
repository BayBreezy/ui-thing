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
      /** Custom class(es) to add to the parent */
      class?: any;
      /** The title text */
      title?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "text-xl font-semibold leading-none tracking-tight md:text-lg",
  });
</script>
