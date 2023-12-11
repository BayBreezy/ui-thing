<template>
  <SelectArrow v-bind="useForwardProps(props)" />
</template>

<script lang="ts" setup>
  import { SelectArrow, useForwardProps } from "radix-vue";
  import type { SelectArrowProps } from "radix-vue";

  const props = withDefaults(defineProps<SelectArrowProps>(), {
    width: 10,
    height: 5,
  });
</script>
