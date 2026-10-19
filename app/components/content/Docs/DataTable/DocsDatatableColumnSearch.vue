<template>
  <div class="space-y-4">
    <div class="grid gap-4 sm:grid-cols-2">
      <UiVeeInput
        v-model="people"
        label="Name or position"
        placeholder="Search people"
        icon="lucide:search"
        hint="One search applied across two columns."
      />
      <UiVeeInput
        v-model="office"
        label="Office"
        placeholder="Filter by office"
        icon="lucide:map-pin"
      />
    </div>
    <div class="overflow-hidden rounded-lg border">
      <UiDatatable :data="data" :options="options" @ready="tableRef = $event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Api, Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableColumnSearch",
    async () =>
      Array.from({ length: 40 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.location.city(),
        age: faker.number.int({ min: 22, max: 63 }),
      })),
    { default: () => [] }
  );

  const tableRef = shallowRef<Api<any> | undefined>();
  const people = ref("");
  const office = ref("");

  // `columns().search()` applies one search term across every selected column (DataTables 3).
  watch(people, (value) => {
    tableRef.value?.columns([0, 1]).search(value).draw();
  });
  // `column().search()` targets a single column.
  watch(office, (value) => {
    tableRef.value?.column(2).search(value).draw();
  });

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    pageLength: 5,
    columns: [
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      { title: "Office", data: "office" },
      { title: "Age", data: "age" },
    ],
  };
</script>
