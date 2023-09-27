<template>
  <PaginationNext :as-child="asChild">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationNext>
</template>

<script lang="ts" setup>
  import { PaginationNextProps } from "radix-vue";

  const props = defineProps<{
    asChild?: PaginationNextProps["asChild"];
    icon?: string;
  }>();
</script>
