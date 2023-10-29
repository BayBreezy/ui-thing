<template>
  <PaginationFirst :as-child="asChild">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationFirst>
</template>

<script lang="ts" setup>
  import type { PaginationFirstProps } from "radix-vue";

  const props = defineProps<{
    asChild?: PaginationFirstProps["asChild"];
    icon?: string;
  }>();
</script>
