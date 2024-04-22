<template>
  <th :class="styles({ class: props.class })">
    <slot />
  </th>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "h-12 px-4 text-left align-middle font-medium text-muted-foreground hover:text-foreground",
  });
</script>
