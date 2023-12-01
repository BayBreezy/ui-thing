<template>
  <PaginationPrev v-bind="reactiveOmit(props, 'icon')">
    <slot>
      <UiButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UiButton>
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
