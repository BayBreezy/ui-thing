<template>
  <PaginationRoot
    v-model:page="localModel"
    :defaultPage="defaultPage"
    :total="total"
    :itemsPerPage="itemsPerPage"
    :siblingCount="siblingCount"
    :showEdges="showEdges"
  >
    <slot>
      <UIPaginationList v-slot="{ items }">
        <slot name="first"><UIPaginationFirst asChild :icon="firstIcon" /> </slot>
        <slot name="prev"><UIPaginationPrev asChild :icon="prevIcon" /> </slot>

        <template v-for="(page, index) in items" :key="index">
          <UIPaginationItem asChild v-if="page.type === 'page'" v-bind="page" />
          <UIPaginationEllipsis
            asChild
            v-else-if="page.type === 'ellipsis'"
            v-bind="page"
            :icon="ellipsisIcon"
          />
        </template>
        <slot name="next"><UIPaginationNext asChild :icon="nextIcon" /> </slot>
        <slot name="last"><UIPaginationLast asChild :icon="lastIcon" /></slot>
      </UIPaginationList>
    </slot>
  </PaginationRoot>
</template>

<script lang="ts" setup>
  import { type PaginationRootProps } from "radix-vue";

  const props = withDefaults(
    defineProps<{
      modelValue?: PaginationRootProps["page"];
      defaultPage?: PaginationRootProps["defaultPage"];
      total?: PaginationRootProps["total"];
      itemsPerPage?: PaginationRootProps["itemsPerPage"];
      siblingCount?: PaginationRootProps["siblingCount"];
      showEdges?: PaginationRootProps["showEdges"];
      ellipsisIcon?: string;
      firstIcon?: string;
      lastIcon?: string;
      nextIcon?: string;
      prevIcon?: string;
    }>(),
    {
      defaultPage: 1,
      total: 10,
      itemsPerPage: 10,
      siblingCount: 3,
      showEdges: true,
      ellipsisIcon: "lucide:more-horizontal",
      firstIcon: "lucide:chevrons-left",
      lastIcon: "lucide:chevrons-right",
      nextIcon: "lucide:chevron-right",
      prevIcon: "lucide:chevron-left",
    }
  );

  const emits = defineEmits<{
    "update:modelValue": [value: PaginationRootProps["page"]];
  }>();

  const localModel = useVModel(props, "modelValue", emits, {
    passive: true,
  });
</script>
