---
title: Table
description: A responsive table component.
label: New Examples
---

## Source code

Click :SourceCodeLink{component="Table"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add table
```

## Usage

### Basic example

::ShowCase

:DocsTable

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTable.vue" code lang="vue" -->

```vue [DocsTable.vue]
<template>
  <div class="grid overflow-x-auto rounded-md border pb-4">
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

::ShowCase

:DocsTableSimple

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableSimple.vue" code lang="vue" -->

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
    <div class="mt-10 grid overflow-x-auto">
      <UiTable class="w-full table-auto">
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

::ShowCase

:DocsTableStackedMobile

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableStackedMobile.vue" code lang="vue" -->

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

    <div class="mt-10 grid overflow-x-auto">
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

::ShowCase

:DocsTableStickyHeader

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableStickyHeader.vue" code lang="vue" -->

```vue [DocsTableStickyHeader.vue]
<template>
  <div class="overflow-y-auto">
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

    <div class="mt-10 [&>div]:max-h-[500px]">
      <UiTable class="">
        <UiTableHeader class="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
          <UiTableRow>
            <UiTableHead class="pl-0 font-semibold text-foreground backdrop-blur">Name</UiTableHead>
            <UiTableHead
              class="hidden bg-background/90 pl-0 font-semibold text-foreground backdrop-blur lg:table-cell"
              >Title</UiTableHead
            >
            <UiTableHead
              class="hidden bg-background/90 pl-0 font-semibold text-foreground backdrop-blur md:table-cell"
              >Email</UiTableHead
            >
            <UiTableHead class="pl-0 font-semibold text-foreground backdrop-blur">Role</UiTableHead>
            <UiTableHead class="pl-0 backdrop-blur">
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

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/tables) ❤️. I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Basic Table

::ShowCase

:DocsTableBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableBasic.vue" code lang="vue" -->

```vue [DocsTableBasic.vue]
<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="hover:bg-transparent">
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="item in data" :key="item.id">
          <UiTableCell class="font-medium">{{ item.name }}</UiTableCell>
          <UiTableCell>{{ item.email }}</UiTableCell>
          <UiTableCell>{{ item.location }}</UiTableCell>
          <UiTableCell>{{ item.status }}</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
      <UiTableFooter class="bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="4">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Basic table</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Table with Images

::ShowCase

:DocsTableImages

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableImages.vue" code lang="vue" -->

```vue [DocsTableImages.vue]
<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="hover:bg-transparent">
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow v-for="item in data" :key="item.id">
          <UiTableCell>
            <div class="flex items-center gap-3">
              <UiAvatar class="size-10" :src="item.image" :alt="item.name" />
              <div>
                <div class="font-medium">{{ item.name }}</div>
                <span class="mt-0.5 text-xs text-muted-foreground">@{{ item.username }}</span>
              </div>
            </div>
          </UiTableCell>
          <UiTableCell>{{ item.email }}</UiTableCell>
          <UiTableCell>{{ item.location }}</UiTableCell>
          <UiTableCell>{{ item.status }}</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Table with images</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Table No Horizontal Lines

::ShowCase

:DocsTableNoHorizontalLines

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableNoHorizontalLines.vue" code lang="vue" -->

```vue [DocsTableNoHorizontalLines.vue]
<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="hover:bg-transparent">
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <tbody aria-hidden="true" class="table-row h-2" />
      <UiTableBody class="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
        <UiTableRow v-for="item in data" :key="item.id" class="border-none">
          <UiTableCell class="py-2.5 font-medium">{{ item.name }}</UiTableCell>
          <UiTableCell class="py-2.5">{{ item.email }}</UiTableCell>
          <UiTableCell class="py-2.5">{{ item.location }}</UiTableCell>
          <UiTableCell class="py-2.5">{{ item.status }}</UiTableCell>
          <UiTableCell class="py-2.5 text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
      <tbody aria-hidden="true" class="table-row h-2" />
      <UiTableFooter class="border-t-0 bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="4">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p className="mt-4 text-center text-sm text-muted-foreground">
      Table without horizontal dividers
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Striped Tabled

::ShowCase

:DocsTableStriped

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableStriped.vue" code lang="vue" -->

```vue [DocsTableStriped.vue]
<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="hover:bg-transparent">
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <tbody aria-hidden="true" class="table-row h-2" />
      <UiTableBody class="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
        <UiTableRow
          v-for="item in data"
          :key="item.id"
          class="border-none odd:bg-muted/50 hover:bg-transparent odd:hover:bg-muted/50"
        >
          <UiTableCell class="py-2.5 font-medium">{{ item.name }}</UiTableCell>
          <UiTableCell class="py-2.5">{{ item.email }}</UiTableCell>
          <UiTableCell class="py-2.5">{{ item.location }}</UiTableCell>
          <UiTableCell class="py-2.5">{{ item.status }}</UiTableCell>
          <UiTableCell class="py-2.5 text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
      <tbody aria-hidden="true" class="table-row h-2" />
      <UiTableFooter class="border-t-0 bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="4">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Striped table</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Vertical Lines

::ShowCase

:DocsTableVerticalLines

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableVerticalLines.vue" code lang="vue" -->

```vue [DocsTableVerticalLines.vue]
<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody class="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
        <UiTableRow
          v-for="item in data"
          :key="item.id"
          class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
        >
          <UiTableCell class="font-medium">{{ item.name }}</UiTableCell>
          <UiTableCell>{{ item.email }}</UiTableCell>
          <UiTableCell>{{ item.location }}</UiTableCell>
          <UiTableCell>{{ item.status }}</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
      <UiTableFooter class="bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="4">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Table with vertical lines</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Dense Table

::ShowCase

:DocsTableDense

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableDense.vue" code lang="vue" -->

```vue [DocsTableDense.vue]
<template>
  <div>
    <div class="overflow-hidden rounded-lg border border-border bg-background">
      <UiTable>
        <UiTableHeader>
          <UiTableRow class="bg-muted/50">
            <UiTableHead v-for="h in headers" :key="h" class="h-9 whitespace-nowrap py-2">{{
              h
            }}</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="language in programmingLanguages" :key="language.id">
            <UiTableCell class="py-2 font-medium">{{ language.name }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.releaseYear }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.developer }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.typing }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.paradigm }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.extension }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.latestVersion }}</UiTableCell>
            <UiTableCell class="py-2">{{ language.popularity }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="mt-4 text-center text-sm text-muted-foreground">Dense table</p>
  </div>
</template>

<script lang="ts" setup>
  const headers = [
    "Name",
    "Release Year",
    "Developer",
    "Typing",
    "Paradigm",
    "Extension",
    "Latest Version",
    "Popularity",
  ];
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
</script>
```

<!-- /automd -->

::

### Row Selection

::ShowCase

:DocsTableBasicRowSelection

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableBasicRowSelection.vue" code lang="vue" -->

```vue [DocsTableBasicRowSelection.vue]
<template>
  <div>
    <UiTable>
      <UiTableHeader>
        <UiTableRow class="hover:bg-transparent">
          <UiTableHead>
            <UiCheckbox />
          </UiTableHead>
          <UiTableHead>Name</UiTableHead>
          <UiTableHead>Email</UiTableHead>
          <UiTableHead>Location</UiTableHead>
          <UiTableHead>Status</UiTableHead>
          <UiTableHead class="text-right">Balance</UiTableHead>
        </UiTableRow>
      </UiTableHeader>
      <UiTableBody>
        <UiTableRow
          v-for="item in data"
          :key="item.id"
          class="has-[[data-state=checked]]:bg-muted/50"
        >
          <UiTableCell>
            <UiCheckbox />
          </UiTableCell>
          <UiTableCell class="font-medium">{{ item.name }}</UiTableCell>
          <UiTableCell>{{ item.email }}</UiTableCell>
          <UiTableCell>{{ item.location }}</UiTableCell>
          <UiTableCell>{{ item.status }}</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
        </UiTableRow>
      </UiTableBody>
      <UiTableFooter class="bg-transparent">
        <UiTableRow class="hover:bg-transparent">
          <UiTableCell colspan="5">Total</UiTableCell>
          <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
        </UiTableRow>
      </UiTableFooter>
    </UiTable>
    <p class="mt-4 text-center text-sm text-muted-foreground">Table with row selection</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Card Table

::ShowCase

:DocsTableCardTable

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableCardTable.vue" code lang="vue" -->

```vue [DocsTableCardTable.vue]
<template>
  <div>
    <div class="overflow-hidden rounded-lg border border-border bg-background">
      <UiTable>
        <UiTableHeader>
          <UiTableRow class="hover:bg-transparent">
            <UiTableHead>
              <UiCheckbox />
            </UiTableHead>
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Email</UiTableHead>
            <UiTableHead>Location</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Balance</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow
            v-for="item in data"
            :key="item.id"
            class="has-[[data-state=checked]]:bg-muted/50"
          >
            <UiTableCell>
              <UiCheckbox />
            </UiTableCell>
            <UiTableCell class="font-medium">{{ item.name }}</UiTableCell>
            <UiTableCell>{{ item.email }}</UiTableCell>
            <UiTableCell>{{ item.location }}</UiTableCell>
            <UiTableCell>{{ item.status }}</UiTableCell>
            <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
        <UiTableFooter class="bg-transparent">
          <UiTableRow class="hover:bg-transparent">
            <UiTableCell colspan="5">Total</UiTableCell>
            <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
    <p class="mt-4 text-center text-sm text-muted-foreground">Table with row selection</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Vertical Table

::ShowCase

:DocsTableVertical

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableVertical.vue" code lang="vue" -->

```vue [DocsTableVertical.vue]
<template>
  <div class="mx-auto max-w-lg">
    <div class="overflow-hidden rounded-lg border border-border bg-background">
      <UiTable>
        <UiTableBody>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Name</UiTableCell>
            <UiTableCell class="py-2">David Kim</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Email</UiTableCell>
            <UiTableCell class="py-2">d.kim@company.com</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Location</UiTableCell>
            <UiTableCell class="py-2">Seoul, KR</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Status</UiTableCell>
            <UiTableCell class="py-2">Active</UiTableCell>
          </UiTableRow>
          <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
            <UiTableCell class="bg-muted/50 py-2 font-medium">Balance</UiTableCell>
            <UiTableCell class="py-2">$1,000.00</UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="mt-4 text-center text-sm text-muted-foreground">Vertical table</p>
  </div>
</template>
```

<!-- /automd -->

::

### Sticky Header 2

::ShowCase

:DocsTableStickyHeader2

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableStickyHeader2.vue" code lang="vue" -->

```vue [DocsTableStickyHeader2.vue]
<template>
  <div>
    <div class="[&>div]:max-h-96">
      <UiTable
        class="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr:not(:last-child)_td]:border-b [&_tr]:border-none"
      >
        <UiTableHeader class="sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
          <UiTableRow class="hover:bg-transparent">
            <UiTableHead>Name</UiTableHead>
            <UiTableHead>Email</UiTableHead>
            <UiTableHead>Location</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Balance</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="item in data" :key="item.id">
            <UiTableCell class="font-medium">{{ item.name }}</UiTableCell>
            <UiTableCell>{{ item.email }}</UiTableCell>
            <UiTableCell>{{ item.location }}</UiTableCell>
            <UiTableCell>{{ item.status }}</UiTableCell>
            <UiTableCell class="text-right">{{ formatCurrency(item.balance) }}</UiTableCell>
          </UiTableRow>
        </UiTableBody>
        <UiTableFooter class="bg-transparent">
          <UiTableRow class="hover:bg-transparent">
            <UiTableCell colspan="4">Total</UiTableCell>
            <UiTableCell class="text-right">{{ formatCurrency(total) }}</UiTableCell>
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
    <p class="mt-8 text-center text-sm text-muted-foreground">Table with sticky header</p>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 15 }, (item, index) => ({
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

  const total = computed(() => {
    return data.value?.reduce((acc, item) => acc + item.balance, 0);
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
</script>
```

<!-- /automd -->

::

### Browser Support

::ShowCase

:DocsTableBrowserSupport

#code

<!-- automd:file src="../../app/components/content/Docs/Table/DocsTableBrowserSupport.vue" code lang="vue" -->

```vue [DocsTableBrowserSupport.vue]
<template>
  <UiTable>
    <UiTableHeader>
      <UiTableRow
        class="border-y-0 *:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
      >
        <UiTableCell />
        <UiTableHead class="border-b border-border text-center" colspan="5">
          <Icon name="lucide:monitor" class="inline-flex size-4" aria-hidden="true" />
          <span class="sr-only">Desktop browsers</span>
        </UiTableHead>
        <UiTableHead class="border-b border-border text-center" colspan="5">
          <Icon name="lucide:smartphone" class="inline-flex size-4" aria-hidden="true" />
          <span class="sr-only">Mobile browsers</span>
        </UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableHeader>
      <UiTableRow class="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
        <UiTableCell />

        <UiTableHead
          v-for="browser in items?.[0]?.desktop"
          :key="browser.name"
          class="h-auto rotate-180 py-3 text-foreground [writing-mode:vertical-lr]"
        >
          {{ browser.name }}
        </UiTableHead>
        <UiTableHead
          v-for="browser in items?.[0]?.mobile"
          :key="browser.name"
          class="h-auto rotate-180 py-3 text-foreground [writing-mode:vertical-lr]"
        >
          {{ browser.name }}
        </UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableBody>
      <UiTableRow
        v-for="item in items"
        :key="item.feature"
        class="*:border-border [&>:not(:last-child)]:border-r"
      >
        <UiTableHead class="whitespace-nowrap font-medium text-foreground">{{
          item.feature
        }}</UiTableHead>
        <UiTableCell
          v-for="(browser, index) in [...item.desktop, ...item.mobile]"
          :key="`${browser.name}-${index}`"
          class="space-y-1 text-center"
        >
          <Icon
            v-if="browser.supported"
            name="lucide:check"
            class="inline-flex size-4 text-emerald-600"
            aria-hidden="true"
          />
          <Icon
            v-else
            name="lucide:x"
            class="inline-flex size-4 text-destructive"
            aria-hidden="true"
          />

          <span class="sr-only">{{ browser.supported ? "Supported" : "Not supported" }}</span>
          <div class="text-xs font-medium text-muted-foreground">{{ browser.version }}</div>
        </UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>

<script lang="ts" setup>
  const items = [
    {
      feature: "scroll-timeline",
      desktop: [
        { name: "Chrome", supported: true, version: "115" },
        { name: "Edge", supported: true, version: "115" },
        { name: "Firefox", supported: false, version: "111" },
        { name: "Opera", supported: true, version: "101" },
        { name: "Safari", supported: false, version: "No" },
      ],
      mobile: [
        { name: "Chrome Android", supported: true, version: "115" },
        { name: "Firefox Android", supported: false, version: "No" },
        { name: "Opera Android", supported: true, version: "77" },
        { name: "Safari iOS", supported: false, version: "No" },
        { name: "Samsung Internet", supported: true, version: "23" },
      ],
    },
    {
      feature: "view-timeline",
      desktop: [
        { name: "Chrome", supported: true, version: "115" },
        { name: "Edge", supported: true, version: "115" },
        { name: "Firefox", supported: false, version: "114" },
        { name: "Opera", supported: true, version: "101" },
        { name: "Safari", supported: false, version: "No" },
      ],
      mobile: [
        { name: "Chrome Android", supported: true, version: "115" },
        { name: "Firefox Android", supported: false, version: "No" },
        { name: "Opera Android", supported: true, version: "77" },
        { name: "Safari iOS", supported: false, version: "No" },
        { name: "Samsung Internet", supported: true, version: "23" },
      ],
    },
    {
      feature: "font-size-adjust",
      desktop: [
        { name: "Chrome", supported: true, version: "127" },
        { name: "Edge", supported: true, version: "127" },
        { name: "Firefox", supported: false, version: "3" },
        { name: "Opera", supported: true, version: "113" },
        { name: "Safari", supported: true, version: "16.4" },
      ],
      mobile: [
        { name: "Chrome Android", supported: true, version: "127" },
        { name: "Firefox Android", supported: true, version: "4" },
        { name: "Opera Android", supported: true, version: "84" },
        { name: "Safari iOS", supported: true, version: "16.4" },
        { name: "Samsung Internet", supported: false, version: "No" },
      ],
    },
  ];
</script>
```

<!-- /automd -->

::
