<template>
  <ContextMenuSeparator :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "-mx-1 my-1 h-px bg-border",
  });
</script>
