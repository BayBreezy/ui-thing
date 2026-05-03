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
