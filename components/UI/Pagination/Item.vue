<template>
  <PaginationListItem :as-child="asChild" :value="value">
    <slot>
      <UIButton
        variant="outline"
        size="icon-sm"
        class="data-[selected=true]:border-transparent data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
      >
        {{ value }}
      </UIButton>
    </slot>
  </PaginationListItem>
</template>

<script lang="ts" setup>
  import { PaginationListItemProps } from "radix-vue";

  const props = defineProps<{
    value: PaginationListItemProps["value"];
    asChild?: PaginationListItemProps["asChild"];
  }>();
</script>
