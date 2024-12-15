<template>
  <ListboxGroup v-bind="forwarded">
    <slot />
  </ListboxGroup>
</template>

<script lang="ts" setup>
  import { ListboxGroup, useForwardPropsEmits } from "radix-vue";
  import type { ListboxGroupProps } from "radix-vue";

  const props = defineProps<ListboxGroupProps>();
  const forwarded = useForwardPropsEmits(props);
</script>
