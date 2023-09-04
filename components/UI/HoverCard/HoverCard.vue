<template>
  <HoverCardRoot
    :default-open="defaultOpen"
    :open="open"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    @update:open="emits('update:open', $event)"
  >
    <slot></slot>
  </HoverCardRoot>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      defaultOpen?: false;
      open?: boolean;
      openDelay?: number;
      closeDelay?: number;
    }>(),
    {
      openDelay: 200,
      closeDelay: 200,
    }
  );

  const emits = defineEmits<{
    "update:open": [value: boolean];
  }>();
</script>
