<template>
  <PaginationLast v-bind="props">
    <slot>
      <UIButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UIButton>
    </slot>
  </PaginationLast>
</template>

<script lang="ts" setup>
  import { PaginationLast } from "radix-vue";
  import type { PaginationLastProps } from "radix-vue";

  const props = defineProps<
    PaginationLastProps & {
      icon?: string;
    }
  >();
</script>
