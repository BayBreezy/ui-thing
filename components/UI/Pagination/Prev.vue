<template>
  <PaginationPrev :as-child="asChild">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationPrev>
</template>

<script lang="ts" setup>
  import { PaginationPrevProps } from "radix-vue";

  const props = defineProps<{
    asChild?: PaginationPrevProps["asChild"];
    icon?: string;
  }>();
</script>
