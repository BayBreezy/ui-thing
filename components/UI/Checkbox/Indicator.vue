<template>
  <CheckboxIndicator :as-child="asChild" :class="styles({ class: props.class })">
    <slot>
      <Icon :name="icon" class="h-4 w-4" />
    </slot>
  </CheckboxIndicator>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      asChild?: boolean;
      icon?: string;
    }>(),
    {
      icon: "lucide:check",
    }
  );

  const styles = tv({
    base: "flex items-center justify-center text-current",
  });
</script>
