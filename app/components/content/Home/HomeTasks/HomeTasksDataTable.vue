<script setup lang="ts">
  import { FlexRender, useTable } from "@tanstack/vue-table";
  import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
  } from "@tanstack/vue-table";

  import {
    HomeTasksDataTableColumnHeader,
    HomeTasksDataTableRowAction,
    UiBadge,
    UiCheckbox,
  } from "#components";

  interface DataTableProps {
    data: HomeTask[];
  }
  const props = defineProps<DataTableProps>();

  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref({});

  const columns: ColumnDef<HomeTaskTableFeatures, HomeTask>[] = [
    {
      id: "select",
      header: ({ table }) =>
        h(UiCheckbox, {
          modelValue:
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate"),
          "onUpdate:modelValue": (value) => table.toggleAllPageRowsSelected(!!value),
          ariaLabel: "Select all",
          class: "translate-y-0.5",
        }),
      cell: ({ row }) =>
        h(UiCheckbox, {
          modelValue: row.getIsSelected(),
          "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
          ariaLabel: "Select row",
          class: "translate-y-0.5",
        }),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => h(HomeTasksDataTableColumnHeader, { column, title: "Task" }),
      cell: ({ row }) => h("div", { class: "w-20" }, row.getValue("id")),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => h(HomeTasksDataTableColumnHeader, { column, title: "Title" }),

      cell: ({ row }) => {
        const label = homeTasksLabels.find((label) => label.value === row.original.label);

        return h("div", { class: "flex space-x-2" }, [
          label ? h(UiBadge, { variant: "outline" }, () => label.label) : null,
          h("span", { class: "max-w-[500px] truncate font-medium" }, row.getValue("title")),
        ]);
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => h(HomeTasksDataTableColumnHeader, { column, title: "Status" }),

      cell: ({ row }) => {
        const status = homeTasksStatuses.find((status) => status.value === row.getValue("status"));

        if (!status) return null;

        return h("div", { class: "flex w-[100px] items-center" }, [
          status.icon && h(status.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
          h("span", status.label),
        ]);
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => h(HomeTasksDataTableColumnHeader, { column, title: "Priority" }),
      cell: ({ row }) => {
        const priority = homeTasksPriorities.find(
          (priority) => priority.value === row.getValue("priority")
        );

        if (!priority) return null;

        return h("div", { class: "flex items-center" }, [
          priority.icon && h(priority.icon, { class: "mr-2 h-4 w-4 text-muted-foreground" }),
          h("span", {}, priority.label),
        ]);
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      cell: ({ row }) => h(HomeTasksDataTableRowAction, { row }),
    },
  ];

  const table = useTable({
    features: homeTaskTableFeatures,
    get data() {
      return props.data;
    },
    get columns() {
      return columns;
    },
    state: {
      get sorting() {
        return sorting.value;
      },
      get columnFilters() {
        return columnFilters.value;
      },
      get columnVisibility() {
        return columnVisibility.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
    },
    enableRowSelection: true,
    onSortingChange: (updaterOrValue) => tanstackValueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: (updaterOrValue) => tanstackValueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: (updaterOrValue) =>
      tanstackValueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: (updaterOrValue) => tanstackValueUpdater(updaterOrValue, rowSelection),
  });
</script>

<template>
  <div class="space-y-4">
    <HomeTasksDataTableToolbar :table />
    <div class="rounded-md border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <UiTableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :header="header" />
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-if="table.getRowModel().rows?.length">
            <UiTableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :cell="cell" />
              </UiTableCell>
            </UiTableRow>
          </template>

          <UiTableRow v-else>
            <UiTableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <ClientOnly>
      <HomeTasksDataTablePagination :table />
    </ClientOnly>
  </div>
</template>
