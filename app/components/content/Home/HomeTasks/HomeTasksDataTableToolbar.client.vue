<script setup lang="ts">
  import type { Table } from "@tanstack/vue-table";

  import { Icon } from "#components";

  interface DataTableToolbarProps {
    table: Table<HomeTask>;
  }

  const props = defineProps<DataTableToolbarProps>();

  const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>

<template>
  <div class="grid grid-cols-1 justify-between gap-4 md:flex md:items-center">
    <div class="grid gap-4 md:flex md:flex-1 md:items-center md:gap-2">
      <ClientOnly>
        <UiInput
          placeholder="Filter tasks..."
          :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
          class="h-8 w-full md:w-[150px] lg:w-[250px]"
          @input="table.getColumn('title')?.setFilterValue($event.target.value)"
        />
      </ClientOnly>
      <HomeTasksDataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="homeTasksStatuses"
      />
      <HomeTasksDataTableFacetedFilter
        v-if="table.getColumn('priority')"
        :column="table.getColumn('priority')"
        title="Priority"
        :options="homeTasksPriorities"
      />

      <UiButton
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Icon name="lucide:x" class="ml-2 size-4" />
      </UiButton>
    </div>
    <HomeTasksDataTableViewOptions :table />
  </div>
</template>
