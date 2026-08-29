<template>
  <div class="w-full">
    <UiTanStackTable :data="users" :columns="columns">
      <template #name-cell="{ row }">
        <div class="flex items-center gap-3">
          <UiAvatar
            :src="`https://i.pravatar.cc/120?img=${row.original.id}`"
            class="size-10"
            :alt="`${row.original.name} avatar`"
          />
          <div>
            <p class="font-medium">{{ row.original.name }}</p>
            <p class="text-muted-foreground text-sm">@{{ row.original.username }}</p>
          </div>
        </div>
      </template>

      <template #actions-cell="{}">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost" size="icon-sm">
              <Icon name="lucide:more-horizontal" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="min-w-40" align="end">
            <UiDropdownMenuItem>
              <Icon name="lucide:edit" class="size-4" />
              Edit
            </UiDropdownMenuItem>
            <UiDropdownMenuItem>
              <Icon name="lucide:copy" class="size-4" />
              Copy ID
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem variant="destructive">
              <Icon name="lucide:trash" class="size-4" />
              Delete
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </template>
    </UiTanStackTable>
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
  }

  const users: User[] = [
    {
      id: 1,
      name: "Lindsay Walton",
      username: "lindsayw",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    {
      id: 2,
      name: "Courtney Henry",
      username: "courtneyh",
      email: "courtney.henry@example.com",
      role: "Admin",
    },
    {
      id: 3,
      name: "Tom Cook",
      username: "tomc",
      email: "tom.cook@example.com",
      role: "Member",
    },
    {
      id: 4,
      name: "Whitney Francis",
      username: "whitneyf",
      email: "whitney.francis@example.com",
      role: "Admin",
    },
  ];

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "User",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "",
    },
  ];
</script>
