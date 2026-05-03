<template>
  <div class="flex flex-col items-center gap-10">
    <UiPagination v-model:page="page1" :items-per-page :sibling-count="1" :total class="mx-auto">
      <UiPaginationList v-slot="{ items }" class="gap-0 rounded-lg border">
        <UiPaginationPrev class="h-full rounded-e-none" as-child icon="lucide:chevron-left" />
        <template v-for="(page, index) in items" :key="index">
          <UiPaginationItem v-if="page.type === 'page'" as-child v-bind="page">
            <UiButton
              class="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground dark:data-[selected=true]:bg-primary dark:data-[selected=true]:text-primary-foreground size-9 rounded-none border-0 shadow-none dark:bg-transparent"
              variant="outline"
              size="icon-sm"
              >{{ page.value }}</UiButton
            >
          </UiPaginationItem>
          <UiPaginationEllipsis
            v-else-if="page.type === 'ellipsis'"
            as-child
            v-bind="page"
            icon="lucide:ellipsis"
          />
        </template>
        <UiPaginationNext class="h-full rounded-s-none" as-child icon="lucide:chevron-right" />
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(6);
  const total = 100;
  const itemsPerPage = 10;
</script>
