---
title: DataTable
description: A wrapper around DataTables 3, the dependency free table library. Search, sorting, paging, export buttons, row selection, responsive child rows and more, styled with your theme.
links:
  - title: DataTables.net
    href: https://datatables.net/
    icon: "lucide:table"
  - title: Vue component docs
    href: https://datatables.net/manual/components/vue
    icon: "logos:vue"
  - title: Layout option
    href: https://datatables.net/reference/option/layout
    icon: "lucide:layout-template"
---

## Source code

Click :SourceCodeLink{component="Datatable.client.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add datatable"}

The component is built on [DataTables 3](https://datatables.net/blog/2026/datatables-3). It is a client only component, so there is no server rendering step to configure.

### What is included

The component file is self contained. It imports everything it needs:

- The DataTables core and its stylesheet.
- **Buttons** (copy, CSV, Excel, PDF, print and column visibility), **Responsive**, **Select**, **SearchBuilder**, **FixedColumns**, **FixedHeader**, **ColReorder**, **RowGroup** and **RowReorder**, each with its stylesheet.
- JSZip for Excel export, and pdfmake for PDF export. pdfmake is large, so it is loaded the first time someone clicks a PDF button and not before.
- Styles that map the DataTables CSS variables to your shadcn tokens, so light mode, dark mode and every `theme-*` class work without extra setup.

### Registering more plugins

Only the extensions above are registered. If you need another one, install it and import its JavaScript and its stylesheet in **your copy** of `Datatable.client.vue`, inside the plain `<script lang="ts">` block next to the other imports.

DataTables 3 does not load CSS from JavaScript, so every extension needs both lines. For example, for [KeyTable](https://datatables.net/manual/extensions/keytable):

```bash
bun add datatables.net-keytable-dt
```

```ts
import "datatables.net-keytable-dt";
import "datatables.net-keytable-dt/css/keyTable.dataTables.css";
```

Then switch it on with the `options` prop, for example `:options="{ keys: true }"`. The same two lines work for [Scroller](https://datatables.net/manual/extensions/scroller) (`datatables.net-scroller-dt/css/scroller.dataTables.css`), [AutoFill](https://datatables.net/manual/extensions/autofill) and the other `-dt` packages.

Remove the imports of extensions you never use to keep your bundle smaller.

::prose-callout{variant="info" title="Extensions that are not available yet"}
**SearchPanes** and **StateRestore** have not been ported to DataTables 3, so stay on DataTables 2 if you need them. **Editor** and **CardView** are part of the paid [DataTables Plus](https://datatables.net/plus/) suite and need a license key registered with `DataTable.key()`.
::

### PDF export

PDF buttons work out of the box. The component registers a small stand-in for [pdfmake](https://pdfmake.org/) and downloads the real library the first time a PDF is created, so it costs nothing until it is used. The `download` option of the pdf button is the default. The `open` option opens the PDF in a new tab, which some browsers block because the library loads asynchronously.

If you do not want PDF export, remove the `pdfMake` registration from your copy of the component and uninstall `pdfmake`.

### Upgrading from DataTables 1 or 2

DataTables 3 keeps the same API, but a few things moved. If you copied an older version of this component, replace it with the new file and check the following:

- **`dom` is replaced by `layout`.** `dom` still works, but it is the legacy way to describe the layout. Use [`layout`](https://datatables.net/reference/option/layout) instead. For example `dom: "Bfrtip"` becomes `layout: { topStart: "buttons", topEnd: "search", bottomStart: "info", bottomEnd: "paging" }`.
- **CSS is loaded per package.** The JavaScript no longer imports any CSS. Import `datatables.net-dt/css/dataTables.dataTables.css` for the core and `<extension>.dataTables.css` for each extension. The component does this for you.
- **Styling uses CSS variables.** Colors, borders and padding come from variables such as `--dt-body_border`, `--dt-paging-button_background-hover` and `--dtb-button_background`. Override them instead of writing selectors.
- **Class names changed.** If you wrote custom CSS, rename the selectors.

  | Before | After |
  | --- | --- |
  | `.dataTables_wrapper` | `.dt-container` |
  | `.dataTables_length` | `.dt-length` |
  | `.dataTables_filter` | `.dt-search` |
  | `.dataTables_info` | `.dt-info` |
  | `.dataTables_paginate` | `.dt-paging` |
  | `.paginate_button` | `.dt-paging-button` |
  | `.sorting`, `.sorting_asc`, `.sorting_desc` | `.dt-orderable-asc`, `.dt-orderable-desc`, `.dt-ordering-asc`, `.dt-ordering-desc` |
  | `.dataTables_scroll`, `.dataTables_scrollBody` | `.dt-scroll`, `.dt-scroll-body` |
  | `.dataTables_empty` | `.dt-empty` |

- **Buttons 4 bundles its parts.** Remove imports of `datatables.net-buttons/js/buttons.colVis.mjs`, `buttons.html5.mjs` and `buttons.print.mjs`. Register JSZip with `DataTable.Buttons.jszip(JSZip)` instead of `window.JSZip`, and pdfmake with `DataTable.Buttons.pdfMake()`.
- **A type was renamed.** The `ConfigColumns` type that you import from `datatables.net` is now `ColumnOptions`.
- **jQuery is optional.** You can remove the `jquery` package unless your own code uses it. Numbers and dates are right aligned automatically (since DataTables 2).

## Usage

### Layout

The [`layout`](https://datatables.net/reference/option/layout) option decides where the page length menu, search box, buttons, info text and paging controls go. By default `pageLength` is at the top start, `search` at the top end, `info` at the bottom start and `paging` at the bottom end.

Each position is `top` or `bottom`, an optional row number, and an optional `Start` or `End`. For example `topStart`, `topEnd`, `top1` (an extra full width row above them) and `bottom2End`. `Start` and `End` flip for right to left languages. Set a position to `null` to remove it, and use an array to put several features in one position.

| Feature | What it shows |
| --- | --- |
| `pageLength` | The "entries per page" select |
| `search` | The search input |
| `info` | "Showing 1 to 10 of 57 entries" |
| `paging` | The paging buttons |
| `buttons` | The export and column visibility buttons (Buttons) |
| `searchBuilder` | The condition builder (SearchBuilder) |

The example below puts SearchBuilder above the table, the buttons and search box in the header, and the page length, info and paging in the footer. The table border comes from a small scoped style, because the table is not part of `layout`.

::prose-show-case

:DocsDatatableBasic

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableBasic.vue" code lang="vue" -->

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
    layout: {
      top1: "searchBuilder",
      topStart: "buttons",
      topEnd: "search",
      bottomStart: ["pageLength", "info"],
      bottomEnd: "paging",
    },
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

  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | undefined>();
</script>

<style scoped>
  :deep(.dt-layout-table > .dt-layout-cell) {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
</style>
```

<!-- /automd -->

::

### Custom component

Render any Vue component inside a cell with a slot. Set the column's `render` option to `"#slotName"` and add a matching `<template #slotName>`, or name the slot `column-<index>` or `column-<name>` and skip the `render` option. The slot receives `cellData`, `rowData`, `rowIndex`, `colIndex` and `type`.

::prose-show-case

:DocsDatatableComponent

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableComponent.vue" code lang="vue" -->

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
  import type { Config, ColumnOptions } from "datatables.net";

  const { data: users } = await useAsyncData(
    async () =>
      Array.from({ length: 1000 }, () => {
        return {
          name: faker.person.fullName(),
          position: faker.person.jobTitle(),
          office: faker.location.city(),
          age: faker.number.int(100),
          start_date: useDateFormat(faker.date.past().toISOString(), "MMMM DD, YYYY").value,
          salary: faker.finance.amount({ symbol: "$" }),
        };
      }),
    { default: () => [] }
  );

  type Staff = (typeof users.value)[0];

  const columns: ColumnOptions[] = [
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
      // Responsive adds this option, but it is not in the DataTables 3 column types yet
      responsivePriority: 1,
    } as ColumnOptions,
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
    layout: {
      top1: "searchBuilder",
      topStart: "buttons",
      topEnd: "search",
      bottomStart: ["pageLength", "info"],
      bottomEnd: "paging",
    },
    responsive: true,
    autoWidth: true,
    select: true,
  };
</script>

<style scoped>
  :deep(.dt-layout-table > .dt-layout-cell) {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
</style>
```

<!-- /automd -->

::

### Layout with SearchBuilder

The `layout` option accepts objects too. Here the paging controls get a `className`, so you can add any classes you like to a cell. Position names are described in the [layout reference](https://datatables.net/reference/option/layout).

::prose-show-case

:DocsDatatableLayout

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableLayout.vue" code lang="vue" -->

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
  import type { Config, ColumnOptions } from "datatables.net";

  interface Staff {
    name: string;
    position: string;
    office: string;
    age: number;
    start_date: string;
    salary: string;
  }

  const { data: users } = await useAsyncData<Staff[]>(
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

  const columns: ColumnOptions[] = [
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
      // Responsive adds this option, but it is not in the DataTables 3 column types yet
      responsivePriority: 1,
    } as ColumnOptions,
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
      top1Start: "buttons",
      topStart: null,
      topEnd: null,
      bottomStart: null,
      bottomEnd: {
        features: ["paging"],
        className: "pt-5",
      },
    },
  };
</script>
```

<!-- /automd -->

::

### Simple

::prose-show-case

:DocsDatatableSimple

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableSimple.vue" code lang="vue" -->

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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

::prose-show-case

:DocsDatatableImages

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableImages.vue" code lang="vue" -->

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
        <UiAvatar :src="cellData.image" :alt="cellData.name" />
        <div>
          <div class="font-medium">{{ cellData.name }}</div>
          <span class="text-muted-foreground text-xs">@{{ cellData.username }}</span>
        </div>
      </div>
    </template>
  </UiDatatable>
</template>
```

<!-- /automd -->

::

### No Horizontal

::prose-show-case

:DocsDatatableNoHorizontal

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableNoHorizontal.vue" code lang="vue" -->

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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

::prose-show-case

:DocsDatatableStriped

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableStriped.vue" code lang="vue" -->

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
    border-style: none;

    &:nth-child(odd) {
      background-color: color-mix(in oklab, var(--color-muted) 50%, transparent);
    }

    &:hover {
      background-color: transparent;
    }

    &:nth-child(odd):hover {
      background-color: color-mix(in oklab, var(--color-muted) 50%, transparent);
    }
  }
  :deep(table.dataTable tbody) {
    td:first-child {
      border-top-left-radius: var(--radius-lg);
      border-bottom-left-radius: var(--radius-lg);
    }

    td:last-child {
      border-top-right-radius: var(--radius-lg);
      border-bottom-right-radius: var(--radius-lg);
    }

    tr {
      border-radius: var(--radius-lg);
    }
  }
</style>
```

<!-- /automd -->

::

### Vertical Lines

::prose-show-case

:DocsDatatableVerticalLines

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableVerticalLines.vue" code lang="vue" -->

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
    border-right-style: solid;
    border-right-width: 1px;

    &:first-child {
      border-left-style: solid;
      border-left-width: 1px;
    }
  }
</style>
```

<!-- /automd -->

::

### Dense

::prose-show-case

:DocsDatatableDense

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableDense.vue" code lang="vue" -->

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
  <div class="border-border bg-background overflow-hidden rounded-lg border">
    <UiDatatable class="nowrap compact hover" :data="programmingLanguages" :options />
  </div>
</template>

<style scoped>
  :deep(.dataTable thead tr) {
    background-color: color-mix(in oklab, var(--color-muted) 50%, transparent);
  }
</style>
```

<!-- /automd -->

::

### Row Selection

::prose-show-case

:DocsDatatableRowSelection

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableRowSelection.vue" code lang="vue" -->

```vue [DocsDatatableRowSelection.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(
    async () =>
      Array.from({ length: 5 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: faker.location.city(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      })),
    { default: () => [] }
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);
    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
  });
</script>

<template>
  <UiDatatable v-if="options" :data="data" :options />
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

### Card

::prose-show-case

:DocsDatatableCard

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableCard.vue" code lang="vue" -->

```vue [DocsDatatableCard.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(
    async () =>
      Array.from({ length: 5 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: faker.location.city(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      })),
    { default: () => [] }
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
  });
</script>

<template>
  <div class="border-border bg-background overflow-hidden rounded-lg border">
    <UiDatatable v-if="options" :data="data" :options />
    <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
      <p>Total</p>
      <p>
        {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
      </p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Scroll with Sticky Header

::prose-show-case

:DocsDatatableScrollY

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableScrollY.vue" code lang="vue" -->

```vue [DocsDatatableScrollY.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(
    async () =>
      Array.from({ length: 30 }, (item, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        location: faker.location.city(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
        balance: faker.number.float({ fractionDigits: 2, min: 0, max: 1200 }),
      })),
    { default: () => [] }
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
  });
</script>

<template>
  <div class="border-border bg-background overflow-hidden rounded-lg border">
    <UiDatatable v-if="options" :data="data" :options />
    <div class="flex items-center justify-between border-t px-6 py-6 text-sm">
      <p>Total</p>
      <p>
        {{ formatCurrency(data.reduce((acc, item) => acc + item.balance, 0)) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  :deep(.dt-scroll-body table thead tr) {
    &:first-child {
      display: none;
    }
  }
</style>
```

<!-- /automd -->

::

### Badge & Icons

::prose-show-case

:DocsDatatableBadge

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableBadge.vue" code lang="vue" -->

```vue [DocsDatatableBadge.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  type Item = (typeof data.value)[number];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
  });
</script>

<template>
  <div class="border-border bg-background overflow-hidden rounded-lg border">
    <UiDatatable v-if="options" :data="data" :options>
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
  :deep(.dt-scroll-body table thead tr) {
    &:first-child {
      display: none;
    }
  }
</style>
```

<!-- /automd -->

::

### Search & Sort

::prose-show-case

:DocsDatatableSearchSort

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableSearchSort.vue" code lang="vue" -->

```vue [DocsDatatableSearchSort.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () =>
      Array.from({ length: 8 }, (item, index) => ({
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
      })),
    { default: () => [] }
  );

  type Item = (typeof data.value)[number];
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
  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
    } as Config;
  });
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

    <div class="border-border bg-background overflow-hidden rounded-lg border">
      <UiDatatable v-if="options" :data="filteredData" :options>
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
          <a :href="cellData.link" target="_blank" class="hover:underline">
            {{ cellData.link }}
          </a>
        </template>
      </UiDatatable>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Column Search

DataTables 3 can search several columns with one term. `columns().search()` applies the search to every selected column, and `column().search()` targets a single one. Here two inputs drive the table API from outside the table.

::prose-show-case

:DocsDatatableColumnSearch

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableColumnSearch.vue" code lang="vue" -->

```vue [DocsDatatableColumnSearch.vue]
<template>
  <div class="space-y-4">
    <div class="grid gap-4 sm:grid-cols-2">
      <UiVeeInput
        v-model="people"
        label="Name or position"
        placeholder="Search people"
        icon="lucide:search"
        hint="One search applied across two columns."
      />
      <UiVeeInput
        v-model="office"
        label="Office"
        placeholder="Filter by office"
        icon="lucide:map-pin"
      />
    </div>
    <div class="overflow-hidden rounded-lg border">
      <UiDatatable :data="data" :options="options" @ready="tableRef = $event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Api, Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableColumnSearch",
    async () =>
      Array.from({ length: 40 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.location.city(),
        age: faker.number.int({ min: 22, max: 63 }),
      })),
    { default: () => [] }
  );

  const tableRef = shallowRef<Api<any> | undefined>();
  const people = ref("");
  const office = ref("");

  // `columns().search()` applies one search term across every selected column (DataTables 3).
  watch(people, (value) => {
    tableRef.value?.columns([0, 1]).search(value).draw();
  });
  // `column().search()` targets a single column.
  watch(office, (value) => {
    tableRef.value?.column(2).search(value).draw();
  });

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    pageLength: 5,
    columns: [
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      { title: "Office", data: "office" },
      { title: "Age", data: "age" },
    ],
  };
</script>
```

<!-- /automd -->

::

### Fixed Columns

::prose-show-case

:DocsDatatableFixedColumn

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableFixedColumn.vue" code lang="vue" -->

```vue [DocsDatatableFixedColumn.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    async () =>
      Array.from({ length: 8 }, (item, index) => {
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
      }),
    { default: () => [] }
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
    } as Config;
  });
</script>

<template>
  <div class="border-border bg-background overflow-hidden rounded-lg border">
    <UiDatatable v-if="options" :data="data" :options />
  </div>
</template>

<style scoped>
  :deep(.dt-scroll-body table thead tr) {
    &:first-child {
      display: none;
    }
  }
  :deep(.dtfc-fixed-start, .dtfc-fixed-left) {
    z-index: 10;
    background: var(--background) !important;
  }
</style>
```

<!-- /automd -->

::

### Column ReOrder

Set `colReorder: true` to let people drag column headings into a new order. The ColReorder extension is already registered by the component. Use `colReorder.enable()` and `colReorder.disable()` on the table API to turn it on and off, as the buttons below do.

::prose-show-case

:DocsDatatableColumnReOrder

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableColumnReOrder.vue" code lang="vue" -->

```vue [DocsDatatableColumnReOrder.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";
  import type DT from "datatables.net";

  const tableRef = shallowRef<InstanceType<typeof DT<any[]>> | undefined>();

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
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
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
      <p class="text-muted-foreground mb-2 text-sm">
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
      border-left-style: var(--tw-border-style);
      border-left-width: 1px;
      border-color: var(--color-primary);
    }
    .dtcr-moving-last {
      border-right-style: var(--tw-border-style);
      border-right-width: 1px;
      border-color: var(--color-primary);
    }
    thead > tr {
      background-color: color-mix(in oklab, var(--color-muted) 50%, transparent);
    }
  }
</style>
```

<!-- /automd -->

::

### Row Group

The RowGroup extension adds a heading row for each group. Order the table by the grouping column so each group stays together, and hide the column if the heading already shows it.

::prose-show-case

:DocsDatatableRowGroup

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableRowGroup.vue" code lang="vue" -->

```vue [DocsDatatableRowGroup.vue]
<template>
  <div class="overflow-hidden rounded-lg border">
    <UiDatatable :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const offices = ["Edinburgh", "London", "New York", "Tokyo"];

  const { data } = await useAsyncData(
    "datatableRowGroup",
    async () =>
      Array.from({ length: 16 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.helpers.arrayElement(offices),
        salary: faker.number.int({ min: 60000, max: 220000 }),
      })),
    { default: () => [] }
  );

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
    paging: false,
    // Rows are grouped by the `office` column. Order by that column so each group is contiguous.
    order: [[2, "asc"]],
    rowGroup: {
      dataSrc: "office",
    },
    columns: [
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      // The group header already shows the office, so hide the column itself
      { title: "Office", data: "office", visible: false },
      {
        title: "Salary",
        data: "salary",
        className: "text-right",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(d),
      },
    ],
  };
</script>
```

<!-- /automd -->

::

### Row Reorder

The RowReorder extension lets people drag rows into a new order. Set `rowReorder.dataSrc` to the property that stores each row's position, and order the table by that column. The `row-reorder` event tells you what moved. Dragging is pointer only, so add your own move buttons if you need a keyboard alternative.

::prose-show-case

:DocsDatatableRowReorder

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableRowReorder.vue" code lang="vue" -->

```vue [DocsDatatableRowReorder.vue]
<template>
  <div class="space-y-4">
    <p class="text-muted-foreground text-sm" role="status">
      {{ message }}
    </p>
    <div class="overflow-hidden rounded-lg border">
      <UiDatatable :data="data" :options="options" @row-reorder="onReorder" />
    </div>
    <p class="text-muted-foreground text-xs">
      Row reordering uses the pointer. Pair it with your own move up and move down buttons if you
      need a keyboard alternative.
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableRowReorder",
    async () =>
      Array.from({ length: 6 }, (_, index) => ({
        order: index + 1,
        task: faker.hacker.phrase().slice(0, 48),
        owner: faker.person.fullName(),
      })),
    { default: () => [] }
  );

  const message = ref("Drag a row by its number to change the order.");

  // The event handler receives `{ event, dt }` followed by the DataTables arguments.
  const onReorder = (_ctx: unknown, diff: { oldPosition: number; newPosition: number }[]) => {
    message.value = diff.length
      ? `Moved ${diff.length} row${diff.length === 1 ? "" : "s"}.`
      : "Nothing moved.";
  };

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
    paging: false,
    // RowReorder needs the table ordered by the column that holds each row's position
    order: [[0, "asc"]],
    // `dataSrc` is the property that stores each row's position. It is updated when a row is dropped.
    rowReorder: { dataSrc: "order" },
    columns: [
      { title: "#", data: "order", className: "reorder w-16", orderable: true },
      { title: "Task", data: "task", orderable: false },
      { title: "Owner", data: "owner", orderable: false },
    ],
  };
</script>
```

<!-- /automd -->

::

### Child Rows

Show extra detail under a row with `row.child()`. Give a column the `dt-control` class and the stylesheet draws the expand arrow. The click handler is a delegated listener registered from the `ready` event.

::prose-show-case

:DocsDatatableChildRows

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableChildRows.vue" code lang="vue" -->

```vue [DocsDatatableChildRows.vue]
<template>
  <div class="overflow-hidden rounded-lg border">
    <UiDatatable :data="data" :options="options" @ready="onReady" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Api, Config } from "datatables.net";

  type Employee = {
    name: string;
    position: string;
    office: string;
    email: string;
    phone: string;
  };

  const { data } = await useAsyncData<Employee[]>(
    "datatableChildRows",
    async () =>
      Array.from({ length: 8 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.location.city(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
      })),
    { default: () => [] }
  );

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
    paging: false,
    order: [[1, "asc"]],
    columns: [
      // `dt-control` gets the expand / collapse arrow from the DataTables stylesheet
      { data: null, className: "dt-control", orderable: false, defaultContent: "", width: "40px" },
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      { title: "Office", data: "office" },
    ],
  };

  // Build the markup for the child row. Escape anything that came from your data.
  const escape = (value: string) => {
    const el = document.createElement("div");
    el.textContent = value;
    return el.innerHTML;
  };
  const format = (row: Employee) =>
    `<dl class="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1 px-6 py-3 text-sm">
      <dt class="text-muted-foreground">Email</dt><dd>${escape(row.email)}</dd>
      <dt class="text-muted-foreground">Phone</dt><dd>${escape(row.phone)}</dd>
    </dl>`;

  const onReady = (dt?: Api<any>) => {
    // Delegated click handler: only fires for the control cells in the body
    dt?.on("click", "tbody td.dt-control", (e) => {
      const tr = (e.target as HTMLElement).closest("tr") as HTMLTableRowElement;
      const row = dt.row(tr);

      if (row.child.isShown()) {
        row.child.hide();
      } else {
        row.child(format(row.data() as Employee)).show();
      }
    });
  };
</script>
```

<!-- /automd -->

::

### Export Buttons

Configure each button with `extend`. Use `exportOptions` to choose the columns that are exported, `filename` and `title` to name the file, and `customize` to change the PDF document. Give a column the `no-export` class to leave it out. PDF export loads pdfmake the first time it is used.

::prose-show-case

:DocsDatatableExport

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableExport.vue" code lang="vue" -->

```vue [DocsDatatableExport.vue]
<template>
  <div class="overflow-hidden rounded-lg border p-4">
    <UiDatatable :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableExport",
    async () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        city: faker.location.city(),
        balance: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
      })),
    { default: () => [] }
  );

  const today = useDateFormat(new Date(), "YYYY-MM-DD").value;

  // Columns with the `no-export` class are left out of every export below
  const exportOptions = { columns: ":not(.no-export)" };

  const options: Config = {
    layout: {
      topStart: "buttons",
      topEnd: "search",
      bottomStart: "info",
      bottomEnd: "paging",
    },
    pageLength: 5,
    buttons: [
      { extend: "colvis", text: "Columns", columns: ":not(.no-export)" },
      { extend: "copy", exportOptions },
      { extend: "csv", filename: `customers-${today}`, exportOptions },
      { extend: "excel", title: "Customers", filename: `customers-${today}`, exportOptions },
      {
        extend: "pdf",
        title: "Customers",
        orientation: "landscape",
        filename: `customers-${today}`,
        exportOptions,
        // `customize` receives the pdfmake document definition
        customize: (doc: any) => {
          doc.defaultStyle.fontSize = 9;
          doc.styles.tableHeader.alignment = "left";
        },
      },
      {
        extend: "print",
        title: "Customers",
        messageTop: `Printed on ${today}`,
        exportOptions,
      },
    ],
    columns: [
      { title: "ID", data: "id", className: "no-export" },
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "City", data: "city" },
      {
        title: "Balance",
        data: "balance",
        className: "text-right",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
    ],
  };
</script>
```

<!-- /automd -->

::

### Ajax

The `ajax` option can be a URL, an object or a function. Turn on `processing` to show the loading overlay, and call `ajax.reload()` on the table API to fetch the data again. This loads everything once and lets the browser search, sort and page. For large data sets, see [Server-side](#server-side).

::prose-show-case

:DocsDatatableAjax

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableAjax.vue" code lang="vue" -->

```vue [DocsDatatableAjax.vue]
<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <p class="text-muted-foreground text-sm">Data is loaded through the `ajax` option.</p>
      <UiButton variant="outline" size="sm" icon="lucide:refresh-cw" @click="reload">
        Reload data
      </UiButton>
    </div>
    <div class="relative overflow-hidden rounded-lg border">
      <UiDatatable :options="options" @ready="tableRef = $event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Api, Config } from "datatables.net";

  const tableRef = shallowRef<Api<any> | undefined>();

  const makeRows = () =>
    Array.from({ length: 25 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      city: faker.location.city(),
      balance: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
    }));

  const options: Config = {
    // Show the loading overlay while the request is in flight
    processing: true,
    layout: { topStart: null, topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    pageLength: 5,
    // `ajax` can be a URL, an object or a function. A function lets you fetch the data yourself
    // (here we fake a slow network) and hand it back through the callback.
    ajax: (_data, callback) => {
      setTimeout(() => callback({ data: makeRows() }), 900);
    },
    columns: [
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "City", data: "city" },
      {
        title: "Balance",
        data: "balance",
        className: "text-right",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
    ],
  };

  // Re-run the Ajax request. `false` keeps the current page and sorting.
  const reload = () => tableRef.value?.ajax.reload(undefined, false);
</script>
```

<!-- /automd -->

::

### Server-side

When your data lives behind an API and is too large to load at once, set `serverSide: true`. DataTables then stops searching, sorting and paging in the browser. Every time the user searches, sorts, changes page or changes the page length, it calls your `ajax` function with a description of what they asked for, and you send back only the rows to show.

The request object has the fields you need:

| Field | Meaning |
| --- | --- |
| `draw` | A counter. Send it back unchanged so DataTables can ignore out of date responses |
| `start` and `length` | The first row and the number of rows to return |
| `search.value` | What the user typed in the search box |
| `order` | The sort. Each entry has a `column` index and a `dir` of `asc` or `desc` |
| `columns` | Your column definitions. `columns[order.column].data` is the field to sort by |

Respond by calling `callback` with `data` (the rows), `recordsTotal` (rows in the whole table) and `recordsFiltered` (rows that match the search). They are used for the "Showing 1 to 10 of 194 entries" text and the paging buttons.

The example below loads products from [DummyJSON](https://dummyjson.com/docs/products). Search, sorting, paging and the page length menu are all sent to the API as query parameters, and the request that was just made is shown above the table. A few details worth copying:

- `searchDelay` waits for the user to stop typing, so you do not send a request per keystroke.
- An `AbortController` cancels a request that has been replaced by a newer one.
- Errors are handled by showing a message and returning an empty page.
- `data` on each column is the field name that is sent as `sortBy`. Add `orderable: false` to a column the API cannot sort by.

::prose-show-case

:DocsDatatableServerSide

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableServerSide.vue" code lang="vue" -->

```vue [DocsDatatableServerSide.vue]
<template>
  <div class="space-y-3">
    <div class="flex items-start justify-between gap-3">
      <p class="text-muted-foreground text-xs break-all">
        Last request:
        <span class="font-mono">{{ lastRequest || "waiting for the first request..." }}</span>
      </p>
      <UiButton size="sm" variant="outline" icon="lucide:refresh-cw" @click="reload">
        Reload
      </UiButton>
    </div>
    <p v-if="errorMessage" role="alert" class="text-destructive text-sm">{{ errorMessage }}</p>
    <div class="rounded-lg border p-4">
      <UiDatatable
        class="compact hover order-column row-border stripe display"
        :options="options"
        @ready="tableRef = $event"
      >
        <template #product="{ rowData }: { rowData: Product }">
          <div class="flex items-center gap-3">
            <img
              :src="rowData.thumbnail"
              :alt="rowData.title"
              class="bg-muted size-10 rounded-md object-cover"
              loading="lazy"
            />
            <span class="font-medium">{{ rowData.title }}</span>
          </div>
        </template>
      </UiDatatable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Api, AjaxData, Config } from "datatables.net";

  type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
  };
  type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

  const ENDPOINT = "https://dummyjson.com/products";

  const tableRef = shallowRef<Api<any> | undefined>();
  const lastRequest = ref("");
  const errorMessage = ref("");

  // The API only reports a total for the query it ran, so remember the size of the whole list
  let unfilteredTotal = 0;
  let controller: AbortController | undefined;

  // With `serverSide: true`, DataTables calls this function every time the user searches, sorts,
  // changes page or changes the page length. Translate the request into your API's query string,
  // then hand the rows back with the two totals DataTables needs for its info text and paging.
  const ajax = async (data: AjaxData, callback: (json: object) => void) => {
    // A newer request replaces any request that is still in flight
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    const term = data.search?.value.trim();
    const order = data.order?.[0];
    const sortBy = order ? data.columns?.[order.column]?.data : undefined;

    const params: Record<string, string> = {
      limit: String(data.length),
      skip: String(data.start),
    };
    if (term) params.q = term;
    if (order && sortBy) {
      params.sortBy = String(sortBy);
      params.order = order.dir;
    }

    // This API has a separate endpoint for searching
    const url = `${ENDPOINT}${term ? "/search" : ""}?${new URLSearchParams(params)}`;
    lastRequest.value = `GET ${url}`;
    errorMessage.value = "";

    try {
      const res = await $fetch<ProductsResponse>(url, { signal });
      if (!term) unfilteredTotal = res.total;
      callback({
        // Always send back the `draw` counter so DataTables can drop out of date responses
        draw: data.draw,
        data: res.products,
        recordsTotal: unfilteredTotal || res.total,
        recordsFiltered: res.total,
      });
    } catch {
      // An aborted request was replaced by a newer one, so there is nothing to show
      if (signal.aborted) return;
      errorMessage.value = "Could not load the products. Check your connection and try again.";
      callback({ draw: data.draw, data: [], recordsTotal: 0, recordsFiltered: 0 });
    }
  };

  const options: Config = {
    serverSide: true,
    processing: true,
    // Wait for the user to stop typing before sending a search
    searchDelay: 400,
    pageLength: 10,
    lengthMenu: [10, 25, 50],
    order: [],
    language: { search: "", searchPlaceholder: "Search products..." },
    ajax,
    columns: [
      // `data` is the field name that is sent to the API as `sortBy`
      { title: "Product", data: "title", render: "#product" },
      { title: "Category", data: "category" },
      {
        title: "Price",
        data: "price",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
      { title: "Rating", data: "rating", render: (d: number) => d.toFixed(1) },
      { title: "Stock", data: "stock" },
    ],
  };

  // Send the current request again. `false` keeps the current page.
  const reload = () => tableRef.value?.ajax.reload(undefined, false);
</script>
```

<!-- /automd -->

::

#### Using your own API

Only the part that builds the query and reads the response is specific to an API. For example, a [Strapi](https://docs.strapi.io/cms/api/rest) REST endpoint takes `pagination[start]`, `pagination[limit]`, `sort` and `filters`, and returns the total in `meta.pagination.total`:

```ts
const ajax = async (data: AjaxData, callback: (json: object) => void) => {
  const order = data.order?.[0];
  const term = data.search?.value.trim();

  const res = await $fetch<{ data: any[]; meta: { pagination: { total: number } } }>(
    "/api/articles",
    {
      baseURL: "https://your-strapi.example.com",
      query: {
        "pagination[start]": data.start,
        "pagination[limit]": data.length,
        // `title:asc`. Strapi accepts several sort fields too
        ...(order && { sort: `${data.columns?.[order.column]?.data}:${order.dir}` }),
        // `$containsi` is a case insensitive "contains"
        ...(term && { "filters[title][$containsi]": term }),
      },
    }
  );

  callback({
    draw: data.draw,
    data: res.data,
    recordsTotal: res.meta.pagination.total,
    recordsFiltered: res.meta.pagination.total,
  });
};
```

This is an adaptation of the example above and has not been run against a Strapi instance. Strapi 4 nests fields under `attributes`, so point your columns at `attributes.title` and so on. To search more than one field, use `filters[$or][0][title][$containsi]` and `filters[$or][1][body][$containsi]`.

### Server-side filters

Filters that live outside the table, like a category select, work the same way. Keep the value in a `ref`, read it inside your `ajax` function, and call `ajax.reload()` on the table API when it changes. Reloading goes back to the first page by default.

::prose-show-case

:DocsDatatableServerSideFilter

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableServerSideFilter.vue" code lang="vue" -->

```vue [DocsDatatableServerSideFilter.vue]
<template>
  <div class="space-y-3">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="sm:w-64">
        <UiLabel for="datatable-category" class="mb-2">Category</UiLabel>
        <UiNativeSelect id="datatable-category" v-model="category">
          <option value="">All categories</option>
          <option v-for="item in categories" :key="item" :value="item">
            {{ formatCategory(item) }}
          </option>
        </UiNativeSelect>
      </div>
      <p class="text-muted-foreground text-xs break-all sm:max-w-sm sm:text-right">
        Last request:
        <span class="font-mono">{{ lastRequest || "waiting for the first request..." }}</span>
      </p>
    </div>
    <p v-if="errorMessage" role="alert" class="text-destructive text-sm">{{ errorMessage }}</p>
    <div class="rounded-lg border p-4">
      <UiDatatable :options="options" @ready="tableRef = $event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Api, AjaxData, Config } from "datatables.net";

  type Product = {
    id: number;
    title: string;
    brand?: string;
    price: number;
    rating: number;
  };
  type ProductsResponse = { products: Product[]; total: number; skip: number; limit: number };

  const ENDPOINT = "https://dummyjson.com/products";

  const { data: categories } = await useAsyncData(
    "datatableCategories",
    () => $fetch<string[]>(`${ENDPOINT}/category-list`),
    { default: () => [] }
  );
  const formatCategory = (value: string) =>
    value.replace(/-/g, " ").replace(/^\w/, (char) => char.toUpperCase());

  const tableRef = shallowRef<Api<any> | undefined>();
  const category = ref("");
  const lastRequest = ref("");
  const errorMessage = ref("");

  let unfilteredTotal = 0;
  let controller: AbortController | undefined;

  const ajax = async (data: AjaxData, callback: (json: object) => void) => {
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    const order = data.order?.[0];
    const sortBy = order ? data.columns?.[order.column]?.data : undefined;
    const params: Record<string, string> = {
      limit: String(data.length),
      skip: String(data.start),
    };
    if (order && sortBy) {
      params.sortBy = String(sortBy);
      params.order = order.dir;
    }

    // Anything outside the table can feed the request. Here it is the selected category, which
    // changes the endpoint. Read it when the request is made so it is always current.
    const path = category.value ? `/category/${category.value}` : "";
    const url = `${ENDPOINT}${path}?${new URLSearchParams(params)}`;
    lastRequest.value = `GET ${url}`;
    errorMessage.value = "";

    try {
      const res = await $fetch<ProductsResponse>(url, { signal });
      if (!category.value) unfilteredTotal = res.total;
      callback({
        draw: data.draw,
        data: res.products,
        recordsTotal: unfilteredTotal || res.total,
        recordsFiltered: res.total,
      });
    } catch {
      if (signal.aborted) return;
      errorMessage.value = "Could not load the products. Check your connection and try again.";
      callback({ draw: data.draw, data: [], recordsTotal: 0, recordsFiltered: 0 });
    }
  };

  // When the filter changes, ask DataTables to send the request again. By default it also goes back
  // to the first page, which is what you want after a filter changes.
  watch(category, () => {
    tableRef.value?.ajax.reload();
  });

  const options: Config = {
    serverSide: true,
    processing: true,
    pageLength: 10,
    lengthMenu: [5, 10, 25],
    order: [],
    // This API cannot search inside a category, so leave the search box out
    layout: { topStart: "pageLength", topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    ajax,
    columns: [
      { title: "Product", data: "title" },
      { title: "Brand", data: "brand", orderable: false, defaultContent: "-" },
      {
        title: "Price",
        data: "price",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
      { title: "Rating", data: "rating", render: (d: number) => d.toFixed(1) },
    ],
  };
</script>
```

<!-- /automd -->

::

### Reactive Data

Pass a ref to the `data` prop. When it changes the component redraws the table, so you never have to call the API to add or remove rows.

::prose-show-case

:DocsDatatableReactive

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableReactive.vue" code lang="vue" -->

```vue [DocsDatatableReactive.vue]
<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-muted-foreground text-sm">
        {{ rows.length }} {{ rows.length === 1 ? "person" : "people" }} in the table
      </p>
      <div class="flex gap-2">
        <UiButton size="sm" icon="lucide:plus" @click="addRow">Add person</UiButton>
        <UiButton
          size="sm"
          variant="outline"
          icon="lucide:minus"
          :disabled="!rows.length"
          @click="removeRow"
        >
          Remove last
        </UiButton>
      </div>
    </div>
    <div class="overflow-hidden rounded-lg border">
      <UiDatatable :data="rows" :options="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const makeRow = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    city: faker.location.city(),
  });

  // Plain Vue state. The component watches `data` and redraws the table when it changes.
  const rows = ref(Array.from({ length: 4 }, makeRow));

  const addRow = () => {
    rows.value = [makeRow(), ...rows.value];
  };
  const removeRow = () => {
    rows.value = rows.value.slice(0, -1);
  };

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    pageLength: 5,
    ordering: false,
    columns: [
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "City", data: "city" },
    ],
  };
</script>
```

<!-- /automd -->

::

### Custom Layout

A layout position can hold a feature name, an object with the feature's options, an array of features, or a function that returns an element. A number after `top` or `bottom` adds a row.

::prose-show-case

:DocsDatatableCustomLayout

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatableCustomLayout.vue" code lang="vue" -->

```vue [DocsDatatableCustomLayout.vue]
<template>
  <div class="overflow-hidden rounded-lg border p-4">
    <UiDatatable :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableCustomLayout",
    async () =>
      Array.from({ length: 40 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.location.city(),
      })),
    { default: () => [] }
  );

  const options: Config = {
    layout: {
      // A feature can be a string or an object that holds the feature's own options
      topStart: { search: { placeholder: "Search people..." } },
      topEnd: null,
      // An array puts several features in the same cell
      bottomStart: ["pageLength", "info"],
      bottomEnd: { paging: { buttons: 3 } },
      // A number after top / bottom adds another row
      bottom2: () => {
        // A function returns any element you like
        const hint = document.createElement("p");
        hint.className = "text-xs text-muted-foreground";
        hint.textContent = "Tip: click a column heading to sort.";
        return hint;
      },
    },
    pageLength: 5,
    lengthMenu: [5, 10, 25],
    columns: [
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      { title: "Office", data: "office" },
    ],
  };
</script>
```

<!-- /automd -->

::

### Pagination

::prose-show-case

:DocsDatatablePagination

#code

<!-- automd:file src="../../app/components/content/Docs/DataTable/DocsDatatablePagination.vue" code lang="vue" -->

```vue [DocsDatatablePagination.vue]
<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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
  const tableRef = shallowRef();
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

  const options = ref();
  onMounted(async () => {
    const DataTable = await import("datatables.net").then((mod) => mod.default || mod);

    options.value = {
      layout: {
        topStart: "search",
        topEnd: "buttons",
        bottomStart: "pageLength",
        bottomEnd: ["info", "paging"],
      },
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
  });
</script>

<template>
  <UiDatatable v-if="options" :options @ready="tableRef = $event">
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
  :deep(button.dt-paging-button) {
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
  }
</style>
```

<!-- /automd -->

::
