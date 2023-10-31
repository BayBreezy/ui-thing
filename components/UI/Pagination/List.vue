<template>
  <PaginationList v-slot="{ items }" :class="styles({ class: props.class })" v-bind="props">
    <slot :items="items"></slot>
  </PaginationList>
</template>

<script lang="ts" setup>
  import { PaginationList } from "radix-vue";
  import type { PaginationListProps } from "radix-vue";

  const props = defineProps<
    PaginationListProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "flex items-center gap-1",
  });
</script>
