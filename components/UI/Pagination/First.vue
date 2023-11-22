<template>
  <PaginationFirst v-bind="reactiveOmit(props, 'icon')">
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
      /** Icon to show */
      icon?: string;
    }
  >();
</script>
