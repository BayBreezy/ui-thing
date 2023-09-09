<template>
  <div>
    <div :class="styles({ class: props.class })">
      <UITable :class="tableClass">
        <UITableHeader>
          <UITableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <UITableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colspan="header.colSpan"
              @click="header.column.getToggleSortingHandler()?.($event)"
              :class="[header.column.getCanSort() && 'cursor-pointer select-none']"
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
            </UITableHead>
          </UITableRow>
        </UITableHeader>

        <UITableBody>
          <UITableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : ''"
          >
            <UITableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </UITableCell>
          </UITableRow>

          <UITableEmpty
            v-if="table.getRowModel().rows.length === 0"
            :colspan="table.getAllLeafColumns().length"
          >
            <slot :table="table" name="empty"> No data available. </slot>
          </UITableEmpty>
        </UITableBody>
      </UITable>
    </div>

    <div v-if="showPagination" class="my-6 flex items-center justify-end px-2">
      <slot name="rowsSelected" :table="table">
        <div v-if="showSelect" class="flex-1 text-sm text-muted-foreground">
          <span>
            {{ table.getFilteredSelectedRowModel().rows.length }} of {{ " " }}
            {{ table.getFilteredRowModel().rows.length }} row(s) selected
          </span>
        </div>
      </slot>

      <div class="flex items-center space-x-6 lg:space-x-8">
        <slot name="rowsPerPage" :table="table">
          <div class="hidden items-center space-x-2 md:flex">
            <p class="text-sm font-medium text-foreground">{{ rowsPerPageText }}</p>
            <UISelect v-model="pageSize">
              <UISelectTrigger class="h-9 w-[70px]">
                {{ table.getState().pagination.pageSize }}
              </UISelectTrigger>
              <UISelectContent side="top" align="start">
                <UISelectGroup>
                  <UISelectItem
                    v-for="pageSize in pageSizes"
                    :key="pageSize"
                    :value="`${pageSize}`"
                  >
                    {{ pageSize }}
                  </UISelectItem>
                </UISelectGroup>
              </UISelectContent>
            </UISelect>
          </div>
        </slot>

        <slot :table="table" name="page">
          <div class="flex items-center justify-center text-sm font-medium text-foreground">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </div>
        </slot>

        <slot :table="table" name="pageButtons">
          <div class="flex items-center space-x-2">
            <UIButton
              variant="outline"
              title="First page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)"
            >
              <Icon name="lucide:chevrons-left" class="h-4 w-4" />
            </UIButton>
            <UIButton
              variant="outline"
              title="Previous page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              <Icon name="lucide:chevron-left" class="h-4 w-4" />
            </UIButton>
            <UIButton
              variant="outline"
              title="Next page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
            </UIButton>
            <UIButton
              variant="outline"
              title="Last page"
              class="h-9 w-9 p-0"
              :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)"
            >
              <Icon name="lucide:chevrons-right" class="h-4 w-4" />
            </UIButton>
          </div>
        </slot>
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
    Table,
  } from "@tanstack/vue-table";

  import CheckBox from "@/components/UI/Checkbox/Checkbox.vue";

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
      return h(CheckBox, {
        checked: table.getIsAllRowsSelected(),
        "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      });
    },
    cell: ({ row }) => {
      return h(CheckBox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      });
    },
    enableSorting: false,
    enableHiding: false,
  };

  const localColumns: ColumnDef<T>[] = [...props.columns];

  if (props.showSelect) {
    localColumns.unshift(checkBoxHeader);
  }

  const emit = defineEmits<{
    ready: [table: Table<any>];
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
