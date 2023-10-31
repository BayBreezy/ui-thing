<template>
  <DialogTitle :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ title }}</slot>
  </DialogTitle>
</template>

<script lang="ts" setup>
  import { DialogTitle, useForwardProps } from "radix-vue";
  import type { DialogTitleProps } from "radix-vue";

  const props = defineProps<
    DialogTitleProps & {
      class?: any;
      title?: string;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["title", "class"]));

  const styles = tv({
    base: "text-lg font-semibold leading-none tracking-tight",
  });
</script>
