<template>
  <div class="overflow-hidden rounded-lg border p-4">
    <UiDatatable :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { Config } from "datatables.net";

  const { data } = await useAsyncData(
    "datatableExport",
    async () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        city: faker.location.city(),
        balance: faker.number.float({ min: 0, max: 5000, fractionDigits: 2 }),
      })),
    { default: () => [] }
  );

  const today = useDateFormat(new Date(), "YYYY-MM-DD").value;

  // Columns with the `no-export` class are left out of every export below
  const exportOptions = { columns: ":not(.no-export)" };

  const options: Config = {
    layout: {
      topStart: "buttons",
      topEnd: "search",
      bottomStart: "info",
      bottomEnd: "paging",
    },
    pageLength: 5,
    buttons: [
      { extend: "colvis", text: "Columns", columns: ":not(.no-export)" },
      { extend: "copy", exportOptions },
      { extend: "csv", filename: `customers-${today}`, exportOptions },
      { extend: "excel", title: "Customers", filename: `customers-${today}`, exportOptions },
      {
        extend: "pdf",
        title: "Customers",
        orientation: "landscape",
        filename: `customers-${today}`,
        exportOptions,
        // `customize` receives the pdfmake document definition
        customize: (doc: any) => {
          doc.defaultStyle.fontSize = 9;
          doc.styles.tableHeader.alignment = "left";
        },
      },
      {
        extend: "print",
        title: "Customers",
        messageTop: `Printed on ${today}`,
        exportOptions,
      },
    ],
    columns: [
      { title: "ID", data: "id", className: "no-export" },
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
</script>
