<template>
  <PaginationList v-slot="{ items }" :class="styles({ class: props.class })" v-bind="forwarded">
    <slot :items="items" />
  </PaginationList>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationList } from "radix-vue";
  import type { PaginationListProps } from "radix-vue";

  const props = defineProps<
    PaginationListProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex items-center gap-1",
  });
</script>
