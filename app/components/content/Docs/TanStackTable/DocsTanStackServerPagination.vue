<template>
  <div class="w-full space-y-4">
    <div class="flex items-start justify-between">
      <UiInput
        v-model="searchQuery"
        type="search"
        placeholder="Search users..."
        class="w-full max-w-sm"
      />
      <UiBadge variant="outline" size="md"> {{ totalRows }} total users </UiBadge>
    </div>

    <div class="overflow-hidden rounded-lg border">
      <UiTanStackTable
        :data="data"
        :columns="columns"
        :loading="pending"
        :manual-pagination="true"
        :page-count="pageCount"
        :initial-page-size="pageSize"
        @update:pagination="onPaginationChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    status: "active" | "inactive";
  }

  interface ApiResponse {
    data: User[];
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  }

  const pageIndex = ref(0);
  const pageSize = ref(10);
  const searchQuery = ref("");
  const debouncedSearch = refDebounced(searchQuery, 500);

  // Simulate API call with delay
  const fetchUsers = async (page: number, size: number, search: string): Promise<ApiResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock data
    const allUsers: User[] = Array.from({ length: 95 }, (_, i) => ({
      id: faker.string.nanoid(5).toUpperCase(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      role: ["Admin", "Member", "Viewer"][i % 3] || "Viewer",
      department: ["Engineering", "Sales", "Marketing", "Support"][i % 4] || "Support",
      status: i % 5 === 0 ? "inactive" : "active",
    }));

    // Filter by search
    const filtered = search
      ? allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
      : allUsers;

    // Paginate
    const start = page * size;
    const end = start + size;
    const paginatedData = filtered.slice(start, end);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize: size,
      pageCount: Math.ceil(filtered.length / size),
    };
  };

  const { data: apiData, pending } = await useAsyncData(
    () => fetchUsers(pageIndex.value, pageSize.value, debouncedSearch.value),
    {
      watch: [pageIndex, pageSize, debouncedSearch],
      default: () => ({
        data: [],
        total: 0,
        page: 0,
        pageSize: 10,
        pageCount: 0,
      }),
    }
  );

  const data = computed(() => apiData.value.data);
  const totalRows = computed(() => apiData.value.total);
  const pageCount = computed(() => apiData.value.pageCount);

  const onPaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    pageIndex.value = pagination.pageIndex;
    pageSize.value = pagination.pageSize;
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
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
