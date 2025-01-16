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
