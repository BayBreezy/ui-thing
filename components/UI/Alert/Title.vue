<template>
  <div :class="styles({ class: props.class })">
    <slot>{{ title }}</slot>
  </div>
</template>

<script lang="ts" setup>
  const styles = tv({
    base: "mb-1 font-medium leading-none tracking-tight",
  });

  const props = defineProps<{
    class?: any;
    title?: string;
  }>();
</script>
