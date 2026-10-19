<template>
  <div class="overflow-hidden rounded-lg border">
    <UiDatatable :data="data" :options="options" @ready="onReady" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Api, Config } from "datatables.net";

  type Employee = {
    name: string;
    position: string;
    office: string;
    email: string;
    phone: string;
  };

  const { data } = await useAsyncData<Employee[]>(
    "datatableChildRows",
    async () =>
      Array.from({ length: 8 }, () => ({
        name: faker.person.fullName(),
        position: faker.person.jobTitle(),
        office: faker.location.city(),
        email: faker.internet.email().toLowerCase(),
        phone: faker.phone.number(),
      })),
    { default: () => [] }
  );

  const options: Config = {
    layout: { topStart: null, topEnd: null, bottomStart: null, bottomEnd: null },
    paging: false,
    order: [[1, "asc"]],
    columns: [
      // `dt-control` gets the expand / collapse arrow from the DataTables stylesheet
      { data: null, className: "dt-control", orderable: false, defaultContent: "", width: "40px" },
      { title: "Name", data: "name" },
      { title: "Position", data: "position" },
      { title: "Office", data: "office" },
    ],
  };

  // Build the markup for the child row. Escape anything that came from your data.
  const escape = (value: string) => {
    const el = document.createElement("div");
    el.textContent = value;
    return el.innerHTML;
  };
  const format = (row: Employee) =>
    `<dl class="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-1 px-6 py-3 text-sm">
      <dt class="text-muted-foreground">Email</dt><dd>${escape(row.email)}</dd>
      <dt class="text-muted-foreground">Phone</dt><dd>${escape(row.phone)}</dd>
    </dl>`;

  const onReady = (dt?: Api<any>) => {
    // Delegated click handler: only fires for the control cells in the body
    dt?.on("click", "tbody td.dt-control", (e) => {
      const tr = (e.target as HTMLElement).closest("tr") as HTMLTableRowElement;
      const row = dt.row(tr);

      if (row.child.isShown()) {
        row.child.hide();
      } else {
        row.child(format(row.data() as Employee)).show();
      }
    });
  };
</script>
