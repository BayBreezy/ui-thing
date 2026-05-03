<template>
  <PaginationEllipsis data-slot="pagination-ellipsis" v-bind="forwarded">
    <slot>
      <div v-if="icon" class="flex size-9 items-center justify-center hover:bg-transparent">
        <Icon :name="icon" />
      </div>
    </slot>
  </PaginationEllipsis>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationEllipsis } from "reka-ui";
  import type { PaginationEllipsisProps } from "reka-ui";

  const props = defineProps<
    PaginationEllipsisProps & {
      /** Icon to show. */
      icon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "icon");
</script>
