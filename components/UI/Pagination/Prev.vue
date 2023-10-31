<template>
  <PaginationPrev v-bind="props">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationPrev>
</template>

<script lang="ts" setup>
  import { PaginationPrev } from "radix-vue";
  import type { PaginationPrevProps } from "radix-vue";

  const props = defineProps<
    PaginationPrevProps & {
      icon?: string;
    }
  >();
</script>
