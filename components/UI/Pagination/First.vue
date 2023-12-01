<template>
  <PaginationFirst v-bind="reactiveOmit(props, 'icon')">
    <slot>
      <UiButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UiButton>
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
