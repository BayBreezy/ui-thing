<template>
  <Label :as-child="asChild" :for="props.for" :class="styles({ class: props.class })">
    <slot />
  </Label>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    for?: string;
    class?: any;
  }>();

  const styles = tv({
    base: "inline-block text-sm font-medium leading-none hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  });
</script>
