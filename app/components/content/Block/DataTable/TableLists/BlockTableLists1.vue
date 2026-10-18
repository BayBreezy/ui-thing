<template>
  <!--
    Users table with search and sortable columns
    Features: Avatar and email cell, role and status badges, sortable name and last active headers with aria sort, search field, result count and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <div class="relative">
        <UiLabel for="users-search" class="sr-only">Search users</UiLabel>
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          id="users-search"
          v-model="query"
          placeholder="Search users"
          class="pl-9 sm:w-64"
        />
      </div>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead :aria-sort="ariaSort('name')">
              <button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="sortBy('name')"
              >
                User
                <Icon :name="sortIcon('name')" class="size-3.5" />
              </button>
            </UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Role</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="hidden md:table-cell" :aria-sort="ariaSort('lastActive')">
              <button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="sortBy('lastActive')"
              >
                Last active
                <Icon :name="sortIcon('lastActive')" class="size-3.5" />
              </button>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="user in rows" :key="user.email">
            <UiTableCell>
              <div class="flex items-center gap-3">
                <UiAvatar :src="user.avatar" :fallback="initials(user.name)" />
                <div class="min-w-0">
                  <p class="truncate font-medium">{{ user.name }}</p>
                  <p class="text-muted-foreground truncate text-xs">{{ user.email }}</p>
                </div>
              </div>
            </UiTableCell>
            <UiTableCell class="hidden sm:table-cell">{{ user.role }}</UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="statuses[user.status]" shape="pill">
                {{ user.status }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden whitespace-nowrap md:table-cell">
              {{ formatDate(user.lastActive) }}
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="4">No users match your search.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
    <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
      Showing {{ rows.length }} of {{ users.length }} users
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Active" | "Invited" | "Suspended";
  type SortKey = "name" | "lastActive";

  type User = {
    name: string;
    email: string;
    avatar: string;
    role: string;
    status: Status;
    lastActive: string;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      users?: User[];
    }>(),
    {
      title: "Users",
      description: "Everyone with access to your workspace and what they are up to.",
      users: () => [
        {
          name: "Maya Chen",
          email: "maya@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=47",
          role: "Owner",
          status: "Active",
          lastActive: "2026-10-17",
        },
        {
          name: "Liam Carter",
          email: "liam@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=12",
          role: "Admin",
          status: "Active",
          lastActive: "2026-10-16",
        },
        {
          name: "Sofia Alvarez",
          email: "sofia@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=32",
          role: "Editor",
          status: "Active",
          lastActive: "2026-10-12",
        },
        {
          name: "Noah Williams",
          email: "noah@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=15",
          role: "Editor",
          status: "Invited",
          lastActive: "2026-09-30",
        },
        {
          name: "Aisha Khan",
          email: "aisha@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=45",
          role: "Viewer",
          status: "Active",
          lastActive: "2026-10-09",
        },
        {
          name: "Ethan Brooks",
          email: "ethan@acme.dev",
          avatar: "https://i.pravatar.cc/80?img=33",
          role: "Viewer",
          status: "Suspended",
          lastActive: "2026-08-21",
        },
      ],
    }
  );

  const statuses = { Active: "green", Invited: "amber", Suspended: "red" } as const;

  const query = ref("");
  const sortKey = ref<SortKey>("name");
  const direction = ref<"asc" | "desc">("asc");

  function sortBy(key: SortKey) {
    if (sortKey.value === key) {
      direction.value = direction.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      direction.value = "asc";
    }
  }

  function ariaSort(key: SortKey) {
    if (sortKey.value !== key) return "none";
    return direction.value === "asc" ? "ascending" : "descending";
  }

  function sortIcon(key: SortKey) {
    if (sortKey.value !== key) return "lucide:arrow-up-down";
    return direction.value === "asc" ? "lucide:arrow-up" : "lucide:arrow-down";
  }

  const rows = computed(() => {
    const term = query.value.trim().toLowerCase();
    const list = props.users.filter(
      (user) =>
        !term || user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    const factor = direction.value === "asc" ? 1 : -1;
    return [...list].sort((a, b) => a[sortKey.value].localeCompare(b[sortKey.value]) * factor);
  });

  function initials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }
</script>
