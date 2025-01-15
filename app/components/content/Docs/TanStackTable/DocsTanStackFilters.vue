<script lang="ts" setup>
  import {
    createColumnHelper,
    FlexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useVueTable,
  } from "@tanstack/vue-table";
  import { Icon, UiCheckbox } from "#components";
  import type {
    ColumnFiltersState,
    RowData,
    RowSelectionState,
    SortingState,
  } from "@tanstack/vue-table";

  declare module "@tanstack/vue-table" {
    //allows us to define custom properties for our columns
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
      filterVariant?: "select";
    }
  }

  type Item = {
    id: string;
    keyword: string;
    intents: Array<"Informational" | "Navigational" | "Commercial" | "Transactional">;
    volume: number;
    cpc: number;
    traffic: number;
    link: string;
  };

  const items: Item[] = [
    {
      id: "1",
      keyword: "react components",
      intents: ["Informational", "Navigational"],
      volume: 2507,
      cpc: 2.5,
      traffic: 88,
      link: "https://www.originui.com",
    },
    {
      id: "2",
      keyword: "buy react templates",
      intents: ["Commercial", "Transactional"],
      volume: 1850,
      cpc: 4.75,
      traffic: 65,
      link: "https://www.originui.com/templates",
    },
    {
      id: "3",
      keyword: "react ui library",
      intents: ["Informational", "Commercial"],
      volume: 3200,
      cpc: 3.25,
      traffic: 112,
      link: "https://www.originui.com/docs",
    },
    {
      id: "4",
      keyword: "tailwind components download",
      intents: ["Transactional"],
      volume: 890,
      cpc: 1.95,
      traffic: 45,
      link: "https://www.originui.com/download",
    },
    {
      id: "5",
      keyword: "react dashboard template free",
      intents: ["Commercial", "Transactional"],
      volume: 4100,
      cpc: 5.5,
      traffic: 156,
      link: "https://www.originui.com/templates/dashboard",
    },
    {
      id: "6",
      keyword: "how to use react components",
      intents: ["Informational"],
      volume: 1200,
      cpc: 1.25,
      traffic: 42,
      link: "https://www.originui.com/tutorials",
    },
    {
      id: "7",
      keyword: "react ui kit premium",
      intents: ["Commercial", "Transactional"],
      volume: 760,
      cpc: 6.8,
      traffic: 28,
      link: "https://www.originui.com/pricing",
    },
    {
      id: "8",
      keyword: "react component documentation",
      intents: ["Informational", "Navigational"],
      volume: 950,
      cpc: 1.8,
      traffic: 35,
      link: "https://www.originui.com/docs/components",
    },
  ];

  const columnHelper = createColumnHelper<Item>();

  const columns = [
    columnHelper.accessor("id", {
      enableSorting: false,
      enableGlobalFilter: false,
      header({ table }) {
        return h(UiCheckbox, {
          checked: table.getIsSomeRowsSelected()
            ? "indeterminate"
            : table.getIsAllRowsSelected()
              ? true
              : false,
          "onUpdate:checked": (v) =>
            table.getToggleAllRowsSelectedHandler()({ target: { checked: v } }),
        });
      },
      cell({ row }) {
        return h(UiCheckbox, {
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          "onUpdate:checked": row.getToggleSelectedHandler(),
        });
      },
    }),
    columnHelper.accessor("keyword", {
      header: "Keyword",
      sortingFn: "text",
      cell: ({ getValue }) => h("span", { class: tw`font-medium` }, getValue()),
    }),
    columnHelper.accessor("intents", {
      header: "Intents",
      enableSorting: false,
      meta: {
        filterVariant: "select",
      },
      filterFn: "arrIncludes",
      cell: ({ getValue }) => {
        const styles = {
          Informational: "bg-indigo-400/20 text-indigo-500",
          Navigational: "bg-emerald-400/20 text-emerald-500",
          Commercial: "bg-amber-400/20 text-amber-500",
          Transactional: "bg-rose-400/20 text-rose-500",
        } as const;
        return h(
          "div",
          { class: tw`flex items-center gap-1` },
          getValue().map((intent) => {
            const intentStyle = styles[intent];
            return h(
              "div",
              {
                class:
                  tw`flex size-5 items-center justify-center rounded text-xs font-medium ` +
                  intentStyle,
              },
              intent.charAt(0)
            );
          })
        );
      },
    }),
    columnHelper.accessor("volume", {
      header: "Volume",
      filterFn: "inNumberRange",
      cell: ({ getValue }) => {
        return new Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(getValue());
      },
    }),
    columnHelper.accessor("cpc", {
      header: "CPC",
      cell: ({ getValue }) => getValue(),
    }),

    columnHelper.accessor("traffic", {
      header: "Traffic",
      cell: ({ getValue }) => {
        return new Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(getValue());
      },
    }),
    columnHelper.accessor("link", {
      header: "Link",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: ({ getValue }) =>
        h(
          "a",
          {
            href: getValue(),
            target: "_blank",
            class: tw`inline-flex items-center gap-1 hover:underline`,
          },
          [
            getValue(),
            h(Icon, { name: "lucide:external-link", class: tw`size-3`, ariaHidden: true }),
          ]
        ),
    }),
  ];

  const rowSelection = ref<RowSelectionState>({});
  const columnFilters = ref<ColumnFiltersState>([]);
  const sorting = ref<SortingState>([]);
  const search = ref("");
  const globalFilter = refDebounced(search, 300);
  const table = useVueTable({
    columns,
    data: items,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel<Item>(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      get rowSelection() {
        return rowSelection.value;
      },
      get sorting() {
        return sorting.value;
      },
      get globalFilter() {
        return globalFilter.value;
      },
      get columnFilters() {
        return columnFilters.value;
      },
    },
    onRowSelectionChange: (newRowSelection) => {
      rowSelection.value =
        typeof newRowSelection === "function"
          ? newRowSelection(rowSelection.value)
          : newRowSelection;
      // optionally do something else with the row selection
      // emit('row-selection-change', rowSelection.value)
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === "function" ? updaterOrValue(sorting.value) : updaterOrValue;
    },
    onGlobalFilterChange: (updaterOrValue) => {
      search.value =
        typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;
    },
    onColumnFiltersChange: (updaterOrValue) => {
      columnFilters.value =
        typeof updaterOrValue === "function" ? updaterOrValue(columnFilters.value) : updaterOrValue;
    },
  });
</script>
<template>
  <div>
    <div class="md:w-1/2 lg:max-w-[300px]">
      <UiVeeInput
        v-model="search"
        placeholder="Search keyword"
        icon="lucide:search"
        label="Keywords"
      />
    </div>
    <!-- Render the table -->
    <UiTable class="mt-8">
      <UiTableHeader>
        <!-- For rows, we loop over the tables `getHeaderGroups` function -->
        <UiTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          class="bg-muted/50"
        >
          <!-- For each header, we loop over the headers in the headerGroup -->
          <UiTableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
            :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''"
            class="relative h-10 select-none border-t"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <div class="flex w-full items-center gap-3 whitespace-nowrap">
              <!-- Render the header cell -->
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <Icon
                v-if="header.column.getIsSorted() == 'asc'"
                name="lucide:chevron-up"
                class="size-4 shrink-0 text-muted-foreground"
              />
              <Icon
                v-else-if="header.column.getIsSorted() == 'desc'"
                name="lucide:chevron-down"
                class="size-4 shrink-0 text-muted-foreground"
              />
              <Icon
                v-else-if="header.column.getCanSort()"
                name="lucide:chevrons-up-down"
                class="size-4 shrink-0 text-muted-foreground/30"
              />
              <div
                v-if="
                  header.column.getCanFilter() &&
                  header.column.columnDef?.meta?.filterVariant &&
                  header.column.columnDef?.meta?.filterVariant == 'select'
                "
              >
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" class="size-7" size="xs">
                      <Icon name="lucide:list-filter" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent class="w-48">
                    <UiDropdownMenuRadioGroup
                      :model-value="(header.column.getFilterValue() as string) ?? 'All'"
                      @update:model-value="
                        (e) => header.column.setFilterValue(e == 'All' ? undefined : e)
                      "
                    >
                      <UiDropdownMenuRadioItem
                        v-for="item in [
                          'All',
                          'Informational',
                          'Navigational',
                          'Commercial',
                          'Transactional',
                        ]"
                        :key="item"
                        :value="item"
                        :title="item"
                        :text-value="item"
                        @select="(e) => e.preventDefault()"
                      />
                    </UiDropdownMenuRadioGroup>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </div>
            </div>
          </UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <!-- If there are rows, loop over them -->
        <template v-if="table.getRowModel().rows?.length">
          <!-- For each row, loop over the tables `getRowModel().rows` -->
          <UiTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() && 'selected'"
          >
            <!-- For each cell in the row, loop over the visible cells -->
            <UiTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <!-- Render the cell -->
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </UiTableCell>
          </UiTableRow>
        </template>
        <!-- If there are no rows, show a message -->
        <template v-else>
          <UiTableRow>
            <UiTableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">
      Data table with filters made with
      <a
        class="underline hover:text-foreground"
        href="https://tanstack.com/table"
        target="_blank"
        rel="noopener noreferrer"
      >
        TanStack Table
      </a>
    </p>
  </div>
</template>
