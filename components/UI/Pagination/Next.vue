<template>
  <PaginationNext v-bind="props">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationNext>
</template>

<script lang="ts" setup>
  import { PaginationNext } from "radix-vue";
  import type { PaginationNextProps } from "radix-vue";

  const props = defineProps<
    PaginationNextProps & {
      icon?: string;
    }
  >();
</script>
