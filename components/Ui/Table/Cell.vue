<template>
  <td :class="styles({ class: props.class })">
    <slot />
  </td>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    class?: any;
  }>();

  const styles = tv({
    base: "whitespace-nowrap p-4 align-middle",
  });
</script>
