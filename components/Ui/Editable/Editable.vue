<template>
  <EditableRoot :ref="forwardRef" v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </EditableRoot>
</template>

<script lang="ts" setup>
  import { EditableRoot, useForwardExpose, useForwardPropsEmits } from "radix-vue";
  import type { EditableRootEmits, EditableRootProps } from "radix-vue";

  const { currentRef, forwardRef } = useForwardExpose();
  const props = defineProps<EditableRootProps>();
  const emit = defineEmits<EditableRootEmits & { ready: [v?: any] }>();
  const forwarded = useForwardPropsEmits(props, emit);

  onMounted(() => {
    // Emit the ready event with the current ref value
    emit("ready", currentRef);
  });
</script>
