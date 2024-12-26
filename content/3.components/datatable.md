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
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js" },
      ],
    },
  },
```

If you are not going to use the PDF export feature, you can remove the `script` tags from your `nuxt.config.ts` file.

## Usage

### Dom

Take note of how the [`dom`](https://datatables.net/reference/option/dom) option is configured in the code. We use it to structure the layout of the table.

::ShowCase

:DocsDatatableBasic

#code

```vue [DocsDatatableBasic.vue]
<template>
  <div>
    <UiDatatable @ready="tableRef = $event" :data="users" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import type { Config } from "datatables.net";
  import type DataTableRef from "datatables.net";

  const options: Config = {
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5 lg:pr-1'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
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
          return row.id?.value ? row.id?.value : "N/A";
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
  };

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

### Custom component

With the new version of DataTables.net, you can now use custom Vue components in your table.

::ShowCase

:DocsDatatableComponent

#code

```vue [DocsDatatableComponent.vue]
<template>
  <div>
    <UiDatatable :options="options" :columns="columns" :data="users">
      <template #actions="{ cellData }: { cellData: Staff }">
        <UiButton
          class="h-7 text-xs"
          size="sm"
          @click.stop="
            useSonner('Editing...', {
              description: `You are editing the user ${cellData?.name}.`,
            })
          "
          >Edit</UiButton
        >
      </template>
    </UiDatatable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { DataTablesNamedSlotProps } from "~/components/Ui/Datatable.client.vue";
  import type { Config, ConfigColumns } from "datatables.net";

  interface Staff {
    name: string;
    position: string;
    office: string;
    age: number;
    start_date: string;
    salary: string;
  }

  const { data: users } = await useAsyncData<Staff[]>(
    "fakerUsers",
    () => {
      return new Promise((resolve) => {
        // create 1000 fake users
        const users = Array.from({ length: 1000 }, () => {
          return {
            name: faker.person.fullName(),
            position: faker.person.jobTitle(),
            office: faker.location.city(),
            age: faker.number.int(100),
            start_date: useDateFormat(faker.date.past().toISOString(), "MMMM DD, YYYY").value,
            salary: faker.finance.amount({ symbol: "$" }),
          };
        });
        resolve(users);
      });
    },
    { default: () => [] }
  );

  const columns: ConfigColumns[] = [
    { data: "name", title: "Name" },
    { data: "position", title: "Position" },
    { data: "office", title: "Office" },
    { data: "age", title: "Age" },
    { data: "start_date", title: "Start date" },
    { data: "salary", title: "Salary" },
    {
      data: null,
      title: "",
      className: "no-export",
      searchable: false,
      orderable: false,
      name: "actions",
      render: "#actions",
      responsivePriority: 1,
    },
  ];

  const options: Config = {
    buttons: [
      {
        extend: "colvis",
        text: "Columns",
        columns: ":not(.no-export)",
      },
      "copy",
      "excel",
      "pdf",
      "print",
      "csv",
    ],
    dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
    responsive: true,
    autoWidth: true,
    select: true,
  };
</script>
```

::

### Layout

The new version of DataTables.net also allows you to use custom layouts for your table.

You can read more about it [here](https://datatables.net/reference/option/layout)

For this, you will actually need to add some custom classes for things to look how you want.

::ShowCase

:DocsDatatableLayout

#code

```vue [DocsDatatableLayout.vue]
<template>
  <div>
    <UiDatatable :options="options" :columns="columns" :data="users">
      <template #actions="{ cellData }: { cellData: Staff }">
        <UiButton
          class="h-7 text-xs"
          size="sm"
          @click.stop="
            useSonner('Editing...', {
              description: `You are editing the user ${cellData?.name}.`,
            })
          "
          >Edit</UiButton
        >
      </template>
    </UiDatatable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config, ConfigColumns } from "datatables.net";

  interface Staff {
    name: string;
    position: string;
    office: string;
    age: number;
    start_date: string;
    salary: string;
  }

  const { data: users } = await useAsyncData<Staff[]>(
    "fakerUsers",
    () => {
      return new Promise((resolve) => {
        // create 1000 fake users
        const users = Array.from({ length: 1000 }, () => {
          return {
            name: faker.person.fullName(),
            position: faker.person.jobTitle(),
            office: faker.location.city(),
            age: faker.number.int(100),
            start_date: useDateFormat(faker.date.past().toISOString(), "MMMM DD, YYYY").value,
            salary: faker.finance.amount({ symbol: "$" }),
          };
        });
        resolve(users);
      });
    },
    { default: () => [] }
  );

  const columns: ConfigColumns[] = [
    { data: "name", title: "Name" },
    { data: "position", title: "Position" },
    { data: "office", title: "Office" },
    { data: "age", title: "Age" },
    { data: "start_date", title: "Start date" },
    { data: "salary", title: "Salary" },
    {
      data: null,
      title: "",
      className: "no-export",
      searchable: false,
      orderable: false,
      name: "actions",
      render: "#actions",
      responsivePriority: 1,
    },
  ];

  const options: Config = {
    buttons: [
      {
        extend: "colvis",
        text: "Columns",
        columns: ":not(.no-export)",
      },
      "copy",
      "excel",
      "pdf",
      "print",
      "csv",
    ],

    responsive: true,
    autoWidth: true,
    select: true,
    layout: {
      top1: "searchBuilder",
      top1Start: {
        buttons: true,
      },
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: {
        paging: true,
      },
    },
  };
</script>
```

::
