<template>
  <HoverCardArrow
    :class="styles({ class: props.class })"
    :as-child="asChild"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts" setup>
  const styles = tv({
    base: " fill-popover",
  });
  const props = withDefaults(
    defineProps<{
      asChild?: boolean;
      width?: number;
      height?: number;
      class?: any;
    }>(),
    {
      height: 5,
      width: 10,
    }
  );
</script>
