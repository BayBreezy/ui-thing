<template>
  <div>
    <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
      <UiInput v-model="search" type="search" placeholder="Search" class="w-full md:w-96" />
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline">
            <span>View</span>
            <Icon name="lucide:chevron-down" class="h-4 w-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent :side-offset="10" align="start" class="w-[300px] md:w-[200px]">
          <UiDropdownMenuLabel> Toggle Columns </UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuCheckboxItem
              v-for="column in table?.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              :checked="column.getIsVisible()"
              @update:checked="tableRef?.toggleColumnVisibility(column)"
            >
              <span class="text-sm capitalize">{{ column?.id }}</span>
            </UiDropdownMenuCheckboxItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <UiTanStackTable
      ref="tableRef"
      show-select
      :search="search"
      :data="data"
      :columns="columns"
      class="mt-5 rounded-md border"
      @ready="table = $event"
    >
      <template #empty>
        <div class="flex w-full flex-col items-center justify-center gap-5 py-5">
          <Icon name="lucide:database" class="h-12 w-12 text-muted-foreground" />
          <span class="mt-2">No data available.</span>
        </div>
      </template>
    </UiTanStackTable>
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef, Table } from "@tanstack/vue-table";

  const tableRef = ref();
  const table = ref<Table<Payment> | null>(null);
  const search = ref("");

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
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "ujmovto@tezotu.bb",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "gi@po.tz",
    },
  ];

  const columns: ColumnDef<Payment>[] = [
    { accessorKey: "id", header: "ID", enableHiding: true },
    { accessorKey: "amount", header: "Amount", enableHiding: true },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return h(resolveComponent("UiBadge"), { variant: "outline", class: "capitalize" }, () => [
          row.original.status,
        ]);
      },
      enableHiding: true,
    },
    { accessorKey: "email", header: "Email", enableHiding: true },
    {
      accessorKey: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      cell: () => {
        return h(
          resolveComponent("UiButton"),
          { variant: "ghost", size: "icon", class: "w-9 h-9" },
          () => [h(resolveComponent("Icon"), { name: "lucide:more-horizontal", class: "h-4 w-4" })]
        );
      },
    },
  ];
</script>
