---
title: Tanstack Table
description: A powerful datatable for your app built with TanStack Table.
label: Updated
links:
  - title: TanStack Table
    href: https://tanstack.com/table/latest/docs/guide/features
    icon: "lucide:table-2"
  - title: API Reference
    href: https://tanstack.com/table/latest/docs/reference/index
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="TanStackTable.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add tanstacktable"}

## Usage

### Regular

::prose-show-case

:DocsTanStackTable

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackTable.vue" code lang="vue" -->

```vue [DocsTanStackTable.vue]
<template>
  <div>
    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <UiInput
        v-if="tableRef"
        v-model="tableRef!.globalFilter"
        type="search"
        placeholder="Search"
        class="w-full md:w-96"
      />
      <div class="flex flex-col gap-x-3 gap-y-5 md:flex-row">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="outline">
              <span>Download</span>
              <Icon name="lucide:cloud-download" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent :side-offset="10" align="start">
            <UiDropdownMenuLabel> Export Data </UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem
              title="Export All"
              icon="lucide:file-spreadsheet"
              @select="exportCsv('all')"
            />
            <UiDropdownMenuItem
              title="Export Current Page"
              icon="lucide:file-spreadsheet"
              @select="exportCsv('page')"
            />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
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
                @update:model-value="column.toggleVisibility()"
              >
                <span class="text-sm capitalize">{{ column?.id }}</span>
              </UiDropdownMenuCheckboxItem>
            </UiDropdownMenuGroup>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>

    <div class="mt-5 overflow-hidden rounded-lg border">
      <UiTanStackTable
        ref="tableRef"
        :data="data"
        :loading="pending"
        :columns="columns"
        :initial-page-size="5"
        :page-size-options="[5, 10, 20, 50, 100]"
        @ready="table = $event"
      >
        <template #empty>
          <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
            <Icon name="lucide:database" class="text-muted-foreground h-12 w-12" />
            <span class="mt-2">No data available.</span>
          </div>
        </template>
        <template #actions-cell="{ row }">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm">
                <Icon name="lucide:ellipsis-vertical" class="size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent side="bottom" align="end">
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem
                  title="View Details"
                  icon="lucide:square-arrow-out-up-right"
                  @select="
                    selectedPayment = row.original;
                    showDetails = true;
                  "
                />
                <UiDropdownMenuItem
                  title="Refund Payment"
                  icon="lucide:banknote-arrow-down"
                  @select="
                    useSonner.info('Initiate Refund', {
                      description: `Would you like to refund payment ID: ${row.original.id}?`,
                      action: {
                        label: 'Refund Now',
                        onClick: () => {
                          useSonner.success('Refunded!', {
                            description: `Payment ID: ${row.original.id} has been refunded.`,
                          });
                        },
                      },
                    })
                  "
                />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  title="Delete Payment"
                  icon="lucide:trash"
                  variant="destructive"
                  @select="
                    useSonner.error('Initiate Deletion', {
                      description: `Are you sure you want to delete payment ID: ${row.original.id}?`,
                      action: {
                        label: 'Delete Now',
                        onClick: () => {
                          useSonner.success('Deleted!', {
                            description: `Payment ID: ${row.original.id} has been deleted.`,
                            richColors: true,
                          });
                        },
                      },
                    })
                  "
                />
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </template>
      </UiTanStackTable>
    </div>

    <UiSheet v-model:open="showDetails">
      <UiSheetContent class="w-full sm:w-[500px]" side="right">
        <UiSheetHeader>
          <UiSheetTitle>Payment Details</UiSheetTitle>
          <UiSheetDescription> View and manage payment information </UiSheetDescription>
        </UiSheetHeader>

        <div v-if="selectedPayment" class="space-y-6 p-6">
          <UiVeeInput label="Payment ID" disabled :model-value="selectedPayment.id" readonly />
          <UiVeeInput v-model="selectedPayment.email" label="Email" readonly type="email" />
          <UiVeeCurrencyInput label="Amount" :model-value="`${selectedPayment.amount}`" readonly />

          <div class="space-y-2">
            <label class="text-sm font-medium">Status</label>
            <div class="flex items-center gap-2">
              <UiBadge :variant="getStatusVariant(selectedPayment.status)" class="capitalize">
                {{ selectedPayment.status }}
              </UiBadge>
            </div>
          </div>
        </div>

        <UiSheetFooter>
          <UiButton variant="outline" @click="showDetails = false">Close</UiButton>
          <UiButton @click="showDetails = false">Done</UiButton>
        </UiSheetFooter>
      </UiSheetContent>
    </UiSheet>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, Table } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  import type { UiTanStackTable } from "#components";
  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  const tableRef = useTemplateRef("tableRef");
  const table = ref<Table<TanStackTableFeatures, Payment> | null>(null);
  const showDetails = ref(false);
  const selectedPayment = ref<Payment | null>(null);

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const { data, pending } = await useAsyncData<Payment[]>(
    async () => {
      // Simulate fetching data
      await promiseTimeout(1000);
      // create 100 fake payment records
      return Array.from({ length: 100 }, () => ({
        id: faker.string.alphanumeric(10),
        amount: faker.number.int({ min: 10, max: 1000 }),
        status: faker.helpers.arrayElement(["pending", "processing", "success", "failed"]) as
          | "pending"
          | "processing"
          | "success"
          | "failed",
        email: faker.internet.email().toLowerCase(),
      }));
    },
    { default: () => [] }
  );

  const columns: ColumnDef<TanStackTableFeatures, Payment>[] = [
    { accessorKey: "id", header: "ID", enableHiding: true },
    {
      accessorKey: "amount",
      header: "Amount",
      enableHiding: true,
      enableSorting: true,
      cell: ({ row }) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(row.original.amount);
      },
    },
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
    },
  ];

  function exportCsv(mode: "all" | "page") {
    if (!table.value) return;

    // Get rows based on mode
    const rows =
      mode === "all" ? table.value.getFilteredRowModel().rows : table.value.getRowModel().rows;

    if (!rows.length) {
      useSonner.info("No data to export", {
        description: "Please ensure there is data to export.",
      });
      return;
    }

    // Get visible columns, excluding actions
    const columns = table.value.getVisibleLeafColumns().filter((col) => col.id !== "actions");

    // Build header row
    const header = columns.map((col) => {
      const headerText = typeof col.columnDef.header === "string" ? col.columnDef.header : col.id;
      return escapeCsvValue(String(headerText));
    });

    // Build data rows
    const dataRows = rows.map((row) =>
      columns.map((col) => {
        const value = row.getValue(col.id);
        return escapeCsvValue(value);
      })
    );

    // Combine and create CSV
    const csv = [header, ...dataRows].map((r) => r.join(",")).join("\n");

    // Create blob and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `payments-${mode === "all" ? "all" : "page"}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    useSonner.success("Export successful", {
      description: `${rows.length} row(s) exported to CSV.`,
    });
  }

  function escapeCsvValue(value: any): string {
    if (value == null) return '""';
    const str = String(value);
    // Escape quotes and wrap in quotes if contains comma, quote, or newline
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return `"${str}"`;
  }

  function getStatusVariant(
    status: "pending" | "processing" | "success" | "failed"
  ): "default" | "secondary" | "destructive" | "outline" {
    switch (status) {
      case "success":
        return "default";
      case "processing":
        return "secondary";
      case "failed":
        return "destructive";
      case "pending":
        return "outline";
      default:
        return "default";
    }
  }
</script>
```

<!-- /automd -->

::

### Basic

::prose-show-case

:DocsTanStackBasic

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackBasic.vue" code lang="vue" -->

```vue [DocsTanStackBasic.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  //1. Import the stuff you want from TanStack
  import {
    columnVisibilityFeature,
    createColumnHelper,
    FlexRender,
    rowSelectionFeature,
    tableFeatures,
    useTable,
  } from "@tanstack/vue-table";
  // Import any type that you may need
  import type { RowSelectionState } from "@tanstack/vue-table";
  import type { CheckboxRootProps } from "reka-ui";

  //2. Import the components you want to use
  import { UiBadge, UiCheckbox } from "#components";

  // 1a. Register only the features this table actually uses.
  // `columnVisibilityFeature` is required even though this example doesn't
  // toggle columns: `row.getVisibleCells()` (used below) is implemented by
  // that feature, not by core.
  const features = tableFeatures({
    columnVisibilityFeature,
    rowSelectionFeature,
  });

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
  const columnHelper = createColumnHelper<typeof features, Item>();

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
          modelValue: table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false,
          "onUpdate:modelValue": (v: CheckboxRootProps["modelValue"]) =>
            table.getToggleAllRowsSelectedHandler()({ target: { checked: v } }),
        });
      },
      cell({ row }) {
        return h(UiCheckbox, {
          modelValue: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          "onUpdate:modelValue": (v: CheckboxRootProps["modelValue"]) =>
            row.getToggleSelectedHandler()({ target: { checked: v } }),
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
  const table = useTable({
    features,
    // @ts-expect-error - the types are correct
    data,
    columns,
    enableRowSelection: true,
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
            <FlexRender v-if="!header.isPlaceholder" :header="header" />
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
              <FlexRender :cell="cell" />
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
    <p class="text-muted-foreground mt-4 text-center text-sm">
      Basic data table made with
      <a
        class="hover:text-foreground underline"
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

::prose-show-case

:DocsTanStackFilters

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackFilters.vue" code lang="vue" -->

```vue [DocsTanStackFilters.vue]
<script lang="ts" setup>
  import {
    columnFacetingFeature,
    columnFilteringFeature,
    columnVisibilityFeature,
    createColumnHelper,
    createFacetedRowModel,
    createFacetedUniqueValues,
    createFilteredRowModel,
    createSortedRowModel,
    filterFn_arrIncludes,
    filterFn_inNumberRange,
    FlexRender,
    globalFilteringFeature,
    rowSelectionFeature,
    rowSortingFeature,
    sortFn_text,
    tableFeatures,
    useTable,
  } from "@tanstack/vue-table";
  import type {
    ColumnFiltersState,
    RowData,
    RowSelectionState,
    SortingState,
    TableFeatures,
  } from "@tanstack/vue-table";

  import { Icon, UiCheckbox } from "#components";

  // Register only the features this table actually uses.
  // `columnVisibilityFeature` is required even though this example doesn't
  // toggle columns: `row.getVisibleCells()` (used below) is implemented by
  // that feature, not by core.
  const features = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    columnFacetingFeature,
    columnVisibilityFeature,
    rowSelectionFeature,
    rowSortingFeature,
    filteredRowModel: createFilteredRowModel(),
    facetedRowModel: createFacetedRowModel(),
    facetedUniqueValues: createFacetedUniqueValues(),
    sortedRowModel: createSortedRowModel(),
    filterFns: { arrIncludes: filterFn_arrIncludes, inNumberRange: filterFn_inNumberRange },
    sortFns: { text: sortFn_text },
  });

  declare module "@tanstack/vue-table" {
    //allows us to define custom properties for our columns
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TFeatures extends TableFeatures, TData extends RowData, TValue> {
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

  const columnHelper = createColumnHelper<typeof features, Item>();

  const columns = [
    columnHelper.accessor("id", {
      enableSorting: false,
      enableGlobalFilter: false,
      header({ table }) {
        return h(UiCheckbox, {
          modelValue: table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? "indeterminate"
              : false,
          "onUpdate:modelValue": (v: boolean | "indeterminate") =>
            table.getToggleAllRowsSelectedHandler()({ target: { checked: v } }),
        });
      },
      cell({ row }) {
        return h(UiCheckbox, {
          modelValue: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          "onUpdate:modelValue": (v: boolean | "indeterminate") =>
            row.getToggleSelectedHandler()({ target: { checked: v } }),
        });
      },
    }),
    columnHelper.accessor("keyword", {
      header: "Keyword",
      sortFn: "text",
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
                  tw`flex size-5 items-center justify-center rounded text-xs font-medium` +
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
  const table = useTable({
    features,
    columns,
    data: items,
    enableRowSelection: true,
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
              <FlexRender v-if="!header.isPlaceholder" :header="header" />
              <Icon
                v-if="header.column.getIsSorted() == 'asc'"
                name="lucide:chevron-up"
                class="text-muted-foreground size-4 shrink-0"
              />
              <Icon
                v-else-if="header.column.getIsSorted() == 'desc'"
                name="lucide:chevron-down"
                class="text-muted-foreground size-4 shrink-0"
              />
              <Icon
                v-else-if="header.column.getCanSort()"
                name="lucide:chevrons-up-down"
                class="text-muted-foreground/30 size-4 shrink-0"
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
                      :model-value="
                        (header.column.getFilterValue() as string[] | undefined)?.[0] ?? 'All'
                      "
                      @update:model-value="
                        (e) => header.column.setFilterValue(e == 'All' ? undefined : [e])
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
              <FlexRender :cell="cell" />
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
    <p class="text-muted-foreground mt-4 text-center text-sm">
      Data table with filters made with
      <a
        class="hover:text-foreground underline"
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

::prose-show-case

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

::prose-show-case

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

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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

  const columns: ColumnDef<TanStackTableFeatures, Payment>[] = [
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

::prose-show-case

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
            <p class="text-muted-foreground text-sm">@{{ row.original.username }}</p>
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

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
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

::prose-show-case

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

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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

  const columns: ColumnDef<TanStackTableFeatures, Payment>[] = [
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
            (sum: number, row: Row<TanStackTableFeatures, Payment>) =>
              sum + row.getValue<number>("quantity"),
            0
          );
        return h("div", { class: "text-center font-semibold" }, total);
      },
    },
    {
      accessorKey: "amount",
      header: () => h("div", { class: "text-right justify-end w-full" }, "Amount"),
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
          .rows.reduce(
            (sum: number, row: Row<TanStackTableFeatures, Payment>) =>
              sum + row.getValue<number>("amount"),
            0
          );
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

::prose-show-case

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

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
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

::prose-show-case

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
        <div v-if="loading" class="text-primary flex items-center gap-2 px-4 py-2 text-sm">
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

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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

  const columns: ColumnDef<TanStackTableFeatures, Product>[] = [
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

::prose-show-case

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
        :manual-sorting="true"
        :manual-filtering="true"
        :page-count="pageCount"
        :initial-page-size="pageSize"
        @update:pagination="onPaginationChange"
        @update:sorting="onSortingChange"
        @update:column-filters="onColumnFiltersChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/vue-table";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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
  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const searchQuery = ref("");
  const debouncedSearch = refDebounced(searchQuery, 500);

  // Simulate API call with delay
  const fetchUsers = async (
    page: number,
    size: number,
    search: string,
    sortBy: SortingState,
    filters: ColumnFiltersState
  ): Promise<ApiResponse> => {
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
    let filtered = search
      ? allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
      : allUsers;

    // Apply column filters
    if (filters.length > 0) {
      filtered = filtered.filter((user) => {
        return filters.every((filter) => {
          const value = user[filter.id as keyof User];
          const filterValue = filter.value;

          if (typeof filterValue === "string") {
            return String(value).toLowerCase().includes(filterValue.toLowerCase());
          }

          return value === filterValue;
        });
      });
    }

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy.length > 0 && sortBy[0]) {
      const { id, desc } = sortBy[0];
      sorted.sort((a, b) => {
        const aValue = a[id as keyof User];
        const bValue = b[id as keyof User];

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
        return 0;
      });
    }

    // Paginate
    const start = page * size;
    const end = start + size;
    const paginatedData = sorted.slice(start, end);

    return {
      data: paginatedData,
      total: sorted.length,
      page,
      pageSize: size,
      pageCount: Math.ceil(sorted.length / size),
    };
  };

  const { data: apiData, pending } = await useAsyncData(
    () =>
      fetchUsers(
        pageIndex.value,
        pageSize.value,
        debouncedSearch.value,
        sorting.value,
        columnFilters.value
      ),
    {
      watch: [pageIndex, pageSize, debouncedSearch, sorting, columnFilters],
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

  const onSortingChange = (newSorting: SortingState) => {
    sorting.value = newSorting;
    // Reset to first page when sorting changes
    pageIndex.value = 0;
  };

  const onColumnFiltersChange = (newFilters: ColumnFiltersState) => {
    columnFilters.value = newFilters;
    // Reset to first page when filters change
    pageIndex.value = 0;
  };

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
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
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
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

### Expansion

Expandable rows to display additional details using the expansion feature.

::prose-show-case

:DocsTanStackExpansion

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackExpansion.vue" code lang="vue" -->

```vue [DocsTanStackExpansion.vue]
<template>
  <div>
    <div class="overflow-hidden rounded-lg border">
      <UiTanStackTable ref="tableRef" :data="data" :columns="columns" :loading="pending">
        <!-- No #expand-cell slot needed: the expand button is rendered automatically. -->
        <template #expanded-row="{ row }">
          <UiDescriptionList class="p-5 sm:grid-cols-[140px_auto]">
            <UiDescriptionListTerm>User ID</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.id }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Email</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.email }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Role</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.role }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Department</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.department }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Status</UiDescriptionListTerm>
            <UiDescriptionListDetails>
              <UiBadge
                :variant="row.original.status === 'active' ? 'default' : 'destructive'"
                class="capitalize"
              >
                {{ row.original.status }}
              </UiBadge>
            </UiDescriptionListDetails>
            <UiDescriptionListTerm>Join Date</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.joinDate }}</UiDescriptionListDetails>
            <UiDescriptionListTerm v-if="row.original.bio">Bio</UiDescriptionListTerm>
            <UiDescriptionListDetails v-if="row.original.bio" class="whitespace-break-spaces">
              {{ row.original.bio }}
            </UiDescriptionListDetails>
          </UiDescriptionList>
        </template>
      </UiTanStackTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive";
    joinDate: string;
    bio: string;
  }

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      // Simulate fetching data
      await promiseTimeout(1000);
      // create 20 fake user records
      return Array.from({ length: 20 }, () => ({
        id: faker.string.nanoid(8).toUpperCase(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
        department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
        status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
        joinDate: faker.date.past().toLocaleDateString(),
        bio: faker.lorem.paragraph(),
      }));
    },
    { default: () => [] }
  );

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
    {
      id: "expand",
      header: () => null,
      cell: () => null,
      enableHiding: false,
      enableSorting: false,
      size: 50,
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

### Row Pinning

Pin rows to the top or bottom. The table emits `update:rowPinning` and `row-pin` so parents can sync state.

::prose-show-case

:DocsTanStackPinning

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackPinning.vue" code lang="vue" -->

```vue [DocsTanStackPinning.vue]
<template>
  <div class="space-y-4">
    <div class="text-muted-foreground flex items-center gap-2 text-sm">
      <Icon name="lucide:info" class="size-4" />
      Use the pin menu to choose top, bottom, or unpin.
    </div>

    <div class="overflow-x-hidden rounded-lg border">
      <UiTanStackTable :data="data" :columns="columns" :loading="pending" @row-pin="onRowPin">
        <template #pin-header>
          <span class="sr-only">Pin</span>
        </template>
      </UiTanStackTable>
    </div>

    <div v-if="pinnedTop.length || pinnedBottom.length" class="bg-muted/50 rounded-lg border p-4">
      <div class="font-semibold">Pinned rows</div>
      <div class="text-muted-foreground mt-2 space-y-1 text-sm">
        <div v-if="pinnedTop.length">Top: {{ pinnedTop.map((r) => r.name).join(", ") }}</div>
        <div v-if="pinnedBottom.length">
          Bottom: {{ pinnedBottom.map((r) => r.name).join(", ") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, RowPinningState } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  const rowPinning = ref<RowPinningState>({ top: [], bottom: [] });

  interface User {
    id: string;
    name: string;
    email: string;
    status: "active" | "inactive";
    department: string;
  }

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      await promiseTimeout(800);
      return Array.from({ length: 12 }, () => ({
        id: faker.string.nanoid(6).toUpperCase(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
        department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
      }));
    },
    { default: () => [] }
  );

  const onRowPin = ({ row, pin }: { row: any; pin: "top" | "bottom" | false }) => {
    rowPinning.value = rowPinning.value || {};
    if (pin === false) {
      if (rowPinning.value.top) {
        rowPinning.value.top = rowPinning.value.top.filter((id) => id !== row.id);
      }
      if (rowPinning.value.bottom) {
        rowPinning.value.bottom = rowPinning.value.bottom.filter((id) => id !== row.id);
      }
    } else {
      const section = pin === "top" ? "top" : "bottom";
      const other = pin === "top" ? "bottom" : "top";
      rowPinning.value[section] = [
        ...(rowPinning.value[section] || []).filter((id) => id !== row.id),
        row.id,
      ];
      rowPinning.value[other] = (rowPinning.value[other] || []).filter((id) => id !== row.id);
    }
  };

  const pinnedTop = computed(() => {
    const ids = rowPinning.value.top || [];
    return data.value.filter((user) => ids.includes(user.id));
  });

  const pinnedBottom = computed(() => {
    const ids = rowPinning.value.bottom || [];
    return data.value.filter((user) => ids.includes(user.id));
  });

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
    {
      id: "pin",
      header: () => null,
      cell: () => null,
      enableSorting: false,
      enableHiding: false,
      size: 50,
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

### Column Pinning

Opt-in header pin buttons let you pin columns left or right. Pinned columns are sticky to the table edges; override `--ui-table-pinned-bg` in CSS if you need a different background. Use `enable-column-pinning` and `show-column-pin-buttons` to render the controls, and listen to `update:columnPinning` / `column-pin` if you need to sync state.

::prose-show-case

:DocsTanStackColumnPinning

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackColumnPinning.vue" code lang="vue" -->

```vue [DocsTanStackColumnPinning.vue]
<template>
  <div class="space-y-4">
    <div class="text-muted-foreground flex items-center gap-2 text-sm">
      <Icon name="lucide:info" class="size-4" />
      Pin columns with the header menu: choose start, end, or unpin.
    </div>

    <div class="overflow-hidden rounded-lg border">
      <UiTanStackTable
        :data="data"
        :columns="columns"
        :loading="pending"
        :enable-column-pinning="true"
        :show-column-pin-buttons="true"
        @ready="onReady"
        @update:column-pinning="columnPinning = $event"
      />
    </div>

    <div class="bg-muted/50 text-muted-foreground rounded-lg border p-4 text-sm">
      <div class="text-foreground font-semibold">Pinned columns</div>
      <div class="mt-2 space-y-1">
        <div v-if="columnPinning.start?.length">Start: {{ columnPinning.start.join(", ") }}</div>
        <div v-if="columnPinning.end?.length">End: {{ columnPinning.end.join(", ") }}</div>
        <div v-if="!columnPinning.start?.length && !columnPinning.end?.length">None</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, ColumnPinningState, Table } from "@tanstack/vue-table";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    department: string;
    status: "active" | "inactive";
  }

  const columnPinning = ref<ColumnPinningState>({ start: [], end: [] });

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      return Array.from({ length: 8 }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return {
          id: faker.string.nanoid(6).toUpperCase(),
          firstName,
          lastName,
          phone: faker.phone.number({ style: "national" }),
          address: faker.location.streetAddress({ useFullAddress: true }),
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
          status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
        };
      });
    },
    { default: () => [] }
  );

  const onReady = (table: Table<TanStackTableFeatures, User>) => {
    // Set an initial pin for demonstration
    table.getColumn("firstName")?.pin("start");
    columnPinning.value = table.atoms.columnPinning.get();
  };

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enablePinning: false,
      meta: { class: { th: "whitespace-nowrap" } },
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 220,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
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
        const classes =
          status === "active"
            ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
            : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${classes}`,
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

### Context Menu

::prose-show-case

:DocsTanStackContextMenu

#code

<!-- automd:file src="../../app/components/content/Docs/TanStackTable/DocsTanStackContextMenu.vue" code lang="vue" -->

```vue [DocsTanStackContextMenu.vue]
<template>
  <div>
    <UiContextMenu>
      <UiContextMenuTrigger as-child>
        <div class="overflow-hidden rounded-lg border">
          <UiTanStackTable
            ref="tableRef"
            :data="data"
            :columns="columns"
            :loading="pending"
            @row-contextmenu="handleRowContextMenu"
          />
        </div>
      </UiContextMenuTrigger>
      <UiContextMenuContent class="w-64">
        <UiContextMenuLabel v-if="selectedUser">
          {{ selectedUser.name }}
        </UiContextMenuLabel>
        <UiContextMenuSeparator />
        <UiContextMenuGroup>
          <UiContextMenuItem
            icon="lucide:mail"
            @select="
              useSonner('Email Sent', {
                description: `Sending email to ${selectedUser?.email}`,
              })
            "
          >
            Send Email
          </UiContextMenuItem>
          <UiContextMenuItem
            icon="lucide:user"
            @select="
              useSonner('View Profile', {
                description: `Opening profile for ${selectedUser?.name}`,
              })
            "
          >
            View Profile
          </UiContextMenuItem>
          <UiContextMenuItem
            icon="lucide:pencil"
            @select="
              useSonner('Edit User', {
                description: `Editing ${selectedUser?.name}`,
              })
            "
          >
            Edit User
          </UiContextMenuItem>
        </UiContextMenuGroup>
        <UiContextMenuSeparator />
        <UiContextMenuGroup>
          <UiContextMenuItem
            v-if="selectedUser?.status === 'active'"
            icon="lucide:ban"
            @select="
              useSonner.warning('Deactivate User', {
                description: `Are you sure you want to deactivate ${selectedUser?.name}?`,
                action: {
                  label: 'Deactivate',
                  onClick: () => {
                    useSonner.success('User Deactivated', {
                      description: `${selectedUser?.name} has been deactivated.`,
                    });
                  },
                },
              })
            "
          >
            Deactivate
          </UiContextMenuItem>
          <UiContextMenuItem
            v-else
            icon="lucide:check-circle"
            @select="
              useSonner.success('User Activated', {
                description: `${selectedUser?.name} has been activated.`,
              })
            "
          >
            Activate
          </UiContextMenuItem>
        </UiContextMenuGroup>
        <UiContextMenuSeparator />
        <UiContextMenuItem
          icon="lucide:trash"
          variant="destructive"
          @select="
            useSonner.error('Delete User', {
              description: `Are you sure you want to delete ${selectedUser?.name}?`,
              action: {
                label: 'Delete',
                onClick: () => {
                  useSonner.success('User Deleted', {
                    description: `${selectedUser?.name} has been removed.`,
                  });
                },
              },
            })
          "
        >
          Delete User
        </UiContextMenuItem>
      </UiContextMenuContent>
    </UiContextMenu>

    <div v-if="selectedUser" class="bg-muted/50 mt-4 rounded-lg border p-4">
      <p class="text-muted-foreground text-sm">
        <span class="font-semibold">Last Selected:</span> {{ selectedUser.name }} ({{
          selectedUser.email
        }})
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  const selectedUser = ref<User | null>(null);

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive";
  }

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      // Simulate fetching data
      await promiseTimeout(1000);
      // create 15 fake user records
      return Array.from({ length: 15 }, () => ({
        id: faker.string.nanoid(8).toUpperCase(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
        department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
        status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
      }));
    },
    { default: () => [] }
  );

  const handleRowContextMenu = ({ row }: { event: MouseEvent; row: { original: User } }) => {
    selectedUser.value = row.original;
  };

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
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
