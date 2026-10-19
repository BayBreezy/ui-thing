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
