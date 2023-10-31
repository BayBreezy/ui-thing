<template>
  <PaginationFirst v-bind="props">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationFirst>
</template>

<script lang="ts" setup>
  import { PaginationFirst } from "radix-vue";
  import type { PaginationFirstProps } from "radix-vue";

  const props = defineProps<
    PaginationFirstProps & {
      icon?: string;
    }
  >();
</script>
