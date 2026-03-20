<template>
  <PaginationRoot
    role="navigation"
    aria-label="pagination"
    data-slot="pagination"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot>
      <UiPaginationList v-slot="{ items }">
        <slot name="first"><UiPaginationFirst as-child :icon="firstIcon" /> </slot>
        <slot name="prev"><UiPaginationPrev as-child :icon="prevIcon" /> </slot>

        <template v-for="(page, index) in items" :key="index">
          <UiPaginationItem v-if="page.type === 'page'" as-child v-bind="page" />
          <UiPaginationEllipsis
            v-else-if="page.type === 'ellipsis'"
            as-child
            v-bind="page"
            :icon="ellipsisIcon"
          />
        </template>
        <slot name="next"><UiPaginationNext as-child :icon="nextIcon" /> </slot>
        <slot name="last"><UiPaginationLast as-child :icon="lastIcon" /></slot>
      </UiPaginationList>
    </slot>
  </PaginationRoot>
</template>

<script lang="ts" setup>
  import { reactiveOmit } from "@vueuse/core";
  import { PaginationRoot, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { PaginationRootEmits, PaginationRootProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = withDefaults(
    defineProps<
      PaginationRootProps & {
        ellipsisIcon?: string;
        firstIcon?: string;
        lastIcon?: string;
        nextIcon?: string;
        prevIcon?: string;
        class?: HTMLAttributes["class"];
      }
    >(),
    {
      defaultPage: 1,
      total: 10,
      itemsPerPage: 10,
      siblingCount: 3,
      showEdges: true,
      ellipsisIcon: "lucide:ellipsis",
      firstIcon: "lucide:chevrons-left",
      lastIcon: "lucide:chevrons-right",
      nextIcon: "lucide:chevron-right",
      prevIcon: "lucide:chevron-left",
    }
  );

  const emits = defineEmits<PaginationRootEmits>();
  const forwarded = useForwardPropsEmits(
    reactiveOmit(props, "ellipsisIcon", "firstIcon", "lastIcon", "nextIcon", "prevIcon"),
    emits
  );

  const styles = tv({ base: "mx-auto flex w-full justify-center" });
</script>
