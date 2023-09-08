<template>
  <div>
    <Heading
      title="Data Table"
      subtext="Powerful table and datagrids built using TanStack Table."
    />

    <UIDataTable v-model="selected" :data="data" :columns="columns" class="mt-5" />
  </div>
</template>

<script lang="ts" setup>
  import { ColumnDef } from "@tanstack/vue-table";

  const selected = ref([]);

  type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return h(
          resolveComponent("UIButton"),
          { variant: "ghost", size: "icon", class: "w-9 h-9" },
          () => [h(resolveComponent("Icon"), { name: "lucide:more-horizontal", class: "h-4 w-4" })]
        );
      },
    },
  ];
</script>
