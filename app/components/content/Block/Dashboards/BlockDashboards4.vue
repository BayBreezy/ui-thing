<template>
  <div
    class="bg-background text-foreground min-h-screen [--color-primary:#8b5cf6] [--primary:#8b5cf6] [--ring:#8b5cf6]"
  >
    <!-- Edit customer sheet -->
    <UiSheet v-model:open="editOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Edit customer"
        description="Update the customer details below."
      >
        <template #content>
          <div class="space-y-5 px-6">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Name</label>
              <UiVeeInput v-model="editForm.name" name="edit-name" placeholder="Full name" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Email</label>
              <UiVeeInput
                v-model="editForm.email"
                name="edit-email"
                placeholder="email@example.com"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Amount</label>
              <UiVeeInput v-model="editForm.amount" name="edit-amount" placeholder="$0.00" />
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Status</label>
              <UiSelect v-model="editForm.status">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue placeholder="Select status" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="Paid">Paid</UiSelectItem>
                  <UiSelectItem value="Pending">Pending</UiSelectItem>
                  <UiSelectItem value="Failed">Failed</UiSelectItem>
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
            <UiSheetX />
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>

    <!-- Delete confirmation dialog -->
    <UiAlertDialog v-model:open="deleteOpen">
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle title="Remove customer?" />
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

    <!-- Command palette search -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search for customers, reports, and quick actions"
    >
      <UiCommandInput placeholder="Search anything..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick links">
          <UiCommandItem v-for="link in quickLinks" :key="link.label" :value="link.label">
            <Icon :name="link.icon" />
            <span>{{ link.label }}</span>
            <UiCommandShortcut>{{ link.path }}</UiCommandShortcut>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Recent customers">
          <UiCommandItem v-for="c in customers.slice(0, 4)" :key="c.id" :value="c.name">
            <Icon name="fluent:person-24-regular" />
            <span>{{ c.name }}</span>
            <UiCommandShortcut>{{ c.email }}</UiCommandShortcut>
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
      <UiContainer class="flex min-h-14 items-center justify-between gap-4">
        <!-- Logo + nav -->
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2.5">
            <div
              class="border-border/70 bg-muted flex size-7 items-center justify-center rounded-md border shadow-xs"
            >
              <div
                class="size-3.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.9),rgba(255,255,255,0.15)_32%,transparent_34%),linear-gradient(135deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_40%,white))]"
              />
            </div>
            <span class="font-semibold tracking-tight">UI Thing</span>
          </div>

          <!-- Mobile nav -->
          <UiPopover class="lg:hidden">
            <UiPopoverTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full lg:hidden">
                <Icon
                  name="fluent:line-horizontal-3-24-regular"
                  class="text-muted-foreground size-5"
                />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="start" class="w-48 p-1">
              <UiButton
                v-for="item in navItems"
                :key="item.label"
                variant="ghost"
                size="sm"
                class="w-full justify-start"
                :class="item.active ? 'bg-muted text-foreground' : 'text-muted-foreground'"
              >
                {{ item.label }}
              </UiButton>
            </UiPopoverContent>
          </UiPopover>

          <!-- Desktop nav -->
          <nav class="hidden items-center gap-0.5 lg:flex">
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
        <div class="flex items-center gap-1.5">
          <!-- Upgrade now -->
          <UiButton variant="outline" size="sm" class="hidden gap-1.5 sm:flex">
            <Icon name="fluent:flash-24-regular" class="size-4 text-amber-500" />
            Upgrade now
          </UiButton>

          <!-- Settings dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="fluent:settings-24-regular" class="text-muted-foreground size-5" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-56">
              <UiDropdownMenuLabel>Settings</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="fluent:person-24-regular" title="Account settings" />
              <UiDropdownMenuItem icon="fluent:color-24-regular" title="Appearance" />
              <UiDropdownMenuItem icon="fluent:alert-24-regular" title="Notification preferences" />
              <UiDropdownMenuItem icon="fluent:shield-24-regular" title="Privacy & security" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <!-- Notifications dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="fluent:alert-24-regular" class="text-muted-foreground size-5" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end" class="w-80">
              <UiDropdownMenuLabel class="flex items-center justify-between">
                <span>Notifications</span>
                <UiBadge variant="secondary" size="sm">3 new</UiBadge>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                icon="fluent:arrow-up-right-24-regular"
                title="Revenue up 2.4% this month"
              >
                <template #shortcut>2h ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem icon="fluent:people-24-regular" title="96 users active right now">
                <template #shortcut>1d ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem icon="fluent:document-24-regular" title="Monthly report is ready">
                <template #shortcut>2d ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="fluent:checkmark-24-regular" title="Mark all as read" />
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
                <UiDropdownMenuItem icon="fluent:person-24-regular" title="Profile" />
                <UiDropdownMenuItem icon="fluent:settings-24-regular" title="Settings" />
                <UiDropdownMenuItem icon="fluent:card-ui-24-regular" title="Billing" />
                <UiDropdownMenuItem icon="fluent:people-24-regular" title="Team" />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem
                variant="destructive"
                icon="fluent:arrow-exit-24-regular"
                title="Sign out"
              />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiContainer>
    </Motion>

    <!-- Sub-nav -->
    <div class="border-border/70 bg-background/85 border-b backdrop-blur-md">
      <UiContainer class="flex items-center justify-between gap-4">
        <div class="scrollbar-none overflow-x-auto">
          <UiTabs v-model="activeSubNav">
            <UiTabsList class="h-auto gap-0 rounded-none bg-transparent px-0 pb-0">
              <UiTabsTrigger
                v-for="tab in subNavTabs"
                :key="tab"
                :value="tab"
                class="text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-3.5 py-3.5 text-sm font-medium shadow-none transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {{ tab }}
              </UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
        </div>

        <!-- Global search trigger -->
        <div class="hidden shrink-0 sm:block">
          <UiButton
            variant="outline"
            class="border-border/70 text-muted-foreground h-9 w-52 justify-start gap-2 font-normal"
            @click="searchOpen = true"
          >
            <Icon name="fluent:search-24-regular" class="size-4 shrink-0" />
            <span>Search</span>
            <UiKbd class="ml-auto">⌘K</UiKbd>
          </UiButton>
        </div>
      </UiContainer>
    </div>

    <!-- Page content -->
    <UiContainer class="space-y-6 py-8">
      <!-- Title -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
      >
        <h1 class="text-2xl font-semibold tracking-tight">My dashboard</h1>
      </Motion>

      <!-- KPI cards -->
      <Motion
        as="section"
        :variants="cardContainerVariant"
        initial="initial"
        animate="animate"
        class="grid gap-4 sm:grid-cols-3"
      >
        <Motion v-for="metric in metrics" :key="metric.label" :variants="cardVariant">
          <UiCard
            class="border-border/70 hover:border-primary/50 hover:ring-primary/15 gap-4 p-5 shadow-xs transition-all hover:ring-1"
          >
            <div
              class="border-border/70 bg-muted/50 flex size-9 items-center justify-center rounded-lg border"
            >
              <Icon :name="metric.icon" class="text-muted-foreground size-5" />
            </div>
            <div>
              <p class="text-muted-foreground mb-1 text-sm">{{ metric.label }}</p>
              <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span class="text-2xl font-bold tracking-tight">{{ metric.value }}</span>
                <span
                  class="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-500"
                >
                  <Icon name="fluent:arrow-trending-up-24-regular" class="size-3.5" />
                  {{ metric.change }} vs last month
                </span>
              </div>
            </div>
          </UiCard>
        </Motion>
      </Motion>

      <!-- Net revenue + chart -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.3, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
          <!-- Header row -->
          <div
            class="flex flex-col gap-4 px-6 pt-6 pb-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <!-- Net revenue label + value -->
            <div>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger
                  class="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  Net revenue
                  <Icon name="fluent:chevron-down-24-regular" class="size-3.5" />
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent class="w-44">
                  <UiDropdownMenuItem title="Net revenue" />
                  <UiDropdownMenuItem title="Gross revenue" />
                  <UiDropdownMenuItem title="Total refunds" />
                  <UiDropdownMenuItem title="New MRR" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
              <div class="mt-1.5 flex items-baseline gap-2">
                <span class="text-3xl font-bold tracking-tight">$7,804.16</span>
                <span
                  class="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-500"
                >
                  <Icon name="fluent:arrow-trending-up-24-regular" class="size-4" />
                  2.4%
                </span>
              </div>
            </div>

            <!-- Time tabs + filters -->
            <div class="flex flex-wrap items-center gap-2">
              <UiTabs v-model="activeRange">
                <UiTabsList class="border-border/70 bg-muted/30 border">
                  <UiTabsTrigger v-for="r in timeRanges" :key="r.value" :value="r.value">
                    {{ r.label }}
                  </UiTabsTrigger>
                </UiTabsList>
              </UiTabs>
              <UiButton variant="outline" class="gap-1.5">
                <Icon name="fluent:filter-24-regular" class="size-4" />
                Filters
              </UiButton>
            </div>
          </div>

          <!-- Bar + line chart -->
          <div class="px-2 pb-2">
            <UiApexchart type="bar" height="340" :series="chartSeries" :options="chartOptions" />
          </div>
        </UiCard>
      </Motion>

      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.4, delay: 0.35, ease: 'easeOut' }"
      >
        <UiGradientDivider />
      </Motion>

      <!-- Customers table -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.4, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
          <UiCardHeader class="border-border/60 border-b py-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <UiCardTitle class="text-base font-semibold">Customers</UiCardTitle>
              <div class="shrink-0 sm:w-56">
                <UiVeeInput
                  v-model="tableSearch"
                  name="customer-search"
                  icon="fluent:search-24-regular"
                  placeholder="Search"
                >
                  <template #trailingIcon>
                    <span class="absolute inset-y-0 right-3 flex items-center justify-center">
                      <UiKbd>⌘K</UiKbd>
                    </span>
                  </template>
                </UiVeeInput>
              </div>
            </div>
          </UiCardHeader>

          <UiTanStackTable
            :data="filteredCustomers"
            :columns="customerColumns"
            :loading="customersPending"
            :show-rows-per-page="false"
            :show-page-info="false"
            :show-selected-count="false"
            :show-footer="true"
            :table-options="{ enableRowSelection: true }"
          >
            <template #select-header="{ table }">
              <UiCheckbox
                aria-label="Select all"
                :model-value="table.getIsAllPageRowsSelected()"
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
                  :fallback="row.original.name.slice(0, 2)"
                  class="size-8 shrink-0"
                />
                <div class="min-w-0">
                  <p class="truncate text-sm font-medium">{{ row.original.name }}</p>
                  <p class="text-muted-foreground truncate text-xs">{{ row.original.handle }}</p>
                </div>
              </div>
            </template>

            <template #status-cell="{ row }">
              <UiBadge variant="outline" class="gap-1.5">
                <span
                  class="size-1.5 rounded-full"
                  :class="{
                    'bg-emerald-500': row.original.status === 'Paid',
                    'bg-amber-500': row.original.status === 'Pending',
                    'bg-red-500': row.original.status === 'Failed',
                  }"
                />
                {{ row.original.status }}
              </UiBadge>
            </template>

            <template #actions-cell="{ row }">
              <div class="flex items-center justify-end gap-0.5">
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="text-muted-foreground hover:text-destructive"
                  :title="`Delete ${row.original.name}`"
                  @click="
                    () => {
                      deleteTarget = row.original;
                      deleteOpen = true;
                    }
                  "
                >
                  <Icon name="fluent:delete-24-regular" class="size-4" />
                </UiButton>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="text-muted-foreground hover:text-foreground"
                  :title="`Edit ${row.original.name}`"
                  @click="openEdit(row.original)"
                >
                  <Icon name="fluent:edit-24-regular" class="size-4" />
                </UiButton>
              </div>
            </template>

            <template #footer="{ table }">
              <div
                class="border-border/60 text-muted-foreground flex w-full flex-col gap-4 border-t px-6 py-4 text-sm font-medium sm:flex-row sm:items-center sm:justify-between"
              >
                <p>
                  Page {{ table.getState().pagination.pageIndex + 1 }} of
                  {{ table.getPageCount() }}
                </p>
                <div class="flex items-center gap-2">
                  <UiButton
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()"
                  >
                    <Icon name="fluent:arrow-left-24-regular" class="size-4" />
                    Previous
                  </UiButton>
                  <UiButton
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()"
                  >
                    Next
                    <Icon name="fluent:arrow-right-24-regular" class="size-4" />
                  </UiButton>
                </div>
              </div>
            </template>
          </UiTanStackTable>
        </UiCard>
      </Motion>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";
  import type { ApexOptions } from "apexcharts";
  import { Motion } from "motion-v";
  import type { MotionProps } from "motion-v";

  // Animation variants
  const cardContainerVariant: MotionProps["variants"] = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const cardVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // User
  const currentUser = {
    name: "Behon Baker",
    email: "behon.baker@yahoo.com",
    avatar: "https://behonbaker.com/icon.png",
    fallback: "BB",
  };

  // Navigation
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // Sub-nav tabs
  const subNavTabs = [
    "Overview",
    "Notifications",
    "Analytics",
    "Saved reports",
    "Scheduled reports",
    "User reports",
  ];
  const activeSubNav = ref("Overview");

  // Search
  const searchOpen = ref(false);

  const quickLinks = [
    {
      label: "Analytics overview",
      icon: "fluent:data-bar-vertical-24-regular",
      path: "/analytics",
    },
    {
      label: "Revenue report",
      icon: "fluent:arrow-up-right-24-regular",
      path: "/reports/revenue",
    },
    { label: "All customers", icon: "fluent:people-24-regular", path: "/customers" },
  ];

  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
    if (e.key === "Escape") searchOpen.value = false;
  };

  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // KPI metrics
  const metrics = [
    {
      label: "All revenue",
      value: "$8,746.22",
      change: "2.4%",
      icon: "fluent:money-24-regular",
      highlighted: true,
    },
    {
      label: "Page views",
      value: "12,440",
      change: "6.2%",
      icon: "fluent:eye-24-regular",
      highlighted: false,
    },
    {
      label: "Active now",
      value: "96",
      change: "0.8%",
      icon: "fluent:person-24-regular",
      highlighted: false,
    },
  ];

  // Time range tabs
  const timeRanges = [
    { label: "12 months", value: "12months" },
    { label: "30 days", value: "30days" },
    { label: "7 days", value: "7days" },
    { label: "24 hours", value: "24hours" },
  ];
  const activeRange = ref("12months");

  // Revenue chart — data per time range
  const rangeDataMap: Record<
    string,
    { categories: string[]; revenue: number[]; target: number[] }
  > = {
    "12months": {
      categories: [
        "Jan '24",
        "Feb '24",
        "Mar '24",
        "Apr '24",
        "May '24",
        "Jun '24",
        "Jul '24",
        "Aug '24",
        "Sep '24",
        "Oct '24",
        "Nov '24",
        "Dec '24",
        "Jan '25",
        "Feb '25",
        "Mar '25",
        "Apr '25",
        "May '25",
        "Jun '25",
        "Jul '25",
        "Aug '25",
        "Sep '25",
        "Oct '25",
        "Nov '25",
        "Dec '25",
      ],
      revenue: [
        3100, 4400, 3800, 5200, 4100, 6300, 5700, 7200, 6500, 7800, 6900, 8400, 4200, 5800, 4800,
        6200, 5100, 7300, 6800, 8100, 7400, 8900, 7600, 9200,
      ],
      target: [
        3500, 3900, 4200, 4600, 5000, 5300, 5600, 6000, 6300, 6700, 7000, 7400, 4500, 5200, 5500,
        5800, 6200, 6600, 7000, 7400, 7800, 8200, 8600, 9000,
      ],
    },
    "30days": {
      categories: Array.from({ length: 30 }, (_, i) => {
        const d = new Date(2025, 2, i + 1);
        return `${d.getDate()} Mar`;
      }),
      revenue: [
        210, 185, 240, 195, 310, 275, 340, 290, 260, 380, 320, 410, 350, 295, 430, 370, 445, 390,
        320, 480, 415, 460, 395, 510, 440, 390, 530, 470, 420, 560,
      ],
      target: [
        220, 225, 230, 235, 245, 250, 260, 265, 270, 280, 285, 295, 300, 310, 315, 325, 330, 340,
        345, 355, 360, 370, 375, 385, 390, 400, 405, 415, 420, 430,
      ],
    },
    "7days": {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      revenue: [1240, 980, 1580, 1320, 1750, 820, 640],
      target: [1100, 1100, 1300, 1300, 1500, 900, 900],
    },
    "24hours": {
      categories: Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`),
      revenue: [
        42, 28, 18, 12, 10, 15, 38, 95, 180, 260, 310, 345, 390, 420, 375, 340, 310, 295, 320, 380,
        350, 290, 210, 140,
      ],
      target: [
        50, 50, 50, 50, 50, 80, 120, 180, 250, 300, 330, 360, 380, 380, 360, 330, 300, 280, 300,
        350, 320, 270, 200, 130,
      ],
    },
  };

  const chartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "inherit",
      parentHeightOffset: 0,
      animations: { enabled: true, easing: "easeinout", speed: 400 },
    },
    plotOptions: {
      bar: { columnWidth: "42%", borderRadius: 3, borderRadiusApplication: "end" },
    },
    stroke: { width: [0, 2], curve: "smooth", dashArray: [0, 5] },
    colors: ["#8b5cf6", "#c4b5fd"],
    fill: { opacity: [1, 0.8] },
    xaxis: {
      categories: rangeDataMap?.[activeRange.value]?.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: Array(rangeDataMap?.[activeRange.value]?.categories.length ?? 0).fill(
            "var(--color-muted-foreground)"
          ) as string[],
          fontSize: "12px",
        },
      },
    },
    yaxis: { show: false },
    grid: { show: false, padding: { left: 8, right: 8 } },
    legend: { show: false },
    tooltip: { shared: true, intersect: false },
    dataLabels: { enabled: false },
  }));

  const chartSeries = computed(() => [
    { name: "Revenue", type: "bar", data: rangeDataMap?.[activeRange.value]?.revenue },
    { name: "Target", type: "line", data: rangeDataMap?.[activeRange.value]?.target },
  ]);

  // Customers table
  type CustomerRow = {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    email: string;
    date: string;
    status: "Paid" | "Pending" | "Failed";
    amount: string;
  };

  const tableSearch = ref("");

  const customerColumns: ColumnDef<CustomerRow>[] = [
    {
      id: "select",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-12", td: "w-12" } },
    },
    {
      accessorKey: "name",
      header: "Customer",
      meta: { class: { td: "min-w-[180px]" } },
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: { class: { td: "text-muted-foreground" } },
    },
    {
      accessorKey: "date",
      header: "Date",
      meta: { class: { td: "text-muted-foreground tabular-nums" } },
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      meta: { class: { th: "text-right", td: "text-right tabular-nums font-medium" } },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-20", td: "w-20" } },
    },
  ];

  const firstNames = [
    "Lily-Rose",
    "Caitlyn",
    "Fleur",
    "Marco",
    "Lulu",
    "Mikey",
    "Freya",
    "James",
    "Sofia",
    "Noah",
    "Emma",
    "Liam",
    "Olivia",
    "Ethan",
    "Ava",
    "Mason",
    "Isabella",
    "Logan",
    "Mia",
    "Lucas",
  ];

  const lastNames = [
    "Chedjou",
    "King",
    "Cook",
    "Kelly",
    "Meyers",
    "Lawrence",
    "Browning",
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Wilson",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
  ];

  const amounts = [
    "$100.14",
    "$96.32",
    "$104.24",
    "$88.48",
    "$107.10",
    "$82.04",
    "$91.50",
    "$115.00",
    "$78.25",
    "$123.60",
  ];

  const statuses: CustomerRow["status"][] = [
    "Paid",
    "Paid",
    "Paid",
    "Paid",
    "Pending",
    "Paid",
    "Paid",
    "Failed",
  ];

  const domains = ["gmail.com", "icloud.com", "yahoo.com", "outlook.com"];

  const createCustomer = (i: number): CustomerRow => {
    const first = firstNames[i % firstNames.length] ?? "User";
    const last = lastNames[i % lastNames.length] ?? "Name";
    const name = `${first} ${last}`;
    const slug = first.toLowerCase().replace(/[-\s]/g, "");
    const handle = `@${slug}${last.toLowerCase()}`;
    const email = `${slug}@${domains[i % domains.length] ?? "example.com"}`;
    const day = Math.max(1, 16 - Math.floor(i / 6));
    const month = i < 60 ? "Jan" : "Feb";
    return {
      id: i + 1,
      name,
      handle,
      avatar: `https://i.pravatar.cc/40?img=${(i % 70) + 1}`,
      email,
      date: `${month} ${day}, 2025`,
      status: statuses[i % statuses.length] ?? "Paid",
      amount: amounts[i % amounts.length] ?? "$0.00",
    };
  };

  const { data: customersData, pending: customersPending } = await useAsyncData<CustomerRow[]>(
    "block-dashboard4-customers",
    async () => Array.from({ length: 100 }, (_, i) => createCustomer(i)),
    { default: () => [] }
  );

  const customers = computed(() => customersData.value ?? []);

  const filteredCustomers = computed(() => {
    if (!tableSearch.value.trim()) return customers.value;
    const q = tableSearch.value.toLowerCase();
    return customers.value.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  });

  // Delete dialog
  const deleteOpen = ref(false);
  const deleteTarget = ref<CustomerRow | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget.value) return;
    useSonner(`'${deleteTarget.value.name}' removed`, {
      description: "The customer has been permanently deleted.",
    });
    deleteTarget.value = null;
  };

  // Edit sheet
  const editOpen = ref(false);
  const editForm = reactive({
    name: "",
    email: "",
    amount: "",
    status: "" as CustomerRow["status"],
  });

  const openEdit = (row: CustomerRow) => {
    editForm.name = row.name;
    editForm.email = row.email;
    editForm.amount = row.amount;
    editForm.status = row.status;
    editOpen.value = true;
  };

  const saveEdit = () => {
    editOpen.value = false;
    useSonner("Customer updated", { description: `${editForm.name} has been saved.` });
  };
</script>
