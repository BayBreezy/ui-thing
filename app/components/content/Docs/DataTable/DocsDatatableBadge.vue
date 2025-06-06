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
