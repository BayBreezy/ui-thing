<template>
  <Label :class="styles({ class: props.class })" v-bind="forwarded">
    <slot />
  </Label>
</template>

<script lang="ts" setup>
  import { Label, useForwardProps } from "radix-vue";
  import type { LabelProps } from "radix-vue";

  const props = defineProps<
    LabelProps & {
      class?: any;
    }
  >();
  const forwarded = useForwardProps(useOmit(props, ["class"]));

  const styles = tv({
    base: "inline-block text-sm font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  });
</script>
