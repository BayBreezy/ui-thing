<template>
  <div class="overflow-hidden rounded-lg border p-4">
    <UiDatatable :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableCustomLayout",
    async () =>
      Array.from({ length: 40 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.location.city(),
      })),
    { default: () => [] }
  );

  const options: Config = {
    layout: {
      // A feature can be a string or an object that holds the feature's own options
      topStart: { search: { placeholder: "Search people..." } },
      topEnd: null,
      // An array puts several features in the same cell
      bottomStart: ["pageLength", "info"],
      bottomEnd: { paging: { buttons: 3 } },
      // A number after top / bottom adds another row
      bottom2: () => {
        // A function returns any element you like
        const hint = document.createElement("p");
        hint.className = "text-xs text-muted-foreground";
        hint.textContent = "Tip: click a column heading to sort.";
        return hint;
      },
    },
    pageLength: 5,
    lengthMenu: [5, 10, 25],
    columns: [
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      { title: "Office", data: "office" },
    ],
  };
</script>
