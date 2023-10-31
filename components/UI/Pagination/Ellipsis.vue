<template>
  <PaginationEllipsis v-bind="props">
    <slot>
      <div v-if="icon" class="inline-flex h-9 w-9 items-center justify-center hover:bg-transparent">
        <Icon :name="icon" />
      </div>
    </slot>
  </PaginationEllipsis>
</template>

<script lang="ts" setup>
  import { PaginationEllipsis } from "radix-vue";
  import type { PaginationEllipsisProps } from "radix-vue";

  const props = defineProps<
    PaginationEllipsisProps & {
      icon?: string;
    }
  >();
</script>
