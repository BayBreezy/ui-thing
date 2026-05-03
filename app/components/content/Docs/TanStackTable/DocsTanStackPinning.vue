<template>
  <div class="space-y-4">
    <div class="text-muted-foreground flex items-center gap-2 text-sm">
      <Icon name="lucide:info" class="size-4" />
      Use the pin menu to choose top, bottom, or unpin.
    </div>

    <div class="overflow-x-hidden rounded-lg border">
      <UiTanStackTable :data="data" :columns="columns" :loading="pending" @row-pin="onRowPin">
        <template #pin-header>
          <span class="sr-only">Pin</span>
        </template>
      </UiTanStackTable>
    </div>

    <div v-if="pinnedTop.length || pinnedBottom.length" class="bg-muted/50 rounded-lg border p-4">
      <div class="font-semibold">Pinned rows</div>
      <div class="text-muted-foreground mt-2 space-y-1 text-sm">
        <div v-if="pinnedTop.length">Top: {{ pinnedTop.map((r) => r.name).join(", ") }}</div>
        <div v-if="pinnedBottom.length">
          Bottom: {{ pinnedBottom.map((r) => r.name).join(", ") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, RowPinningState } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  const rowPinning = ref<RowPinningState>({});

  interface User {
    id: string;
    name: string;
    email: string;
    status: "active" | "inactive";
    department: string;
  }

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      await promiseTimeout(800);
      return Array.from({ length: 12 }, () => ({
        id: faker.string.nanoid(6).toUpperCase(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
        department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
      }));
    },
    { default: () => [] }
  );

  const onRowPin = ({ row, pin }: { row: any; pin: "top" | "bottom" | false }) => {
    rowPinning.value = rowPinning.value || {};
    if (pin === false) {
      if (rowPinning.value.top) {
        rowPinning.value.top = rowPinning.value.top.filter((id) => id !== row.id);
      }
      if (rowPinning.value.bottom) {
        rowPinning.value.bottom = rowPinning.value.bottom.filter((id) => id !== row.id);
      }
    } else {
      const section = pin === "top" ? "top" : "bottom";
      const other = pin === "top" ? "bottom" : "top";
      rowPinning.value[section] = [
        ...(rowPinning.value[section] || []).filter((id) => id !== row.id),
        row.id,
      ];
      rowPinning.value[other] = (rowPinning.value[other] || []).filter((id) => id !== row.id);
    }
  };

  const pinnedTop = computed(() => {
    const ids = rowPinning.value.top || [];
    return data.value.filter((user) => ids.includes(user.id));
  });

  const pinnedBottom = computed(() => {
    const ids = rowPinning.value.bottom || [];
    return data.value.filter((user) => ids.includes(user.id));
  });

  const columns: ColumnDef<User>[] = [
    {
      id: "pin",
      header: () => null,
      cell: () => null,
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
    },
    {
      accessorKey: "email",
      header: "Email",
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
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              status === "active"
                ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`,
          },
          status.charAt(0).toUpperCase() + status.slice(1)
        );
      },
    },
  ];
</script>
