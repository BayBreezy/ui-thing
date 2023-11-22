<template>
  <PaginationPrev v-bind="reactiveOmit(props, 'icon')">
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
      /** Icon to show */
      icon?: string;
    }
  >();
</script>
