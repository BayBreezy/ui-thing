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
    base: "transition-all data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down data-[state=closed]:overflow-hidden data-[state=open]:overflow-hidden",
  });
</script>
