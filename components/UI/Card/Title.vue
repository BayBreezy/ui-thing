<template>
  <div :class="styles({ class: props.class })">
    <slot>
      {{ title }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    title?: string;
    class?: any;
  }>();
  const styles = tv({
    base: "text-2xl font-semibold leading-none tracking-tight",
  });
</script>
