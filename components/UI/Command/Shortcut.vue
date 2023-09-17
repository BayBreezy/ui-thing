<template>
  <span :class="styles({ class: props.class })">
    <slot>{{ shortcut }}</slot>
  </span>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
    shortcut?: any;
  }>();
  const styles = tv({
    base: "ml-auto text-xs tracking-widest text-muted-foreground",
  });
</script>
