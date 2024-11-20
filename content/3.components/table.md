---
title: Table
description: A responsive table component.
---

## Source code

Click :SourceCodeLink{component="Table"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add table
```

## Usage

### Basic example

::ShowCase{component="DocsTable"}

#code

<!-- automd:file src="../../components/content/Docs/Table/DocsTable.vue" code lang="vue" -->

```vue [DocsTable.vue]
<template>
  <div class="overflow-x-auto rounded-md border pb-4">
    <UiTable>
      <UiTableCaption>A list of your recent invoices.</UiTableCaption>
      <UiTableHeader>
        <UiTableRow>
          <UiTableHead class="w-[100px]">Invoice</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead>Method</UiTableHead>
          <UiTableHead class="text-right">Amount</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody class="last:border-b">
        <template v-for="invoice in invoices" :key="invoice.id">
          <UiTableRow>
            <UiTableCell class="font-medium">{{ invoice.invoice }} </UiTableCell>
            <UiTableCell>{{ invoice.paymentStatus }}</UiTableCell>
            <UiTableCell>{{ invoice.paymentMethod }}</UiTableCell>
            <UiTableCell class="text-right">{{ formatCurrency(invoice.totalAmount) }}</UiTableCell>
          </UiTableRow>
        </template>
      </UiTableBody>
      <UiTableFooter>
        <UiTableRow>
          <UiTableCell colspan="3">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data: invoices } = await useAsyncData(async () => {
    return Array.from({ length: 7 }, (item, index) => ({
      invoice: `INV00${index + 1}`,
      paymentStatus: faker.helpers.arrayElement(["Paid", "Pending", "Unpaid"]),
      totalAmount: faker.number.float({ fractionDigits: 2, min: 100, max: 1000 }),
      paymentMethod: faker.helpers.arrayElement(["Credit Card", "PayPal", "Bank Transfer"]),
    }));
  });

  const total = computed(() => {
    return invoices.value?.reduce((acc, invoice) => acc + invoice.totalAmount, 0);
  });

  const formatCurrency = (value: number = 0) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Simple

::ShowCase{component="DocsTableSimple"}

#code

<!-- automd:file src="../../components/content/Docs/Table/DocsTableSimple.vue" code lang="vue" -->

```vue [DocsTableSimple.vue]
<template>
  <div>
    <div class="grid grid-cols-1 gap-5 md:flex md:items-center md:justify-between">
      <div class="flex flex-col">
        <h1 class="font-semibold">Users</h1>
        <p class="text-sm text-muted-foreground">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div>
        <UiButton size="sm">Add user</UiButton>
      </div>
    </div>

    <div class="mt-10 overflow-x-auto">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-0 font-semibold text-foreground">Name</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Title</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Email</UiTableHead>
            <UiTableHead class="pl-0 font-semibold text-foreground">Role</UiTableHead>
            <UiTableHead class="pl-0">
              <span class="sr-only">Actions</span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="user in users" :key="user.id">
            <UiTableRow>
              <UiTableCell class="pl-0 font-medium">{{ user.name }} </UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ user.title }}</UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ user.email }}</UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ user.role }}</UiTableCell>
              <UiTableCell class="pl-0 text-right">
                <UiButton size="sm" variant="linkHover2">Edit</UiButton>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data: users } = useAsyncData(async () => {
    return Array.from({ length: 6 }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      return {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        title: faker.person.jobTitle(),
        email: email.toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
      };
    });
  });
</script>
```

<!-- /automd -->

::

### Stacked on mobile

::ShowCase{component="DocsTableStackedMobile"}

#code

<!-- automd:file src="../../components/content/Docs/Table/DocsTableStackedMobile.vue" code lang="vue" -->

```vue [DocsTableStackedMobile.vue]
<template>
  <div>
    <div class="grid grid-cols-1 gap-5 md:flex md:items-center md:justify-between">
      <div class="flex flex-col">
        <h1 class="font-semibold">Users</h1>
        <p class="text-sm text-muted-foreground">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div>
        <UiButton size="sm">Add user</UiButton>
      </div>
    </div>

    <div class="mt-10 overflow-x-auto">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="pl-0 font-semibold text-foreground">Name</UiTableHead>
            <UiTableHead class="hidden pl-0 font-semibold text-foreground lg:table-cell"
              >Title</UiTableHead
            >
            <UiTableHead class="hidden pl-0 font-semibold text-foreground md:table-cell"
              >Email</UiTableHead
            >
            <UiTableHead class="pl-0 font-semibold text-foreground">Role</UiTableHead>
            <UiTableHead class="pl-0">
              <span class="sr-only">Actions</span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="user in users" :key="user.id">
            <UiTableRow>
              <UiTableCell class="pl-0">
                <div class="flex flex-col">
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-muted-foreground lg:hidden">{{ user.title }}</p>
                  <p class="text-muted-foreground md:hidden">{{ user.email }}</p>
                </div>
              </UiTableCell>
              <UiTableCell class="hidden pl-0 text-muted-foreground lg:table-cell">{{
                user.title
              }}</UiTableCell>
              <UiTableCell class="hidden pl-0 text-muted-foreground md:table-cell">{{
                user.email
              }}</UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ user.role }}</UiTableCell>
              <UiTableCell class="pl-0 text-right">
                <UiButton size="sm" variant="linkHover2">Edit</UiButton>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data: users } = useAsyncData(async () => {
    return Array.from({ length: 6 }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      return {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        title: faker.person.jobTitle(),
        email: email.toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
      };
    });
  });
</script>
```

<!-- /automd -->

::

### Sticky header

::ShowCase{component="DocsTableStickyHeader"}

#code

<!-- automd:file src="../../components/content/Docs/Table/DocsTableStickyHeader.vue" code lang="vue" -->

```vue [DocsTableStickyHeader.vue]
<template>
  <div class="h-[600px] overflow-y-auto">
    <div class="grid grid-cols-1 gap-5 md:flex md:items-center md:justify-between">
      <div class="flex flex-col">
        <h1 class="font-semibold">Users</h1>
        <p class="text-sm text-muted-foreground">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div>
        <UiButton size="sm">Add user</UiButton>
      </div>
    </div>

    <div class="mt-10">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead
              class="sticky top-0 z-10 bg-background/90 pl-0 font-semibold text-foreground backdrop-blur"
              >Name</UiTableHead
            >
            <UiTableHead
              class="sticky top-0 z-10 hidden bg-background/90 pl-0 font-semibold text-foreground backdrop-blur lg:table-cell"
              >Title</UiTableHead
            >
            <UiTableHead
              class="sticky top-0 z-10 hidden bg-background/90 pl-0 font-semibold text-foreground backdrop-blur md:table-cell"
              >Email</UiTableHead
            >
            <UiTableHead
              class="sticky top-0 z-10 bg-background/90 pl-0 font-semibold text-foreground backdrop-blur"
              >Role</UiTableHead
            >
            <UiTableHead class="sticky top-0 z-10 bg-background/90 pl-0 backdrop-blur">
              <span class="sr-only">Actions</span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-for="user in users" :key="user.id">
            <UiTableRow>
              <UiTableCell class="pl-0">
                <div class="flex flex-col">
                  <p class="font-medium">{{ user.name }}</p>
                  <p class="text-muted-foreground lg:hidden">{{ user.title }}</p>
                  <p class="text-muted-foreground md:hidden">{{ user.email }}</p>
                </div>
              </UiTableCell>
              <UiTableCell class="hidden pl-0 text-muted-foreground lg:table-cell">{{
                user.title
              }}</UiTableCell>
              <UiTableCell class="hidden pl-0 text-muted-foreground md:table-cell">{{
                user.email
              }}</UiTableCell>
              <UiTableCell class="pl-0 text-muted-foreground">{{ user.role }}</UiTableCell>
              <UiTableCell class="pl-0 text-right">
                <UiButton size="sm" variant="linkHover2">Edit</UiButton>
              </UiTableCell>
            </UiTableRow>
          </template>
        </UiTableBody>
      </UiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data: users } = useAsyncData(async () => {
    return Array.from({ length: 20 }, () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      return {
        id: faker.string.uuid(),
        name: `${firstName} ${lastName}`,
        title: faker.person.jobTitle(),
        email: email.toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
      };
    });
  });
</script>
```

<!-- /automd -->

::
