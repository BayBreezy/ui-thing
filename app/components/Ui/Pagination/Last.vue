<template>
  <PaginationLast v-bind="forwarded">
    <slot>
      <UiButton v-if="icon" variant="ghost" size="icon-sm">
        <Icon :name="icon" />
      </UiButton>
    </slot>
  </PaginationLast>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationLast } from "radix-vue";
  import type { PaginationLastProps } from "radix-vue";

  const props = defineProps<
    PaginationLastProps & {
      /** Icon to show */
      icon?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "icon");
</script>
