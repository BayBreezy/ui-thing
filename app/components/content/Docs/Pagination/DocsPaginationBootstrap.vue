<template>
  <div class="flex flex-col items-center gap-10">
    <UiPagination v-model:page="page1" :items-per-page :sibling-count="1" :total class="mx-auto">
      <UiPaginationList v-slot="{ items }" class="gap-0 divide-x rounded-lg border">
        <UiPaginationPrev class="rounded-e-none" as-child icon="lucide:chevron-left" />
        <template v-for="(page, index) in items" :key="index">
          <UiPaginationItem
            v-if="page.type === 'page'"
            class="rounded-none border-x-0 border-y-0 data-[selected=true]:!border-primary"
            as-child
            v-bind="page"
          />
          <UiPaginationEllipsis
            v-else-if="page.type === 'ellipsis'"
            as-child
            v-bind="page"
            icon="lucide:ellipsis"
          />
        </template>
        <UiPaginationNext class="rounded-s-none" as-child icon="lucide:chevron-right" />
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(6);
  const total = 100;
  const itemsPerPage = 10;
</script>
