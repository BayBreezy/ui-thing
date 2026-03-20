<template>
  <PaginationList
    v-slot="{ items }"
    data-slot="pagination-list"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    v-bind="forwarded"
  >
    <slot :items="items" />
  </PaginationList>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationList } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PaginationListProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    PaginationListProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "flex flex-row items-center gap-1",
  });
</script>
