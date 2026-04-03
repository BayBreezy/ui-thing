<template>
  <div>
    <UiContextMenu>
      <UiContextMenuTrigger as-child>
        <div class="overflow-hidden rounded-lg border">
          <UiTanStackTable
            ref="tableRef"
            :data="data"
            :columns="columns"
            :loading="pending"
            @row-contextmenu="handleRowContextMenu"
          />
        </div>
      </UiContextMenuTrigger>
      <UiContextMenuContent class="w-64">
        <UiContextMenuLabel v-if="selectedUser">
          {{ selectedUser.name }}
        </UiContextMenuLabel>
        <UiContextMenuSeparator />
        <UiContextMenuGroup>
          <UiContextMenuItem
            icon="lucide:mail"
            @select="
              useSonner('Email Sent', {
                description: `Sending email to ${selectedUser?.email}`,
              })
            "
          >
            Send Email
          </UiContextMenuItem>
          <UiContextMenuItem
            icon="lucide:user"
            @select="
              useSonner('View Profile', {
                description: `Opening profile for ${selectedUser?.name}`,
              })
            "
          >
            View Profile
          </UiContextMenuItem>
          <UiContextMenuItem
            icon="lucide:pencil"
            @select="
              useSonner('Edit User', {
                description: `Editing ${selectedUser?.name}`,
              })
            "
          >
            Edit User
          </UiContextMenuItem>
        </UiContextMenuGroup>
        <UiContextMenuSeparator />
        <UiContextMenuGroup>
          <UiContextMenuItem
            v-if="selectedUser?.status === 'active'"
            icon="lucide:ban"
            @select="
              useSonner.warning('Deactivate User', {
                description: `Are you sure you want to deactivate ${selectedUser?.name}?`,
                action: {
                  label: 'Deactivate',
                  onClick: () => {
                    useSonner.success('User Deactivated', {
                      description: `${selectedUser?.name} has been deactivated.`,
                    });
                  },
                },
              })
            "
          >
            Deactivate
          </UiContextMenuItem>
          <UiContextMenuItem
            v-else
            icon="lucide:check-circle"
            @select="
              useSonner.success('User Activated', {
                description: `${selectedUser?.name} has been activated.`,
              })
            "
          >
            Activate
          </UiContextMenuItem>
        </UiContextMenuGroup>
        <UiContextMenuSeparator />
        <UiContextMenuItem
          icon="lucide:trash"
          variant="destructive"
          @select="
            useSonner.error('Delete User', {
              description: `Are you sure you want to delete ${selectedUser?.name}?`,
              action: {
                label: 'Delete',
                onClick: () => {
                  useSonner.success('User Deleted', {
                    description: `${selectedUser?.name} has been removed.`,
                  });
                },
              },
            })
          "
        >
          Delete User
        </UiContextMenuItem>
      </UiContextMenuContent>
    </UiContextMenu>

    <div v-if="selectedUser" class="mt-4 rounded-lg border bg-muted/50 p-4">
      <p class="text-sm text-muted-foreground">
        <span class="font-semibold">Last Selected:</span> {{ selectedUser.name }} ({{
          selectedUser.email
        }})
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";
  import { promiseTimeout } from "@vueuse/core";

  const selectedUser = ref<User | null>(null);

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive";
  }

  const { data, pending } = await useAsyncData<User[]>(
    async () => {
      // Simulate fetching data
      await promiseTimeout(1000);
      // create 15 fake user records
      return Array.from({ length: 15 }, () => ({
        id: faker.string.nanoid(8).toUpperCase(),
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Member", "Viewer"]),
        department: faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Support"]),
        status: faker.helpers.arrayElement(["active", "inactive"]) as "active" | "inactive",
      }));
    },
    { default: () => [] }
  );

  const handleRowContextMenu = ({ row }: { event: MouseEvent; row: { original: User } }) => {
    selectedUser.value = row.original;
  };

  const columns: ColumnDef<User>[] = [
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
