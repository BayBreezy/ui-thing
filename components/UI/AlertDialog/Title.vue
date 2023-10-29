<template>
  <AlertDialogTitle v-bind="forwarded" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </AlertDialogTitle>
</template>

<script lang="ts" setup>
  import { AlertDialogTitle, useForwardProps } from "radix-vue";
  import type { AlertDialogTitleProps } from "radix-vue";

  const props = defineProps<
    AlertDialogTitleProps & {
      title?: string;
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["title", "class"]));

  const styles = tv({
    base: "text-lg font-semibold",
  });
</script>
