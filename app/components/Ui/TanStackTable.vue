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
            :style="getPinnedHeaderStyle(header.column)"
          >
            <template v-if="!header.isPlaceholder">
              <slot
                :name="`${header.column.id}-header`"
                :header="header"
                :column="header.column"
                :table="table"
              >
                <div class="flex items-center gap-2">
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
                    <UiTooltip>
                      <UiTooltipTrigger>
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
                      </UiTooltipTrigger>
                      <UiTooltipContent>
                        <span>
                          {{
                            header.column.getIsSorted() === "asc"
                              ? "Sorted ascending"
                              : header.column.getIsSorted() === "desc"
                                ? "Sorted descending"
                                : "Not sorted"
                          }}
                        </span>
                      </UiTooltipContent>
                    </UiTooltip>
                  </div>
                  <div v-else class="flex items-center gap-2">
                    <FlexRender
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                  </div>
                  <UiTooltip>
                    <UiDropdownMenu v-if="shouldShowColumnPinButton(header.column)">
                      <UiDropdownMenuTrigger as-child>
                        <UiTooltipTrigger as-child>
                          <UiButton
                            variant="ghost"
                            size="icon-sm"
                            class="hover:bg-muted"
                            @click.stop
                          >
                            <Icon :name="getColumnPinIcon(header.column)" class="size-4" />
                          </UiButton>
                        </UiTooltipTrigger>
                      </UiDropdownMenuTrigger>
                      <UiTooltipContent>
                        <span>{{ getColumnPinTooltipText(header.column) }}</span>
                      </UiTooltipContent>
                      <UiDropdownMenuContent align="end" :side-offset="6">
                        <UiDropdownMenuItem
                          :title="getPinLabel('left')"
                          :icon="props.columnPinIconOn"
                          :disabled="header.column.getIsPinned() == 'left'"
                          @select="() => pinColumn(header.column, 'left')"
                        />
                        <UiDropdownMenuItem
                          :title="getPinLabel('right')"
                          :icon="props.columnPinIconOn"
                          :disabled="header.column.getIsPinned() == 'right'"
                          @select="() => pinColumn(header.column, 'right')"
                        />
                        <UiDropdownMenuItem
                          :title="getPinLabel(false)"
                          :icon="props.columnPinIconOff"
                          :disabled="!header.column.getIsPinned()"
                          @select="() => pinColumn(header.column, false)"
                        />
                      </UiDropdownMenuContent>
                    </UiDropdownMenu>
                  </UiTooltip>
                </div>
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
              :style="getPinnedRowStyle(row)"
              @contextmenu="(event: MouseEvent) => emit('row-contextmenu', { event, row })"
            >
              <UiTableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="cell.column.columnDef.meta?.class?.td"
                :style="getPinnedColumnStyle(cell.column)"
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
                  <template v-if="cell.column.id === 'pin'">
                    <UiTooltip>
                      <UiDropdownMenu>
                        <UiTooltipTrigger as-child>
                          <UiDropdownMenuTrigger as-child>
                            <UiButton
                              variant="ghost"
                              size="icon-sm"
                              class="hover:bg-muted"
                              @click.stop
                            >
                              <Icon
                                :name="row.getIsPinned() ? rowPinIconOn : rowPinIconOff"
                                :class="[
                                  'size-4',
                                  row.getIsPinned() ? 'text-primary' : 'opacity-60',
                                ]"
                              />
                            </UiButton>
                          </UiDropdownMenuTrigger>
                        </UiTooltipTrigger>
                        <UiTooltipContent>
                          <span>{{ getRowPinTooltipText(row) }}</span>
                        </UiTooltipContent>
                        <UiDropdownMenuContent align="start" :side-offset="6">
                          <UiDropdownMenuItem
                            :title="getRowPinLabel('top')"
                            :icon="rowPinIconOn"
                            :disabled="row.getIsPinned() === 'top'"
                            @select="() => pinRow(row, 'top')"
                          />
                          <UiDropdownMenuItem
                            :title="getRowPinLabel('bottom')"
                            :icon="rowPinIconOn"
                            :disabled="row.getIsPinned() === 'bottom'"
                            @select="() => pinRow(row, 'bottom')"
                          />
                          <UiDropdownMenuItem
                            :title="getRowPinLabel(false)"
                            :icon="rowPinIconOff"
                            :disabled="!row.getIsPinned()"
                            @select="() => pinRow(row, false)"
                          />
                        </UiDropdownMenuContent>
                      </UiDropdownMenu>
                    </UiTooltip>
                  </template>
                  <template v-else-if="cell.column.id === 'expand'">
                    <UiTooltip>
                      <UiTooltipTrigger as-child>
                        <UiButton
                          variant="ghost"
                          size="icon-sm"
                          class="hover:bg-muted"
                          @click="row.toggleExpanded()"
                        >
                          <Icon
                            :name="row.getIsExpanded() ? expandCellIconOn : expandCellIconOff"
                            class="size-4"
                          />
                        </UiButton>
                      </UiTooltipTrigger>
                      <UiTooltipContent>
                        <span> {{ row.getIsExpanded() ? "Collapse" : "Expand" }} row </span>
                      </UiTooltipContent>
                    </UiTooltip>
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
    Column,
    ColumnDef,
    ColumnFiltersState,
    ColumnPinningState,
    Row,
    RowData,
    RowPinningState,
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
      /** Enable row pinning */
      enableRowPinning?: boolean;
      /** Enable column pinning */
      enableColumnPinning?: boolean;
      /** Show pin buttons in column headers */
      showColumnPinButtons?: boolean;
      /** Additional table options */
      tableOptions?: Partial<TableOptions<T>>;
      /** Text for "Rows per page" label
       *
       * @default "Rows per page:"
       */
      rowsPerPageText?: string;
      /**
       * Icon name for expand cell (on state)
       *
       * @default 'lucide:chevron-down'
       */
      expandCellIconOn?: string;
      /**
       * Icon name for expand cell (off state)
       *
       * @default 'lucide:chevron-right'
       */
      expandCellIconOff?: string;
      /**
       * Icon name for pinned row (on state)
       *
       * @default 'lucide:pin'
       */
      rowPinIconOn?: string;
      /**
       * Icon name for unpinned row (off state)
       *
       * @default 'lucide:pin-off'
       */
      rowPinIconOff?: string;
      /** Icon name for pinned column
       *
       * @default 'lucide:pin'
       */
      columnPinIconOn?: string;
      /** Icon name for unpinning a column
       *
       * @default 'lucide:pin-off'
       */
      columnPinIconOff?: string;
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
      enableRowPinning: true,
      enableColumnPinning: false,
      showColumnPinButtons: false,
      pageCount: -1,
      rowsPerPageText: "Rows per page:",
      expandCellIconOn: "lucide:chevron-down",
      expandCellIconOff: "lucide:chevron-right",
      rowPinIconOn: "lucide:pin",
      rowPinIconOff: "lucide:pin-off",
      columnPinIconOn: "lucide:pin",
      columnPinIconOff: "lucide:pin-off",
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
    /**
     * Emitted when row pinning changes
     */
    "update:rowPinning": [pinning: RowPinningState];
    /**
     * Emitted when a row is pinned/unpinned via the pin cell
     */
    "row-pin": [payload: { row: any; pin: "top" | "bottom" | false }];
    /**
     * Emitted when column pinning changes
     */
    "update:columnPinning": [pinning: ColumnPinningState];
    /**
     * Emitted when a column is pinned/unpinned via header button
     */
    "column-pin": [payload: { column: any; pin: "left" | "right" | false }];
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
  const rowPinning = ref<RowPinningState>({});
  const columnPinning = ref<ColumnPinningState>({});
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
      get rowPinning() {
        return rowPinning.value;
      },
      get columnPinning() {
        return columnPinning.value;
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
    onRowPinningChange: (updaterOrValue) => {
      rowPinning.value =
        typeof updaterOrValue === "function" ? updaterOrValue(rowPinning.value) : updaterOrValue;
      emit("update:rowPinning", rowPinning.value);
    },
    onColumnPinningChange: (updaterOrValue) => {
      columnPinning.value =
        typeof updaterOrValue === "function" ? updaterOrValue(columnPinning.value) : updaterOrValue;
      emit("update:columnPinning", columnPinning.value);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableRowPinning: props.enableRowPinning,
    enableColumnPinning: props.enableColumnPinning,
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

  const shouldShowColumnPinButton = (column: Column<T, unknown>) => {
    return props.enableColumnPinning && props.showColumnPinButtons && column.getCanPin?.();
  };

  const getColumnPinIcon = (column: Column<T, unknown>) => {
    const state = column.getIsPinned?.();
    if (state === "left" || state === "right") return props.columnPinIconOn;
    return props.columnPinIconOff;
  };

  const getColumnPinTooltipText = (column: Column<T, unknown>) => {
    const state = column.getIsPinned?.();
    if (state === "left") return "Currently pinned left";
    if (state === "right") return "Currently pinned right";
    return "Not pinned";
  };

  const getPinLabel = (pin: "left" | "right" | false) => {
    if (pin === "left") return "Pin to the left";
    if (pin === "right") return "Pin to the right";
    return "Unpin";
  };

  const pinColumn = (column: Column<T, unknown>, pin: "left" | "right" | false) => {
    column.pin(pin);
    emit("column-pin", { column, pin });
  };

  const getRowPinTooltipText = (row: Row<T>) => {
    const state = row.getIsPinned();
    if (state === "top") return "Pinned top";
    if (state === "bottom") return "Pinned bottom";
    return "Not pinned";
  };

  const getRowPinLabel = (pin: "top" | "bottom" | false) => {
    if (pin === "top") return "Pin to top";
    if (pin === "bottom") return "Pin to bottom";
    return "Unpin";
  };

  const pinRow = (row: Row<T>, pin: "top" | "bottom" | false) => {
    row.pin(pin);
    emit("row-pin", { row, pin });
  };

  const getPinnedHeaderStyle = (column: Column<T, unknown>) => {
    const pinned = column.getIsPinned?.();
    if (!pinned) return undefined;

    const isLeft = pinned === "left";
    const offset = column.getStart?.(isLeft ? "left" : "right") ?? 0;

    return {
      position: "sticky",
      [isLeft ? "left" : "right"]: `${offset}px`,
      zIndex: 30,
      background: "var(--ui-table-pinned-bg, var(--background))",
      boxShadow: isLeft ? "2px 0 6px -2px rgb(0 0 0 / 0.08)" : "-2px 0 6px -2px rgb(0 0 0 / 0.08)",
    } as const;
  };

  const getPinnedColumnStyle = (column: Column<T, unknown>) => {
    const pinned = column.getIsPinned?.();
    if (!pinned) return undefined;

    const isLeft = pinned === "left";
    const offset = column.getStart?.(isLeft ? "left" : "right") ?? 0;

    return {
      position: "sticky",
      [isLeft ? "left" : "right"]: `${offset}px`,
      zIndex: 10,
      background: "var(--ui-table-pinned-bg, var(--background))",
      boxShadow: isLeft ? "2px 0 6px -2px rgb(0 0 0 / 0.08)" : "-2px 0 6px -2px rgb(0 0 0 / 0.08)",
    } as const;
  };

  const getPinnedRowStyle = (row: Row<T>) => {
    const pinned = row.getIsPinned();
    if (!pinned) return undefined;

    const index =
      typeof (row as any).getPinnedIndex === "function" ? (row as any).getPinnedIndex() : 0;
    const offsetVar = "var(--ui-table-row-height, 44px)";
    const offsetValue = `calc(${index} * ${offsetVar})`;

    return pinned === "top"
      ? {
          position: "sticky",
          top: offsetValue,
          zIndex: 5,
          background: "var(--ui-table-pinned-bg, var(--background))",
        }
      : {
          position: "sticky",
          bottom: offsetValue,
          zIndex: 5,
          background: "var(--ui-table-pinned-bg, var(--background))",
        };
  };

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
    rowPinning,
    columnPinning,
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
