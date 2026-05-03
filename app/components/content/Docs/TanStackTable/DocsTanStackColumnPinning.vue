<template>
  <div class="space-y-4">
    <div class="text-muted-foreground flex items-center gap-2 text-sm">
      <Icon name="lucide:info" class="size-4" />
      Pin columns with the header menu: choose left, right, or unpin.
    </div>

    <div class="overflow-hidden rounded-lg border">
      <UiTanStackTable
        :data="data"
        :columns="columns"
        :loading="pending"
        :enable-column-pinning="true"
        :show-column-pin-buttons="true"
        @ready="onReady"
        @update:column-pinning="columnPinning = $event"
      />
    </div>

    <div class="bg-muted/50 text-muted-foreground rounded-lg border p-4 text-sm">
      <div class="text-foreground font-semibold">Pinned columns</div>
      <div class="mt-2 space-y-1">
        <div v-if="columnPinning.left?.length">Left: {{ columnPinning.left.join(", ") }}</div>
        <div v-if="columnPinning.right?.length">Right: {{ columnPinning.right.join(", ") }}</div>
        <div v-if="!columnPinning.left?.length && !columnPinning.right?.length">None</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, ColumnPinningState, Table } from "@tanstack/vue-table";

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    department: string;
    status: "active" | "inactive";
  }

  const columnPinning = ref<ColumnPinningState>({});

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      return Array.from({ length: 8 }, () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        return {
          id: faker.string.nanoid(6).toUpperCase(),
          firstName,
          lastName,
          phone: faker.phone.number({ style: "national" }),
          address: faker.location.streetAddress({ useFullAddress: true }),
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
          status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
        };
      });
    },
    { default: () => [] }
  );

  const onReady = (table: Table<User>) => {
    // Set an initial pin for demonstration
    table.getColumn("firstName")?.pin("left");
    columnPinning.value = table.getState().columnPinning;
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      enablePinning: false,
      meta: { class: { th: "whitespace-nowrap" } },
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 220,
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const classes =
          status === "active"
            ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
            : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${classes}`,
          },
          status.charAt(0).toUpperCase() + status.slice(1)
        );
      },
    },
  ];
</script>
