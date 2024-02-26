---
title: DataTable
description: DataTables is a plug-in for the jQuery Javascript library. It is a highly flexible tool, built upon the foundations of progressive enhancement, that adds all of these advanced features to any HTML table.
links:
  - title: DataTables.net
    href: https://datatables.net/
    icon: "devicon:jquery"
  - title: Vue DataTables Docs
    href: https://datatables.net/blog/2022-06-22-vue
    icon: "logos:vue"
---

## Source code

Click :SourceCodeLink{component="Datatable.client.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add datatable
```

Adding this component will also add a plugin called `datatables.client.ts` with the following content:

```ts
import DataTablesCore from "datatables.net";
import DataTable from "datatables.net-vue3";
import JSZip from "jszip";

import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "datatables.net-responsive-dt";
import "datatables.net-searchbuilder-dt";
import "datatables.net-select-dt";

// @ts-ignore
window.JSZip = JSZip;

DataTable.use(DataTablesCore);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("DataTable", DataTable);
});
```

This plugin will register the following extensions from the [DataTables.net](https://datatables.net/) library:

- [Buttons](https://datatables.net/extensions/buttons/)
- [Responsive](https://datatables.net/extensions/responsive/)
- [SearchBuilder](https://datatables.net/extensions/searchbuilder/)
- [Select](https://datatables.net/extensions/select/)

Feel free to remove any of these extensions if you don't need them.

It will also update your `nuxt.config.ts` file with the following content:

```ts
app: {
    head: {
      script: [
        // Add pdfmake scripts for DataTables.net export buttons
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js" },
      ],
    },
  },
```

If you are not going to use the PDF export feature, you can remove the `script` tags from your `nuxt.config.ts` file.

Also, adding this component will override the version of `datatables.net` & `datatables.net-dt` in your `package.json` file to the latest version `1.3.10`.

```json
{
  "overrides": {
    "datatables.net": "1.13.10",
    "datatables.net-dt": "1.13.10"
  }
}
```

## Usage

Take note of how the [`dom`](https://datatables.net/reference/option/dom) option is configured in the code. We use it to structure the layout of the table.

::ShowCase{component="DocsDatatableBasic"}

#code

```vue [DocsDatatableBasic.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDatatable @ready="tableRef = $event" :data="users" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import type { Config } from "datatables.net";
  import type DataTableRef from "datatables.net";

  const options = ref<Config>({
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-center lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    select: true,
    autoWidth: true,
    responsive: true,

    buttons: [
      "copy",
      "csv",
      "excel",
      "pdf",
      "print",
      {
        text: "Select all",
        action: function (e, dt, node, config) {
          dt.rows().select();
        },
      },
    ],
    columns: [
      {
        data: "id.value",
        title: "ID",
        render(data, type, row, meta) {
          return row.id.value ?? "N/A";
        },
      },
      { data: "name.first", title: "First Name" },
      { data: "name.last", title: "Last Name" },
      { data: "email", title: "Email" },
      { data: "phone", title: "Phone" },
      {
        data: "dob.date",
        title: "DOB",
        render(data, type, row, meta) {
          const formattedDob = useDateFormat(row.dob.date, "MMM DD, YYYY [at] h:mm A");
          return formattedDob.value;
        },
      },
      { data: "location.city", title: "City" },
      { data: "location.country", title: "Country" },
    ],
  });

  const { data: users } = await useAsyncData(
    "randomUsers",
    () => $fetch<any>("https://randomuser.me/api/?results=100"),
    {
      transform: (v: any) => v.results,
      default: () => [],
    }
  );

  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | null>(null);
</script>
```

::
