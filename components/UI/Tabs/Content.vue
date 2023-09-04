<template>
  <TabsContent
    :value="value"
    :force-mount="forceMount"
    :as-child="asChild"
    :class="styles({ class: props.class })"
  >
    <slot></slot>
  </TabsContent>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    value: string;
    forceMount?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  });
</script>
