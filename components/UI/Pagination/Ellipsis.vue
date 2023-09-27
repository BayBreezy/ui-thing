<template>
  <PaginationEllipsis :as-child="asChild">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationEllipsis>
</template>

<script lang="ts" setup>
  import { PaginationEllipsisProps } from "radix-vue";

  const props = defineProps<{
    asChild?: PaginationEllipsisProps["asChild"];
    icon?: string;
  }>();
</script>
