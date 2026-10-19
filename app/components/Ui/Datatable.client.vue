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
  import "datatables.net-buttons-dt";
  import "datatables.net-colreorder-dt";
  import "datatables.net-fixedcolumns-dt";
  import "datatables.net-fixedheader-dt";
  import "datatables.net-responsive-dt";
  import "datatables.net-rowgroup-dt";
  import "datatables.net-rowreorder-dt";
  import "datatables.net-searchbuilder-dt";
  import "datatables.net-select-dt";
  import DataTable from "datatables.net-vue3";
  import JSZip from "jszip";
  import type { HTMLAttributes } from "vue";

  // DataTables 3 does not load CSS from its JS. Each extension ships a stylesheet in its `-dt`
  // package. Import the stylesheet of any extension you register, next to its JS import above.
  import "datatables.net-buttons-dt/css/buttons.dataTables.css";
  import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
  import "datatables.net-dt/css/dataTables.dataTables.css";
  import "datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css";
  import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.css";
  import "datatables.net-responsive-dt/css/responsive.dataTables.css";
  import "datatables.net-rowgroup-dt/css/rowGroup.dataTables.css";
  import "datatables.net-rowreorder-dt/css/rowReorder.dataTables.css";
  import "datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.css";
  import "datatables.net-select-dt/css/select.dataTables.css";

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

  DataTable.use(DataTablesCore);

  // Excel export needs JSZip.
  DataTablesCore.Buttons.jszip(JSZip);

  // PDF export needs pdfmake (~2MB with its fonts). The Buttons extension only checks that a
  // pdfmake object exists when the table starts, so register a tiny stand-in and load the real
  // library the first time someone exports a PDF. Nothing is downloaded until then.
  let pdfMakeLoader: Promise<any> | undefined;
  const loadPdfMake = () =>
    (pdfMakeLoader ??= Promise.all([
      // @ts-expect-error - pdfmake does not ship type declarations
      import("pdfmake/build/pdfmake.min.js"),
      // @ts-expect-error - pdfmake does not ship type declarations
      import("pdfmake/build/vfs_fonts.js"),
    ]).then(([pdfMake, vfs]) => {
      const lib = pdfMake.default ?? pdfMake;
      lib.addVirtualFileSystem(vfs.default ?? vfs);
      return lib;
    }));

  DataTablesCore.Buttons.pdfMake({
    createPdf: (doc: unknown) => ({
      download: (fileName?: string) =>
        loadPdfMake().then((lib) => lib.createPdf(doc).download(fileName)),
      open: () => loadPdfMake().then((lib) => lib.createPdf(doc).open()),
    }),
  });
</script>

<script lang="ts" setup generic="T extends Record<string, any>">
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
       * Additional options for the DataTable. Use `layout` to place the search box, buttons, paging
       * and other features around the table.
       *
       * @see https://datatables.net/reference/option/layout
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
  /*
   * DataTables 3 styles itself with CSS variables. The block below points those variables at the
   * shadcn tokens, so light/dark mode and every `theme-*` class work without extra rules.
   *
   * They are set on `:root:root` (and `:root:root.dark`) rather than plain `:root` so that they win
   * over the library's own `:root` / `:root.dark` values whatever the stylesheet order. Some of its
   * variables reference each other (e.g. `--dtb-button_border-radius-hover`), and those references
   * are resolved on `:root`, so overriding them lower down the tree would not reach them.
   */
  :root:root,
  :root:root.dark {
    --dt-control_color: var(--foreground);
    --dt-html_background: var(--background);
    --dt-header_border: 1px solid var(--border);
    --dt-header_padding: 0.75rem 1.5rem;
    --dt-footer_border: 1px solid var(--border);
    --dt-footer_padding: 0.75rem 1.5rem;
    --dt-body_border: 1px solid var(--border);
    --dt-body_padding: 0.75rem 1.5rem;
    --dt-input_border: 1px solid var(--input);
    --dt-input_border-radius: calc(var(--radius) - 2px);
    --dt-input_padding: 0.25rem 0.75rem;
    --dt-input_background: transparent;
    --dt-order-arrow_color: var(--foreground);
    --dt-order-arrow_color-current: var(--foreground);
    --dt-order-header_outline-hover: none;
    --dt-paging-button_padding: 0 0.5rem;
    --dt-paging-button_margin-left: 0;
    --dt-paging-button_border-radius: calc(var(--radius) - 2px);
    --dt-paging-button_box-shadow-active: none;
    --dt-paging-button_background: transparent;
    --dt-paging-button_border: 1px solid transparent;
    --dt-paging-button_color: var(--foreground);
    --dt-paging-button_background-hover: var(--muted);
    --dt-paging-button_border-hover: 1px solid transparent;
    --dt-paging-button_color-hover: var(--foreground);
    --dt-paging-button_background-current: var(--muted);
    --dt-paging-button_border-current: 1px solid var(--border);
    --dt-paging-button_color-current: var(--foreground);
    --dt-paging-button_background-current-hover: var(--muted);
    --dt-paging-button_border-current-hover: 1px solid var(--border);
    --dt-paging-button_color-current-hover: var(--foreground);
    --dt-paging-button_background-disabled: transparent;
    --dt-paging-button_border-disabled: 1px solid transparent;
    --dt-paging-button_color-disabled: color-mix(
      in oklab,
      var(--muted-foreground) 60%,
      transparent
    );

    --dtb-button_background: var(--background);
    --dtb-button_border: 1px solid var(--input);
    --dtb-button_border-radius: calc(var(--radius) - 2px);
    --dtb-button_border-radius-hover: calc(var(--radius) - 2px);
    --dtb-button_border-radius-active: calc(var(--radius) - 2px);
    --dtb-button_border-radius-active-hover: calc(var(--radius) - 2px);
    --dtb-button_box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --dtb-button_box-shadow-hover: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --dtb-button_box-shadow-active: none;
    --dtb-button_box-shadow-active-hover: none;
    --dtb-button_color: var(--foreground);
    --dtb-button_background-hover: var(--accent);
    --dtb-button_border-hover: 1px solid var(--input);
    --dtb-button_color-hover: var(--accent-foreground);
    --dtb-button_background-active: var(--accent);
    --dtb-button_border-active: 1px solid var(--input);
    --dtb-button_color-active: var(--accent-foreground);
    --dtb-button_background-active-hover: var(--accent);
    --dtb-button_border-active-hover: 1px solid var(--input);
    --dtb-button_color-active-hover: var(--accent-foreground);
    --dtb-collection_background-color: var(--popover);
    --dtb-collection_border: 1px solid var(--border);
    --dtb-collection_box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    --dtr-control-triangle_color: color-mix(in oklab, var(--foreground) 50%, transparent);
    --dtr-details-list_border-bottom: 1px solid var(--border);
    --dtr-modal_background: var(--background);
    --dtr-modal_border: 1px solid var(--border);
    --dtr-modal_border-radius: var(--radius);
    --dtr-modal-background_background: color-mix(in oklab, var(--background) 60%, transparent);

    --dtrg-group-level-0_background: color-mix(in oklab, var(--muted) 70%, transparent);
    --dtrg-group-level-1_background: color-mix(in oklab, var(--muted) 40%, transparent);
    --dtrg-group-level-2_background: color-mix(in oklab, var(--muted) 40%, transparent);
    --dtrg-group-level-3_background: color-mix(in oklab, var(--muted) 40%, transparent);
    --dtrg-group-level-4_background: color-mix(in oklab, var(--muted) 40%, transparent);
    --dtrg-group-level-5_background: color-mix(in oklab, var(--muted) 40%, transparent);

    --dtrr-move_outline-color: var(--ring);
    --dtrr-moved_outline-color: var(--ring);

    --dtfc_background: var(--background);
  }

  /* Table */
  div.dt-container {
    width: 100%;
  }
  div.dt-container table.dataTable thead th,
  div.dt-container table.dataTable tfoot th {
    color: var(--muted-foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
  div.dt-container table.dataTable tbody th,
  div.dt-container table.dataTable tbody td {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  div.dt-container table.dataTable.compact thead th,
  div.dt-container table.dataTable.compact thead td,
  div.dt-container table.dataTable.compact tfoot th,
  div.dt-container table.dataTable.compact tfoot td,
  div.dt-container table.dataTable.compact tbody th,
  div.dt-container table.dataTable.compact tbody td {
    padding: 0.5rem 1rem;
  }
  div.dt-container table.dataTable td.dt-empty {
    padding-block: 2rem;
    color: var(--muted-foreground);
  }
  div.dt-container table.dataTable td.dt-control {
    padding-right: 0;
  }

  /* Layout rows: a wrapping flex row per `layout` position */
  div.dt-container div.dt-layout-row {
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    margin: 0;
    padding-block: 0.75rem;
  }
  div.dt-container div.dt-layout-row:first-child {
    padding-top: 0;
  }
  div.dt-container div.dt-layout-row:last-child {
    padding-bottom: 0;
  }
  div.dt-container div.dt-layout-row.dt-layout-table {
    padding-block: 0;
  }
  div.dt-container div.dt-layout-table > .dt-layout-cell {
    overflow-x: auto;
  }
  div.dt-container div.dt-layout-start > *:not(:last-child),
  div.dt-container div.dt-layout-end > *:not(:first-child) {
    margin-inline: 0;
  }
  div.dt-container div.dt-layout-cell {
    gap: 0.75rem;
  }

  /* Search, page length and info */
  div.dt-container .dt-search,
  div.dt-container .dt-length {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--muted-foreground);
  }
  div.dt-container .dt-search input,
  div.dt-container .dt-input {
    height: 2.25rem;
    margin: 0;
    min-width: 0;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    color: var(--foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
    transition:
      color 150ms,
      box-shadow 150ms;
  }
  div.dt-container .dt-search input::placeholder {
    color: var(--muted-foreground);
  }
  div.dt-container .dt-search input:focus-visible,
  div.dt-container .dt-input:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent);
  }
  :root.dark div.dt-container .dt-search input,
  :root.dark div.dt-container .dt-input {
    background-color: color-mix(in oklab, var(--input) 30%, transparent);
  }
  :root.dark div.dt-container .dt-input option {
    background-color: var(--popover);
    color: var(--popover-foreground);
  }
  div.dt-container .dt-info,
  div.dt-container span.select-info,
  div.dt-container span.select-item {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: var(--muted-foreground);
  }

  /* Paging */
  div.dt-container .dt-paging nav {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  div.dt-container .dt-paging .dt-paging-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    min-width: 2rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    outline: none;
  }
  div.dt-container .dt-paging .dt-paging-button:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent);
  }
  div.dt-container .dt-paging .ellipsis {
    padding: 0 0.5rem;
  }

  /* Loading overlay */
  div.dt-container div.dt-processing {
    inset: 0;
    z-index: 10;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    background-color: color-mix(in oklab, var(--background) 60%, transparent);
    backdrop-filter: blur(4px);
  }
  /* DataTables toggles `display` inline to show and hide the overlay, so centre the dots without it */
  div.dt-container div.dt-processing > div:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0;
    transform: translate(-50%, -50%);
  }
  div.dt-container div.dt-processing > div:last-child > div {
    background: var(--primary);
  }

  /* Selection */
  table.dataTable > tbody > tr > .selected {
    background-color: color-mix(in oklab, var(--primary) 10%, transparent);
    color: inherit;
  }
  table.dataTable input.dt-select-checkbox {
    position: relative;
    flex: none;
    width: 1rem;
    height: 1rem;
    margin: 0;
    border: 1px solid var(--input);
    border-radius: 4px;
    background-color: transparent;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    font-size: 0;
    cursor: pointer;
    outline: none;
  }
  table.dataTable input.dt-select-checkbox:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent);
  }
  table.dataTable input.dt-select-checkbox:checked,
  table.dataTable input.dt-select-checkbox:indeterminate,
  table.dataTable > tbody > tr.selected input.dt-select-checkbox:checked {
    border-color: var(--primary);
    background-color: var(--primary);
  }
  table.dataTable input.dt-select-checkbox:checked:after,
  table.dataTable input.dt-select-checkbox:indeterminate:after {
    position: absolute;
    inset: 0;
    display: block;
    width: auto;
    height: auto;
    margin: 0;
    border-radius: 0;
    content: "";
    background-color: var(--primary-foreground);
    mask: var(--dt-check-icon) center / 0.75rem no-repeat;
  }
  table.dataTable input.dt-select-checkbox:checked:after {
    --dt-check-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E");
  }
  table.dataTable input.dt-select-checkbox:indeterminate:after {
    --dt-check-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3' stroke-linecap='round'%3E%3Cpath d='M5 12h14'/%3E%3C/svg%3E");
  }

  /* Buttons (copy, csv, colvis, ...) */
  div.dt-container div.dt-buttons {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
  div.dt-buttons > .dt-button,
  div.dt-buttons > div.dt-button-split .dt-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 2.25rem;
    margin: 0;
    padding: 0 1rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    outline: none;
    transition:
      color 150ms,
      background-color 150ms,
      box-shadow 150ms;
  }
  div.dt-buttons > .dt-button:focus-visible {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent);
  }
  :root.dark div.dt-buttons > .dt-button:not(.disabled) {
    border-color: var(--input);
    background-color: color-mix(in oklab, var(--input) 30%, transparent);
  }
  :root.dark div.dt-buttons > .dt-button:hover:not(.disabled) {
    background-color: color-mix(in oklab, var(--input) 50%, transparent);
  }
  div.dt-buttons span.dt-button-down-arrow {
    top: 0;
    padding-left: 0;
  }

  /* Column visibility / button collections */
  div.dt-button-collection {
    width: auto;
    min-width: 12rem;
    padding: 0.25rem;
    border-radius: var(--radius);
    color: var(--popover-foreground);
  }
  div.dt-button-collection .dt-button {
    padding: 0.375rem 2rem 0.375rem 0.5rem;
    border-radius: calc(var(--radius) - 4px);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  div.dt-button-collection .dt-button:hover:not(.disabled) {
    background: var(--accent);
    color: var(--accent-foreground);
  }
  div.dt-button-collection .dt-button-active:after {
    margin-top: -0.625rem;
    right: 0.5rem;
  }
  div.dt-button-info {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background-color: var(--popover);
    color: var(--popover-foreground);
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  /* Responsive child rows and modal */
  table.dataTable > tbody > tr.child ul.dtr-details > li {
    padding: 0.75rem 1.5rem;
  }
  table.dataTable > tbody > tr.child span.dtr-title {
    min-width: 6rem;
    font-weight: 500;
  }
  div.dtr-modal div.dtr-modal-display {
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  /* Row groups */
  table.dataTable tr.dtrg-group th {
    color: var(--foreground);
    font-size: 0.875rem;
    font-weight: 600;
  }

  /* Fixed header */
  div.dtfh-floatingparent {
    z-index: 10;
    background-color: color-mix(in oklab, var(--background) 90%, transparent);
    backdrop-filter: blur(8px);
  }

  /* Search builder */
  div.dtsb-searchBuilder {
    margin-bottom: 1rem;
  }
  div.dtsb-searchBuilder div.dtsb-titleRow div.dtsb-title {
    font-size: 0.875rem;
    color: var(--muted-foreground);
  }
  div.dtsb-searchBuilder button.dtsb-button,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-dropDown,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-input {
    min-height: 2.25rem;
    border: 1px solid var(--input);
    border-radius: calc(var(--radius) - 2px);
    background: var(--background);
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    color: var(--foreground);
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  div.dtsb-searchBuilder button.dtsb-button:hover {
    background: var(--accent);
    color: var(--accent-foreground);
  }
  div.dtsb-searchBuilder div.dtsb-logicContainer,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-logicContainer {
    border: 1px solid var(--input);
    border-radius: calc(var(--radius) - 2px);
    background: transparent;
  }
  div.dtsb-searchBuilder div.dtsb-logicContainer button {
    border: 0;
    background: transparent;
    box-shadow: none;
  }
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-condition,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-data,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria select.dtsb-value,
  div.dtsb-searchBuilder div.dtsb-group div.dtsb-criteria input.dtsb-value {
    border-color: var(--input);
  }

  /*
   * The library marks a few rules `!important` (selected rows, dark search builder). A layered
   * `!important` declaration beats an unlayered one, which lets these overrides win without
   * escalating selector specificity.
   */
  @layer dt-overrides {
    table.dataTable > tbody > tr.selected > * {
      box-shadow: inset 0 0 0 9999px color-mix(in oklab, var(--primary) 10%, transparent) !important;
      color: inherit !important;
    }
    table.dataTable > tbody > tr.selected a {
      color: var(--primary) !important;
    }
    table.dataTable > tbody > tr.selected + tr.selected > td {
      border-top-color: color-mix(in oklab, var(--primary) 30%, transparent) !important;
    }
    table.dataTable input.dt-select-checkbox:indeterminate:after {
      background-color: var(--primary-foreground) !important;
    }
    html.dark div.dtsb-searchBuilder button.dtsb-button,
    html.dark div.dtsb-searchBuilder select.dtsb-dropDown,
    html.dark div.dtsb-searchBuilder input.dtsb-input {
      background-color: color-mix(in oklab, var(--input) 30%, transparent) !important;
    }
    div.dtsb-searchBuilder .dtsb-greyscale,
    html.dark div.dtsb-searchBuilder .dtsb-greyscale {
      border-color: var(--input) !important;
    }
  }
</style>
