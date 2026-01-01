<template>
  <div class="w-full">
    <UiTanStackTable :data="payments" :columns="columns" />
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef, Row } from "@tanstack/vue-table";

  interface Payment {
    id: string;
    description: string;
    amount: number;
    quantity: number;
  }

  const payments: Payment[] = [
    {
      id: "1",
      description: "Web Design",
      amount: 1200,
      quantity: 3,
    },
    {
      id: "2",
      description: "Development",
      amount: 2400,
      quantity: 5,
    },
    {
      id: "3",
      description: "Consulting",
      amount: 800,
      quantity: 2,
    },
    {
      id: "4",
      description: "Support",
      amount: 600,
      quantity: 4,
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "#",
      footer: () => h("div", { class: "font-semibold" }, "Total"),
    },
    {
      accessorKey: "description",
      header: "Description",
      footer: () => "",
    },
    {
      accessorKey: "quantity",
      header: () => h("div", { class: "text-center" }, "Qty"),
      cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("quantity")),
      footer: ({ column }) => {
        const total = column
          .getFacetedRowModel()
          .rows.reduce(
            (sum: number, row: Row<Payment>) => sum + row.getValue<number>("quantity"),
            0
          );
        return h("div", { class: "text-center font-semibold" }, total);
      },
    },
    {
      accessorKey: "amount",
      header: () => h("div", { class: "text-right justify-end w-full" }, "Amount"),
      cell: ({ row }) => {
        const amount = row.getValue<number>("amount");
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return h("div", { class: "text-right font-medium" }, formatted);
      },
      footer: ({ column }) => {
        const total = column
          .getFacetedRowModel()
          .rows.reduce((sum: number, row: Row<Payment>) => sum + row.getValue<number>("amount"), 0);
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(total);
        return h("div", { class: "text-right font-semibold" }, formatted);
      },
    },
  ];
</script>
