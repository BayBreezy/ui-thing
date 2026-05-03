<template>
  <div class="@container flex w-full items-center justify-between gap-5">
    <div class="flex items-center gap-3">
      <UiLabel :for="id1" class="hidden text-sm @[450px]:inline-block">Rows per page</UiLabel>
      <UiSelect v-model="itemsPerPage">
        <UiSelectTrigger :id="id1" class="h-8 w-fit whitespace-nowrap" />
        <UiSelectContent class="min-w-fit">
          <UiSelectItem v-for="item in selectOptions" :key="item" :text="item" :value="item" />
        </UiSelectContent>
      </UiSelect>
    </div>
    <div class="text-muted-foreground grow text-right text-sm whitespace-nowrap">
      <span class="text-foreground">{{ page1 }}</span> of
      <span class="text-foreground">{{ pageTotal }}</span>
    </div>
    <div>
      <UiPagination
        v-model:page="page1"
        :items-per-page="Number(itemsPerPage)"
        :sibling-count="1"
        :total
      >
        <UiPaginationList class="justify-end">
          <UiPaginationFirst as-child variant="outline" icon="lucide:chevron-first" />
          <UiPaginationPrev as-child variant="outline" icon="lucide:chevron-left" />
          <UiPaginationNext as-child variant="outline" icon="lucide:chevron-right" />
          <UiPaginationLast as-child variant="outline" icon="lucide:chevron-last" />
        </UiPaginationList>
      </UiPagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const page1 = ref(1);
  const total = 100;
  const itemsPerPage = ref("10");
  const id1 = useId();

  const selectOptions = ["10", "20", "50", "100"];

  const pageTotal = computed(() => Math.ceil(total / Number(itemsPerPage.value)));
</script>
