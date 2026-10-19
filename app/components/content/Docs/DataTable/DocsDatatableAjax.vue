<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-4">
      <p class="text-muted-foreground text-sm">Data is loaded through the `ajax` option.</p>
      <UiButton variant="outline" size="sm" icon="lucide:refresh-cw" @click="reload">
        Reload data
      </UiButton>
    </div>
    <div class="relative overflow-hidden rounded-lg border">
      <UiDatatable :options="options" @ready="tableRef = $event" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Api, Config } from "datatables.net";

  const tableRef = shallowRef<Api<any> | undefined>();

  const makeRows = () =>
    Array.from({ length: 25 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      city: faker.location.city(),
      balance: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
    }));

  const options: Config = {
    // Show the loading overlay while the request is in flight
    processing: true,
    layout: { topStart: null, topEnd: null, bottomStart: "info", bottomEnd: "paging" },
    pageLength: 5,
    // `ajax` can be a URL, an object or a function. A function lets you fetch the data yourself
    // (here we fake a slow network) and hand it back through the callback.
    ajax: (_data, callback) => {
      setTimeout(() => callback({ data: makeRows() }), 900);
    },
    columns: [
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "City", data: "city" },
      {
        title: "Balance",
        data: "balance",
        className: "text-right",
        render: (d: number) =>
          new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(d),
      },
    ],
  };

  // Re-run the Ajax request. `false` keeps the current page and sorting.
  const reload = () => tableRef.value?.ajax.reload(undefined, false);
</script>
