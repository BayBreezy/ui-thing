<template>
  <DataTable
    ref="table"
    :columns="columns"
    :ajax="ajax"
    :data="data"
    :class="props.class"
    :options="options"
  >
    <template v-for="(_, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope" />
    </template>
  </DataTable>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
  import type DataTableRef from "datatables.net";
  import type { Config } from "datatables.net";

  export type DataTablesNamedSlotProps<T> = {
    /** The data to show in the cell (from the `columns.data` configuration) */
    cellData: keyof T | null;
    /** The column index for the cell (0-based index) */
    colIndex: number;
    /** The data object for the whole row */
    rowData: T | Record<string, any>;
    /** Row index for the cell (data index, not the display index) */
    rowIndex: number;
    /** Orthogonal data type */
    type: string;
  };

  const table = shallowRef<{ dt: InstanceType<typeof DataTableRef<T[]>> } | null>(null);

  const props = withDefaults(
    defineProps<{
      data?: Config["data"];
      class?: any;
      columns?: Config["columns"];
      ajax?: Config["ajax"];
      options?: Config;
    }>(),
    {
      data: () => [],
      class: "nowrap hover order-column row-border stripe display",
      options: () => ({}),
    }
  );

  const emits = defineEmits<{
    ready: [any];
  }>();

  onMounted(() => {
    nextTick(() => {
      emits("ready", table.value?.dt);
    });
  });
</script>

<style>
  :root {
    --dt-row-selected: 262.1, 83.3%, 57.8%;
    --dt-row-selected-text: 210, 20%, 98%;
    --dt-row-selected-link: 262.1, 83.3%, 57.8%;
    --dt-row-stripe: 0, 0%, 100%;
    --dt-row-hover: 0, 0%, 100%;
    --dt-column-ordering: 0, 0%, 100%;
    --dt-border: 220, 13%, 91%;
    --dt-foreground: 224, 71.4%, 4.1%;
  }

  .dark {
    --dt-row-selected: 263.4, 70%, 50.4%;
    --dt-row-selected-text: 210, 20%, 98%;
    --dt-row-selected-link: 263.4, 70%, 50.4%;
    --dt-row-stripe: 224, 71.4%, 4.1%;
    --dt-row-hover: 224, 71.4%, 4.1%;
    --dt-column-ordering: 224, 71.4%, 4.1%;
    --dt-border: 215, 27.9%, 16.9%;
    --dt-foreground: 224, 71.4%, 4.1%;
  }

  table.dataTable td.dt-control {
    text-align: center;
    cursor: pointer;
  }
  table.dataTable td.dt-control:before {
    display: inline-block;
    color: hsla(var(--dt-foreground), 0.5);
    content: "►";
  }
  table.dataTable tr.dt-hasChild td.dt-control:before {
    content: "▼";
  }

  table.dataTable thead > tr > th.sorting,
  table.dataTable thead > tr > th.sorting_asc,
  table.dataTable thead > tr > th.sorting_desc,
  table.dataTable thead > tr > th.sorting_asc_disabled,
  table.dataTable thead > tr > th.sorting_desc_disabled,
  table.dataTable thead > tr > td.sorting,
  table.dataTable thead > tr > td.sorting_asc,
  table.dataTable thead > tr > td.sorting_desc,
  table.dataTable thead > tr > td.sorting_asc_disabled,
  table.dataTable thead > tr > td.sorting_desc_disabled,
  /* V2 */
  table.dataTable thead > tr > th.dt-orderable-asc,
  table.dataTable thead > tr > th.dt-orderable-desc,
  table.dataTable thead > tr > td.dt-orderable-asc,
  table.dataTable thead > tr > td.dt-orderable-desc {
    @apply relative cursor-pointer pr-7;
  }
  table.dataTable thead > tr > th.sorting:before,
  table.dataTable thead > tr > th.sorting:after,
  table.dataTable thead > tr > th.sorting_asc:before,
  table.dataTable thead > tr > th.sorting_asc:after,
  table.dataTable thead > tr > th.sorting_desc:before,
  table.dataTable thead > tr > th.sorting_desc:after,
  table.dataTable thead > tr > th.sorting_asc_disabled:before,
  table.dataTable thead > tr > th.sorting_asc_disabled:after,
  table.dataTable thead > tr > th.sorting_desc_disabled:before,
  table.dataTable thead > tr > th.sorting_desc_disabled:after,
  table.dataTable thead > tr > td.sorting:before,
  table.dataTable thead > tr > td.sorting:after,
  table.dataTable thead > tr > td.sorting_asc:before,
  table.dataTable thead > tr > td.sorting_asc:after,
  table.dataTable thead > tr > td.sorting_desc:before,
  table.dataTable thead > tr > td.sorting_desc:after,
  table.dataTable thead > tr > td.sorting_asc_disabled:before,
  table.dataTable thead > tr > td.sorting_asc_disabled:after,
  table.dataTable thead > tr > td.sorting_desc_disabled:before,
  table.dataTable thead > tr > td.sorting_desc_disabled:after,
  /* V2 */
  table.dataTable thead > tr > th.dt-orderable-asc:before,
  table.dataTable thead > tr > th.dt-orderable-asc:after,
  table.dataTable thead > tr > th.dt-orderable-desc:before,
  table.dataTable thead > tr > th.dt-orderable-desc:after,
  table.dataTable thead > tr > td.dt-orderable-asc:before,
  table.dataTable thead > tr > td.dt-orderable-asc:after,
  table.dataTable thead > tr > td.dt-orderable-desc:before,
  table.dataTable thead > tr > td.dt-orderable-desc:after {
    @apply absolute right-2.5 block text-xs leading-3 opacity-25;
  }
  table.dataTable thead > tr > th.sorting:before,
  table.dataTable thead > tr > th.sorting_asc:before,
  table.dataTable thead > tr > th.sorting_desc:before,
  table.dataTable thead > tr > th.sorting_asc_disabled:before,
  table.dataTable thead > tr > th.sorting_desc_disabled:before,
  table.dataTable thead > tr > td.sorting:before,
  table.dataTable thead > tr > td.sorting_asc:before,
  table.dataTable thead > tr > td.sorting_desc:before,
  table.dataTable thead > tr > td.sorting_asc_disabled:before,
  table.dataTable thead > tr > td.sorting_desc_disabled:before,
  /* V2 */
  table.dataTable thead > tr > th.dt-orderable-asc:before,
  table.dataTable thead > tr > th.dt-orderable-desc:before,
  table.dataTable thead > tr > td.dt-orderable-asc:before,
  table.dataTable thead > tr > td.dt-orderable-desc:before {
    @apply bottom-[43%] h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-up.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-up.svg?color=white')];
  }
  table.dataTable thead > tr > th.sorting:after,
  table.dataTable thead > tr > th.sorting_asc:after,
  table.dataTable thead > tr > th.sorting_desc:after,
  table.dataTable thead > tr > th.sorting_asc_disabled:after,
  table.dataTable thead > tr > th.sorting_desc_disabled:after,
  table.dataTable thead > tr > td.sorting:after,
  table.dataTable thead > tr > td.sorting_asc:after,
  table.dataTable thead > tr > td.sorting_desc:after,
  table.dataTable thead > tr > td.sorting_asc_disabled:after,
  table.dataTable thead > tr > td.sorting_desc_disabled:after,
  /* V2 */
  table.dataTable thead > tr > th.dt-orderable-asc:after,
  table.dataTable thead > tr > th.dt-orderable-desc:after,
  table.dataTable thead > tr > td.dt-orderable-asc:after,
  table.dataTable thead > tr > td.dt-orderable-desc:after {
    @apply top-[43%] h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-down.svg?color=white')];
  }
  table.dataTable thead > tr > th.sorting_asc:before,
  table.dataTable thead > tr > th.sorting_desc:after,
  table.dataTable thead > tr > td.sorting_asc:before,
  table.dataTable thead > tr > td.sorting_desc:after,
  /* V2 */
  table.dataTable thead > tr > th.dt-ordering-asc:before,
  table.dataTable thead > tr > th.dt-ordering-desc:after {
    @apply opacity-80;
  }
  table.dataTable thead > tr > th.sorting_desc_disabled:after,
  table.dataTable thead > tr > th.sorting_asc_disabled:before,
  table.dataTable thead > tr > td.sorting_desc_disabled:after,
  table.dataTable thead > tr > td.sorting_asc_disabled:before {
    @apply hidden;
  }
  table.dataTable thead > tr > th:active,
  table.dataTable thead > tr > td:active {
    @apply outline-none;
  }

  div.dataTables_scrollBody > table.dataTable > thead > tr > th:before,
  div.dataTables_scrollBody > table.dataTable > thead > tr > th:after,
  div.dataTables_scrollBody > table.dataTable > thead > tr > td:before,
  div.dataTables_scrollBody > table.dataTable > thead > tr > td:after {
    @apply hidden;
  }

  div.dataTables_processing {
    @apply absolute left-[50%] top-[50%] ml-[-100px] mt-[-26px] w-[200px] p-0.5 text-center;
  }
  div.dataTables_processing > div:last-child {
    @apply relative mx-auto my-4 h-4 w-20;
  }
  div.dataTables_processing > div:last-child > div {
    @apply absolute top-0 h-3.5 w-3.5 rounded-full;
    background: hsl(var(--dt-row-selected));
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div.dataTables_processing > div:last-child > div:nth-child(1) {
    left: 8px;
    animation: datatables-loader-1 0.6s infinite;
  }
  div.dataTables_processing > div:last-child > div:nth-child(2) {
    left: 8px;
    animation: datatables-loader-2 0.6s infinite;
  }
  div.dataTables_processing > div:last-child > div:nth-child(3) {
    left: 32px;
    animation: datatables-loader-2 0.6s infinite;
  }
  div.dataTables_processing > div:last-child > div:nth-child(4) {
    left: 56px;
    animation: datatables-loader-3 0.6s infinite;
  }

  @keyframes datatables-loader-1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes datatables-loader-3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes datatables-loader-2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
  table.dataTable.nowrap th,
  table.dataTable.nowrap td {
    white-space: nowrap;
  }
  table.dataTable th.dt-left,
  table.dataTable td.dt-left {
    text-align: left;
  }
  table.dataTable th.dt-center,
  table.dataTable td.dt-center,
  table.dataTable td.dataTables_empty {
    text-align: center;
  }
  table.dataTable th.dt-right,
  table.dataTable td.dt-right {
    text-align: right;
  }
  table.dataTable th.dt-justify,
  table.dataTable td.dt-justify {
    text-align: justify;
  }
  table.dataTable th.dt-nowrap,
  table.dataTable td.dt-nowrap {
    white-space: nowrap;
  }
  table.dataTable thead th,
  table.dataTable thead td,
  table.dataTable tfoot th,
  table.dataTable tfoot td {
    text-align: left;
  }
  table.dataTable thead th.dt-head-left,
  table.dataTable thead td.dt-head-left,
  table.dataTable tfoot th.dt-head-left,
  table.dataTable tfoot td.dt-head-left {
    text-align: left;
  }
  table.dataTable thead th.dt-head-center,
  table.dataTable thead td.dt-head-center,
  table.dataTable tfoot th.dt-head-center,
  table.dataTable tfoot td.dt-head-center {
    text-align: center;
  }
  table.dataTable thead th.dt-head-right,
  table.dataTable thead td.dt-head-right,
  table.dataTable tfoot th.dt-head-right,
  table.dataTable tfoot td.dt-head-right {
    text-align: right;
  }
  table.dataTable thead th.dt-head-justify,
  table.dataTable thead td.dt-head-justify,
  table.dataTable tfoot th.dt-head-justify,
  table.dataTable tfoot td.dt-head-justify {
    text-align: justify;
  }
  table.dataTable thead th.dt-head-nowrap,
  table.dataTable thead td.dt-head-nowrap,
  table.dataTable tfoot th.dt-head-nowrap,
  table.dataTable tfoot td.dt-head-nowrap {
    white-space: nowrap;
  }
  table.dataTable tbody th.dt-body-left,
  table.dataTable tbody td.dt-body-left {
    text-align: left;
  }
  table.dataTable tbody th.dt-body-center,
  table.dataTable tbody td.dt-body-center {
    text-align: center;
  }
  table.dataTable tbody th.dt-body-right,
  table.dataTable tbody td.dt-body-right {
    text-align: right;
  }
  table.dataTable tbody th.dt-body-justify,
  table.dataTable tbody td.dt-body-justify {
    text-align: justify;
  }
  table.dataTable tbody th.dt-body-nowrap,
  table.dataTable tbody td.dt-body-nowrap {
    white-space: nowrap;
  }

  /* Table Styles */

  table.dataTable {
    @apply w-full table-auto border-collapse;
  }

  /* Table header styles */
  table.dataTable thead th,
  table.dataTable tfoot th {
    @apply text-left text-sm font-medium text-muted-foreground;
  }

  table.dataTable > thead > tr > th {
    @apply border-b border-t-0 px-6 py-3;
  }
  table.dataTable > thead > tr > td {
    @apply border-b px-6 py-3 text-sm;
  }
  table.dataTable > thead > tr > th:active,
  table.dataTable > thead > tr > td:active {
    @apply outline-none;
  }
  table.dataTable > tfoot > tr > th,
  table.dataTable > tfoot > tr > td {
    @apply border-t px-6 py-3;
  }
  table.dataTable tbody tr {
    @apply bg-transparent;
  }
  table.dataTable tbody tr.selected > * {
    @apply bg-primary/10;
  }
  table.dataTable tbody tr.selected a {
    @apply text-primary;
  }
  table.dataTable tbody th,
  table.dataTable tbody td {
    @apply px-6 py-3 text-sm;
  }
  table.dataTable.row-border > tbody > tr > th,
  table.dataTable.row-border > tbody > tr > td,
  table.dataTable.display > tbody > tr > th,
  table.dataTable.display > tbody > tr > td {
    @apply border-t;
  }
  table.dataTable.row-border > tbody > tr:first-child > th,
  table.dataTable.row-border > tbody > tr:first-child > td,
  table.dataTable.display > tbody > tr:first-child > th,
  table.dataTable.display > tbody > tr:first-child > td {
    @apply border-t-0;
  }
  table.dataTable.row-border > tbody > tr.selected + tr.selected > td,
  table.dataTable.display > tbody > tr.selected + tr.selected > td {
    @apply border-t-primary/30;
  }
  table.dataTable.cell-border > tbody > tr > th,
  table.dataTable.cell-border > tbody > tr > td {
    @apply border-r border-t;
  }
  table.dataTable.cell-border > tbody > tr > th:first-child,
  table.dataTable.cell-border > tbody > tr > td:first-child {
    @apply border-l;
  }
  table.dataTable.cell-border > tbody > tr:first-child > th,
  table.dataTable.cell-border > tbody > tr:first-child > td {
    @apply border-t-0;
  }
  table.dataTable.stripe > tbody > tr.odd > *,
  table.dataTable.display > tbody > tr.odd > * {
    @apply bg-muted/50;
  }
  table.dataTable.stripe > tbody > tr.odd.selected > *,
  table.dataTable.display > tbody > tr.odd.selected > * {
    @apply bg-primary/10;
  }
  table.dataTable.hover > tbody > tr:hover > *,
  table.dataTable.display > tbody > tr:hover > * {
    @apply bg-muted;
  }
  table.dataTable.hover > tbody > tr.selected:hover > *,
  table.dataTable.display > tbody > tr.selected:hover > * {
    @apply !bg-primary/10;
  }
  table.dataTable.order-column > tbody tr > .sorting_1,
  table.dataTable.order-column > tbody tr > .sorting_2,
  table.dataTable.order-column > tbody tr > .sorting_3,
  table.dataTable.display > tbody tr > .sorting_1,
  table.dataTable.display > tbody tr > .sorting_2,
  table.dataTable.display > tbody tr > .sorting_3 {
    @apply bg-muted;
  }
  table.dataTable.order-column > tbody tr.selected > .sorting_1,
  table.dataTable.order-column > tbody tr.selected > .sorting_2,
  table.dataTable.order-column > tbody tr.selected > .sorting_3,
  table.dataTable.display > tbody tr.selected > .sorting_1,
  table.dataTable.display > tbody tr.selected > .sorting_2,
  table.dataTable.display > tbody tr.selected > .sorting_3 {
    @apply !bg-primary/10;
  }
  table.dataTable.display > tbody > tr.odd > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_1 {
    @apply bg-muted/50;
  }
  table.dataTable.display > tbody > tr.odd > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_2 {
    @apply bg-muted/30;
  }
  table.dataTable.display > tbody > tr.odd > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_3 {
    @apply bg-muted/10;
  }
  table.dataTable.display > tbody > tr.odd.selected > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_1 {
    @apply bg-muted/50;
  }
  table.dataTable.display > tbody > tr.odd.selected > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_2 {
    @apply bg-muted/30;
  }
  table.dataTable.display > tbody > tr.odd.selected > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_3 {
    @apply bg-muted/10;
  }
  table.dataTable.display > tbody > tr.even > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_1 {
    @apply bg-muted/50;
  }
  table.dataTable.display > tbody > tr.even > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_2 {
    @apply bg-muted/30;
  }
  table.dataTable.display > tbody > tr.even > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_3 {
    @apply bg-muted/10;
  }
  table.dataTable.display > tbody > tr.even.selected > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_1 {
    @apply bg-primary/10;
  }
  table.dataTable.display > tbody > tr.even.selected > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_2 {
    @apply bg-primary/10;
  }
  table.dataTable.display > tbody > tr.even.selected > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_3 {
    @apply bg-primary/10;
  }
  table.dataTable.display tbody tr:hover > .sorting_1,
  table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {
    @apply bg-muted;
  }
  table.dataTable.display tbody tr:hover > .sorting_2,
  table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {
    @apply bg-muted;
  }
  table.dataTable.display tbody tr:hover > .sorting_3,
  table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {
    @apply bg-muted;
  }
  table.dataTable.display tbody tr:hover.selected > .sorting_1,
  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
    @apply bg-primary/10;
  }
  table.dataTable.display tbody tr:hover.selected > .sorting_2,
  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
    @apply bg-primary/10;
  }
  table.dataTable.display tbody tr:hover.selected > .sorting_3,
  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
    @apply bg-primary/10;
  }
  table.dataTable.no-footer {
    @apply border-b-0;
  }
  table.dataTable.compact thead th,
  table.dataTable.compact thead td,
  table.dataTable.compact tfoot th,
  table.dataTable.compact tfoot td,
  table.dataTable.compact tbody th,
  table.dataTable.compact tbody td {
    @apply px-4 py-2;
  }

  table.dataTable th,
  table.dataTable td {
    @apply box-content border-y;
  }

  table.dataTable tr:last-child td {
    @apply !border-b-0;
  }

  /* Control feature layout */
  .dataTables_wrapper {
    @apply w-full overflow-x-auto;
  }

  /* Export button styles - v1 of datatables */
  .dataTables_wrapper .dt-buttons {
    @apply inline-flex flex-wrap items-center gap-2;
    button {
      @apply inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-background px-3 text-sm text-muted-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
    }
  }
  /* V2 of datatables button styles. 
  */
  .dt-buttons {
    @apply inline-flex flex-wrap items-center gap-2;
    button {
      @apply inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-md border bg-background px-3 text-sm text-muted-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
    }
  }

  /*  Copy modal */
  .dt-button-info {
    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur;
  }

  /* Select box at bottom showing number of records being displayed - v1 of datatables */
  .dataTables_wrapper .dataTables_length {
    label {
      @apply inline-flex items-center gap-2 text-sm font-normal text-muted-foreground;
      select {
        @apply h-9 w-[70px] cursor-pointer rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm;
      }
    }
  }
  /* Select box at the bottom showing how many items are being display - v2 */
  .dt-length {
    @apply inline-flex items-center gap-2;
    label {
      @apply text-sm font-normal text-muted-foreground;
    }
    select {
      @apply h-9 w-[70px] cursor-pointer rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus-visible:border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm;
    }
  }

  /* Search box at the top styles - v1 of datatables */
  .dataTables_wrapper .dataTables_filter {
    label {
      @apply inline-flex w-full cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground;
      input {
        @apply h-9 w-full rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input sm:text-sm;
      }
    }
  }

  /* Search box at the top styles -v2 */
  .dt-search {
    @apply flex items-center gap-3;
    label {
      @apply inline-flex cursor-pointer items-center gap-2 text-sm font-normal text-muted-foreground;
    }
    input {
      @apply h-9 w-full rounded-md border border-border bg-background px-2 py-1 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input sm:text-sm md:w-[50%] lg:w-[250px];
    }
  }

  /* Info text that shows `Showing X to XX of XXXX entries - v1  */
  .dataTables_wrapper .dataTables_info,
  .dt-info {
    @apply flex items-center gap-3 text-sm !text-muted-foreground;
  }

  /* Pagination button styles - v1 datatables */
  .dataTables_wrapper .dataTables_paginate {
    .paginate_button {
      @apply ml-1 box-border inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded bg-transparent px-3 py-2 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
    }
  }
  /* Pagination button - v2 */
  .dt-paging-button {
    @apply ml-1 box-border inline-flex h-9 min-w-[36px] cursor-pointer items-center justify-center rounded bg-transparent px-3 py-2 text-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
    &.current,
    &:hover {
      @apply bg-muted;
    }
    &.disabled,
    &.disabled:hover,
    &.disabled:active {
      @apply pointer-events-none opacity-50;
    }
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button.current,
  .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
    @apply bg-muted;
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled,
  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,
  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
    @apply pointer-events-none opacity-50;
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
    @apply bg-muted;
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button:active {
    @apply bg-muted;
  }
  .dataTables_wrapper .dataTables_paginate .ellipsis,
  .dt-paging .ellipsis {
    @apply inline-flex h-8 min-w-[32px] items-start justify-center text-sm;
  }
  .dataTables_wrapper .dataTables_scroll {
    clear: both;
  }
  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody {
    -webkit-overflow-scrolling: touch;
  }
  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > th,
  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > thead > tr > td,
  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > th,
  .dataTables_wrapper .dataTables_scroll div.dataTables_scrollBody > table > tbody > tr > td {
    vertical-align: middle;
  }
  .dataTables_wrapper
    .dataTables_scroll
    div.dataTables_scrollBody
    > table
    > thead
    > tr
    > th
    > div.dataTables_sizing,
  .dataTables_wrapper
    .dataTables_scroll
    div.dataTables_scrollBody
    > table
    > thead
    > tr
    > td
    > div.dataTables_sizing,
  .dataTables_wrapper
    .dataTables_scroll
    div.dataTables_scrollBody
    > table
    > tbody
    > tr
    > th
    > div.dataTables_sizing,
  .dataTables_wrapper
    .dataTables_scroll
    div.dataTables_scrollBody
    > table
    > tbody
    > tr
    > td
    > div.dataTables_sizing {
    height: 0;
    overflow: hidden;
    margin: 0 !important;
    padding: 0 !important;
  }
  .dataTables_wrapper.no-footer .dataTables_scrollBody {
    @apply border-b;
  }
  .dataTables_wrapper.no-footer div.dataTables_scrollHead table.dataTable,
  .dataTables_wrapper.no-footer div.dataTables_scrollBody > table {
    border-bottom: none;
  }
  .dataTables_wrapper:after {
    visibility: hidden;
    display: block;
    content: "";
    clear: both;
    height: 0;
  }

  /* 
  responsive styles
   */
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child,
  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child,
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty {
    cursor: default !important;
  }
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.child:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr > th.child:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dataTables_empty:before {
    display: none !important;
  }
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control,
  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control {
    cursor: pointer;
  }

  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control:before {
    @apply mr-2 inline-flex h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-right.svg')] bg-contain bg-center bg-no-repeat pb-[3px] content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-right.svg?color=white')];
  }
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control.arrow-right::before,
  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control.arrow-right::before {
    content: "◄";
  }
  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > td.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > th.dtr-control:before {
    @apply mr-2 inline-block h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-down.svg?color=white')];
  }
  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > td.dtr-control,
  table.dataTable.dtr-inline.collapsed.compact > tbody > tr > th.dtr-control {
    padding-left: 0.333em;
  }
  table.dataTable.dtr-column > tbody > tr > td.dtr-control,
  table.dataTable.dtr-column > tbody > tr > th.dtr-control,
  table.dataTable.dtr-column > tbody > tr > td.control,
  table.dataTable.dtr-column > tbody > tr > th.control {
    cursor: pointer;
  }
  table.dataTable.dtr-column > tbody > tr > td.dtr-control:before,
  table.dataTable.dtr-column > tbody > tr > th.dtr-control:before,
  table.dataTable.dtr-column > tbody > tr > td.control:before,
  table.dataTable.dtr-column > tbody > tr > th.control:before {
    @apply mr-2 inline-flex h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-right.svg')] bg-contain bg-center bg-no-repeat pb-[3px] content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-right.svg?color=white')];
  }
  table.dataTable.dtr-column > tbody > tr > td.dtr-control.arrow-right::before,
  table.dataTable.dtr-column > tbody > tr > th.dtr-control.arrow-right::before,
  table.dataTable.dtr-column > tbody > tr > td.control.arrow-right::before,
  table.dataTable.dtr-column > tbody > tr > th.control.arrow-right::before {
    content: "◄";
  }
  table.dataTable.dtr-column > tbody > tr.parent td.dtr-control:before,
  table.dataTable.dtr-column > tbody > tr.parent th.dtr-control:before,
  table.dataTable.dtr-column > tbody > tr.parent td.control:before,
  table.dataTable.dtr-column > tbody > tr.parent th.control:before,
  table.dataTable.dtr-column > tbody > tr.dtr-expanded td.dtr-control:before,
  table.dataTable.dtr-column > tbody > tr.dtr-expanded th.dtr-control:before,
  table.dataTable.dtr-column > tbody > tr.dtr-expanded td.control:before,
  table.dataTable.dtr-column > tbody > tr.dtr-expanded th.control:before {
    @apply mr-2 inline-block h-4 w-4 bg-[url('https://api.iconify.design/lucide:chevron-down.svg')] bg-contain bg-center bg-no-repeat content-[''] dark:bg-[url('https://api.iconify.design/lucide:chevron-down.svg?color=white')];
  }

  table.dataTable > tbody td.child {
    @apply p-0;
  }
  table.dataTable > tbody > tr.child:hover,
  table.dataTable > tbody > tr.child:hover > td.child {
    background: transparent !important;
  }
  table.dataTable > tbody > tr.child ul.dtr-details {
    @apply m-0 block w-full list-none p-0;
  }
  table.dataTable > tbody > tr.child ul.dtr-details > li {
    @apply border-b p-3 px-7 hover:bg-muted;
  }

  table.dataTable > tbody > tr.child ul.dtr-details > li:last-child {
    @apply border-b-0;
  }
  table.dataTable > tbody > tr.child span.dtr-title {
    @apply inline-block min-w-[80px] font-bold;
  }
  /* Responsive modal */
  div.dtr-modal {
    @apply fixed left-0 top-0 z-[1000] box-border size-full;
  }
  div.dtr-modal div.dtr-modal-display {
    @apply absolute left-1/2 top-1/2 z-[102] max-h-[80%] w-full max-w-screen-sm -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md border bg-background p-4 pb-0 md:px-7 md:py-4 md:pb-0 lg:max-h-[90%];
  }
  div.dtr-modal div.dtr-modal-content {
    @apply relative flex flex-col p-0 text-[15px];
    h2 {
      @apply text-lg font-semibold text-foreground;
    }
    table tr td {
      @apply space-x-10 pb-2 first:font-semibold [&:nth-child(2)]:pl-2;
    }
  }
  div.dtr-modal div.dtr-modal-close {
    @apply absolute right-2 top-2 z-[10] inline-flex size-6 cursor-pointer items-center justify-center rounded-md bg-muted/10 hover:bg-muted;
  }
  div.dtr-modal div.dtr-modal-background {
    @apply fixed inset-0 z-[101] bg-background/20 backdrop-blur;
  }

  /* Search Builder Styles */
  div.dt-button-collection {
    overflow: visible !important;
    z-index: 2002 !important;
  }
  div.dt-button-collection div.dtsb-searchBuilder {
    padding-left: 1em !important;
    padding-right: 1em !important;
  }
  div.dt-button-collection.dtb-collection-closeable div.dtsb-titleRow {
    padding-right: 40px;
  }
  .dtsb-greyscale {
    @apply !border;
  }
  div.dtsb-logicContainer .dtsb-greyscale {
    border: none !important;
  }
  div.dtsb-searchBuilder {
    @apply mb-4 cursor-default justify-evenly text-left;
  }
  div.dtsb-searchBuilder button.dtsb-button,
  div.dtsb-searchBuilder select {
    @apply text-sm;
  }
  div.dtsb-searchBuilder div.dtsb-titleRow {
    @apply mb-3 flex items-center justify-between;
  }
  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title {
    @apply inline-block text-sm font-normal;
  }
  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title:empty {
    display: inline;
  }
  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-value,
  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-data,
  div.dtsb-searchBuilder div.dtsb-vertical .dtsb-condition {
    display: block;
  }
  div.dtsb-searchBuilder div.dtsb-group {
    @apply relative clear-both mb-4;
  }
  div.dtsb-searchBuilder div.dtsb-group button.dtsb-search {
    float: right;
  }
  div.dtsb-searchBuilder div.dtsb-group button.dtsb-clearGroup {
    margin: 2px;
    text-align: center;
    padding: 0;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    position: absolute;
    margin-top: 0.8em;
    margin-right: 0.8em;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {
    margin-bottom: 0.8em;
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {
    padding: 0.4em;
    margin-right: 0.8em;
    min-width: 5em;
    max-width: 20em;
    color: inherit;
  }
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    select.dtsb-dropDown
    option.dtsb-notItalic,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input option.dtsb-notItalic {
    font-style: normal;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-italic {
    font-style: italic;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {
    flex: 1;
    white-space: nowrap;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont span.dtsp-joiner {
    margin-right: 0.8em;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input.dtsb-value {
    width: 33%;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont select,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont input {
    height: 100%;
    box-sizing: border-box;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {
    margin-left: auto;
    display: inline-block;
  }
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    div.dtsb-buttonContainer
    button.dtsb-delete,
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    div.dtsb-buttonContainer
    button.dtsb-right,
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    div.dtsb-buttonContainer
    button.dtsb-left {
    margin-right: 0.8em;
  }
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    div.dtsb-buttonContainer
    button.dtsb-delete:last-child,
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    div.dtsb-buttonContainer
    button.dtsb-right:last-child,
  div.dtsb-searchBuilder
    div.dtsb-group
    div.dtsb-criteria
    div.dtsb-buttonContainer
    button.dtsb-left:last-child {
    margin-right: 0;
  }
  @media screen and (max-width: 550px) {
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria {
      display: flex;
      flex-flow: none;
      flex-direction: column;
      justify-content: flex-start;
      padding-right: calc(35px + 0.8em);
      margin-bottom: 0px;
    }
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:first-child),
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:nth-child(2)),
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:not(:last-child) {
      padding-top: 0.8em;
    }
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:first-child,
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:nth-child(2),
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria:last-child {
      padding-top: 0em;
    }
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {
      max-width: none;
      width: 100%;
      margin-bottom: 0.8em;
      margin-right: 0.8em;
    }
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-inputCont {
      margin-right: 0.8em;
    }
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer {
      position: absolute;
      width: 35px;
      display: flex;
      flex-wrap: wrap-reverse;
      right: 0;
    }
    div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria div.dtsb-buttonContainer button {
      margin-right: 0px !important;
    }
  }
  div.dtsb-searchBuilder button,
  div.dtsb-searchBuilder select.dtsb-dropDown,
  div.dtsb-searchBuilder input {
    @apply bg-background;
  }
  div.dtsb-searchBuilder button.dtsb-button {
    @apply relative box-border inline-flex h-9 cursor-pointer select-none items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-md border bg-background px-3 py-2 text-sm font-normal text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
  }
  div.dtsb-searchBuilder button.dtsb-button:hover {
    @apply cursor-pointer bg-muted;
  }
  div.dtsb-searchBuilder div.dtsb-logicContainer {
    @apply overflow-hidden rounded-none border;
  }
  div.dtsb-searchBuilder div.dtsb-logicContainer button {
    @apply rounded-md border-transparent bg-transparent;
  }
  div.dtsb-searchBuilder button.dtsb-clearGroup {
    min-width: 2em;
    padding: 0;
  }
  div.dtsb-searchBuilder button.dtsb-iptbtn {
    min-width: 100px;
    text-align: left;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {
    @apply flex flex-row content-start items-start justify-start rounded-md;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-logic {
    @apply m-0 shrink-0 grow rounded-none border-0;
    flex-basis: 3em;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-clearGroup {
    border: none;
    border-radius: 0px;
    width: 2em;
    margin: 0px;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {
    @apply rounded-md border;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-condition,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-data,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-value {
    @apply rounded-md border border-input bg-background text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input;
  }

  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-value {
    @apply rounded-md border border-input bg-background text-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus-visible:border-input;
  }

  /* Col vis styles */
  .dt-button-background {
    @apply fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm;
  }
  .dt-button-down-arrow {
    @apply text-[10px];
  }
  .dt-button-collection {
    @apply relative;
    [role="menu"] {
      @apply absolute -left-20 top-7 flex min-w-[200px] flex-col rounded-md border bg-background py-2 shadow before:mx-2 before:mb-2 before:text-xs before:text-muted-foreground/70 before:content-['Select_columns'];
      button {
        @apply h-8 rounded-none border-none px-4 text-xs;
      }
      .dt-button.buttons-columnVisibility.dt-button-active {
        @apply text-foreground after:ml-auto after:content-['✓'];
      }
    }
  }
</style>
