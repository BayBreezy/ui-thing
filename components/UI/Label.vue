<template>
  <Label :class="styles({ class: props.class })" v-bind="props">
    <slot />
  </Label>
</template>

<script lang="ts" setup>
  import { Label } from "radix-vue";
  import type { LabelProps } from "radix-vue";

  const props = defineProps<
    LabelProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "inline-block text-base font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-sm",
  });
</script>
