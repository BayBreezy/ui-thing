<template>
  <div class="flex w-full items-center justify-between gap-5">
    <div class="flex basis-full items-center justify-between gap-5 md:basis-1/2">
      <div class="flex items-center gap-3">
        <span class="shrink-0 text-sm">Rows per page</span>
        <UiSelect v-model="itemsPerPage">
          <UiSelectTrigger class="h-9 w-20" />
          <UiSelectContent>
            <UiSelectItem v-for="item in selectOptions" :key="item" :text="item" :value="item" />
          </UiSelectContent>
        </UiSelect>
      </div>
      <div class="hidden text-sm text-muted-foreground md:block">
        <span class="text-foreground">{{ page1 }}</span> of
        <span class="text-foreground">{{ pageTotal }}</span>
      </div>
    </div>
    <UiPagination
      v-model:page="page1"
      class="basis-1/2"
      :items-per-page="Number(itemsPerPage)"
      :sibling-count="1"
      :total
    >
      <UiPaginationList class="justify-end">
        <UiPaginationFirst as-child icon="lucide:chevron-first" />
        <UiPaginationPrev as-child icon="lucide:chevron-left" />
        <UiPaginationNext as-child icon="lucide:chevron-right" />
        <UiPaginationLast as-child icon="lucide:chevron-last" />
      </UiPaginationList>
    </UiPagination>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(1);
  const total = 100;
  const itemsPerPage = ref("10");

  const selectOptions = ["10", "20", "50", "100"];

  const pageTotal = computed(() => Math.ceil(total / Number(itemsPerPage.value)));
</script>
