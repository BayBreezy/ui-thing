<template>
  <PaginationFirst v-bind="forwarded">
    <slot>
      <UiButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationFirst>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationFirst } from "radix-vue";
  import type { PaginationFirstProps } from "radix-vue";

  const props = defineProps<
    PaginationFirstProps & {
      /** Icon to show */
      icon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "icon");
</script>
