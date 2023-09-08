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
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
          </UITableHead>
        </UITableRow>
      </UITableHeader>
    </UITable>
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
        checked: table.getIsAllRowsSelected(),
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
