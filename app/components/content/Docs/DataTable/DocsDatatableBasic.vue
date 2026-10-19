<template>
  <div>
    <UiDatatable :data="users" :options="options" @ready="tableRef = $event" />
  </div>
</template>

<script lang="ts" setup>
  import type { Config } from "datatables.net";
  import type DataTableRef from "datatables.net";

  const options: Config = {
    layout: {
      top1: "searchBuilder",
      topStart: "buttons",
      topEnd: "search",
      bottomStart: ["pageLength", "info"],
      bottomEnd: "paging",
    },
    select: true,
    autoWidth: true,
    responsive: true,

    buttons: [
      "copy",
      "csv",
      "excel",
      "pdf",
      "print",
      {
        text: "Select all",
        action: function (e, dt, _, __) {
          dt.rows().select();
        },
      },
    ],
    columns: [
      {
        data: "id.value",
        title: "ID",
        render(_, __, row, ___) {
          return row.id?.value ? row.id?.value : "N/A";
        },
      },
      { data: "name.first", title: "First Name" },
      { data: "name.last", title: "Last Name" },
      { data: "email", title: "Email" },
      { data: "phone", title: "Phone" },
      {
        data: "dob.date",
        title: "DOB",
        render(_, __, row, ___) {
          const formattedDob = useDateFormat(row.dob.date, "MMM DD, YYYY [at] h:mm A");
          return formattedDob.value;
        },
      },
      { data: "location.city", title: "City" },
      { data: "location.country", title: "Country" },
    ],
  };

  const { data: users } = await useAsyncData(
    "randomUsers",
    () => $fetch<any>("https://randomuser.me/api/?results=100"),
    {
      transform: (v: any) => v.results,
      default: () => [],
    }
  );

  const tableRef = shallowRef<InstanceType<typeof DataTableRef<any[]>> | undefined>();
</script>

<style scoped>
  :deep(.dt-layout-table > .dt-layout-cell) {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
</style>
