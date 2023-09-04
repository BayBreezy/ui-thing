<template>
  <td :class="styles({ class: props.class })">
    <slot></slot>
  </td>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
  });
</script>
