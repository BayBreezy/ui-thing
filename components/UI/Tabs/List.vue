<template>
  <TabsList :as-child="asChild" :loop="loop" :class="styles({ class: props.class })">
    <slot></slot>
  </TabsList>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    loop?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
  });
</script>
