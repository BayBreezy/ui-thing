<template>
  <ComboboxArrow
    :as-child="asChild"
    :width="width"
    :height="height"
    :class="styles({ class: props.class })"
  />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      asChild?: boolean;
      width?: number;
      height?: number;
      class?: any;
    }>(),
    {
      asChild: false,
      width: 10,
      height: 5,
    }
  );

  const styles = tv({
    base: "rotate-45 border bg-muted",
  });
</script>
