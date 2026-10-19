<template>
  <div class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <p class="text-muted-foreground text-sm">
        {{ rows.length }} {{ rows.length === 1 ? "person" : "people" }} in the table
      </p>
      <div class="flex gap-2">
        <UiButton size="sm" icon="lucide:plus" @click="addRow">Add person</UiButton>
        <UiButton
          size="sm"
          variant="outline"
          icon="lucide:minus"
          :disabled="!rows.length"
          @click="removeRow"
        >
          Remove last
        </UiButton>
      </div>
    </div>
    <div class="overflow-hidden rounded-lg border">
      <UiDatatable :data="rows" :options="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const makeRow = () => ({
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    city: faker.location.city(),
  });

  // Plain Vue state. The component watches `data` and redraws the table when it changes.
  const rows = ref(Array.from({ length: 4 }, makeRow));

  const addRow = () => {
    rows.value = [makeRow(), ...rows.value];
  };
  const removeRow = () => {
    rows.value = rows.value.slice(0, -1);
  };

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    pageLength: 5,
    ordering: false,
    columns: [
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "City", data: "city" },
    ],
  };
</script>
