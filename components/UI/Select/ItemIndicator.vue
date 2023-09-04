<template>
  <SelectItemIndicator :as-child="asChild">
    <slot>
      <Icon :class="styles({ class: props.class })" :name="icon || 'lucide:check'" />
    </slot>
  </SelectItemIndicator>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    icon?: string;
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "h-4 w-4",
  });
</script>
