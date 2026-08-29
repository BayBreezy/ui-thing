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
        :manual-sorting="true"
        :manual-filtering="true"
        :page-count="pageCount"
        :initial-page-size="pageSize"
        @update:pagination="onPaginationChange"
        @update:sorting="onSortingChange"
        @update:column-filters="onColumnFiltersChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/vue-table";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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
  const sorting = ref<SortingState>([]);
  const columnFilters = ref<ColumnFiltersState>([]);
  const searchQuery = ref("");
  const debouncedSearch = refDebounced(searchQuery, 500);

  // Simulate API call with delay
  const fetchUsers = async (
    page: number,
    size: number,
    search: string,
    sortBy: SortingState,
    filters: ColumnFiltersState
  ): Promise<ApiResponse> => {
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
    let filtered = search
      ? allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        )
      : allUsers;

    // Apply column filters
    if (filters.length > 0) {
      filtered = filtered.filter((user) => {
        return filters.every((filter) => {
          const value = user[filter.id as keyof User];
          const filterValue = filter.value;

          if (typeof filterValue === "string") {
            return String(value).toLowerCase().includes(filterValue.toLowerCase());
          }

          return value === filterValue;
        });
      });
    }

    // Apply sorting
    const sorted = [...filtered];
    if (sortBy.length > 0 && sortBy[0]) {
      const { id, desc } = sortBy[0];
      sorted.sort((a, b) => {
        const aValue = a[id as keyof User];
        const bValue = b[id as keyof User];

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
        return 0;
      });
    }

    // Paginate
    const start = page * size;
    const end = start + size;
    const paginatedData = sorted.slice(start, end);

    return {
      data: paginatedData,
      total: sorted.length,
      page,
      pageSize: size,
      pageCount: Math.ceil(sorted.length / size),
    };
  };

  const { data: apiData, pending } = await useAsyncData(
    () =>
      fetchUsers(
        pageIndex.value,
        pageSize.value,
        debouncedSearch.value,
        sorting.value,
        columnFilters.value
      ),
    {
      watch: [pageIndex, pageSize, debouncedSearch, sorting, columnFilters],
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

  const onSortingChange = (newSorting: SortingState) => {
    sorting.value = newSorting;
    // Reset to first page when sorting changes
    pageIndex.value = 0;
  };

  const onColumnFiltersChange = (newFilters: ColumnFiltersState) => {
    columnFilters.value = newFilters;
    // Reset to first page when filters change
    pageIndex.value = 0;
  };

  const columns: ColumnDef<TanStackTableFeatures, User>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => `#${row.getValue("id")}`,
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => h("span", { class: "font-medium" }, getValue() as string),
      enableSorting: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      enableSorting: true,
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
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
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
