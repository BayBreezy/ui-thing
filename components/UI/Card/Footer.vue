<template>
  <div :class="styles({ class: props.class })">
    <slot> </slot>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();
  const styles = tv({
    base: "flex items-center p-6 pt-0",
  });
</script>
