<template>
  <div>
    <UITable>
      <UITableHeader>
        <UITableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <UITableHead
            :class="[header.column.getCanSort() && 'cursor-pointer select-none']"
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
          >
            <template v-if="!header.isPlaceholder">
              <div class="flex items-center space-x-2">
                <UIButton
                  variant="ghost"
                  class="h-8 -translate-x-3"
                  @click="header.column.getToggleSortingHandler()?.($event)"
                  v-if="header.column.getCanSort()"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  <Icon
                    name="lucide:arrow-up-down"
                    v-if="header.column.getCanSort() && !header.column.getIsSorted()"
                    class="ml-1.5 h-3.5 w-3.5 text-muted-foreground"
                  />
                  <Icon
                    name="lucide:arrow-up-narrow-wide"
                    class="ml-1.5 h-3.5 w-3.5 text-muted-foreground"
                    v-if="header.column.getIsSorted() === 'asc'"
                  />
                  <Icon
                    name="lucide:arrow-down-narrow-wide"
                    class="ml-1.5 h-3.5 w-3.5 text-muted-foreground"
                    v-if="header.column.getIsSorted() === 'desc'"
                  />
                </UIButton>
                <span v-else class="flex h-8 items-center justify-center text-muted-foreground">
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </span>
              </div>
            </template>
          </UITableHead>
        </UITableRow>
      </UITableHeader>

      <UITableBody>
        <UITableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :data-state="row.getIsSelected() ? 'selected' : ''"
        >
          <UITableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-2.5">
            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
          </UITableCell>
        </UITableRow>

        <UITableEmpty
          v-if="table.getRowModel().rows.length === 0"
          :colspan="table.getAllLeafColumns().length"
        >
          <slot name="empty"> No data available. </slot>
        </UITableEmpty>
      </UITableBody>
    </UITable>

    <div class="my-6 flex items-center justify-end px-2">
      <div class="flex-1 text-sm text-muted-foreground">
        <span>
          {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}
          {{ table.getFilteredRowModel().rows.length }} row(s) selected
        </span>
      </div>
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="hidden items-center space-x-2 md:flex">
          <p class="text-sm font-medium text-foreground">Rows per page:</p>
          <UISelect v-model="pageSize">
            <UISelectTrigger class="h-8 w-[70px]">
              {{ table.getState().pagination.pageSize }}
            </UISelectTrigger>
            <UISelectContent side="top" align="start">
              <UISelectGroup>
                <UISelectItem v-for="pageSize in pageSizes" :key="pageSize" :value="`${pageSize}`">
                  {{ pageSize }}
                </UISelectItem>
              </UISelectGroup>
            </UISelectContent>
          </UISelect>
        </div>

        <div class="flex items-center justify-center text-sm font-medium text-foreground">
          Page {{ table.getState().pagination.pageIndex + 1 }} of
          {{ table.getPageCount() }}
        </div>

        <div class="flex items-center space-x-2">
          <UIButton
            variant="outline"
            title="First page"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanPreviousPage()"
            @click="table.setPageIndex(0)"
          >
            <Icon name="lucide:chevrons-left" class="h-4 w-4" />
          </UIButton>
          <UIButton
            variant="outline"
            title="Previous page"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <Icon name="lucide:chevron-left" class="h-4 w-4" />
          </UIButton>
          <UIButton
            variant="outline"
            title="Next page"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            <Icon name="lucide:chevron-right" class="h-4 w-4" />
          </UIButton>
          <UIButton
            variant="outline"
            title="Last page"
            class="h-8 w-8 p-0"
            :disabled="!table.getCanNextPage()"
            @click="table.setPageIndex(table.getPageCount() - 1)"
          >
            <Icon name="lucide:chevrons-right" class="h-4 w-4" />
          </UIButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T">
  import {
    FlexRender,
    useVueTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    type SortingState,
    type ColumnDef,
  } from "@tanstack/vue-table";

  import CheckBox from "@/components/UI/Checkbox/Checkbox.vue";

  const props = withDefaults(
    defineProps<{
      data?: T[];
      columns?: ColumnDef<T>[];
      search?: string;
      modelValue?: T[];
      pageSizes?: number[];
      pageSize?: number;
      sorting?: SortingState;
    }>(),
    {
      pageSizes: () => [10, 20, 30, 40, 50, 100],
      pageSize: () => 10,
      columns: () => [],
      data: () => [],
      sorting: () => [],
    }
  );

  const checkBoxHeader: ColumnDef<any> = {
    id: "checkbox",
    header: ({ table }) => {
      return h(CheckBox, {
        modelValue: table.getIsAllRowsSelected(),
        onChange: (e: any) => table.toggleAllRowsSelected(e.target.checked),
        indeterminate: table.getIsSomeRowsSelected(),
      });
    },
    cell: ({ row }) => {
      return h(CheckBox, {
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        onChange: row.getToggleSelectedHandler(),
      });
    },
    enableSorting: false,
    enableHiding: false,
  };

  const localColumns: ColumnDef<T>[] = [...props.columns];

  if (props.modelValue) {
    localColumns.unshift(checkBoxHeader);
  }

  const emit = defineEmits<{
    "update:modelValue": [any];
  }>();

  const localSorting = ref(props.sorting);
  const globalFilter = ref(props.search);
  const columnVisibility = ref({});
  const rowSelection = ref({});

  const selected = computed({
    get() {
      return props.modelValue || [];
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

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
    enableRowSelection: () => !!props.modelValue,
  });

  function toggleColumnVisibility(column: any) {
    columnVisibility.value = {
      ...columnVisibility.value,
      [column.id]: !column.getIsVisible(),
    };
  }

  const pageSize = computed({
    get() {
      return table.getState().pagination.pageSize.toString();
    },
    set(value) {
      table.setPageSize(Number(value));
    },
  });
</script>
