<template>
  <ToastTitle :class="styles({ class: props.class })" v-bind="forwarded">
    <slot>{{ title }}</slot>
  </ToastTitle>
</template>

<script lang="ts" setup>
  import { ToastTitle } from "radix-vue";
  import type { ToastTitleProps } from "radix-vue";

  const props = defineProps<
    ToastTitleProps & {
      /** The title text to render */
      title?: string;
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "title");
  const styles = tv({
    base: "text-sm font-semibold",
  });
</script>
