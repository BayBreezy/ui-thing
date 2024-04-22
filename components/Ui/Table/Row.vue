<template>
  <tr :class="styles({ class: props.class })">
    <slot />
  </tr>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
  });
</script>
