<template>
  <CollapsibleTrigger v-bind="forwarded">
    <slot />
  </CollapsibleTrigger>
</template>

<script lang="ts" setup>
  import { CollapsibleTrigger, useForwardProps } from "radix-vue";
  import type { CollapsibleTriggerProps } from "radix-vue";

  const props = defineProps<CollapsibleTriggerProps>();
  const forwarded = useForwardProps(props);
</script>
