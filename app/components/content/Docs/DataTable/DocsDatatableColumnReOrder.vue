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
