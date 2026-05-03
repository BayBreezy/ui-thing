<template>
  <div class="grid gap-2 md:flex md:items-center md:justify-between md:px-2">
    <div class="text-muted-foreground flex-1 text-sm">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="grid gap-y-2 md:flex md:items-center md:gap-x-6 lg:gap-x-8">
      <div class="flex items-center gap-x-2">
        <p class="text-sm font-medium whitespace-nowrap">Rows per page</p>
        <UiSelect
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="table.setPageSize as any"
        >
          <UiSelectTrigger class="h-8 w-fit md:w-[70px]">
            <UiSelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </UiSelectTrigger>
          <UiSelectContent side="top">
            <UiSelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
      <div class="text-sm font-medium md:flex md:w-[100px] md:items-center md:justify-center">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center gap-x-2">
        <UiButton
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <Icon name="lucide:chevrons-left" class="size-4" />
        </UiButton>
        <UiButton
          variant="outline"
          class="size-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">Go to previous page</span>
          <Icon name="lucide:chevron-left" class="size-4" />
        </UiButton>
        <UiButton
          variant="outline"
          class="size-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">Go to next page</span>
          <Icon name="lucide:chevron-right" class="size-4" />
        </UiButton>
        <UiButton
          variant="outline"
          class="hidden size-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <Icon name="lucide:chevrons-right" class="size-4" />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Table } from "@tanstack/vue-table";

  interface DataTablePaginationProps {
    table: Table<HomeTask>;
  }
  defineProps<DataTablePaginationProps>();
</script>
