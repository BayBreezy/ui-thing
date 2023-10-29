<template>
  <PaginationLast :as-child="asChild">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationLast>
</template>

<script lang="ts" setup>
  import type { PaginationLastProps } from "radix-vue";

  const props = defineProps<{
    asChild?: PaginationLastProps["asChild"];
    icon?: string;
  }>();
</script>
