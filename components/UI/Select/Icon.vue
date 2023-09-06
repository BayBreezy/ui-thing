<template>
  <SelectIcon :as-child="asChild || true">
    <slot>
      <Icon :class="styles({ class: props.class })" :name="icon || 'lucide:chevrons-up-down'" />
    </slot>
  </SelectIcon>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    icon?: string;
    class?: any;
  }>();

  const styles = tv({
    base: "h-4 w-4 shrink-0 text-muted-foreground opacity-70",
  });
</script>
