<template>
  <div>
    <div class="overflow-hidden rounded-lg border">
      <UiTanStackTable ref="tableRef" :data="data" :columns="columns" :loading="pending">
        <template #expand-cell>
          <!-- The expand button is automatically rendered by the component -->
        </template>

        <template #expanded-row="{ row }">
          <UiDescriptionList class="p-5 sm:grid-cols-[140px_auto]">
            <UiDescriptionListTerm>User ID</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.id }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Email</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.email }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Role</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.role }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Department</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.department }}</UiDescriptionListDetails>
            <UiDescriptionListTerm>Status</UiDescriptionListTerm>
            <UiDescriptionListDetails>
              <UiBadge
                :variant="row.original.status === 'active' ? 'default' : 'destructive'"
                class="capitalize"
              >
                {{ row.original.status }}
              </UiBadge>
            </UiDescriptionListDetails>
            <UiDescriptionListTerm>Join Date</UiDescriptionListTerm>
            <UiDescriptionListDetails>{{ row.original.joinDate }}</UiDescriptionListDetails>
            <UiDescriptionListTerm v-if="row.original.bio">Bio</UiDescriptionListTerm>
            <UiDescriptionListDetails v-if="row.original.bio" class="whitespace-break-spaces">
              {{ row.original.bio }}
            </UiDescriptionListDetails>
          </UiDescriptionList>
        </template>
      </UiTanStackTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive";
    joinDate: string;
    bio: string;
  }

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      // Simulate fetching data
      await promiseTimeout(1000);
      // create 20 fake user records
      return Array.from({ length: 20 }, () => ({
        id: faker.string.nanoid(8).toUpperCase(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
        department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
        status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
        joinDate: faker.date.past().toLocaleDateString(),
        bio: faker.lorem.paragraph(),
      }));
    },
    { default: () => [] }
  );

  const columns: ColumnDef<User>[] = [
    {
      id: "expand",
      header: () => null,
      cell: () => null,
      enableHiding: false,
      enableSorting: false,
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
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }) => {
        const role = getValue() as string;
        return h(
          "span",
          {
            class: `inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
              role === "Admin"
                ? "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400"
                : role === "Member"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                  : "bg-gray-50 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400"
            }`,
          },
          role
        );
      },
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
