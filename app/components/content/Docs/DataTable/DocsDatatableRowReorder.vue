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
