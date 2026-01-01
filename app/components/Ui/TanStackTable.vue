<template>
  <div class="relative">
    <slot name="loading" :loading>
      <div
        v-if="loading"
        class="absolute inset-x-0 top-0 z-10 h-1 overflow-hidden rounded-full bg-muted"
      >
        <div class="size-full origin-left animate-[loading_1.5s_ease-in-out_infinite] bg-primary" />
      </div>
    </slot>

    <UiTable :class="props.class">
      <UiTableHeader v-if="!hideHeader">
        <UiTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <UiTableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
            :class="header.column.columnDef.meta?.class?.th"
          >
            <template v-if="!header.isPlaceholder">
              <slot
                :name="`${header.column.id}-header`"
                :header="header"
                :column="header.column"
                :table="table"
              >
                <div
                  v-if="header.column.getCanSort()"
                  :class="[
                    'flex items-center gap-2',
                    header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                  ]"
                  @click="header.column.getToggleSortingHandler()?.($event)"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  <Icon
                    v-if="header.column.getIsSorted() === 'asc'"
                    name="lucide:arrow-up"
                    class="size-4"
                  />
                  <Icon
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    name="lucide:arrow-down"
                    class="size-4"
                  />
                  <Icon v-else name="lucide:arrow-up-down" class="size-4 opacity-50" />
                </div>
                <FlexRender
                  v-else
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </slot>
            </template>
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>

      <UiTableBody>
        <template v-if="table.getRowModel().rows.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <UiTableRow
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              :class="table.options.meta?.class?.tr"
              @contextmenu="(event: MouseEvent) => emit('row-contextmenu', { event, row })"
            >
              <UiTableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="cell.column.columnDef.meta?.class?.td"
              >
                <slot
                  :name="`${cell.column.id}-cell`"
                  :cell="cell"
                  :column="cell.column"
                  :row="row"
                  :table="table"
                  :get-value="() => cell.getValue()"
                  :render-value="() => cell.renderValue()"
                >
                  <template v-if="cell.column.id === 'expand'">
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="hover:bg-muted"
                      @click="row.toggleExpanded()"
                    >
                      <Icon
                        :name="row.getIsExpanded() ? 'lucide:chevron-down' : 'lucide:chevron-right'"
                        class="size-4"
                      />
                    </UiButton>
                  </template>
                  <template v-else>
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </template>
                </slot>
              </UiTableCell>
            </UiTableRow>
            <UiTableRow v-if="row.getIsExpanded()" :key="`${row.id}-expanded`">
              <UiTableCell :colspan="row.getVisibleCells().length" class="bg-muted/50 p-0">
                <slot name="expanded-row" :row="row" :table="table">
                  <div class="p-4">
                    <p class="text-sm text-muted-foreground">
                      Expanded content for row {{ row.id }}
                    </p>
                  </div>
                </slot>
              </UiTableCell>
            </UiTableRow>
          </template>
        </template>

        <UiTableRow v-else>
          <UiTableCell :colspan="table.getAllLeafColumns().length" class="h-24 text-center">
            <slot name="empty">
              {{ emptyText }}
            </slot>
          </UiTableCell>
        </UiTableRow>
      </UiTableBody>

      <UiTableFooter v-if="hasFooter">
        <UiTableRow v-for="footerGroup in table.getFooterGroups()" :key="footerGroup.id">
          <UiTableHead
            v-for="footer in footerGroup.headers"
            :key="footer.id"
            :colspan="footer.colSpan"
            :class="footer.column.columnDef.meta?.class?.th"
          >
            <template v-if="!footer.isPlaceholder && footer.column.columnDef.footer">
              <slot
                :name="`${footer.column.id}-footer`"
                :footer="footer"
                :column="footer.column"
                :table="table"
              >
                <FlexRender :render="footer.column.columnDef.footer" :props="footer.getContext()" />
              </slot>
            </template>
          </UiTableHead>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
  </div>

  <div
    v-if="showFooter"
    class="flex flex-col gap-4 px-2 py-4 md:flex-row md:items-center md:justify-between"
  >
    <slot name="footer" :table="table">
      <div class="flex items-center gap-4">
        <slot name="footer-left" :table="table">
          <div v-if="showRowsPerPage" class="flex items-center gap-2">
            <span class="text-sm whitespace-nowrap text-muted-foreground">{{
              rowsPerPageText
            }}</span>
            <UiSelect v-model="pageSize" class="w-[70px]">
              <UiSelectTrigger>
                <UiSelectValue />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="size in pageSizeOptions" :key="size" :value="`${size}`">
                  {{ size }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>

          <div v-if="showSelectedCount" class="text-sm whitespace-nowrap text-muted-foreground">
            {{ table.getFilteredSelectedRowModel().rows.length }} of
            {{ table.getFilteredRowModel().rows.length }} row(s) selected
          </div>
        </slot>
      </div>

      <div class="flex items-center gap-4">
        <slot name="footer-right" :table="table">
          <div v-if="showPageInfo" class="text-sm whitespace-nowrap text-muted-foreground">
            Page {{ table.getState().pagination.pageIndex + 1 }} of
            {{ table.getPageCount() }}
          </div>

          <div v-if="showPagination" class="flex items-center gap-1">
            <UiButton
              variant="outline"
              size="icon-sm"
              :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)"
            >
              <Icon name="lucide:chevrons-left" class="size-4" />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon-sm"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              <Icon name="lucide:chevron-left" class="size-4" />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon-sm"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon-sm"
              :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)"
            >
              <Icon name="lucide:chevrons-right" class="size-4" />
            </UiButton>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
  import {
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
  } from "@tanstack/vue-table";
  import { startCase } from "lodash-es";
  import type {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    SortingState,
    TableOptions,
    VisibilityState,
  } from "@tanstack/vue-table";
  import type { HTMLAttributes } from "vue";

  declare module "@tanstack/vue-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
      class?: {
        th?: HTMLAttributes["class"];
        td?: HTMLAttributes["class"];
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
      class?: {
        tr?: HTMLAttributes["class"];
      };
    }
  }
</script>

<script lang="ts" setup generic="T">
  const props = withDefaults(
    defineProps<{
      /** Array of data to display */
      data?: T[];
      /** Column definitions. If not provided, columns will be auto-generated from data */
      columns?: ColumnDef<T, any>[];
      /** Table class */
      class?: HTMLAttributes["class"];
      /** Text to display when table is empty */
      emptyText?: string;
      /** Hide table header */
      hideHeader?: boolean;
      /** Show footer section */
      showFooter?: boolean;
      /** Show pagination controls */
      showPagination?: boolean;
      /** Show page info (e.g., "Page 1 of 10") */
      showPageInfo?: boolean;
      /** Show rows per page selector */
      showRowsPerPage?: boolean;
      /** Show selected row count */
      showSelectedCount?: boolean;
      /** Page size options */
      pageSizeOptions?: number[];
      /** Initial page size */
      initialPageSize?: number;
      /** Loading state */
      loading?: boolean;
      /** Enable manual pagination (for server-side pagination) */
      manualPagination?: boolean;
      /** Total page count (required for manual pagination) */
      pageCount?: number;
      /** Enable manual sorting (for server-side sorting) */
      manualSorting?: boolean;
      /** Enable manual filtering (for server-side filtering) */
      manualFiltering?: boolean;
      /** Additional table options */
      tableOptions?: Partial<TableOptions<T>>;
      /** Text for "Rows per page" label
       *
       * @default "Rows per page:"
       */
      rowsPerPageText?: string;
    }>(),
    {
      data: () => [],
      emptyText: "No data available.",
      showFooter: true,
      showPagination: true,
      showPageInfo: true,
      showRowsPerPage: true,
      pageSizeOptions: () => [10, 20, 30, 40, 50],
      initialPageSize: 10,
      loading: false,
      manualPagination: false,
      manualSorting: false,
      manualFiltering: false,
      pageCount: -1,
      rowsPerPageText: "Rows per page:",
    }
  );

  const emit = defineEmits<{
    /**
     * Emitted when the table is ready
     *
     * Provides the table instance
     */
    ready: [table: ReturnType<typeof useVueTable<T>>];
    /**
     * Emitted when pagination changes
     */
    "update:pagination": [pagination: { pageIndex: number; pageSize: number }];
    /**
     * Emitted when sorting changes
     */
    "update:sorting": [sorting: SortingState];
    /**
     * Emitted when column filters change
     */
    "update:columnFilters": [filters: ColumnFiltersState];
    /**
     * Emitted when a row is right-clicked
     */
    "row-contextmenu": [payload: { event: MouseEvent; row: any }];
  }>();

  // Auto-generate columns from data if not provided
  const computedColumns = computed<ColumnDef<T, any>[]>(() => {
    if (props.columns && props.columns.length > 0) {
      return props.columns;
    }

    // Auto-generate from first data item
    if (props.data && props.data.length > 0) {
      const firstItem = props.data[0];
      return Object.keys(firstItem as object).map((key) => ({
        accessorKey: key,
        header: startCase(key),
        cell: (info: any) => info.getValue(),
      }));
    }

    return [];
  });

  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const columnVisibility = ref<VisibilityState>({});
  const rowSelection = ref({});
  const globalFilter = ref("");
  const expanded = ref({});
  const pagination = ref({
    pageIndex: 0,
    pageSize: props.initialPageSize,
  });

  const table = useVueTable({
    get data() {
      return props.data;
    },
    get columns() {
      return computedColumns.value;
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
      get globalFilter() {
        return globalFilter.value;
      },
      get pagination() {
        return pagination.value;
      },
      get expanded() {
        return expanded.value;
      },
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
      emit("update:sorting", sorting.value);
    },
    onColumnFiltersChange: (updaterOrValue) => {
      columnFilters.value =
        typeof updaterOrValue === "function" ? updaterOrValue(columnFilters.value) : updaterOrValue;
      emit("update:columnFilters", columnFilters.value);
    },
    onColumnVisibilityChange: (updaterOrValue) => {
      columnVisibility.value =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnVisibility.value)
          : updaterOrValue;
    },
    onRowSelectionChange: (updaterOrValue) => {
      rowSelection.value =
        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection.value) : updaterOrValue;
    },
    onGlobalFilterChange: (updaterOrValue) => {
      globalFilter.value =
        typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;
    },
    onPaginationChange: (updaterOrValue) => {
      pagination.value =
        typeof updaterOrValue === "function" ? updaterOrValue(pagination.value) : updaterOrValue;
      emit("update:pagination", pagination.value);
    },
    onExpandedChange: (updaterOrValue) => {
      expanded.value =
        typeof updaterOrValue === "function" ? updaterOrValue(expanded.value) : updaterOrValue;
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination: props.manualPagination,
    manualSorting: props.manualSorting,
    manualFiltering: props.manualFiltering,
    pageCount: props.manualPagination ? props.pageCount : undefined,
    ...props.tableOptions,
  });

  const pageSize = computed({
    get() {
      return table.getState().pagination.pageSize.toString();
    },
    set(value: string) {
      table.setPageSize(Number(value));
    },
  });

  const hasFooter = computed(() => {
    return computedColumns.value.some((col) => col.footer);
  });

  onMounted(() => {
    emit("ready", table);
  });

  defineExpose({
    table,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    globalFilter,
    pagination,
    expanded,
  });
</script>

<style>
  /* Loading animation */
  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }
</style>
