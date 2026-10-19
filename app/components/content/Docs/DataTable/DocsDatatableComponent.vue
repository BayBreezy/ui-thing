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
