<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>

<script lang="ts" setup>
  import { HoverCardTrigger } from "radix-vue";
  import type { HoverCardTriggerProps } from "radix-vue";

  defineOptions({ inheritAttrs: false });
  const props = defineProps<HoverCardTriggerProps>();
</script>
