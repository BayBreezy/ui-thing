---
title: Tanstack Table
description: A powerful datatable for your app built with TanStack Table.
links:
  - title: TanStack Table
    href: https://tanstack.com/table/v8
    icon: "lucide:table-2"
  - title: API Reference
    href: https://tanstack.com/table/v8/docs/api/core/column-def
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="TanStackTable.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tanstacktable
```

## Usage

### Regular

::ShowCase

:DocsTanStackTable

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackTable.vue" code lang="vue" -->

```vue [DocsTanStackTable.vue]
<template>
  <div>
    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <UiInput v-model="search" type="search" placeholder="Search" class="w-full md:w-96" />
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline">
            <span>View</span>
            <Icon name="lucide:chevron-down" class="h-4 w-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
          <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuCheckboxItem
              v-for="column in table?.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              :checked="column.getIsVisible()"
              @update:checked="tableRef?.toggleColumnVisibility(column)"
            >
              <span class="text-sm capitalize">{{ column?.id }}</span>
            </UiDropdownMenuCheckboxItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <UiTanStackTable
      ref="tableRef"
      show-select
      :search="search"
      :data="data"
      :columns="columns"
      class="mt-5 rounded-md border"
      @ready="table = $event"
    >
      <template #empty>
        <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
          <Icon name="lucide:database" class="h-12 w-12 text-muted-foreground" />
          <span class="mt-2">No data available.</span>
        </div>
      </template>
    </UiTanStackTable>
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef, Table } from "@tanstack/vue-table";

  const tableRef = ref();
  const table = ref<Table<Payment> | null>(null);
  const search = ref("");

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "ujmovto@tezotu.bb",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "gi@po.tz",
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "id", header: "ID", enableHiding: true },
    { accessorKey: "amount", header: "Amount", enableHiding: true },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return h(resolveComponent("UiBadge"), { variant: "outline", class: "capitalize" }, () => [
          row.original.status,
        ]);
      },
      enableHiding: true,
    },
    { accessorKey: "email", header: "Email", enableHiding: true },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      cell: () => {
        return h(
          resolveComponent("UiButton"),
          { variant: "ghost", size: "icon", class: "w-9 h-9" },
          () => [h(resolveComponent("Icon"), { name: "lucide:more-horizontal", class: "h-4 w-4" })]
        );
      },
    },
  ];
</script>
```

<!-- /automd -->

::

### Basic

::ShowCase

:DocsTanStackBasic

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackBasic.vue" code lang="vue" -->

```vue [DocsTanStackBasic.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  //1. Import the stuff you want from TanStack
  import {
    createColumnHelper,
    FlexRender,
    getCoreRowModel,
    useVueTable,
  } from "@tanstack/vue-table";
  //2. Import the components you want to use
  import { UiBadge, UiCheckbox } from "#components";
  // Import any type that you may need
  import type { RowSelectionState } from "@tanstack/vue-table";

  //3. Fetch your data
  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 5 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: faker.location.city(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      }));
    },
    { default: () => [] }
  );

  // 4. Optionally define the type of the columns
  type Item = (typeof data.value)[number] & {
    select: boolean;
  };
  //5. Create a column helper based on the type of the item
  const columnHelper = createColumnHelper<Item>();

  const total = computed(() => {
    return data.value?.reduce((acc: number, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  //6. Create the columns
  const columns = [
    columnHelper.accessor("select", {
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
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ getValue }) => h("span", { class: tw`font-medium` }, getValue()),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (item) => h("a", { href: `mailto:${item.getValue()}` }, item.getValue()),
    }),
    columnHelper.accessor("location", {
      header: "Location",
      cell: (item) => item.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) =>
        h(
          UiBadge,
          {
            variant: getValue() === "Inactive" ? "outline" : "default",
          },
          () => getValue()
        ),
    }),
    columnHelper.accessor("balance", {
      header: "Balance",
      cell: ({ getValue }) => h("span", { class: tw`text-right` }, formatCurrency(getValue())),
    }),
  ];

  //7. optionally set the state you want to control
  // create state for row selection so we can emit it back to the parent if needed
  const rowSelection = ref<RowSelectionState>({});

  //8. Create the table
  const table = useVueTable({
    // @ts-expect-error - the types are correct
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel<Item>(),
    state: {
      //9. Set the state you want to control
      get rowSelection() {
        return rowSelection.value;
      },
    },
    //10. Optionally set the actions you want to control
    onRowSelectionChange: (newRowSelection) => {
      rowSelection.value =
        typeof newRowSelection === "function"
          ? newRowSelection(rowSelection.value)
          : newRowSelection;
      // optionally do something else with the row selection
      // emit('row-selection-change', rowSelection.value)
      console.log(rowSelection.value);
    },
  });
</script>

<template>
  <div>
    <!-- 10. Render the table -->
    <UiTable>
      <UiTableHeader>
        <!-- For rows, we loop over the tables `getHeaderGroups` function -->
        <UiTableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          class="hover:bg-transparent"
        >
          <!-- For each header, we loop over the headers in the headerGroup -->
          <UiTableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
          >
            <!-- Render the header cell -->
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
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
      <UiTableFooter class="bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="5">Total</UiTableCell>
          <UiTableCell class="text-right">
            {{ formatCurrency(total) }}
          </UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">
      Basic data table made with
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
```

<!-- /automd -->

::

### Filters

::ShowCase

:DocsTanStackFilters

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackFilters.vue" code lang="vue" -->

```vue [DocsTanStackFilters.vue]
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
```

<!-- /automd -->

::
