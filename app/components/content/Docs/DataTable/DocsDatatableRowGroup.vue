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
