<template>
  <AlertDialogTitle v-bind="reactiveOmit(props, 'class')" :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </AlertDialogTitle>
</template>

<script lang="ts" setup>
  import { AlertDialogTitle } from "radix-vue";
  import type { AlertDialogTitleProps } from "radix-vue";

  const props = defineProps<
    AlertDialogTitleProps & {
      /** Text to display in the title */
      title?: string;
      /** Custom class(es) to add to the title */
      class?: any;
    }
  >();

  const styles = tv({
    base: "text-lg font-semibold",
  });
</script>
