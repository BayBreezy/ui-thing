<template>
  <SelectGroup v-bind="forwarded">
    <slot />
  </SelectGroup>
</template>

<script lang="ts" setup>
  import { SelectGroup, useForwardProps } from "radix-vue";
  import type { SelectGroupProps } from "radix-vue";

  const props = defineProps<SelectGroupProps>();
  const forwarded = useForwardProps(props);
</script>
