import DataTablesCore from "datatables.net";
import DataTable from "datatables.net-vue3";
import JSZip from "jszip";

import "datatables.net-buttons";
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

// @ts-expect-error - We are not creating a declaration file for this library
window.JSZip = JSZip;

DataTable.use(DataTablesCore);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("DataTable", DataTable);
});
