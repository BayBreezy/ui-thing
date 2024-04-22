<template>
  <HoverCardRoot v-bind="forwarded">
    <slot />
  </HoverCardRoot>
</template>

<script lang="ts" setup>
  import { HoverCardRoot, useForwardPropsEmits } from "radix-vue";
  import type { HoverCardRootEmits, HoverCardRootProps } from "radix-vue";

  const props = withDefaults(defineProps<HoverCardRootProps>(), {
    openDelay: 200,
    closeDelay: 200,
  });

  const emits = defineEmits<HoverCardRootEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
</script>
