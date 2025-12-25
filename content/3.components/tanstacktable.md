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
label: Updated
---

## Source code

Click :SourceCodeLink{component="TanStackTable.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add tanstacktable"}

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
            <Icon name="lucide:chevron-down" class="size-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
          <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuCheckboxItem
              v-for="column in table?.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              :model-value="column.getIsVisible()"
              @update:model-value="tableRef?.toggleColumnVisibility(column)"
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
          () => [h(resolveComponent("Icon"), { name: "lucide:more-horizontal", class: "size-4" })]
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
  import type { CheckboxRootProps } from "reka-ui";

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
          modelValue: table.getIsSomeRowsSelected()
            ? "indeterminate"
            : table.getIsAllRowsSelected()
              ? true
              : false,
          "onUpdate:modelValue": (v: CheckboxRootProps["modelValue"]) =>
            table.getToggleAllRowsSelectedHandler()({ target: { checked: v } }),
        });
      },
      cell({ row }) {
        return h(UiCheckbox, {
          modelValue: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          "onUpdate:modelValue": row.getToggleSelectedHandler(),
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
          modelValue: table.getIsSomeRowsSelected()
            ? "indeterminate"
            : table.getIsAllRowsSelected()
              ? true
              : false,
          "onUpdate:modelValue": (v: boolean | "indeterminate") =>
            table.getToggleAllRowsSelectedHandler()({ target: { checked: v } }),
        });
      },
      cell({ row }) {
        return h(UiCheckbox, {
          modelValue: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          "onUpdate:modelValue": row.getToggleSelectedHandler(),
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
            class: tw`inline-flex items-center gap-1 transition-all hover:text-sky-500 hover:underline`,
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
            class="relative h-10 border-t select-none"
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

### Simple (Auto-Generated Columns)

Shows zero-config usage with automatic column generation from data keys.

::ShowCase

:DocsTanStackSimple

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackSimple.vue" code lang="vue" -->

```vue [DocsTanStackSimple.vue]
<template>
  <div class="w-full">
    <UiTanStackTable :data="payments" />
  </div>
</template>

<script lang="ts" setup>
  const payments = [
    {
      id: "4600",
      date: "2024-03-11T15:30:00",
      status: "paid",
      email: "james.anderson@example.com",
      amount: 594,
    },
    {
      id: "4599",
      date: "2024-03-11T10:10:00",
      status: "failed",
      email: "mia.white@example.com",
      amount: 276,
    },
    {
      id: "4598",
      date: "2024-03-11T08:50:00",
      status: "refunded",
      email: "william.brown@example.com",
      amount: 315,
    },
    {
      id: "4597",
      date: "2024-03-10T19:45:00",
      status: "paid",
      email: "emma.davis@example.com",
      amount: 529,
    },
    {
      id: "4596",
      date: "2024-03-10T15:55:00",
      status: "paid",
      email: "ethan.harris@example.com",
      amount: 639,
    },
  ];
</script>
```

<!-- /automd -->

::

### Custom Columns

Custom column definitions with formatted cells and styled badges.

::ShowCase

:DocsTanStackCustomColumns

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackCustomColumns.vue" code lang="vue" -->

```vue [DocsTanStackCustomColumns.vue]
<template>
  <div class="w-full">
    <UiTanStackTable :data="payments" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";

  interface Payment {
    id: string;
    date: string;
    status: "paid" | "failed" | "refunded";
    email: string;
    amount: number;
  }

  const payments: Payment[] = [
    {
      id: "4600",
      date: "2024-03-11T15:30:00",
      status: "paid",
      email: "james.anderson@example.com",
      amount: 594,
    },
    {
      id: "4599",
      date: "2024-03-11T10:10:00",
      status: "failed",
      email: "mia.white@example.com",
      amount: 276,
    },
    {
      id: "4598",
      date: "2024-03-11T08:50:00",
      status: "refunded",
      email: "william.brown@example.com",
      amount: 315,
    },
    {
      id: "4597",
      date: "2024-03-10T19:45:00",
      status: "paid",
      email: "emma.davis@example.com",
      amount: 529,
    },
    {
      id: "4596",
      date: "2024-03-10T15:55:00",
      status: "paid",
      email: "ethan.harris@example.com",
      amount: 639,
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => `#${row.getValue("id")}`,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return new Date(row.getValue("date")).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              status === "paid"
                ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : status === "failed"
                  ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
            }`,
          },
          status.charAt(0).toUpperCase() + status.slice(1)
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: () => h("div", { class: "text-right" }, "Amount"),
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return h("div", { class: "text-right font-medium" }, formatted);
      },
    },
  ];
</script>
```

<!-- /automd -->

::

### With Slots

Using slots to customize cell rendering with avatars and dropdowns.

::ShowCase

:DocsTanStackSlots

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackSlots.vue" code lang="vue" -->

```vue [DocsTanStackSlots.vue]
<template>
  <div class="w-full">
    <UiTanStackTable :data="users" :columns="columns">
      <template #name-cell="{ row }">
        <div class="flex items-center gap-3">
          <UiAvatar
            :src="`https://i.pravatar.cc/120?img=${row.original.id}`"
            class="size-10"
            :alt="`${row.original.name} avatar`"
          />
          <div>
            <p class="font-medium">{{ row.original.name }}</p>
            <p class="text-sm text-muted-foreground">@{{ row.original.username }}</p>
          </div>
        </div>
      </template>

      <template #actions-cell="{}">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost" size="icon-sm">
              <Icon name="lucide:more-horizontal" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="min-w-40" align="end">
            <UiDropdownMenuItem>
              <Icon name="lucide:edit" class="size-4" />
              Edit
            </UiDropdownMenuItem>
            <UiDropdownMenuItem>
              <Icon name="lucide:copy" class="size-4" />
              Copy ID
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem variant="destructive">
              <Icon name="lucide:trash" class="size-4" />
              Delete
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </template>
    </UiTanStackTable>
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";

  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
  }

  const users: User[] = [
    {
      id: 1,
      name: "Lindsay Walton",
      username: "lindsayw",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      id: 2,
      name: "Courtney Henry",
      username: "courtneyh",
      email: "courtney.henry@example.com",
      role: "Admin",
    },
    {
      id: 3,
      name: "Tom Cook",
      username: "tomc",
      email: "tom.cook@example.com",
      role: "Member",
    },
    {
      id: 4,
      name: "Whitney Francis",
      username: "whitneyf",
      email: "whitney.francis@example.com",
      role: "Admin",
    },
  ];

  const columns: ColumnDef<User>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "User",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "",
    },
  ];
</script>
```

<!-- /automd -->

::

### With Footer

Table footer with column totals using aggregation functions.

::ShowCase

:DocsTanStackFooter

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackFooter.vue" code lang="vue" -->

```vue [DocsTanStackFooter.vue]
<template>
  <div class="w-full">
    <UiTanStackTable :data="payments" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef, Row } from "@tanstack/vue-table";

  interface Payment {
    id: string;
    description: string;
    amount: number;
    quantity: number;
  }

  const payments: Payment[] = [
    {
      id: "1",
      description: "Web Design",
      amount: 1200,
      quantity: 3,
    },
    {
      id: "2",
      description: "Development",
      amount: 2400,
      quantity: 5,
    },
    {
      id: "3",
      description: "Consulting",
      amount: 800,
      quantity: 2,
    },
    {
      id: "4",
      description: "Support",
      amount: 600,
      quantity: 4,
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "#",
      footer: () => h("div", { class: "font-semibold" }, "Total"),
    },
    {
      accessorKey: "description",
      header: "Description",
      footer: () => "",
    },
    {
      accessorKey: "quantity",
      header: () => h("div", { class: "text-center" }, "Qty"),
      cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("quantity")),
      footer: ({ column }) => {
        const total = column
          .getFacetedRowModel()
          .rows.reduce(
            (sum: number, row: Row<Payment>) => sum + row.getValue<number>("quantity"),
            0
          );
        return h("div", { class: "text-center font-semibold" }, total);
      },
    },
    {
      accessorKey: "amount",
      header: () => h("div", { class: "text-right" }, "Amount"),
      cell: ({ row }) => {
        const amount = row.getValue<number>("amount");
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return h("div", { class: "text-right font-medium" }, formatted);
      },
      footer: ({ column }) => {
        const total = column
          .getFacetedRowModel()
          .rows.reduce((sum: number, row: Row<Payment>) => sum + row.getValue<number>("amount"), 0);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total);
        return h("div", { class: "text-right font-semibold" }, formatted);
      },
    },
  ];
</script>
```

<!-- /automd -->

::

### Minimal (No Footer)

Clean table without footer controls for simple layouts.

::ShowCase

:DocsTanStackMinimal

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackMinimal.vue" code lang="vue" -->

```vue [DocsTanStackMinimal.vue]
<template>
  <div class="w-full">
    <UiTanStackTable :data="users" :columns="columns" :show-footer="false" :initial-page-size="5" />
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";

  interface User {
    name: string;
    email: string;
    status: string;
  }

  const users: User[] = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Active" },
    { name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  ];

  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status" },
  ];
</script>
```

<!-- /automd -->

::

### Loading State

Table with loading indicator - includes custom loader slot support.

::ShowCase

:DocsTanStackLoading

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackLoading.vue" code lang="vue" -->

```vue [DocsTanStackLoading.vue]
<template>
  <div class="w-full space-y-4">
    <div class="flex items-center gap-2">
      <UiButton :disabled="pending" @click="refreshData">
        <Icon name="lucide:refresh-cw" class="size-4" :class="{ 'animate-spin': pending }" />
        Refresh Data
      </UiButton>
    </div>

    <UiTanStackTable
      :data="data"
      :columns="columns"
      :loading="pending"
      :initial-page-size="5"
      :page-size-options="[5, 10, 50, 100]"
    >
      <template #loading="{ loading }">
        <div v-if="loading" class="flex items-center gap-2 px-4 py-2 text-sm text-primary">
          <Icon name="lucide:loader-2" class="size-4 animate-spin" />
          <span>Fetching data...</span>
        </div>
      </template>
    </UiTanStackTable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";

  interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
  }

  const refreshTrigger = ref(0);

  const fetchProducts = async (): Promise<Product[]> => {
    // Simulate network delay (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return Array.from({ length: 12 }, () => ({
      id: faker.number.int({ min: 1000, max: 9999 }),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
      stock: faker.number.int({ min: 0, max: 100 }),
    }));
  };

  const { data, pending } = await useAsyncData("products", () => fetchProducts(), {
    watch: [refreshTrigger],
    default: () => [],
  });

  const refreshData = () => {
    refreshTrigger.value++;
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => {
        const category = getValue() as string;
        // assign a random color based on the category string
        const color = faker.color.rgb({ format: "hex" });
        const colorLight = `${color}33`; // add opacity for light bg

        return h(
          "span",
          {
            class: `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium`,
            style: {
              backgroundColor: colorLight,
              color: color,
            },
          },
          category
        );
      },
    },
    {
      accessorKey: "price",
      header: () => h("div", { class: "text-right" }, "Price"),
      cell: ({ getValue }) => {
        const price = getValue() as number;
        return h(
          "div",
          { class: "text-right font-medium" },
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)
        );
      },
    },
    {
      accessorKey: "stock",
      header: () => h("div", { class: "text-right" }, "Stock"),
      cell: ({ getValue }) => {
        const stock = getValue() as number;
        return h(
          "div",
          {
            class: `text-right font-medium ${stock < 20 ? "text-red-600 dark:text-red-400" : ""}`,
          },
          stock
        );
      },
    },
  ];
</script>
```

<!-- /automd -->

::

### Server-Side Pagination

Manual pagination with server-side data fetching and search. Enable `manual-pagination` prop and listen to the `@update:pagination` event.

::ShowCase

:DocsTanStackServerPagination

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackServerPagination.vue" code lang="vue" -->

```vue [DocsTanStackServerPagination.vue]
<template>
  <div class="w-full space-y-4">
    <div class="flex items-start justify-between">
      <UiInput
        v-model="searchQuery"
        type="search"
        placeholder="Search users..."
        class="w-full max-w-sm"
      />
      <UiBadge variant="outline" size="md"> {{ totalRows }} total users </UiBadge>
    </div>

    <div class="overflow-hidden rounded-lg border">
      <UiTanStackTable
        :data="data"
        :columns="columns"
        :loading="pending"
        :manual-pagination="true"
        :page-count="pageCount"
        :initial-page-size="pageSize"
        @update:pagination="onPaginationChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive";
  }

  interface ApiResponse {
    data: User[];
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  }

  const pageIndex = ref(0);
  const pageSize = ref(10);
  const searchQuery = ref("");
  const debouncedSearch = refDebounced(searchQuery, 500);

  // Simulate API call with delay
  const fetchUsers = async (page: number, size: number, search: string): Promise<ApiResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock data
    const allUsers: User[] = Array.from({ length: 95 }, (_, i) => ({
      id: faker.string.nanoid(5).toUpperCase(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: ["Admin", "Member", "Viewer"][i % 3] || "Viewer",
      department: ["Engineering", "Sales", "Marketing", "Support"][i % 4] || "Support",
      status: i % 5 === 0 ? "inactive" : "active",
    }));

    // Filter by search
    const filtered = search
      ? allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
      : allUsers;

    // Paginate
    const start = page * size;
    const end = start + size;
    const paginatedData = filtered.slice(start, end);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize: size,
      pageCount: Math.ceil(filtered.length / size),
    };
  };

  const { data: apiData, pending } = await useAsyncData(
    () => fetchUsers(pageIndex.value, pageSize.value, debouncedSearch.value),
    {
      watch: [pageIndex, pageSize, debouncedSearch],
      default: () => ({
        data: [],
        total: 0,
        page: 0,
        pageSize: 10,
        pageCount: 0,
      }),
    }
  );

  const data = computed(() => apiData.value.data);
  const totalRows = computed(() => apiData.value.total);
  const pageCount = computed(() => apiData.value.pageCount);

  const onPaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    pageIndex.value = pagination.pageIndex;
    pageSize.value = pagination.pageSize;
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }) => {
        const role = getValue() as string;
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
              role === "Admin"
                ? "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                : role === "Member"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  : "bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
            }`,
          },
          role
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              status === "active"
                ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`,
          },
          status.charAt(0).toUpperCase() + status.slice(1)
        );
      },
    },
  ];
</script>
```

<!-- /automd -->

::
