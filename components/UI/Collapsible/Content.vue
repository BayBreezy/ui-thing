<template>
  <CollapsibleContent
    :class="styles({ class: props.class })"
    :forceMount="forceMount"
    :as-child="asChild"
  >
    <slot></slot>
  </CollapsibleContent>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    forceMount?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "data-[state=open]:animate-collapse-down data-[state=closed]:animate-collapse-up overflow-auto transition-all",
  });
</script>
