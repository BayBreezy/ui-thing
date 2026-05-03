<template>
  <div
    class="bg-background text-foreground min-h-screen [--color-primary:#E3A514] [--primary:#E3A514] [--radius:12px] [--ring:#E3A514]"
  >
    <!-- Edit user sheet -->
    <UiSheet v-model:open="editOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Edit user"
        description="Update the user's details below."
      >
        <template #content>
          <div class="space-y-5 px-6">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Full name</label>
              <UiVeeInput v-model="editForm.name" name="edit-name" placeholder="Full name" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Email</label>
              <UiVeeInput v-model="editForm.email" name="edit-email" placeholder="Email address" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Role</label>
              <UiSelect v-model="editForm.role">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue placeholder="Select role" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="Admin">Admin</UiSelectItem>
                  <UiSelectItem value="Member">Member</UiSelectItem>
                  <UiSelectItem value="Viewer">Viewer</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
        </template>
        <template #footer>
          <UiSheetFooter class="px-6 pb-6">
            <UiSheetClose as-child>
              <UiButton variant="outline" class="w-full">Cancel</UiButton>
            </UiSheetClose>
            <UiButton class="w-full" @click="saveEdit">Save changes</UiButton>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>

    <!-- Delete confirmation dialog -->
    <UiAlertDialog v-model:open="deleteOpen">
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle title="Remove user?" />
          <UiAlertDialogDescription
            :description="`Are you sure you want to remove '${deleteTarget?.name}'? This action cannot be undone.`"
          />
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel />
          <UiAlertDialogAction @click="confirmDelete" />
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>

    <!-- Command / search dialog -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search for users, reports, and quick actions"
    >
      <UiCommandInput placeholder="Search anything..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Recent">
          <UiCommandItem v-for="item in recentSearches" :key="item" :value="item">
            <Icon name="heroicons:clock" />
            <span>{{ item }}</span>
            <Icon name="heroicons:arrow-up-left" class="ml-auto opacity-40" />
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Quick links">
          <UiCommandItem v-for="link in quickLinks" :key="link.label" :value="link.label">
            <Icon :name="link.icon" />
            <span>{{ link.label }}</span>
            <UiCommandShortcut>{{ link.path }}</UiCommandShortcut>
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
      <div
        class="border-border/70 bg-muted/20 text-muted-foreground flex items-center gap-5 border-t px-4 py-2.5 text-xs"
      >
        <span class="flex items-center gap-1.5"><UiKbd>↵</UiKbd> to select</span>
        <span class="flex items-center gap-1.5"><UiKbd>↑↓</UiKbd> to navigate</span>
        <span class="flex items-center gap-1.5"><UiKbd>ESC</UiKbd> to close</span>
      </div>
    </UiCommandDialog>

    <!-- Sticky header -->
    <Motion
      as="header"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="border-border/70 bg-background/85 sticky top-0 z-10 border-b backdrop-blur-md"
    >
      <UiContainer class="flex min-h-[4rem] items-center justify-between gap-4">
        <!-- Logo + nav -->
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2.5">
            <div
              class="border-border/70 bg-muted flex size-8 items-center justify-center rounded-lg border shadow-xs"
            >
              <div
                class="size-4 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.95),rgba(255,255,255,0.2)_32%,transparent_34%),linear-gradient(135deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_40%,white))]"
              />
            </div>
            <span class="font-semibold tracking-tight">UI Thing</span>
          </div>

          <!-- Mobile nav popover -->
          <UiPopover class="lg:hidden">
            <UiPopoverTrigger as-child>
              <UiButton class="lg:hidden" variant="ghost" size="icon-sm">
                <Icon name="heroicons:bars-3" class="size-5" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="start" class="w-48 p-1">
              <UiButton
                v-for="item in navItems"
                :key="item.label"
                variant="ghost"
                size="sm"
                class="w-full justify-start"
                :class="
                  item.active
                    ? 'bg-muted text-foreground hover:bg-muted shadow-xs'
                    : 'text-muted-foreground'
                "
              >
                {{ item.label }}
              </UiButton>
            </UiPopoverContent>
          </UiPopover>

          <!-- Desktop nav -->
          <nav class="hidden items-center gap-1 lg:flex">
            <UiButton
              v-for="item in navItems"
              :key="item.label"
              variant="ghost"
              size="sm"
              :class="
                item.active
                  ? 'bg-muted text-foreground hover:bg-muted shadow-xs'
                  : 'text-muted-foreground'
              "
            >
              {{ item.label }}
            </UiButton>
          </nav>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-1">
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="rounded-full"
            aria-label="Open search"
            @click="searchOpen = true"
          >
            <Icon name="heroicons:magnifying-glass" class="text-muted-foreground size-5" />
          </UiButton>

          <!-- Settings dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="heroicons:cog-6-tooth" class="text-muted-foreground size-5" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-56">
              <UiDropdownMenuLabel>Settings</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="heroicons:user" title="Account settings" />
              <UiDropdownMenuItem icon="heroicons:swatch" title="Appearance" />
              <UiDropdownMenuItem icon="heroicons:bell" title="Notification preferences" />
              <UiDropdownMenuItem icon="heroicons:shield-check" title="Privacy & security" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuCheckboxItem v-model="compactRows" title="Compact rows" />
              <UiDropdownMenuCheckboxItem v-model="showTrends" title="Show trend indicators" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- Notifications dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="heroicons:bell" class="text-muted-foreground size-5" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-80">
              <UiDropdownMenuLabel class="flex items-center justify-between">
                <span>Notifications</span>
                <UiBadge variant="secondary" size="sm">3 new</UiBadge>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                icon="heroicons:arrow-trending-up"
                title="Traffic up 12% this week"
              >
                <template #shortcut>2h ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem icon="heroicons:user-plus" title="5 new users joined today">
                <template #shortcut>4h ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                icon="heroicons:exclamation-circle"
                title="Unusual login detected"
              >
                <template #shortcut>1d ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="heroicons:check" title="Mark all as read" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- User dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                <UiAvatar
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                  :fallback="currentUser.fallback"
                  class="size-8 cursor-pointer"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-52">
              <UiDropdownMenuLabel>
                <div class="flex flex-col">
                  <p class="text-sm font-medium">{{ currentUser.name }}</p>
                  <p class="text-muted-foreground text-xs">{{ currentUser.email }}</p>
                </div>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
                <UiDropdownMenuItem icon="heroicons:users" title="Team" />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                variant="destructive"
                icon="heroicons:arrow-right-on-rectangle"
                title="Sign out"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiContainer>
    </Motion>

    <!-- Page content -->
    <UiContainer class="space-y-8 py-8">
      <!-- Breadcrumb + welcome + user card -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
      >
        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div class="space-y-1.5">
            <!-- Breadcrumb -->
            <div class="text-muted-foreground flex items-center gap-2 text-sm">
              <UiAvatar
                :src="currentUser.avatar"
                :alt="currentUser.name"
                :fallback="currentUser.fallback"
                class="size-5"
              />
              <span>{{ currentUser.name }}</span>
              <Icon name="heroicons:chevron-right" class="size-3.5 shrink-0" />
              <span class="text-foreground font-medium">Dashboard</span>
            </div>
            <h1 class="text-2xl font-bold tracking-tight">
              Welcome back, {{ currentUser.firstName }}
            </h1>
            <p class="text-muted-foreground text-sm">
              Here's an overview of your site traffic and recently active users.
            </p>
          </div>

          <!-- User card dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <button
                class="border-border/70 bg-card hover:bg-muted/40 focus-visible:ring-ring flex w-fit cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-none"
              >
                <UiAvatarLabelGroup
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                  :fallback="currentUser.fallback"
                  :title="currentUser.name"
                  :subtitle="currentUser.email"
                  size="sm"
                />
                <Icon
                  name="heroicons:chevron-down"
                  class="text-muted-foreground ml-1 size-4 shrink-0"
                />
              </button>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-56">
              <UiDropdownMenuLabel>
                <UiAvatarLabelGroup
                  :src="currentUser.avatar"
                  :alt="currentUser.name"
                  :fallback="currentUser.fallback"
                  :title="currentUser.name"
                  :subtitle="currentUser.email"
                  size="sm"
                />
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem icon="heroicons:user-circle" title="View profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Account settings" />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing & plans" />
                <UiDropdownMenuItem icon="heroicons:users" title="Switch team" />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="heroicons:question-mark-circle" title="Help & support" />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                variant="destructive"
                icon="heroicons:arrow-right-on-rectangle"
                title="Sign out"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </Motion>

      <!-- Site traffic + chart -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
        class="space-y-4"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-xl font-semibold">
            Site traffic
            <span class="ml-1.5 text-emerald-500 dark:text-emerald-400">+104%</span>
          </h2>
          <div class="flex flex-wrap items-center gap-2">
            <UiTabs v-model="activeRange">
              <UiTabsList class="border-border/70 bg-muted/30 border">
                <UiTabsTrigger v-for="r in timeRanges" :key="r.value" :value="r.value">
                  <span class="hidden sm:inline">{{ r.label }}</span>
                  <span class="sm:hidden">{{ r.short }}</span>
                </UiTabsTrigger>
              </UiTabsList>
            </UiTabs>
            <UiButton variant="outline" size="sm">
              <Icon name="heroicons:funnel" class="size-4" />
              Filters
            </UiButton>
          </div>
        </div>

        <!-- Chart -->
        <div class="border-border/70 bg-card overflow-hidden rounded-xl border shadow-xs">
          <UiApexchart type="area" height="380" :series="chartSeries" :options="chartOptions" />
        </div>
      </Motion>

      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.4, delay: 0.3, ease: 'easeOut' }"
      >
        <UiGradientDivider />
      </Motion>

      <!-- Recently active table -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.35 }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
          <!-- Card header -->
          <UiCardHeader class="border-border/60 border-b py-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <UiCardTitle class="text-lg font-semibold">Recently active</UiCardTitle>
              <!-- Search -->
              <div class="w-full sm:w-56">
                <UiVeeInput
                  v-model="tableSearch"
                  icon="heroicons:magnifying-glass"
                  name="user-search"
                  placeholder="Search"
                />
              </div>
            </div>
          </UiCardHeader>

          <!-- TanStack table -->
          <UiTanStackTable
            :data="filteredUsers"
            :columns="userColumns"
            :show-rows-per-page="false"
            :show-page-info="false"
            :show-pagination="false"
            :show-selected-count="false"
            :show-footer="true"
            :loading="usersPending"
            :table-options="{ enableRowSelection: true }"
          >
            <template #select-header="{ table }">
              <UiCheckbox
                aria-label="Select all"
                :model-value="
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                "
                @update:model-value="table.toggleAllPageRowsSelected(!!$event)"
              />
            </template>

            <template #select-cell="{ row }">
              <UiCheckbox
                :aria-label="`Select ${row.original.name}`"
                :model-value="row.getIsSelected()"
                @update:model-value="row.toggleSelected(!!$event)"
              />
            </template>

            <template #name-cell="{ row }">
              <div class="flex items-center gap-3">
                <UiAvatar
                  :src="row.original.avatar"
                  :alt="row.original.name"
                  :fallback="row.original.fallback"
                  class="size-8 shrink-0"
                />
                <div class="flex min-w-0 flex-col">
                  <span class="truncate text-sm font-medium">{{ row.original.name }}</span>
                  <span class="text-muted-foreground truncate text-xs">{{
                    row.original.email
                  }}</span>
                </div>
              </div>
            </template>

            <template #access-cell="{ row }">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="perm in row.original.access"
                  :key="perm"
                  class="border-border/70 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
                >
                  <span class="size-1.5 shrink-0 rounded-full" :class="accessDotColor(perm)" />
                  {{ perm }}
                </span>
              </div>
            </template>

            <template #actions-cell="{ row }">
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground">
                    <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end" class="w-44">
                  <UiDropdownMenuItem
                    icon="heroicons:pencil"
                    title="Edit user"
                    @select="openEdit(row.original)"
                  />
                  <UiDropdownMenuItem icon="heroicons:eye" title="View profile" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    icon="heroicons:trash"
                    title="Remove user"
                    class="text-destructive focus:text-destructive"
                    @select="
                      () => {
                        deleteTarget = row.original;
                        deleteOpen = true;
                      }
                    "
                  />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </template>

            <template #footer="{ table }">
              <div
                class="border-border/60 flex w-full flex-col gap-3 border-t px-6 py-4 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <!-- Selected count -->
                <p class="text-muted-foreground shrink-0 font-medium">
                  <template v-if="table.getFilteredSelectedRowModel().rows.length > 0">
                    {{ table.getFilteredSelectedRowModel().rows.length }} selected
                  </template>
                </p>

                <!-- Desktop pagination — numbered pages -->
                <UiPagination
                  class="mx-0! hidden! justify-end! sm:flex!"
                  :total="filteredUsers.length"
                  :items-per-page="10"
                  :sibling-count="1"
                  :page="table.getState().pagination.pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList v-slot="{ items }" class="gap-1">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="sm">
                        <Icon name="heroicons:chevron-left" class="size-4" />
                        Previous
                      </UiButton>
                    </UiPaginationPrev>
                    <template v-for="(item, idx) in items" :key="idx">
                      <UiPaginationItem v-if="item.type === 'page'" as-child v-bind="item" />
                      <UiPaginationEllipsis
                        v-else-if="item.type === 'ellipsis'"
                        as-child
                        v-bind="item"
                        icon="heroicons:ellipsis-horizontal"
                      />
                    </template>
                    <UiPaginationNext as-child>
                      <UiButton variant="outline" size="sm">
                        Next
                        <Icon name="heroicons:chevron-right" class="size-4" />
                      </UiButton>
                    </UiPaginationNext>
                  </UiPaginationList>
                </UiPagination>

                <!-- Mobile pagination — prev / page info / next -->
                <UiPagination
                  class="mx-0! sm:hidden!"
                  :total="filteredUsers.length"
                  :items-per-page="10"
                  :page="table.getState().pagination.pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList class="w-full justify-between">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="icon-sm">
                        <Icon name="heroicons:arrow-left" class="size-4" />
                      </UiButton>
                    </UiPaginationPrev>
                    <span class="text-muted-foreground text-sm">
                      Page {{ table.getState().pagination.pageIndex + 1 }} of
                      {{ table.getPageCount() }}
                    </span>
                    <UiPaginationNext as-child>
                      <UiButton variant="outline" size="icon-sm">
                        <Icon name="heroicons:arrow-right" class="size-4" />
                      </UiButton>
                    </UiPaginationNext>
                  </UiPaginationList>
                </UiPagination>
              </div>
            </template>
          </UiTanStackTable>
        </UiCard>
      </Motion>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";
  import type { ApexOptions } from "apexcharts";
  import { Motion } from "motion-v";

  // ─── Current user ────────────────────────────────────────────────────────────
  const currentUser = {
    name: "Sienna Hewitt",
    firstName: "Sienna",
    email: "sienna@example.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    fallback: "SH",
  };

  // ─── Navigation ──────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // ─── Settings toggles ────────────────────────────────────────────────────────
  const compactRows = ref(false);
  const showTrends = ref(true);

  // ─── Search / command dialog ─────────────────────────────────────────────────
  const searchOpen = ref(false);

  const recentSearches = ["Recently active users", "Traffic this month", "New signups last 7 days"];

  const quickLinks = [
    { label: "User management", icon: "heroicons:users", path: "/users" },
    { label: "Analytics overview", icon: "heroicons:chart-bar", path: "/analytics" },
    { label: "Traffic sources", icon: "heroicons:arrow-trending-up", path: "/traffic" },
  ];

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") searchOpen.value = false;
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
  };
  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // ─── Time range tabs ─────────────────────────────────────────────────────────
  const timeRanges = [
    { label: "12 months", short: "12m", value: "12months" },
    { label: "30 days", short: "30d", value: "30days" },
    { label: "7 days", short: "7d", value: "7days" },
    { label: "24 hours", short: "24h", value: "24hours" },
  ];
  const activeRange = ref("12months");

  // ─── Chart data per range ─────────────────────────────────────────────────────
  const rangeDataMap: Record<
    string,
    { categories: string[]; traffic: number[]; previous: number[] }
  > = {
    "12months": {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      traffic: [820, 932, 901, 960, 1290, 1330, 1320, 1540, 1480, 1680, 1750, 1920],
      previous: [480, 520, 490, 560, 620, 680, 700, 760, 810, 850, 890, 940],
    },
    "30days": {
      categories: Array.from({ length: 30 }, (_, i) => `${i + 1} Jan`),
      traffic: [
        180, 210, 195, 230, 215, 260, 245, 280, 265, 300, 285, 320, 305, 340, 325, 360, 345, 380,
        365, 400, 385, 420, 405, 440, 425, 460, 445, 480, 465, 500,
      ],
      previous: [
        120, 135, 128, 148, 138, 165, 155, 175, 165, 188, 178, 198, 188, 210, 200, 220, 210, 235,
        224, 248, 238, 260, 248, 270, 258, 280, 268, 290, 278, 310,
      ],
    },
    "7days": {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      traffic: [480, 520, 610, 540, 680, 320, 290],
      previous: [320, 360, 420, 380, 450, 240, 210],
    },
    "24hours": {
      categories: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`),
      traffic: [
        45, 32, 28, 25, 30, 48, 85, 148, 186, 210, 224, 238, 252, 245, 232, 218, 195, 178, 165, 145,
        125, 108, 88, 65,
      ],
      previous: [
        30, 22, 18, 16, 20, 32, 60, 110, 138, 158, 168, 178, 188, 182, 172, 162, 145, 132, 122, 108,
        92, 80, 65, 48,
      ],
    },
  };

  // ─── Reactive chart options ───────────────────────────────────────────────────
  // Most defaults (fontFamily, foreColor, toolbar, zoom, stroke.curve, dataLabels,
  // grid.borderColor, axis label colors/sizes, legend) are set globally in
  // UiApexchart.client.vue via window.Apex — only chart-specific overrides live here.
  const chartOptions = computed<ApexOptions>(() => {
    const data = rangeDataMap[activeRange.value];
    return {
      chart: {
        type: "area",
        background: "transparent",
        parentHeightOffset: 0,
        animations: { enabled: true, easing: "easeinout", speed: 500 },
      },
      // Per-series stroke widths + dashed second line
      stroke: { width: [2, 1.5], dashArray: [0, 6] },
      // Hex values — ApexCharts can't resolve CSS custom properties reliably
      colors: ["#E3A514", "#94a3b8"],
      fill: {
        type: ["gradient", "solid"],
        gradient: {
          type: "vertical",
          gradientToColors: ["#E3A514"],
          shadeIntensity: 0,
          opacityFrom: 0.22,
          opacityTo: 0,
          stops: [0, 100],
        },
        opacity: [1, 0], // no fill for the dashed previous-period line
      },
      grid: {
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { left: 8, right: 8 },
      },
      xaxis: {
        categories: data?.categories ?? [],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)),
        },
      },
      tooltip: {
        y: { formatter: (v: number) => `${v.toLocaleString()} visitors` },
      },
      markers: { size: 0, hover: { size: 5 } },
    };
  });

  const chartSeries = computed(() => [
    { name: "Traffic", type: "area", data: rangeDataMap[activeRange.value]?.traffic ?? [] },
    {
      name: "Previous period",
      type: "line",
      data: rangeDataMap[activeRange.value]?.previous ?? [],
    },
  ]);

  // ─── User table ───────────────────────────────────────────────────────────────
  type UserRow = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    fallback: string;
    access: string[];
    lastActive: string;
    dateAdded: string;
  };

  const accessDotColor = (permission: string): string => {
    if (permission === "Admin") return "bg-violet-500";
    if (permission === "Data export") return "bg-sky-500";
    if (permission === "Data import") return "bg-emerald-500";
    return "bg-muted-foreground";
  };

  const userColumns: ColumnDef<UserRow>[] = [
    {
      id: "select",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-12", td: "w-12" } },
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "access",
      accessorKey: "access",
      header: "Access",
      enableSorting: false,
      meta: { class: { th: "hidden md:table-cell", td: "hidden md:table-cell" } },
    },
    {
      accessorKey: "lastActive",
      header: "Last active",
      meta: { class: { th: "hidden sm:table-cell", td: "hidden sm:table-cell" } },
    },
    {
      accessorKey: "dateAdded",
      header: "Date added",
      meta: { class: { th: "hidden lg:table-cell", td: "hidden lg:table-cell" } },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-14", td: "w-14" } },
    },
  ];

  // ─── User data generation ─────────────────────────────────────────────────────
  const accessSets = [
    ["Admin", "Data export", "Data import"],
    ["Data export", "Data import"],
    ["Admin", "Data export"],
    ["Data import"],
    ["Data export"],
  ] as const;

  const createUser = (i: number): UserRow => {
    faker.seed(i);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const fallback = `${firstName[0] ?? "U"}${lastName[0] ?? "N"}`;
    const access = [...(accessSets[i % accessSets.length] ?? ["Data export"])];
    const lastActive = faker.date.recent({ days: 30, refDate: new Date("2025-03-21") });
    const dateAdded = faker.date.past({ years: 2, refDate: new Date("2025-03-21") });
    return {
      id: i + 1,
      name,
      email,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      fallback,
      access,
      lastActive: lastActive.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      dateAdded: dateAdded.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
  };

  const { data: usersData, pending: usersPending } = await useAsyncData<UserRow[]>(
    "block-dashboard5-users",
    async () => Array.from({ length: 100 }, (_, i) => createUser(i)),
    { default: () => [] }
  );

  const users = computed(() => usersData.value ?? []);
  const tableSearch = ref("");

  const filteredUsers = computed(() => {
    if (!tableSearch.value.trim()) return users.value;
    const q = tableSearch.value.toLowerCase();
    return users.value.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  // ─── Edit sheet ───────────────────────────────────────────────────────────────
  const editOpen = ref(false);
  const editTarget = ref<UserRow | null>(null);
  const editForm = reactive({ name: "", email: "", role: "" });

  const openEdit = (user: UserRow) => {
    editTarget.value = user;
    editForm.name = user.name;
    editForm.email = user.email;
    editForm.role = user.access[0] ?? "Member";
    editOpen.value = true;
  };

  const saveEdit = () => {
    editOpen.value = false;
    useSonner("User updated", { description: `'${editForm.name}' has been saved.` });
  };

  // ─── Delete dialog ────────────────────────────────────────────────────────────
  const deleteOpen = ref(false);
  const deleteTarget = ref<UserRow | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget.value) return;
    useSonner(`'${deleteTarget.value.name}' removed`, {
      description: "The user has been permanently removed.",
    });
    deleteTarget.value = null;
  };
</script>
