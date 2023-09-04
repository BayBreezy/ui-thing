<template>
  <SwitchThumb :as-child="asChild" :class="styles({ class: props.class })">
    <slot></slot>
  </SwitchThumb>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  });
</script>
