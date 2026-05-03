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

<script lang="ts">
  import DataTablesCore from "datatables.net";
  import type { Api, Config } from "datatables.net";
  import DataTable from "datatables.net-vue3";
  import "datatables.net-buttons-dt";
  import "datatables.net-buttons/js/buttons.colVis.mjs";
  import "datatables.net-buttons/js/buttons.html5.mjs";
  import "datatables.net-buttons/js/buttons.print.mjs";
  import "datatables.net-responsive-dt";
  import "datatables.net-searchbuilder-dt";
  import "datatables.net-select-dt";
  import "datatables.net-fixedcolumns-dt";

  import "datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css";
  import "datatables.net-fixedheader-dt";

  import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css";
  import "datatables.net-colreorder-dt";

  import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
  import JSZip from "jszip";
  import type { HTMLAttributes } from "vue";

  export type DataTablesNamedSlotProps<T> = {
    /** The data to show in the cell (from the `columns.data` configuration) */
    cellData: keyof T | null;
    /** The column index for the cell (0-based index) */
    colIndex: number;
    /** The data object for the whole row. */
    rowData: T | Record<string, any>;
    /** Row index for the cell (data index, not the display index) */
    rowIndex: number;
    /** Orthogonal data type. */
    type: string;
  };

  // @ts-expect-error - We are not creating a declaration file for this library
  window.JSZip = JSZip;
</script>

<script lang="ts" setup generic="T extends Record<string, any>">
  DataTable.use(DataTablesCore);

  const table = shallowRef<{ dt: InstanceType<typeof DataTablesCore<T[]>> } | null>(null);

  const props = withDefaults(
    defineProps<{
      /** The data to display in the table. */
      data?: Config["data"];
      /**
       * The CSS class to apply to the table.
       *
       * @default "nowrap hover order-column row-border stripe display"
       * @see https://datatables.net/manual/styling/classes
       */
      class?: HTMLAttributes["class"];
      /** The columns to display in the table. */
      columns?: Config["columns"];
      /**
       * Load data for the table's content from an Ajax source.
       *
       * @see https://datatables.net/manual/ajax#Ajax-configuration
       */
      ajax?: Config["ajax"];
      /**
       * Additional options for the DataTable.
       *
       * @see https://datatables.net/manual/options
       */
      options?: Config;
    }>(),
    {
      data: () => [],
      class: "nowrap hover order-column row-border stripe display",
    }
  );

  const emits = defineEmits<{ ready: [Api<T[]> | undefined] }>();

  onMounted(() => {
    nextTick(() => {
      emits("ready", table.value?.dt);
    });
  });

  defineExpose({
    /** The DataTable instance. */
    table,
    /** The DataTable instance's DataTables API. */
    dt: computed(() => table.value?.dt),
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
  table.dataTable thead > tr > th.dt-orderable-asc,
  table.dataTable thead > tr > th.dt-orderable-desc,
  table.dataTable thead > tr > td.dt-orderable-asc,
  table.dataTable thead > tr > td.dt-orderable-desc {
    position: relative;
    cursor: pointer;
    padding-right: calc(var(--spacing) * 7);
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
  table.dataTable thead > tr > th.dt-orderable-asc:before,
  table.dataTable thead > tr > th.dt-orderable-asc:after,
  table.dataTable thead > tr > th.dt-orderable-desc:before,
  table.dataTable thead > tr > th.dt-orderable-desc:after,
  table.dataTable thead > tr > td.dt-orderable-asc:before,
  table.dataTable thead > tr > td.dt-orderable-asc:after,
  table.dataTable thead > tr > td.dt-orderable-desc:before,
  table.dataTable thead > tr > td.dt-orderable-desc:after {
    position: absolute;
    right: calc(var(--spacing) * 2.5);
    display: block;
    font-size: var(--text-xs);
    line-height: var(--text-xs--line-height);
    line-height: 0.75rem;
    opacity: 0.25;
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
  table.dataTable thead > tr > th.dt-orderable-asc:before,
  table.dataTable thead > tr > th.dt-orderable-desc:before,
  table.dataTable thead > tr > td.dt-orderable-asc:before,
  table.dataTable thead > tr > td.dt-orderable-desc:before {
    bottom: 43%;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-image: url("https://api.iconify.design/lucide:chevron-up.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    content: "";
    .dark & {
      background-image: url("https://api.iconify.design/lucide:chevron-up.svg?color=white") !important;
    }
  }
  .dark {
    table.dataTable thead > tr > th.dt-orderable-asc:before,
    table.dataTable thead > tr > th.dt-orderable-desc:before,
    table.dataTable thead > tr > td.dt-orderable-asc:before,
    table.dataTable thead > tr > td.dt-orderable-desc:before {
      background-image: url("https://api.iconify.design/lucide:chevron-up.svg?color=white");
    }
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
  table.dataTable thead > tr > th.dt-orderable-asc:after,
  table.dataTable thead > tr > th.dt-orderable-desc:after,
  table.dataTable thead > tr > td.dt-orderable-asc:after,
  table.dataTable thead > tr > td.dt-orderable-desc:after {
    top: 43%;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-image: url("https://api.iconify.design/lucide:chevron-down.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    content: "";
    .dark & {
      background-image: url("https://api.iconify.design/lucide:chevron-down.svg?color=white") !important;
    }
  }
  .dark {
    table.dataTable thead > tr > th.dt-orderable-asc:after,
    table.dataTable thead > tr > th.dt-orderable-desc:after,
    table.dataTable thead > tr > td.dt-orderable-asc:after,
    table.dataTable thead > tr > td.dt-orderable-desc:after {
      background-image: url("https://api.iconify.design/lucide:chevron-down.svg?color=white");
    }
  }
  table.dataTable thead > tr > th.sorting_asc:before,
  table.dataTable thead > tr > th.sorting_desc:after,
  table.dataTable thead > tr > td.sorting_asc:before,
  table.dataTable thead > tr > td.sorting_desc:after,
  table.dataTable thead > tr > th.dt-ordering-asc:before,
  table.dataTable thead > tr > th.dt-ordering-desc:after {
    opacity: 0.8;
  }
  table.dataTable thead > tr > th.sorting_desc_disabled:after,
  table.dataTable thead > tr > th.sorting_asc_disabled:before,
  table.dataTable thead > tr > td.sorting_desc_disabled:after,
  table.dataTable thead > tr > td.sorting_asc_disabled:before {
    display: none;
  }
  table.dataTable thead > tr > th:active,
  table.dataTable thead > tr > td:active {
    outline: none;
  }
  div.dataTables_scrollBody > table.dataTable > thead > tr > th:before,
  div.dataTables_scrollBody > table.dataTable > thead > tr > th:after,
  div.dataTables_scrollBody > table.dataTable > thead > tr > td:before,
  div.dataTables_scrollBody > table.dataTable > thead > tr > td:after {
    display: none;
  }
  div.dataTables_processing,
  div.dt-processing {
    background-color: var(--color-background);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-background) 50%, transparent);
    }
    position: absolute;
    inset: 0;
    z-index: 999;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    > div:last-child {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      margin-top: calc(var(--spacing) * 4);
      margin-bottom: calc(var(--spacing) * 4);
      height: calc(var(--spacing) * 4);
      width: calc(var(--spacing) * 20);
      > div {
        background-color: var(--color-primary);
        position: absolute;
        top: 0;
        height: calc(var(--spacing) * 3.5);
        width: calc(var(--spacing) * 3.5);
        border-radius: 9999px;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      > div:nth-child(1) {
        left: 8px;
        animation: datatables-loader-1 0.6s infinite;
      }
      > div:nth-child(2) {
        left: 8px;
        animation: datatables-loader-2 0.6s infinite;
      }
      > div:nth-child(3) {
        left: 32px;
        animation: datatables-loader-2 0.6s infinite;
      }
      > div:nth-child(4) {
        left: 56px;
        animation: datatables-loader-3 0.6s infinite;
      }
    }
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
  .dtfh-floatingparent.dtfh-floatingparent-head {
    background-color: var(--color-background);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-background) 90%, transparent);
    }
    z-index: 10;
    backdrop-filter: blur(8px);
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
  table.dataTable {
    width: 100%;
    table-layout: auto;
    border-collapse: collapse;
  }
  table.dataTable thead th,
  table.dataTable tfoot th {
    color: var(--color-muted-foreground);
    text-align: left;
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
    font-weight: var(--font-weight-medium);
  }
  table.dataTable > thead > tr > th {
    border-top-width: 0;
    border-bottom: 1px solid var(--color-border);
    padding-left: calc(var(--spacing) * 6);
    padding-right: calc(var(--spacing) * 6);
    padding-top: calc(var(--spacing) * 3);
    padding-bottom: calc(var(--spacing) * 3);
  }
  table.dataTable > thead > tr > td {
    border-bottom: 1px solid var(--color-border);
    padding-left: calc(var(--spacing) * 6);
    padding-right: calc(var(--spacing) * 6);
    padding-top: calc(var(--spacing) * 3);
    padding-bottom: calc(var(--spacing) * 3);
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
  }
  table.dataTable > thead > tr > th:active,
  table.dataTable > thead > tr > td:active {
    outline: none;
  }
  table.dataTable > tfoot > tr > th,
  table.dataTable > tfoot > tr > td {
    border-top: 1px solid var(--color-border);
    padding-left: calc(var(--spacing) * 6);
    padding-right: calc(var(--spacing) * 6);
    padding-top: calc(var(--spacing) * 3);
    padding-bottom: calc(var(--spacing) * 3);
  }
  table.dataTable tbody tr {
    background-color: transparent;
  }
  table.dataTable tbody tr.selected > * {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable tbody tr.selected a {
    color: var(--color-primary);
  }
  table.dataTable tbody th,
  table.dataTable tbody td {
    padding-left: calc(var(--spacing) * 6);
    padding-right: calc(var(--spacing) * 6);
    padding-top: calc(var(--spacing) * 3);
    padding-bottom: calc(var(--spacing) * 3);
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
  }
  table.dataTable.row-border > tbody > tr > th,
  table.dataTable.row-border > tbody > tr > td,
  table.dataTable.display > tbody > tr > th,
  table.dataTable.display > tbody > tr > td {
    border-top: 1px solid var(--color-border);
  }
  table.dataTable.row-border > tbody > tr:first-child > th,
  table.dataTable.row-border > tbody > tr:first-child > td,
  table.dataTable.display > tbody > tr:first-child > th,
  table.dataTable.display > tbody > tr:first-child > td {
    border-top-width: 0;
  }
  table.dataTable.row-border > tbody > tr.selected + tr.selected > td,
  table.dataTable.display > tbody > tr.selected + tr.selected > td {
    border-top-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      border-top-color: color-mix(in oklch, var(--color-primary) 30%, transparent);
    }
  }
  table.dataTable.cell-border > tbody > tr > th,
  table.dataTable.cell-border > tbody > tr > td {
    border-top: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
  }
  table.dataTable.cell-border > tbody > tr > th:first-child,
  table.dataTable.cell-border > tbody > tr > td:first-child {
    border-left: 1px solid var(--color-border);
  }
  table.dataTable.cell-border > tbody > tr:first-child > th,
  table.dataTable.cell-border > tbody > tr:first-child > td {
    border-top-width: 0;
  }
  table.dataTable.stripe > tbody > tr.odd > *,
  table.dataTable.display > tbody > tr.odd > * {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 50%, transparent);
    }
  }
  table.dataTable.stripe > tbody > tr.odd.selected > *,
  table.dataTable.display > tbody > tr.odd.selected > * {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.hover > tbody > tr:hover > *,
  table.dataTable.display > tbody > tr:hover > * {
    background-color: var(--color-muted);
  }
  table.dataTable.hover > tbody > tr.selected:hover > *,
  table.dataTable.display > tbody > tr.selected:hover > * {
    background-color: var(--color-primary) !important;
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent) !important;
    }
  }
  table.dataTable.order-column > tbody tr > .sorting_1,
  table.dataTable.order-column > tbody tr > .sorting_2,
  table.dataTable.order-column > tbody tr > .sorting_3,
  table.dataTable.display > tbody tr > .sorting_1,
  table.dataTable.display > tbody tr > .sorting_2,
  table.dataTable.display > tbody tr > .sorting_3 {
    background-color: var(--color-muted);
  }
  table.dataTable.order-column > tbody tr.selected > .sorting_1,
  table.dataTable.order-column > tbody tr.selected > .sorting_2,
  table.dataTable.order-column > tbody tr.selected > .sorting_3,
  table.dataTable.display > tbody tr.selected > .sorting_1,
  table.dataTable.display > tbody tr.selected > .sorting_2,
  table.dataTable.display > tbody tr.selected > .sorting_3 {
    background-color: var(--color-primary) !important;
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent) !important;
    }
  }
  table.dataTable.display > tbody > tr.odd > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_1 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 50%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.odd > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_2 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 30%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.odd > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.odd > .sorting_3 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 10%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.odd.selected > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_1 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 50%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.odd.selected > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_2 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 30%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.odd.selected > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.odd.selected > .sorting_3 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 10%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.even > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_1 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 50%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.even > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_2 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 30%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.even > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.even > .sorting_3 {
    background-color: var(--color-muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-muted) 10%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.even.selected > .sorting_1,
  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_1 {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.even.selected > .sorting_2,
  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_2 {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.display > tbody > tr.even.selected > .sorting_3,
  table.dataTable.order-column.stripe > tbody > tr.even.selected > .sorting_3 {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.display tbody tr:hover > .sorting_1,
  table.dataTable.order-column.hover tbody tr:hover > .sorting_1 {
    background-color: var(--color-muted);
  }
  table.dataTable.display tbody tr:hover > .sorting_2,
  table.dataTable.order-column.hover tbody tr:hover > .sorting_2 {
    background-color: var(--color-muted);
  }
  table.dataTable.display tbody tr:hover > .sorting_3,
  table.dataTable.order-column.hover tbody tr:hover > .sorting_3 {
    background-color: var(--color-muted);
  }
  table.dataTable.display tbody tr:hover.selected > .sorting_1,
  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_1 {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.display tbody tr:hover.selected > .sorting_2,
  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_2 {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.display tbody tr:hover.selected > .sorting_3,
  table.dataTable.order-column.hover tbody tr:hover.selected > .sorting_3 {
    background-color: var(--color-primary);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklch, var(--color-primary) 10%, transparent);
    }
  }
  table.dataTable.no-footer {
    border-bottom-width: 0;
  }
  table.dataTable.compact thead th,
  table.dataTable.compact thead td,
  table.dataTable.compact tfoot th,
  table.dataTable.compact tfoot td,
  table.dataTable.compact tbody th,
  table.dataTable.compact tbody td {
    padding-left: calc(var(--spacing) * 4);
    padding-right: calc(var(--spacing) * 4);
    padding-top: calc(var(--spacing) * 2);
    padding-bottom: calc(var(--spacing) * 2);
  }
  table.dataTable th,
  table.dataTable td {
    box-sizing: content-box;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }
  table.dataTable tr:last-child td {
    border-bottom-width: 0 !important;
  }
  .dataTables_wrapper {
    width: 100%;
    overflow-x: auto;
  }
  .dt-buttons {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: calc(0.25rem * 2);
    button {
      display: inline-flex;
      height: calc(0.25rem * 9);
      align-items: center;
      justify-content: center;
      gap: calc(0.25rem * 2);
      border-radius: calc(var(--radius) - 2px);
      border-style: var(--tw-border-style);
      border-width: 1px;
      background-color: var(--background);
      padding-inline: calc(0.25rem * 3);
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
      --tw-font-weight: 500;
      font-weight: 500;
      white-space: nowrap;
      --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
      transition-property: all;
      transition-timing-function: var(--tw-ease, ease);
      transition-duration: var(--tw-duration, 0s);
      --tw-outline-style: none;
      outline-style: none;
      &:hover {
        @media (hover: hover) {
          background-color: var(--accent);
        }
      }
      &:hover {
        @media (hover: hover) {
          color: var(--accent-foreground);
        }
      }
      &:focus {
        --tw-outline-style: none;
        outline-style: none;
      }
      &:focus-visible {
        border-color: var(--ring);
      }
      &:focus-visible {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
          var(--tw-ring-color, currentcolor);
        box-shadow:
          var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
          var(--tw-ring-shadow), var(--tw-shadow);
      }
      &:focus-visible {
        --tw-ring-color: var(--ring);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
        }
      }
      &:disabled {
        pointer-events: none;
      }
      &:disabled {
        opacity: 50%;
      }
      &:is(.dark *) {
        border-color: var(--input);
      }
      &:is(.dark *) {
        background-color: var(--input);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--input) 30%, transparent);
        }
      }
      &:is(.dark *) {
        &:hover {
          @media (hover: hover) {
            background-color: var(--input);
            @supports (color: color-mix(in lab, red, red)) {
              background-color: color-mix(in oklab, var(--input) 50%, transparent);
            }
          }
        }
      }
      & svg {
        pointer-events: none;
      }
      & svg {
        flex-shrink: 0;
      }
      & svg:not([class*="size-"]) {
        width: calc(0.25rem * 4);
        height: calc(0.25rem * 4);
      }
    }
  }
  .dt-button-info {
    position: fixed;
    inset: calc(0.25rem * 0);
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background) 50%, transparent);
    }
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,)
      var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,)
      var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,)
      var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,)
      var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,)
      var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,)
      var(--tw-backdrop-sepia,);
  }
  .dataTables_wrapper .dataTables_length {
    label {
      display: inline-flex;
      align-items: center;
      gap: calc(0.25rem * 2);
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
      --tw-font-weight: 400;
      font-weight: 400;
      color: var(--muted-foreground);
      select {
        height: calc(0.25rem * 9);
        width: 70px;
        cursor: pointer;
        border-radius: calc(var(--radius) - 2px);
        border-style: var(--tw-border-style);
        border-width: 1px;
        background-color: var(--background);
        padding-inline: calc(0.25rem * 2);
        padding-block: calc(0.25rem * 1);
        transition-property:
          color,
          background-color,
          border-color,
          outline-color,
          text-decoration-color,
          fill,
          stroke,
          --tw-gradient-from,
          --tw-gradient-via,
          --tw-gradient-to,
          opacity,
          box-shadow,
          transform,
          translate,
          scale,
          rotate,
          filter,
          -webkit-backdrop-filter,
          backdrop-filter,
          display,
          content-visibility,
          overlay,
          pointer-events;
        transition-timing-function: var(--tw-ease, ease);
        transition-duration: var(--tw-duration, 0s);
        &:focus {
          border-color: var(--primary);
        }
        &:focus {
          --tw-outline-style: none;
          outline-style: none;
        }
        &:focus-visible {
          border-color: var(--input);
        }
        &:focus-visible {
          --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width))
            var(--tw-ring-color, currentcolor);
          box-shadow:
            var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
            var(--tw-ring-shadow), var(--tw-shadow);
        }
        &:focus-visible {
          --tw-ring-color: var(--ring);
        }
        &:focus-visible {
          --tw-ring-offset-width: 2px;
          --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width)
            var(--tw-ring-offset-color);
        }
        &:focus-visible {
          --tw-ring-offset-color: var(--background);
        }
        @media (width >= 40rem) {
          font-size: 0.875rem;
          line-height: var(--tw-leading, calc(1.25 / 0.875));
        }
      }
    }
  }
  .dt-length {
    display: inline-flex;
    align-items: center;
    gap: calc(0.25rem * 2);
    label {
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
      --tw-font-weight: 400;
      font-weight: 400;
      color: var(--muted-foreground);
    }
    select {
      display: flex;
      height: calc(0.25rem * 9);
      width: 70px;
      min-width: calc(0.25rem * 0);
      border-radius: calc(var(--radius) - 2px);
      border-style: var(--tw-border-style);
      border-width: 1px;
      border-color: var(--input);
      background-color: transparent;
      padding-inline: calc(0.25rem * 3);
      padding-block: calc(0.25rem * 1);
      font-size: 1rem;
      line-height: var(--tw-leading, calc(1.5 / 1));
      --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
      transition-property: color, box-shadow;
      transition-timing-function: var(--tw-ease, ease);
      transition-duration: var(--tw-duration, 0s);
      --tw-outline-style: none;
      outline-style: none;
      & *::selection {
        background-color: var(--primary);
      }
      &::selection {
        background-color: var(--primary);
      }
      & *::selection {
        color: var(--primary-foreground);
      }
      &::selection {
        color: var(--primary-foreground);
      }
      &::placeholder {
        color: var(--muted-foreground);
      }
      &:focus-visible {
        border-color: var(--ring);
      }
      &:focus-visible {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
          var(--tw-ring-color, currentcolor);
        box-shadow:
          var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
          var(--tw-ring-shadow), var(--tw-shadow);
      }
      &:focus-visible {
        --tw-ring-color: var(--ring);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
        }
      }
      &:disabled {
        pointer-events: none;
      }
      &:disabled {
        cursor: not-allowed;
      }
      &:disabled {
        opacity: 50%;
      }
      &[aria-invalid="true"] {
        border-color: var(--destructive);
      }
      &[aria-invalid="true"] {
        --tw-ring-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--destructive) 20%, transparent);
        }
      }
      @media (width >= 48rem) {
        font-size: 0.875rem;
        line-height: var(--tw-leading, calc(1.25 / 0.875));
      }
      &:is(.dark *) {
        background-color: var(--input);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--input) 30%, transparent);
        }
      }
      &:is(.dark *) {
        &[aria-invalid="true"] {
          --tw-ring-color: var(--destructive);
          @supports (color: color-mix(in lab, red, red)) {
            --tw-ring-color: color-mix(in oklab, var(--destructive) 40%, transparent);
          }
        }
      }
    }
  }
  .dt-select-checkbox {
    appearance: none;
    padding: 0;
    print-color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    user-select: none;
    flex-shrink: 0;
    height: 1rem;
    width: 1rem;
    color: oklch(54.6% 0.245 262.881);
    background-color: #fff;
    border-color: oklch(55.1% 0.027 264.364);
    border-width: 1px;
    --tw-shadow: 0 0 #0000;
    border-radius: 0px;
    &:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
      --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
      --tw-ring-offset-width: 2px;
      --tw-ring-offset-color: #fff;
      --tw-ring-color: oklch(54.6% 0.245 262.881);
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
        var(--tw-ring-offset-color);
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
        var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:checked {
      border-color: transparent;
      background-color: currentColor;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    &:checked {
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
      @media (forced-colors: active) {
        appearance: auto;
      }
    }
    &:checked:hover {
      border-color: transparent;
      background-color: currentColor;
    }
    &:checked:focus {
      border-color: transparent;
      background-color: currentColor;
    }
    &:indeterminate {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
      border-color: transparent;
      background-color: currentColor;
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      @media (forced-colors: active) {
        appearance: auto;
      }
    }
    &:indeterminate:hover {
      border-color: transparent;
      background-color: currentColor;
    }
    &:indeterminate:focus {
      border-color: transparent;
      background-color: currentColor;
    }
    width: calc(0.25rem * 4);
    height: calc(0.25rem * 4);
    cursor: pointer;
    border-radius: 0.25rem;
    border-color: var(--border);
    background-color: var(--background);
    color: var(--primary);
    &:checked {
      background-color: var(--primary);
    }
    &:checked {
      color: var(--primary);
    }
    &:indeterminate {
      background-color: var(--primary);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--primary) 80%, transparent);
      }
    }
    &:hover {
      @media (hover: hover) {
        &:indeterminate {
          background-color: var(--primary);
        }
      }
    }
    &:focus {
      --tw-ring-color: var(--ring);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
      }
    }
    &:focus {
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width)
        var(--tw-ring-offset-color);
    }
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
    }
    &:checked {
      &:focus {
        background-color: var(--primary);
      }
    }
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
    &:is(.dark *) {
      &:checked {
        background-color: var(--primary);
      }
    }
    &:is(.dark *) {
      &:indeterminate {
        background-color: var(--primary);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--primary) 80%, transparent);
        }
      }
    }
  }
  .dataTables_wrapper .dataTables_filter {
    label {
      display: inline-flex;
      width: 100%;
      cursor: pointer;
      align-items: center;
      gap: calc(0.25rem * 2);
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
      --tw-font-weight: 400;
      font-weight: 400;
      color: var(--muted-foreground);
      input {
        height: calc(0.25rem * 9);
        width: 100%;
        border-radius: calc(var(--radius) - 2px);
        border-style: var(--tw-border-style);
        border-width: 1px;
        border-color: var(--border);
        background-color: var(--background);
        padding-inline: calc(0.25rem * 2);
        padding-block: calc(0.25rem * 1);
        transition-property:
          color,
          background-color,
          border-color,
          outline-color,
          text-decoration-color,
          fill,
          stroke,
          --tw-gradient-from,
          --tw-gradient-via,
          --tw-gradient-to,
          opacity,
          box-shadow,
          transform,
          translate,
          scale,
          rotate,
          filter,
          -webkit-backdrop-filter,
          backdrop-filter,
          display,
          content-visibility,
          overlay,
          pointer-events;
        transition-timing-function: var(--tw-ease, ease);
        transition-duration: var(--tw-duration, 0s);
        &:focus {
          border-color: var(--primary);
        }
        &:focus {
          --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width))
            var(--tw-ring-color, currentcolor);
          box-shadow:
            var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
            var(--tw-ring-shadow), var(--tw-shadow);
        }
        &:focus {
          --tw-ring-color: var(--ring);
        }
        &:focus {
          --tw-ring-offset-width: 2px;
          --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width)
            var(--tw-ring-offset-color);
        }
        &:focus {
          --tw-ring-offset-color: var(--background);
        }
        &:focus {
          --tw-outline-style: none;
          outline-style: none;
        }
        &:focus-visible {
          border-color: var(--input);
        }
        @media (width >= 40rem) {
          font-size: 0.875rem;
          line-height: var(--tw-leading, calc(1.25 / 0.875));
        }
      }
    }
  }
  .dt-search {
    display: flex;
    align-items: center;
    gap: calc(0.25rem * 3);
    label {
      display: inline-flex;
      cursor: pointer;
      align-items: center;
      gap: calc(0.25rem * 2);
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
      --tw-font-weight: 500;
      font-weight: 500;
      color: var(--muted-foreground);
    }
    input {
      display: flex;
      height: calc(0.25rem * 9);
      width: 100%;
      min-width: calc(0.25rem * 0);
      border-radius: calc(var(--radius) - 2px);
      border-style: var(--tw-border-style);
      border-width: 1px;
      border-color: var(--input);
      background-color: transparent;
      padding-inline: calc(0.25rem * 3);
      padding-block: calc(0.25rem * 1);
      font-size: 1rem;
      line-height: var(--tw-leading, calc(1.5 / 1));
      --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
      transition-property: color, box-shadow;
      transition-timing-function: var(--tw-ease, ease);
      transition-duration: var(--tw-duration, 0s);
      --tw-outline-style: none;
      outline-style: none;
      & *::selection {
        background-color: var(--primary);
      }
      &::selection {
        background-color: var(--primary);
      }
      & *::selection {
        color: var(--primary-foreground);
      }
      &::selection {
        color: var(--primary-foreground);
      }
      &::placeholder {
        color: var(--muted-foreground);
      }
      &:focus-visible {
        border-color: var(--ring);
      }
      &:focus-visible {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
          var(--tw-ring-color, currentcolor);
        box-shadow:
          var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
          var(--tw-ring-shadow), var(--tw-shadow);
      }
      &:focus-visible {
        --tw-ring-color: var(--ring);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
        }
      }
      &:disabled {
        pointer-events: none;
      }
      &:disabled {
        cursor: not-allowed;
      }
      &:disabled {
        opacity: 50%;
      }
      &[aria-invalid="true"] {
        border-color: var(--destructive);
      }
      &[aria-invalid="true"] {
        --tw-ring-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--destructive) 20%, transparent);
        }
      }
      @media (width >= 48rem) {
        font-size: 0.875rem;
        line-height: var(--tw-leading, calc(1.25 / 0.875));
      }
      &:is(.dark *) {
        background-color: var(--input);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--input) 30%, transparent);
        }
      }
      &:is(.dark *) {
        &[aria-invalid="true"] {
          --tw-ring-color: var(--destructive);
          @supports (color: color-mix(in lab, red, red)) {
            --tw-ring-color: color-mix(in oklab, var(--destructive) 40%, transparent);
          }
        }
      }
    }
  }
  .dataTables_wrapper .dataTables_info,
  .dt-info {
    display: flex;
    align-items: center;
    gap: calc(0.25rem * 3);
    font-size: 0.875rem;
    line-height: var(--tw-leading, calc(1.25 / 0.875));
    color: var(--muted-foreground) !important;
  }
  .dt-paging nav {
    display: flex;
    align-items: center;
    gap: calc(0.25rem * 1);
  }
  .dataTables_wrapper .dataTables_paginate {
    .paginate_button {
      margin-left: calc(0.25rem * 1);
      box-sizing: border-box;
      display: inline-flex;
      height: calc(0.25rem * 9);
      min-width: 36px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      background-color: transparent;
      padding-inline: calc(0.25rem * 3);
      padding-block: calc(0.25rem * 2);
      text-align: center;
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
      &:focus {
        --tw-outline-style: none;
        outline-style: none;
      }
      &:focus-visible {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width))
          var(--tw-ring-color, currentcolor);
        box-shadow:
          var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
          var(--tw-ring-shadow), var(--tw-shadow);
      }
      &:focus-visible {
        --tw-ring-color: var(--ring);
      }
      &:focus-visible {
        --tw-ring-offset-width: 2px;
        --tw-ring-offset-shadow: var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width)
          var(--tw-ring-offset-color);
      }
      &:focus-visible {
        --tw-ring-offset-color: var(--background);
      }
    }
  }
  .dt-paging-button {
    display: inline-flex;
    height: calc(0.25rem * 8);
    min-width: calc(0.25rem * 8);
    align-items: center;
    justify-content: center;
    gap: calc(0.25rem * 2);
    border-radius: calc(var(--radius) - 2px);
    border-style: var(--tw-border-style);
    border-width: 1px;
    background-color: var(--background);
    padding-inline: calc(0.25rem * 3);
    font-size: 0.875rem;
    line-height: var(--tw-leading, calc(1.25 / 0.875));
    white-space: nowrap;
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow:
      var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow), var(--tw-shadow);
    transition-property: all;
    transition-timing-function: var(--tw-ease, ease);
    transition-duration: var(--tw-duration, 0s);
    --tw-outline-style: none;
    outline-style: none;
    &:hover {
      @media (hover: hover) {
        background-color: var(--accent);
      }
    }
    &:hover {
      @media (hover: hover) {
        color: var(--accent-foreground);
      }
    }
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
    }
    &:focus-visible {
      border-color: var(--ring);
    }
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
        var(--tw-ring-color, currentcolor);
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:focus-visible {
      --tw-ring-color: var(--ring);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
      }
    }
    &:disabled {
      pointer-events: none;
    }
    &:disabled {
      opacity: 50%;
    }
    &:is(.dark *) {
      border-color: var(--input);
    }
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--input);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--input) 50%, transparent);
          }
        }
      }
    }
    & svg {
      pointer-events: none;
    }
    & svg {
      flex-shrink: 0;
    }
    & svg:not([class*="size-"]) {
      width: calc(0.25rem * 4);
      height: calc(0.25rem * 4);
    }
    &.current,
    &:hover {
      background-color: var(--muted);
    }
    &.disabled,
    &.disabled:hover,
    &.disabled:active {
      pointer-events: none;
      opacity: 50%;
    }
    &.previous,
    &.next,
    &.first,
    &.last {
      font-size: 1rem;
      line-height: var(--tw-leading, calc(1.5 / 1));
    }
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button.current,
  .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
    background-color: var(--muted);
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled,
  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover,
  .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
    pointer-events: none;
    opacity: 50%;
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button:hover {
    background-color: var(--muted);
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button:active {
    background-color: var(--muted);
  }
  .dataTables_wrapper .dataTables_paginate .ellipsis,
  .dt-paging .ellipsis {
    display: inline-flex;
    height: calc(0.25rem * 8);
    min-width: 32px;
    align-items: flex-start;
    justify-content: center;
    font-size: 0.875rem;
    line-height: var(--tw-leading, calc(1.25 / 0.875));
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
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
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
    margin-right: calc(0.25rem * 2);
    display: inline-flex;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-image: url("https://api.iconify.design/lucide:chevron-right.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    padding-bottom: 3px;
    --tw-content: "";
    content: var(--tw-content);
    &:is(.dark *) {
      background-image: url("https://api.iconify.design/lucide:chevron-right.svg?color=white");
    }
  }
  .dark {
    table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control:before,
    table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control:before {
      background-image: url("https://api.iconify.design/lucide:chevron-right.svg?color=white");
    }
  }
  table.dataTable.dtr-inline.collapsed > tbody > tr > td.dtr-control.arrow-right::before,
  table.dataTable.dtr-inline.collapsed > tbody > tr > th.dtr-control.arrow-right::before {
    content: "◄";
  }
  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > td.dtr-control:before,
  table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > th.dtr-control:before {
    margin-right: calc(0.25rem * 2);
    display: inline-block;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-image: url("https://api.iconify.design/lucide:chevron-down.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    --tw-content: "";
    content: var(--tw-content);
    &:is(.dark *) {
      background-image: url("https://api.iconify.design/lucide:chevron-down.svg?color=white");
    }
  }
  .dark {
    table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td.dtr-control:before,
    table.dataTable.dtr-inline.collapsed > tbody > tr.parent > th.dtr-control:before,
    table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > td.dtr-control:before,
    table.dataTable.dtr-inline.collapsed > tbody > tr.dtr-expanded > th.dtr-control:before {
      background-image: url("https://api.iconify.design/lucide:chevron-down.svg?color=white");
    }
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
    margin-right: calc(0.25rem * 2);
    display: inline-flex;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-image: url("https://api.iconify.design/lucide:chevron-right.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    padding-bottom: 3px;
    --tw-content: "";
    content: var(--tw-content);
    &:is(.dark *) {
      background-image: url("https://api.iconify.design/lucide:chevron-right.svg?color=white");
    }
  }
  .dark {
    table.dataTable.dtr-column > tbody > tr > td.dtr-control:before,
    table.dataTable.dtr-column > tbody > tr > th.dtr-control:before,
    table.dataTable.dtr-column > tbody > tr > td.control:before,
    table.dataTable.dtr-column > tbody > tr > th.control:before {
      background-image: url("https://api.iconify.design/lucide:chevron-right.svg?color=white");
    }
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
    margin-right: calc(0.25rem * 2);
    display: inline-block;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    background-image: url("https://api.iconify.design/lucide:chevron-down.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    --tw-content: "";
    content: var(--tw-content);
    &:is(.dark *) {
      background-image: url("https://api.iconify.design/lucide:chevron-down.svg?color=white");
    }
  }
  .dark {
    table.dataTable.dtr-column > tbody > tr.parent td.dtr-control:before,
    table.dataTable.dtr-column > tbody > tr.parent th.dtr-control:before,
    table.dataTable.dtr-column > tbody > tr.parent td.control:before,
    table.dataTable.dtr-column > tbody > tr.parent th.control:before,
    table.dataTable.dtr-column > tbody > tr.dtr-expanded td.dtr-control:before,
    table.dataTable.dtr-column > tbody > tr.dtr-expanded th.dtr-control:before,
    table.dataTable.dtr-column > tbody > tr.dtr-expanded td.control:before,
    table.dataTable.dtr-column > tbody > tr.dtr-expanded th.control:before {
      background-image: url("https://api.iconify.design/lucide:chevron-down.svg?color=white");
    }
  }
  table.dataTable > tbody td.child {
    padding: calc(0.25rem * 0);
  }
  table.dataTable > tbody > tr.child:hover,
  table.dataTable > tbody > tr.child:hover > td.child {
    background: transparent !important;
  }
  table.dataTable > tbody > tr.child ul.dtr-details {
    margin: calc(0.25rem * 0);
    display: block;
    width: 100%;
    list-style-type: none;
    padding: calc(0.25rem * 0);
  }
  table.dataTable > tbody > tr.child ul.dtr-details > li {
    display: flex;
    align-items: center;
    gap: calc(0.25rem * 6);
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
    padding: calc(0.25rem * 3);
    padding-inline: calc(0.25rem * 7);
    &:hover {
      @media (hover: hover) {
        background-color: var(--muted);
      }
    }
  }
  table.dataTable > tbody > tr.child ul.dtr-details > li:last-child {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 0px;
  }
  table.dataTable > tbody > tr.child span.dtr-title {
    display: inline-block;
    min-width: 80px;
    --tw-font-weight: 700;
    font-weight: 700;
  }
  div.dtr-modal {
    position: fixed;
    top: calc(0.25rem * 0);
    left: calc(0.25rem * 0);
    z-index: 1000;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  div.dtr-modal div.dtr-modal-display {
    position: absolute;
    top: calc(1 / 2 * 100%);
    left: calc(1 / 2 * 100%);
    z-index: 102;
    max-height: 80%;
    width: 100%;
    max-width: 40rem;
    --tw-translate-x: calc(calc(1 / 2 * 100%) * -1);
    --tw-translate-y: calc(calc(1 / 2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
    overflow-y: auto;
    border-radius: calc(var(--radius) - 2px);
    border-style: var(--tw-border-style);
    border-width: 1px;
    background-color: var(--background);
    padding: calc(0.25rem * 4);
    @media (width >= 48rem) {
      padding-inline: calc(0.25rem * 7);
    }
    @media (width >= 48rem) {
      padding-block: calc(0.25rem * 4);
    }
    @media (width >= 64rem) {
      max-height: 90%;
    }
  }
  div.dtr-modal div.dtr-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: calc(0.25rem * 0);
    font-size: 15px;
    h2 {
      font-size: 1.125rem;
      line-height: var(--tw-leading, calc(1.75 / 1.125));
      --tw-font-weight: 600;
      font-weight: 600;
      color: var(--foreground);
    }
    table tr td {
      :where(& > :not(:last-child)) {
        --tw-space-x-reverse: 0;
        margin-inline-start: calc(calc(0.25rem * 10) * var(--tw-space-x-reverse));
        margin-inline-end: calc(calc(0.25rem * 10) * calc(1 - var(--tw-space-x-reverse)));
      }
      padding-bottom: calc(0.25rem * 2);
      &:first-child {
        --tw-font-weight: 600;
        font-weight: 600;
      }
      &:nth-child(2) {
        padding-left: calc(0.25rem * 2);
      }
    }
  }
  div.dtr-modal div.dtr-modal-close {
    position: absolute;
    top: calc(0.25rem * 2);
    right: calc(0.25rem * 2);
    z-index: 10;
    display: inline-flex;
    width: calc(0.25rem * 6);
    height: calc(0.25rem * 6);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: calc(var(--radius) - 2px);
    background-color: var(--muted);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--muted) 10%, transparent);
    }
    &:hover {
      @media (hover: hover) {
        background-color: var(--muted);
      }
    }
  }
  div.dtr-modal div.dtr-modal-background {
    position: fixed;
    inset: calc(0.25rem * 0);
    z-index: 101;
    background-color: var(--background);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background) 20%, transparent);
    }
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,)
      var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,)
      var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,)
      var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,)
      var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,)
      var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,)
      var(--tw-backdrop-sepia,);
  }
  div.dt-button-collection {
    z-index: 2002 !important;
    overflow: visible !important;
  }
  div.dt-button-collection div.dtsb-searchBuilder {
    padding: calc(0.25rem * 4) !important;
  }
  div.dt-button-collection.dtb-collection-closeable div.dtsb-titleRow {
    padding-right: calc(0.25rem * 10);
  }
  .dtsb-greyscale {
    border-style: var(--tw-border-style) !important;
    border-width: 1px !important;
  }
  div.dtsb-logicContainer .dtsb-greyscale {
    --tw-border-style: none !important;
    border-style: none !important;
  }
  div.dtsb-searchBuilder {
    margin-bottom: calc(0.25rem * 4);
    cursor: default;
    justify-content: space-evenly;
    text-align: left;
  }
  div.dtsb-searchBuilder button.dtsb-button,
  div.dtsb-searchBuilder select {
    font-size: 0.875rem;
    line-height: var(--tw-leading, calc(1.25 / 0.875));
  }
  div.dtsb-searchBuilder div.dtsb-titleRow {
    margin-bottom: calc(0.25rem * 3);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title {
    display: inline-block;
    font-size: 0.875rem;
    line-height: var(--tw-leading, calc(1.25 / 0.875));
    --tw-font-weight: 400;
    font-weight: 400;
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
    position: relative;
    clear: both;
    margin-bottom: calc(0.25rem * 4);
  }
  div.dtsb-searchBuilder div.dtsb-group button.dtsb-search {
    float: right;
  }
  div.dtsb-searchBuilder div.dtsb-group button.dtsb-clearGroup {
    margin: calc(0.25rem * 0.5);
    padding: calc(0.25rem * 0);
    text-align: center;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {
    position: absolute;
    margin-top: calc(0.25rem * 3.5);
    margin-right: calc(0.25rem * 3.5);
    rotate: 90deg;
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
    background-color: var(--background);
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--input);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--input) 50%, transparent);
          }
        }
      }
    }
  }
  div.dtsb-searchBuilder button.dtsb-button {
    display: inline-flex;
    height: calc(0.25rem * 9);
    align-items: center;
    justify-content: center;
    gap: calc(0.25rem * 2);
    border-radius: calc(var(--radius) - 2px);
    border-style: var(--tw-border-style);
    border-width: 1px;
    background-color: var(--background);
    padding-inline: calc(0.25rem * 3);
    font-size: 0.875rem;
    line-height: var(--tw-leading, calc(1.25 / 0.875));
    white-space: nowrap;
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow:
      var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow), var(--tw-shadow);
    transition-property: all;
    transition-timing-function: var(--tw-ease, ease);
    transition-duration: var(--tw-duration, 0s);
    --tw-outline-style: none;
    outline-style: none;
    &:hover {
      @media (hover: hover) {
        background-color: var(--accent);
      }
    }
    &:hover {
      @media (hover: hover) {
        color: var(--accent-foreground);
      }
    }
    &:focus {
      --tw-outline-style: none;
      outline-style: none;
    }
    &:focus-visible {
      border-color: var(--ring);
    }
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
        var(--tw-ring-color, currentcolor);
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:focus-visible {
      --tw-ring-color: var(--ring);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
      }
    }
    &:disabled {
      pointer-events: none;
    }
    &:disabled {
      opacity: 50%;
    }
    &:is(.dark *) {
      border-color: var(--input);
    }
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--input);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--input) 50%, transparent);
          }
        }
      }
    }
    & svg {
      pointer-events: none;
    }
    & svg {
      flex-shrink: 0;
    }
    & svg:not([class*="size-"]) {
      width: calc(0.25rem * 4);
      height: calc(0.25rem * 4);
    }
  }
  div.dtsb-searchBuilder button.dtsb-button:hover {
    cursor: pointer;
    background-color: var(--accent);
    color: var(--accent-foreground);
    &:is(.dark *) {
      &:hover {
        @media (hover: hover) {
          background-color: var(--input);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--input) 50%, transparent);
          }
        }
      }
    }
  }
  div.dtsb-searchBuilder div.dtsb-logicContainer {
    overflow: hidden;
    border-radius: 0;
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  div.dtsb-searchBuilder div.dtsb-logicContainer button {
    border-radius: calc(var(--radius) - 2px);
    border-color: transparent;
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
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: calc(var(--radius) - 2px);
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer button.dtsb-logic {
    margin: calc(0.25rem * 0);
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 0;
    border-style: var(--tw-border-style);
    border-width: 0px;
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
    border-radius: calc(var(--radius) - 2px);
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-condition,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-data,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-value {
    display: flex;
    height: calc(0.25rem * 9);
    min-width: calc(0.25rem * 0);
    border-radius: calc(var(--radius) - 2px);
    border-style: var(--tw-border-style);
    border-width: 1px;
    border-color: var(--input);
    background-color: transparent;
    padding-inline: calc(0.25rem * 3);
    padding-block: calc(0.25rem * 1);
    font-size: 1rem;
    line-height: var(--tw-leading, calc(1.5 / 1));
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow:
      var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow), var(--tw-shadow);
    transition-property: color, box-shadow;
    transition-timing-function: var(--tw-ease, ease);
    transition-duration: var(--tw-duration, 0s);
    --tw-outline-style: none;
    outline-style: none;
    & *::selection {
      background-color: var(--primary);
    }
    &::selection {
      background-color: var(--primary);
    }
    & *::selection {
      color: var(--primary-foreground);
    }
    &::selection {
      color: var(--primary-foreground);
    }
    &::placeholder {
      color: var(--muted-foreground);
    }
    &:focus-visible {
      border-color: var(--ring);
    }
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
        var(--tw-ring-color, currentcolor);
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:focus-visible {
      --tw-ring-color: var(--ring);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
      }
    }
    &:disabled {
      pointer-events: none;
    }
    &:disabled {
      cursor: not-allowed;
    }
    &:disabled {
      opacity: 50%;
    }
    &[aria-invalid="true"] {
      border-color: var(--destructive);
    }
    &[aria-invalid="true"] {
      --tw-ring-color: var(--destructive);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--destructive) 20%, transparent);
      }
    }
    @media (width >= 48rem) {
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
    }
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
    &:is(.dark *) {
      &[aria-invalid="true"] {
        --tw-ring-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--destructive) 40%, transparent);
        }
      }
    }
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-value {
    height: calc(0.25rem * 9);
    min-width: calc(0.25rem * 0);
    border-radius: calc(var(--radius) - 2px);
    border-style: var(--tw-border-style);
    border-width: 1px;
    border-color: var(--input);
    background-color: transparent;
    padding-inline: calc(0.25rem * 3);
    padding-block: calc(0.25rem * 1);
    font-size: 1rem;
    line-height: var(--tw-leading, calc(1.5 / 1));
    --tw-shadow: 0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05));
    box-shadow:
      var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
      var(--tw-ring-shadow), var(--tw-shadow);
    transition-property: color, box-shadow;
    transition-timing-function: var(--tw-ease, ease);
    transition-duration: var(--tw-duration, 0s);
    --tw-outline-style: none;
    outline-style: none;
    & *::selection {
      background-color: var(--primary);
    }
    &::selection {
      background-color: var(--primary);
    }
    & *::selection {
      color: var(--primary-foreground);
    }
    &::selection {
      color: var(--primary-foreground);
    }
    &::placeholder {
      color: var(--muted-foreground);
    }
    &:focus-visible {
      border-color: var(--ring);
    }
    &:focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(3px + var(--tw-ring-offset-width))
        var(--tw-ring-color, currentcolor);
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:focus-visible {
      --tw-ring-color: var(--ring);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--ring) 50%, transparent);
      }
    }
    &:disabled {
      pointer-events: none;
    }
    &:disabled {
      cursor: not-allowed;
    }
    &:disabled {
      opacity: 50%;
    }
    &[aria-invalid="true"] {
      border-color: var(--destructive);
    }
    &[aria-invalid="true"] {
      --tw-ring-color: var(--destructive);
      @supports (color: color-mix(in lab, red, red)) {
        --tw-ring-color: color-mix(in oklab, var(--destructive) 20%, transparent);
      }
    }
    @media (width >= 48rem) {
      font-size: 0.875rem;
      line-height: var(--tw-leading, calc(1.25 / 0.875));
    }
    &:is(.dark *) {
      background-color: var(--input);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--input) 30%, transparent);
      }
    }
    &:is(.dark *) {
      &[aria-invalid="true"] {
        --tw-ring-color: var(--destructive);
        @supports (color: color-mix(in lab, red, red)) {
          --tw-ring-color: color-mix(in oklab, var(--destructive) 40%, transparent);
        }
      }
    }
  }
  .dt-button-background {
    position: fixed;
    inset: calc(0.25rem * 0);
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--background);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background) 50%, transparent);
    }
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,)
      var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,)
      var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,)
      var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,)
      var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,)
      var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,)
      var(--tw-backdrop-sepia,);
  }
  .dt-button-down-arrow {
    font-size: 10px;
  }
  .dt-button-collection {
    position: relative;
    [role="menu"] {
      position: absolute;
      top: calc(0.25rem * 7);
      left: calc(0.25rem * -20);
      display: flex;
      min-width: 200px;
      flex-direction: column;
      gap: calc(0.25rem * 1);
      border-radius: var(--radius);
      border-style: var(--tw-border-style);
      border-width: 1px;
      background-color: var(--background);
      padding: calc(0.25rem * 2);
      --tw-shadow:
        0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)),
        0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
      box-shadow:
        var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),
        var(--tw-ring-shadow), var(--tw-shadow);
      &::before {
        content: var(--tw-content);
        margin-inline: calc(0.25rem * 2);
      }
      &::before {
        content: var(--tw-content);
        margin-bottom: calc(0.25rem * 2);
      }
      &::before {
        content: var(--tw-content);
        font-size: 0.75rem;
        line-height: var(--tw-leading, calc(1 / 0.75));
      }
      &::before {
        content: var(--tw-content);
        color: var(--muted-foreground);
        @supports (color: color-mix(in lab, red, red)) {
          color: color-mix(in oklab, var(--muted-foreground) 70%, transparent);
        }
      }
      &::before {
        --tw-content: "Select columns";
        content: var(--tw-content);
      }
      button {
        height: calc(0.25rem * 8);
        justify-content: space-between;
        border-radius: calc(var(--radius) - 4px);
        --tw-border-style: none;
        border-style: none;
        background-color: transparent;
        padding-inline: calc(0.25rem * 4);
        font-size: 0.75rem;
        line-height: var(--tw-leading, calc(1 / 0.75));
        &:hover {
          @media (hover: hover) {
            background-color: var(--accent);
            @supports (color: color-mix(in lab, red, red)) {
              background-color: color-mix(in oklab, var(--accent) 30%, transparent);
            }
          }
        }
      }
      .dt-button.buttons-columnVisibility.dt-button-active {
        background-color: var(--accent);
        color: var(--accent-foreground);
        &::after {
          content: var(--tw-content);
          margin-left: auto;
        }
        &::after {
          --tw-content: "✓";
          content: var(--tw-content);
        }
        &:is(.dark *) {
          background-color: var(--accent);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--accent) 50%, transparent);
          }
        }
      }
    }
  }
  @property --tw-border-style {
    syntax: "*";
    inherits: false;
    initial-value: solid;
  }
  @property --tw-font-weight {
    syntax: "*";
    inherits: false;
  }
  @property --tw-shadow {
    syntax: "*";
    inherits: false;
    initial-value: 0 0 #0000;
  }
  @property --tw-shadow-color {
    syntax: "*";
    inherits: false;
  }
  @property --tw-shadow-alpha {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }
  @property --tw-inset-shadow {
    syntax: "*";
    inherits: false;
    initial-value: 0 0 #0000;
  }
  @property --tw-inset-shadow-color {
    syntax: "*";
    inherits: false;
  }
  @property --tw-inset-shadow-alpha {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }
  @property --tw-ring-color {
    syntax: "*";
    inherits: false;
  }
  @property --tw-ring-shadow {
    syntax: "*";
    inherits: false;
    initial-value: 0 0 #0000;
  }
  @property --tw-inset-ring-color {
    syntax: "*";
    inherits: false;
  }
  @property --tw-inset-ring-shadow {
    syntax: "*";
    inherits: false;
    initial-value: 0 0 #0000;
  }
  @property --tw-ring-inset {
    syntax: "*";
    inherits: false;
  }
  @property --tw-ring-offset-width {
    syntax: "<length>";
    inherits: false;
    initial-value: 0px;
  }
  @property --tw-ring-offset-color {
    syntax: "*";
    inherits: false;
    initial-value: #fff;
  }
  @property --tw-ring-offset-shadow {
    syntax: "*";
    inherits: false;
    initial-value: 0 0 #0000;
  }
  @property --tw-backdrop-blur {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-brightness {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-contrast {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-grayscale {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-hue-rotate {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-invert {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-opacity {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-saturate {
    syntax: "*";
    inherits: false;
  }
  @property --tw-backdrop-sepia {
    syntax: "*";
    inherits: false;
  }
  @property --tw-content {
    syntax: "*";
    inherits: false;
    initial-value: "";
  }
  @property --tw-translate-x {
    syntax: "*";
    inherits: false;
    initial-value: 0;
  }
  @property --tw-translate-y {
    syntax: "*";
    inherits: false;
    initial-value: 0;
  }
  @property --tw-translate-z {
    syntax: "*";
    inherits: false;
    initial-value: 0;
  }
  @property --tw-space-x-reverse {
    syntax: "*";
    inherits: false;
    initial-value: 0;
  }
  @layer properties {
    @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or
      ((-moz-orient: inline) and (not (color: rgb(from red r g b)))) {
      *,
      ::before,
      ::after,
      ::backdrop {
        --tw-border-style: solid;
        --tw-font-weight: initial;
        --tw-shadow: 0 0 #0000;
        --tw-shadow-color: initial;
        --tw-shadow-alpha: 100%;
        --tw-inset-shadow: 0 0 #0000;
        --tw-inset-shadow-color: initial;
        --tw-inset-shadow-alpha: 100%;
        --tw-ring-color: initial;
        --tw-ring-shadow: 0 0 #0000;
        --tw-inset-ring-color: initial;
        --tw-inset-ring-shadow: 0 0 #0000;
        --tw-ring-inset: initial;
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-backdrop-blur: initial;
        --tw-backdrop-brightness: initial;
        --tw-backdrop-contrast: initial;
        --tw-backdrop-grayscale: initial;
        --tw-backdrop-hue-rotate: initial;
        --tw-backdrop-invert: initial;
        --tw-backdrop-opacity: initial;
        --tw-backdrop-saturate: initial;
        --tw-backdrop-sepia: initial;
        --tw-content: "";
        --tw-translate-x: 0;
        --tw-translate-y: 0;
        --tw-translate-z: 0;
        --tw-space-x-reverse: 0;
      }
    }
  }
</style>
