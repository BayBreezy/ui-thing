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
    base: "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
  });
</script>
