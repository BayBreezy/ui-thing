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
