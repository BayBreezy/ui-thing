<template>
  <PaginationList :as-child="asChild" v-slot="{ items }" :class="styles({ class: props.class })">
    <slot :items="items"></slot>
  </PaginationList>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    asChild?: boolean;
    class?: any;
  }>();

  const styles = tv({
    base: "flex items-center gap-1",
  });
</script>
