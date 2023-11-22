<template>
  <Label :class="styles({ class: props.class })" v-bind="reactiveOmit(props, 'class')">
    <slot />
  </Label>
</template>

<script lang="ts" setup>
  import { Label } from "radix-vue";
  import type { LabelProps } from "radix-vue";

  const props = defineProps<
    LabelProps & {
      /** Custom class(es) to add to the label */
      class?: any;
    }
  >();

  const styles = tv({
    base: "inline-block text-base font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm",
  });
</script>
