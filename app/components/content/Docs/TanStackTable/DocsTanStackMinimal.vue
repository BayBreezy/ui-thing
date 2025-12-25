<template>
  <div class="w-full">
    <UiTanStackTable :data="users" :columns="columns" :show-footer="false" :initial-page-size="5" />
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";

  interface User {
    name: string;
    email: string;
    status: string;
  }

  const users: User[] = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Active" },
    { name: "Bob Johnson", email: "bob@example.com", status: "Inactive" },
  ];

  const columns: ColumnDef<User>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "status", header: "Status" },
  ];
</script>
