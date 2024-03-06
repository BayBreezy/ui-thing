<template>
  <SplitterPanel
    v-bind="forwarded"
    v-slot="{ isCollapsed, isExpanded }: { isCollapsed: boolean; isExpanded: boolean }"
  >
    <slot :isCollapsed="isCollapsed" :isExpanded="isExpanded"></slot>
  </SplitterPanel>
</template>

<script lang="ts" setup>
  import { SplitterPanel, useForwardPropsEmits } from "radix-vue";
  import type { SplitterPanelEmits, SplitterPanelProps } from "radix-vue";

  const props = withDefaults(defineProps<SplitterPanelProps>(), {});

  const emit = defineEmits<SplitterPanelEmits>();

  const forwarded = useForwardPropsEmits(props, emit);
</script>
