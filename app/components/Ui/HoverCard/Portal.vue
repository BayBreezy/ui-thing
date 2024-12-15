<template>
  <HoverCardPortal v-bind="props">
    <slot />
  </HoverCardPortal>
</template>

<script lang="ts" setup>
  import { HoverCardPortal } from "radix-vue";
  import type { HoverCardPortalProps } from "radix-vue";

  const props = defineProps<HoverCardPortalProps>();
</script>
