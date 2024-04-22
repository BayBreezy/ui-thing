<template>
  <div>
    <div :class="styles({ class: props.class })">
      <UiTable :class="tableClass">
        <UiTableHeader>
          <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <UiTableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colspan="header.colSpan"
              :class="[header.column.getCanSort() && 'cursor-pointer select-none']"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <template v-if="!header.isPlaceholder">
                <div class="flex items-center gap-3">
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  <Icon
                    v-if="header.column.getCanSort() && header.column.getIsSorted() === 'asc'"
                    :name="ascIcon"
                    class="h-4 w-4"
                  />
                  <Icon
                    v-else-if="header.column.getCanSort() && header.column.getIsSorted() === 'desc'"
                    :name="descIcon"
                    class="h-4 w-4"
                  />
                  <Icon
                    v-else-if="header.column.getCanSort() && !header.column.getIsSorted()"
                    :name="unsortedIcon"
                    class="h-5 w-5"
                  />
                </div>
              </template>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>

        <UiTableBody>
          <UiTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : ''"
          >
            <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </UiTableCell>
          </UiTableRow>

          <UiTableEmpty
            v-if="table.getRowModel().rows.length === 0"
            :colspan="table.getAllLeafColumns().length"
          >
            <slot :table="table" name="empty"> No data available. </slot>
          </UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>

    <div
      v-if="showPagination"
      class="my-6 flex flex-col justify-between gap-4 px-2 md:flex-row md:items-center"
    >
      <div class="flex items-center justify-between gap-3">
        <slot name="rowsSelected" :table="table">
          <div v-if="showSelect" class="whitespace-nowrap text-sm text-muted-foreground">
            <span>
              {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}
              {{ table.getFilteredRowModel().rows.length }} row(s) selected
            </span>
          </div>
        </slot>
        <slot name="rowsPerPage" :table="table">
          <div class="flex items-center space-x-2 whitespace-nowrap">
            <p class="hidden text-sm font-medium text-foreground md:inline-block">
              {{ rowsPerPageText }}
            </p>
            <UiSelect v-model="pageSize">
              <UiSelectTrigger class="h-9 w-[70px]">
                {{ table.getState().pagination.pageSize }}
              </UiSelectTrigger>
              <UiSelectContent side="top" align="start">
                <UiSelectGroup>
                  <!-- eslint-disable vue/no-template-shadow -->
                  <UiSelectItem
                    v-for="pageSize in pageSizes"
                    :key="pageSize"
                    :value="`${pageSize}`"
                  >
                    {{ pageSize }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </div>
        </slot>
      </div>

      <div class="flex items-center justify-between gap-3">
        <slot :table="table" name="page">
          <div
            class="flex items-center justify-center whitespace-nowrap text-sm font-medium text-foreground"
          >
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </div>
        </slot>

        <slot :table="table" name="pageButtons">
          <div class="flex items-center space-x-2">
            <UiButton
              variant="outline"
              title="First page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)"
            >
              <Icon name="lucide:chevrons-left" class="h-4 w-4" />
            </UiButton>
            <UiButton
              variant="outline"
              title="Previous page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              <Icon name="lucide:chevron-left" class="h-4 w-4" />
            </UiButton>
            <UiButton
              variant="outline"
              title="Next page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
            </UiButton>
            <UiButton
              variant="outline"
              title="Last page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)"
            >
              <Icon name="lucide:chevrons-right" class="h-4 w-4" />
            </UiButton>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
  import CheckBox from "@/components/Ui/Checkbox/Checkbox.vue";
  import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
  } from "@tanstack/vue-table";
  import type { ColumnDef, SortingState, Table } from "@tanstack/vue-table";

  const props = withDefaults(
    defineProps<{
      data?: T[];
      columns?: ColumnDef<T>[];
      search?: string;
      showSelect?: boolean;
      pageSizes?: number[];
      pageSize?: number;
      sorting?: SortingState;
      tableClass?: any;
      ascIcon?: string;
      descIcon?: string;
      unsortedIcon?: string;
      class?: any;
      showPagination?: boolean;
      rowsPerPageText?: string;
    }>(),
    {
      pageSizes: () => [10, 20, 30, 40, 50, 100],
      pageSize: () => 10,
      columns: () => [],
      data: () => [],
      sorting: () => [],
      ascIcon: "heroicons:chevron-up",
      descIcon: "heroicons:chevron-down",
      unsortedIcon: "heroicons:chevron-up-down",
      showPagination: true,
      rowsPerPageText: "Rows per page:",
    }
  );

  defineOptions({ inheritAttrs: false });

  const styles = tv({
    base: "w-full overflow-x-auto",
  });

  const checkBoxHeader: ColumnDef<any> = {
    id: "checkbox",
    header: ({ table }) => {
      return h(
        "div",
        { class: "flex items-center justify-center" },
        h(CheckBox, {
          checked: table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false,
          "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(!!value),
          ariaLabel: "Select all",
        })
      );
    },
    cell: ({ row }) => {
      return h(
        "div",
        { class: "flex items-center justify-center " },
        h(CheckBox, {
          checked: row.getIsSelected(),
          "onUpdate:checked": (value) => row.toggleSelected(!!value),
          ariaLabel: "Select row",
        })
      );
    },
    enableSorting: false,
    enableHiding: false,
  };

  const localColumns: ColumnDef<T>[] = [...props.columns];

  if (props.showSelect) {
    localColumns.unshift(checkBoxHeader);
  }

  const emit = defineEmits<{
    ready: [table: Table<T>];
  }>();

  const localSorting = ref(props.sorting);
  const globalFilter = ref(props.search);
  const columnVisibility = ref({});
  const rowSelection = ref({});

  const table = useVueTable({
    get data() {
      return props.data;
    },
    get columns() {
      return localColumns;
    },
    initialState: {
      pagination: {
        pageSize: props.pageSize,
      },
      rowSelection: rowSelection.value,
      globalFilter: props.search,
    },
    state: {
      get sorting() {
        return localSorting.value;
      },
      get globalFilter() {
        return props.search;
      },
      get columnVisibility() {
        return columnVisibility.value;
      },
      get rowSelection() {
        return rowSelection.value;
      },
    },
    onSortingChange: (updaterOrValue) => {
      localSorting.value =
        typeof updaterOrValue === "function" ? updaterOrValue(localSorting.value) : updaterOrValue;
    },
    onGlobalFilterChange: (updaterOrValue) => {
      globalFilter.value =
        typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;
    },
    onRowSelectionChange: (updaterOrValue) => {
      rowSelection.value =
        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection.value) : updaterOrValue;
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: () => !!props.showSelect,
  });

  function toggleColumnVisibility(column: any) {
    columnVisibility.value = {
      ...columnVisibility.value,
      [column.id]: !column.getIsVisible(),
    };
  }

  // eslint-disable-next-line vue/no-dupe-keys
  const pageSize = computed({
    get() {
      return table.getState().pagination.pageSize.toString();
    },
    set(value) {
      table.setPageSize(Number(value));
    },
  });

  onMounted(() => {
    emit("ready", table);
  });

  defineExpose({ toggleColumnVisibility });
</script>
