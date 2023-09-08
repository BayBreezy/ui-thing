<template>
  <UITableRow>
    <UITableCell :colspan="colspan" :class="styles({ class: props.class })">
      <slot></slot>
    </UITableCell>
  </UITableRow>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      colspan?: number;
      class?: any;
    }>(),
    {
      colspan: 1,
    }
  );

  const styles = tv({
    base: "whitespace-nowrap p-4 align-middle text-sm text-foreground",
  });
</script>
