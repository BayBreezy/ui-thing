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
label: New Examples
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

// @ts-expect-error - We are not creating a declaration file for this library
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

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableBasic.vue" code lang="vue" -->

```vue [DocsDatatableBasic.vue]
<template>
  <div>
    <UiDatatable :data="users" :options="options" @ready="tableRef = $event" />
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
        action: function (e, dt, _, __) {
          dt.rows().select();
        },
      },
    ],
    columns: [
      {
        data: "id.value",
        title: "ID",
        render(_, __, row, ___) {
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
        render(_, __, row, ___) {
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

<!-- /automd -->

::

### Custom component

With the new version of DataTables.net, you can now use custom Vue components in your table.

::ShowCase

:DocsDatatableComponent

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableComponent.vue" code lang="vue" -->

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

<!-- /automd -->

::

### Layout

The new version of DataTables.net also allows you to use custom layouts for your table.

You can read more about it [here](https://datatables.net/reference/option/layout)

For this, you will actually need to add some custom classes for things to look how you want.

::ShowCase

:DocsDatatableLayout

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableLayout.vue" code lang="vue" -->

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
        features: {
          buttons: true,
        },
        className: tw`pb-5`,
      },
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: {
        features: [
          {
            paging: true,
          },
        ],
        className: tw`pt-5`,
      },
    },
  };
</script>
```

<!-- /automd -->

::

### Simple

::ShowCase

:DocsDatatableSimple

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableSimple.vue" code lang="vue" -->

```vue [DocsDatatableSimple.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <UiDatatable :data="data" :options />
  <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
    <p>Total</p>
    <p>
      {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
    </p>
  </div>
</template>
```

<!-- /automd -->

::

### Image

::ShowCase

:DocsDatatableImages

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableImages.vue" code lang="vue" -->

```vue [DocsDatatableImages.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 5 }, (item, index) => {
        return {
          id: index + 1,
          name: faker.person.fullName(),
          username: faker.internet.username().toLowerCase(),
          image: faker.image.avatar().toLowerCase(),
          email: faker.internet.email()?.toLowerCase(),
          location: faker.location.city(),
          status: faker.helpers.arrayElement(["Active", "Inactive"]),
          balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
        };
      });
    },
    { default: () => [] }
  );

  type Item = (typeof data.value)[0];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      {
        title: "Name",
        data: null,
        render: {
          _: "name",
          display: "#name",
        },
        searchable: false,
      },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <UiDatatable :data="data" :options>
    <template #name="{ cellData }: { cellData: Item }">
      <div class="flex items-center gap-3">
        <UiAvatar class="size-10" :src="cellData.image" :alt="cellData.name" />
        <div>
          <div class="font-medium">{{ cellData.name }}</div>
          <span class="mt-0.5 text-xs text-muted-foreground">@{{ cellData.username }}</span>
        </div>
      </div>
    </template>
  </UiDatatable>
</template>
```

<!-- /automd -->

::

### No Horizontal

::ShowCase

:DocsDatatableNoHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableNoHorizontal.vue" code lang="vue" -->

```vue [DocsDatatableNoHorizontal.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <UiDatatable class="nowrap hover" :data="data" :options />
  <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
    <p>Total</p>
    <p>
      {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
    </p>
  </div>
</template>

<style scoped>
  :deep(table.dataTable td) {
    border-bottom-width: 0px;
    border-top-width: 0px;
  }
</style>
```

<!-- /automd -->

::

### Striped

::ShowCase

:DocsDatatableStriped

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableStriped.vue" code lang="vue" -->

```vue [DocsDatatableStriped.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <UiDatatable class="nowrap hover" :data="data" :options />
  <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
    <p>Total</p>
    <p>
      {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
    </p>
  </div>
</template>

<style scoped>
  :deep(table.dataTable td) {
    border-bottom-width: 0px;
    border-top-width: 0px;
  }
  :deep(table.dataTable tbody tr) {
    @apply border-none odd:bg-muted/50 hover:bg-transparent odd:hover:bg-muted/50;
  }
  :deep(table.dataTable tbody) {
    @apply [&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg;
    tr {
      @apply rounded-lg;
    }
  }
</style>
```

<!-- /automd -->

::

### Vertical Lines

::ShowCase

:DocsDatatableVerticalLines

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableVerticalLines.vue" code lang="vue" -->

```vue [DocsDatatableVerticalLines.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <UiDatatable class="nowrap hover cell-border" :data="data" :options />
  <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
    <p>Total</p>
    <p>
      {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
    </p>
  </div>
</template>

<style scoped>
  :deep(.dataTable.cell-border tr th) {
    @apply border-r first:border-l;
  }
</style>
```

<!-- /automd -->

::

### Dense

::ShowCase

:DocsDatatableDense

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableDense.vue" code lang="vue" -->

```vue [DocsDatatableDense.vue]
<script lang="ts" setup>
  import type { Config } from "datatables.net";

  const programmingLanguages = [
    {
      id: "1",
      name: "JavaScript",
      releaseYear: "1995",
      developer: "Brendan Eich",
      typing: "Dynamic",
      paradigm: "Multi-paradigm",
      extension: ".js",
      latestVersion: "ES2021",
      popularity: "High",
    },
    {
      id: "2",
      name: "Python",
      releaseYear: "1991",
      developer: "Guido van Rossum",
      typing: "Dynamic",
      paradigm: "Multi-paradigm",
      extension: ".py",
      latestVersion: "3.10",
      popularity: "High",
    },
    {
      id: "3",
      name: "Java",
      releaseYear: "1995",
      developer: "James Gosling",
      typing: "Static",
      paradigm: "Object-oriented",
      extension: ".java",
      latestVersion: "17",
      popularity: "High",
    },
    {
      id: "4",
      name: "C++",
      releaseYear: "1985",
      developer: "Bjarne Stroustrup",
      typing: "Static",
      paradigm: "Multi-paradigm",
      extension: ".cpp",
      latestVersion: "C++20",
      popularity: "High",
    },
    {
      id: "5",
      name: "Ruby",
      releaseYear: "1995",
      developer: "Yukihiro Matsumoto",
      typing: "Dynamic",
      paradigm: "Multi-paradigm",
      extension: ".rb",
      latestVersion: "3.0",
      popularity: "Low",
    },
  ];

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name", className: `font-semibold` },
      { title: "Release Year", data: "releaseYear" },
      { title: "Developer", data: "developer" },
      { title: "Typing", data: "typing" },
      { title: "Paradigm", data: "paradigm" },
      { title: "Extension", data: "extension" },
      { title: "Latest Version", data: "latestVersion" },
      { title: "Popularity", data: "popularity" },
    ],
  };
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-background">
    <UiDatatable class="nowrap compact hover" :data="programmingLanguages" :options />
  </div>
</template>

<style scoped>
  :deep(.dataTable thead tr) {
    @apply bg-muted/50;
  }
</style>
```

<!-- /automd -->

::

### Row Selection

::ShowCase

:DocsDatatableRowSelection

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableRowSelection.vue" code lang="vue" -->

```vue [DocsDatatableRowSelection.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
  };
</script>

<template>
  <UiDatatable :data="data" :options />
  <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
    <p>Total</p>
    <p>
      {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
    </p>
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
</style>
```

<!-- /automd -->

::

### Card

::ShowCase

:DocsDatatableCard

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableCard.vue" code lang="vue" -->

```vue [DocsDatatableCard.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
  };
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-background">
    <UiDatatable :data="data" :options />
    <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
      <p>Total</p>
      <p>
        {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
</style>
```

<!-- /automd -->

::

### Scroll with Sticky Header

::ShowCase

:DocsDatatableScrollY

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableScrollY.vue" code lang="vue" -->

```vue [DocsDatatableScrollY.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 30 }, (item, index) => ({
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    paging: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    scrollY: "300px",
  };
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-background">
    <UiDatatable :data="data" :options />
    <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
      <p>Total</p>
      <p>
        {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
  :deep(.dt-scroll-body table thead tr) {
    @apply first:hidden;
  }
</style>
```

<!-- /automd -->

::

### Badge & Icons

::ShowCase

:DocsDatatableBadge

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableBadge.vue" code lang="vue" -->

```vue [DocsDatatableBadge.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 30 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: {
          city: faker.location.city(),
          country: faker.location.country(),
          flag: faker.helpers.arrayElement(["🇺🇸", "🇨🇦", "🇬🇧", "🇦🇺", "🇳🇿"]),
        },
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      }));
    },
    { default: () => [] }
  );

  type Item = (typeof data.value)[0];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    paging: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      {
        title: "Location",
        data: null,
        render: {
          _: "location.city",
          display: "#location",
        },
      },
      {
        title: "Status",
        data: null,
        render: {
          _: "status",
          display: "#status",
        },
      },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    scrollY: "300px",
  };
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border bg-background">
    <UiDatatable :data="data" :options>
      <template #status="{ cellData }">
        <UiBadge :variant="cellData.status == 'Inactive' ? 'outline' : 'default'">{{
          cellData.status
        }}</UiBadge>
      </template>
      <template #location="{ cellData }: { cellData: Item }">
        <span
          >{{ cellData.location.flag }} {{ cellData.location.city }},
          {{ cellData.location.country }}</span
        >
      </template>
    </UiDatatable>
    <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
      <p>Total</p>
      <p>
        {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
  :deep(.dt-scroll-body table thead tr) {
    @apply first:hidden;
  }
</style>
```

<!-- /automd -->

::

### Search & Sort

::ShowCase

:DocsDatatableSearchSort

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableSearchSort.vue" code lang="vue" -->

```vue [DocsDatatableSearchSort.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 8 }, (item, index) => ({
        id: index + 1,
        keyword: faker.lorem.sentence({ min: 3, max: 5 }),
        intents: faker.helpers.arrayElements(
          ["Informational", "Navigational", "Commercial", "Transactional"],
          { min: 1, max: 2 }
        ),
        volume: faker.number.int({ max: 2000, min: 100 }),
        cpc: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }),
        traffic: faker.number.int({ max: 100, min: 10 }),
        link: faker.internet.url({ protocol: "https" }),
      }));
    },
    { default: () => [] }
  );

  type Item = (typeof data.value)[0];
  const search = ref("");

  const filteredData = computed(() => {
    if (!search.value) return data.value;
    return data.value.filter((item) =>
      item.keyword.toLowerCase().includes(search.value.toLowerCase())
    );
  });

  const styles = {
    Informational: "bg-indigo-400/20 text-indigo-500",
    Navigational: "bg-emerald-400/20 text-emerald-500",
    Commercial: "bg-amber-400/20 text-amber-500",
    Transactional: "bg-rose-400/20 text-rose-500",
  } as const;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'overflow-hidden rounded-lg border border-border bg-background'<'${tw`overflow-auto`}'t>>`,
    paging: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "Keyword", data: "keyword", className: "font-semibold" },
      {
        title: "Intents",
        searchable: false,
        orderable: false,
        data: null,
        render: {
          _: "intents",
          display: "#intents",
        },
      },
      { data: "volume", title: "Volume" },
      {
        data: "cpc",
        title: "CPC",
        render(d) {
          return formatCurrency(d);
        },
      },
      { data: "traffic", title: "Traffic" },
      {
        title: "Link",
        orderable: false,
        data: null,
        render: {
          _: "link",
          display: "#link",
        },
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    order: [[1, "asc"]],
    language: {
      search: "",
      searchPlaceholder: "Search by keyword",
    },
  };
</script>

<template>
  <div>
    <div class="mb-6 flex items-center">
      <div class="w-full md:max-w-sm">
        <!-- You can use the built in search as well -->
        <UiVeeInput
          v-model="search"
          label="Keyword"
          placeholder="Search by keyword"
          icon="lucide:search"
        />
      </div>
    </div>

    <UiDatatable :data="filteredData" :options>
      <template #intents="{ cellData }: { cellData: Item }">
        <div class="flex gap-2">
          <span
            v-for="intent in cellData.intents"
            :key="intent"
            :class="[
              styles[intent],
              'flex size-5 items-center justify-center rounded text-xs font-medium',
            ]"
          >
            {{ intent[0] }}
          </span>
        </div>
      </template>
      <template #link="{ cellData }: { cellData: Item }">
        <a :href="cellData.link" target="_blank" class="hover:text-sky-500 hover:underline">
          {{ cellData.link }}
        </a>
      </template>
    </UiDatatable>
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
</style>
```

<!-- /automd -->

::

### Fixed Columns

this requires the fixedColumns plugin to be installed.

```bash
npm install --save datatables.net-fixedcolumns-dt
```

Then add the following to your `datatables` plugin file

```ts
import "datatables.net-fixedcolumns-dt";
import "datatables.net-fixedcolumns-dt/css/fixedColumns.dataTables.css";
```

::ShowCase

:DocsDatatableFixedColumn

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableFixedColumn.vue" code lang="vue" -->

```vue [DocsDatatableFixedColumn.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 8 }, (item, index) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName }).toLowerCase();
        return {
          id: index + 1,
          firstName,
          lastName,
          email,
          location: `${faker.location.city()} ${faker.location.country()}`,
          status: faker.helpers.arrayElement(["Active", "Inactive"]),
          balance: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }),
          department: faker.person.jobTitle(),
          joinDate: faker.date.past({ years: 2 }),
          lastActive: faker.date.recent({ days: 30 }),
        };
      });
    },
    { default: () => [] }
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'overflow-hidden rounded-lg border border-border bg-background'<'${tw`overflow-auto`}'t>>`,
    paging: false,
    ordering: false,
    columns: [
      { data: null, searchable: false, orderable: false, render: DataTable?.render?.select() },
      { title: "ID", data: "id", visible: false },
      { title: "First name", data: "firstName" },
      { title: "Last name", data: "lastName" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        render: (d) => formatCurrency(d),
      },
      { title: "Department", data: "department" },
      {
        title: "Join date",
        data: "joinDate",
        render: (d) => useDateFormat(d, "YYYY-MM-DD").value,
      },
      {
        title: "Last active",
        data: "lastActive",
        render: (d) => useDateFormat(d, "YYYY-MM-DD").value,
      },
    ],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    order: [[2, "asc"]],
    fixedColumns: {
      left: 2,
    },
    scrollCollapse: true,
    scrollX: true,
    scrollY: "300px",
  };
</script>

<template>
  <div>
    <UiDatatable :data="data" :options />
  </div>
</template>

<style scoped>
  :deep(.dataTable .dt-select-checkbox) {
    @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
  }
  :deep(.dt-scroll-body table thead tr) {
    @apply first:hidden;
  }
  :deep(.dtfc-fixed-start, .dtfc-fixed-left) {
    @apply z-10 !bg-background;
  }
</style>
```

<!-- /automd -->

::

### Column ReOrder

This requires the `fixedColumns` plugin to be installed.

```bash
npm install --save datatables.net-colreorder-dt
```

Then add the following to your `datatables` plugin file

```ts
import "datatables.net-colreorder-dt";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.css";
```

::ShowCase

:DocsDatatableColumnReOrder

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatableColumnReOrder.vue" code lang="vue" -->

```vue [DocsDatatableColumnReOrder.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type DT from "datatables.net";
  import type { Config } from "datatables.net";

  const tableRef = shallowRef<InstanceType<typeof DT<any[]>> | null>(null);

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 8 }, (item, index) => ({
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options: Config = {
    dom: `<'${tw`overflow-auto`}'t>`,
    ordering: false,
    paging: false,
    colReorder: true,
    columns: [
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Location", data: "location" },
      { title: "Status", data: "status" },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
  };
</script>

<template>
  <div>
    <div>
      <h3 class="text-lg font-semibold">Column Reorder</h3>
      <p class="mb-2 text-sm text-muted-foreground">
        You can reorder the columns by dragging and dropping the column header.
      </p>
      <div class="mb-4 flex gap-2">
        <UiButton variant="outline" size="sm" @click="tableRef?.colReorder?.enable()">
          <Icon name="lucide:lock-open" class="size-4 shrink-0" />
          Enable</UiButton
        >
        <UiButton variant="outline" size="sm" @click="tableRef?.colReorder?.disable()">
          <Icon name="lucide:lock" class="size-4 shrink-0" />
          Disable</UiButton
        >
      </div>
    </div>

    <UiDatatable :data="data" :options @ready="tableRef = $event" />
    <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
      <p>Total</p>
      <p>
        {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  :deep(.dataTable) {
    .dtcr-moving-first {
      @apply border-l border-primary;
    }
    .dtcr-moving-last {
      @apply border-r border-primary;
    }
    thead > tr {
      @apply bg-muted/50;
    }
  }
</style>
```

<!-- /automd -->

::

### Pagination

::ShowCase

:DocsDatatablePagination

#code

<!-- automd:file src="../../app/components/content/Docs/Datatable/DocsDatatablePagination.vue" code lang="vue" -->

```vue [DocsDatatablePagination.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import DataTable from "datatables.net";
  import type { Config } from "datatables.net";

  type Item = {
    id: number;
    name: string;
    email: string;
    location: {
      city: string;
      country: string;
      flag: string;
    };
    status: string;
    balance: number;
  };
  const tableRef = shallowRef<InstanceType<typeof DataTable<Item[]>> | null>(null);
  const userDialog = ref(false);
  const submit = () => {
    userDialog.value = false;
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const sharedExport = {
    columns: ":not(.no-export)",
    trim: true,
    stripHtml: true,
    format: {
      body: (data: any) => {
        const htmlString = data.outerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
        return htmlString ? doc?.body?.textContent : data;
      },
    },
  };

  const options: Config = {
    dom: `<'relative'r<'flex flex-col gap-4 md:flex-row md:items-center justify-between mb-5'fB><'overflow-auto border rounded-md't><'mt-4 px-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4'<l><'flex flex-col gap-4 md:flex-row md:items-center md:gap-8'<i><p>>>>`,
    pagingType: "full",
    language: {
      info: "<p class='inline-flex gap-1'><span class='font-medium text-foreground'>_START_-_END_</span> of <span class='font-medium text-foreground'>_TOTAL_</span></p>",
      lengthMenu: "<span class='font-medium text-foreground'>Rows per page</span> _MENU_",
      search: "",
      searchPlaceholder: "Search...",
    },
    lengthMenu: [7, 25, 50, 75, 100],
    select: {
      style: "multi",
      selector: "td:first-child",
    },
    order: [[2, "asc"]],
    buttons: [
      {
        extend: "colvis",
        text: "View",
        columns: ":not(.no-column)",
      },
      {
        extend: "print",
        text: "Print",
        title: `Users - ${useDateFormat(new Date(), "MMM DD, YYYY").value}`,
        exportOptions: sharedExport,
      },
      {
        text: "Add User",
        action: () => {
          userDialog.value = true;
        },
      },
    ],
    columns: [
      {
        data: null,
        searchable: false,
        className: "no-column no-print",
        orderable: false,
        render: DataTable?.render?.select(),
      },
      { title: "ID", data: "id", visible: false },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      {
        title: "Location",
        searchable: false,
        orderable: false,
        data: null,
        render: {
          _: "location.city",
          display: "#location",
        },
      },
      {
        title: "Status",
        data: null,
        render: {
          _: "status",
          display: "#status",
        },
      },
      {
        title: "Balance",
        data: "balance",
        className: `text-right`,
        render: (data: number) => formatCurrency(data),
      },
    ],
    serverSide: true,
    processing: true,
    async ajax(data: any, callback: any) {
      // sleep for 1 second to simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // fetch data from API
      const res = Array.from({ length: 100 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: {
          city: faker.location.city(),
          country: faker.location.country(),
          flag: faker.helpers.arrayElement(["🇺🇸", "🇨🇦", "🇬🇧", "🇦🇺", "🇳🇿"]),
        },
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      }));
      callback({
        // always pass back draw from data
        draw: Number(data.draw),
        // the data to be displayed (paginated from sever)
        data: res.slice(data.start, data.start + data.length),
        // the total number of records in the dataset, not just the number returned
        recordsTotal: res.length,
        // the total number of records after filtering (if any filtering)
        recordsFiltered: res.length,
      });
    },
  };
</script>

<template>
  <UiDatatable :options @ready="tableRef = $event">
    <template #status="{ cellData }">
      <UiBadge :variant="cellData.status == 'Inactive' ? 'outline' : 'default'">{{
        cellData.status
      }}</UiBadge>
    </template>
    <template #location="{ cellData }: { cellData: Item }">
      <span
        >{{ cellData.location.flag }} {{ cellData.location.city }},
        {{ cellData.location.country }}</span
      >
    </template>
  </UiDatatable>
  <UiDialog v-model:open="userDialog">
    <UiDialogContent class="max-w-md">
      <UiDialogHeader>
        <UiDialogTitle>Create User</UiDialogTitle>
        <UiDialogDescription description="Populate the form below to create a new user." />
      </UiDialogHeader>
      <form @submit.prevent="submit">
        <fieldset class="grid grid-cols-1 gap-5">
          <UiVeeInput label="Name" icon="lucide:user" />
          <UiVeeInput label="Email" icon="lucide:mail" />
          <UiVeeTextarea label="About" />
          <UiDialogFooter>
            <UiDialogClose as-child>
              <UiButton variant="outline" text="Cancel" />
            </UiDialogClose>
            <UiButton type="submit" text="Create" />
          </UiDialogFooter>
        </fieldset>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<style scoped>
  :deep(.dataTable) {
    .dt-select-checkbox {
      @apply form-checkbox size-[18px] cursor-pointer rounded-sm border-border bg-background checked:bg-sky-500 checked:text-sky-500 indeterminate:bg-sky-500 hover:indeterminate:bg-sky-500 focus:outline-none focus:ring-ring focus:ring-sky-500 focus:ring-offset-background;
    }
  }
  :deep(button.dt-paging-button) {
    @apply rounded-md border border-border;
  }
</style>
```

<!-- /automd -->

::
