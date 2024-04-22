<template>
  <tfoot :class="styles({ class: props.class })">
    <slot />
  </tfoot>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "bg-primary font-medium text-primary-foreground",
  });
</script>
