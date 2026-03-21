<template>
  <div
    class="min-h-screen bg-background text-foreground [--color-primary:#8b5cf6] [--primary:#8b5cf6] [--radius:12px] [--ring:#8b5cf6]"
  >
    <!-- Edit page sheet -->
    <UiSheet v-model:open="editOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Edit page"
        description="Update the page details below."
      >
        <template #content>
          <div class="space-y-5 px-6">
            <div class="space-y-1.5">
              <label class="text-sm font-medium">Page URL</label>
              <UiVeeInput
                v-model="editForm.page"
                name="edit-page"
                placeholder="e.g. uithing.com/pricing"
              />
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium">Folder</label>
              <UiSelect v-model="editForm.folder">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue placeholder="Select folder" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="f in folders" :key="f" :value="f">{{ f }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="space-y-1.5">
              <label class="text-sm font-medium">Visibility</label>
              <UiSelect v-model="editForm.visibility">
                <UiSelectTrigger class="w-full">
                  <UiSelectValue placeholder="Select visibility" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="public">Public</UiSelectItem>
                  <UiSelectItem value="private">Private</UiSelectItem>
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
          <UiAlertDialogTitle title="Delete page?" />
          <UiAlertDialogDescription
            :description="`Are you sure you want to delete '${deleteTarget?.page}'? This action cannot be undone.`"
          />
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel />
          <UiAlertDialogAction @click="confirmDelete" />
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>

    <!-- Command palette / search dialog -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search for pages, reports, and quick actions"
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

      <!-- Keyboard shortcuts footer -->
      <div
        class="flex items-center gap-5 border-t border-border/70 bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground"
      >
        <span class="flex items-center gap-1.5">
          <kbd
            class="rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px]"
            >↵</kbd
          >
          to select
        </span>
        <span class="flex items-center gap-1.5">
          <kbd
            class="rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px]"
            >↑↓</kbd
          >
          to navigate
        </span>
        <span class="flex items-center gap-1.5">
          <kbd
            class="rounded border border-border/70 bg-background px-1.5 py-0.5 font-mono text-[10px]"
            >ESC</kbd
          >
          to close
        </span>
      </div>
    </UiCommandDialog>

    <!-- Sticky header -->
    <Motion
      as="header"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="sticky top-0 z-10 border-b border-border/70 bg-background/85 backdrop-blur-md"
    >
      <UiContainer class="flex min-h-[4rem] items-center justify-between gap-4">
        <!-- Logo + nav -->
        <div class="flex items-center gap-5">
          <div class="flex items-center gap-2.5">
            <div
              class="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-muted shadow-xs"
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
                    ? 'bg-muted text-foreground shadow-xs hover:bg-muted'
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
                  ? 'bg-muted text-foreground shadow-xs hover:bg-muted'
                  : 'text-muted-foreground'
              "
            >
              {{ item.label }}
            </UiButton>
          </nav>
        </div>

        <!-- Right actions -->
        <div class="flex items-center gap-1">
          <!-- Search (opens modal) -->
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="rounded-full"
            aria-label="Open search"
            @click="searchOpen = true"
          >
            <Icon name="heroicons:magnifying-glass" class="size-5 text-muted-foreground" />
          </UiButton>

          <!-- Settings dropdown -->
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="heroicons:cog-6-tooth" class="size-5 text-muted-foreground" />
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
                <Icon name="heroicons:bell" class="size-5 text-muted-foreground" />
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
              <UiDropdownMenuItem icon="heroicons:document-text" title="Weekly report is ready">
                <template #shortcut>1d ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                icon="heroicons:exclamation-circle"
                title="Bounce rate spike on /pricing"
              >
                <template #shortcut>2d ago</template>
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
                  <p class="text-xs text-muted-foreground">{{ currentUser.email }}</p>
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
    <UiContainer class="space-y-6 py-8">
      <!-- Page title + action buttons -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
        class="flex flex-wrap items-center justify-between gap-4"
      >
        <h1 class="text-2xl font-semibold tracking-tight">Site traffic</h1>
        <div class="flex items-center gap-2">
          <UiButton variant="outline">
            <Icon name="heroicons:arrow-path" class="size-4" />
            Switch dashboard
          </UiButton>
          <UiButton>
            <Icon name="heroicons:arrow-down-tray" class="size-4" />
            Export report
          </UiButton>
        </div>
      </Motion>

      <!-- Source tabs + time range tabs -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.15, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Traffic source tabs -->
        <div class="scrollbar-none overflow-x-auto">
          <UiTabs v-model="activeSource">
            <UiTabsList class="border border-border/70 bg-muted/30">
              <UiTabsTrigger v-for="tab in sourceTabs" :key="tab" :value="tab">
                {{ tab }}
              </UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
        </div>

        <!-- Time range tabs -->
        <UiTabs v-model="activeRange" class="shrink-0">
          <UiTabsList class="border border-border/70 bg-muted/30">
            <UiTabsTrigger v-for="r in timeRanges" :key="r.value" :value="r.value">
              {{ r.label }}
            </UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
      </Motion>

      <!-- Metric cards with sparklines -->
      <Motion
        as="section"
        :variants="metricsContainerVariant"
        initial="initial"
        animate="animate"
        class="grid gap-4 md:grid-cols-3"
      >
        <Motion
          v-for="metric in metrics"
          :key="metric.label"
          :variants="metricCardVariant"
          class="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs"
        >
          <div class="px-5 pt-5 pb-3">
            <!-- Card header -->
            <div class="mb-3 flex items-center justify-between">
              <p class="text-sm text-muted-foreground">{{ metric.label }}</p>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm">
                    <Icon name="heroicons:ellipsis-vertical" class="size-4 text-muted-foreground" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end" class="w-56">
                  <UiDropdownMenuItem icon="heroicons:chart-bar" title="View detailed report" />
                  <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Download data" />
                  <UiDropdownMenuItem icon="heroicons:arrows-right-left" title="Compare periods" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem icon="heroicons:eye-slash" title="Hide metric" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>

            <!-- Value + trend -->
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span class="text-3xl font-bold tracking-tight">{{ metric.value }}</span>
              <span
                class="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-500"
              >
                <Icon name="heroicons:arrow-trending-up" class="size-4" />
                {{ metric.change }} vs last month
              </span>
            </div>
          </div>

          <!-- Sparkline -->
          <div class="h-20">
            <UiApexchart
              type="area"
              height="100%"
              :series="metric.series"
              :options="sparklineOptions"
            />
          </div>
        </Motion>
      </Motion>

      <Motion
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.4, delay: 0.4, ease: 'easeOut' }"
      >
        <UiGradientDivider />
      </Motion>

      <!-- Pages and screens table -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, ease: 'easeOut', delay: 0.45 }"
      >
        <UiCard class="gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
          <!-- Section header -->
          <UiCardHeader class="border-b border-border/60 py-5">
            <div class="mb-4 flex items-center justify-between">
              <UiCardTitle class="text-base font-semibold">Pages and screens</UiCardTitle>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm">
                    <Icon name="heroicons:ellipsis-vertical" class="size-4 text-muted-foreground" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end" class="w-44">
                  <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Export data" />
                  <UiDropdownMenuItem icon="heroicons:funnel" title="Edit filters" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem icon="heroicons:eye-slash" title="Hide section" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>

            <!-- Controls -->
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <!-- Button group: View all / Public / Private -->
              <UiToggleGroup
                v-model="activeFilter"
                type="single"
                class="gap-0.5 rounded-lg border border-border/70 bg-muted/20 p-0.5"
              >
                <UiToggleGroupItem
                  v-for="f in tableFilters"
                  :key="f"
                  :value="f"
                  class="w-full rounded-md px-3.5 text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-xs sm:w-auto"
                >
                  {{ f }}
                </UiToggleGroupItem>
              </UiToggleGroup>

              <!-- Search + Filters -->
              <div class="grid gap-4 sm:flex sm:items-center sm:gap-2">
                <div class="shrink-0 sm:w-48">
                  <UiVeeInput
                    v-model="tableSearch"
                    icon="heroicons:magnifying-glass"
                    name="table-search"
                    placeholder="Search"
                  >
                    <template #trailingIcon>
                      <div class="absolute inset-y-0 right-3 flex items-center justify-center">
                        <UiKbd>⌘K</UiKbd>
                      </div>
                    </template>
                  </UiVeeInput>
                </div>
                <UiButton variant="outline" class="shrink-0">
                  <Icon name="heroicons:funnel" class="size-4" />
                  Filters
                </UiButton>
              </div>
            </div>
          </UiCardHeader>

          <!-- TanStack table -->
          <UiTanStackTable
            :data="filteredPages"
            :columns="pageColumns"
            :show-rows-per-page="false"
            :show-page-info="false"
            :show-pagination="false"
            :show-selected-count="false"
            :show-footer="true"
            :loading="pagesPending"
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
                :aria-label="`Select ${row.original.page}`"
                :model-value="row.getIsSelected()"
                @update:model-value="row.toggleSelected(!!$event)"
              />
            </template>

            <template #percentage-cell="{ row }">
              <div class="flex items-center gap-3">
                <div class="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full bg-primary transition-all"
                    :style="{ width: `${Math.min(100, (row.original.percentage / 65) * 100)}%` }"
                  />
                </div>
                <span class="text-sm tabular-nums">{{ row.original.percentage }}%</span>
              </div>
            </template>

            <template #folder-cell="{ row }">
              <span
                class="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-0.5 text-xs font-medium"
              >
                <span class="size-1.5 rounded-full bg-emerald-500" />
                {{ row.original.folder }}
              </span>
            </template>

            <template #actions-cell="{ row }">
              <div class="flex items-center justify-end gap-0.5">
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="text-muted-foreground hover:text-destructive"
                  :title="`Delete ${row.original.page}`"
                  @click="
                    () => {
                      deleteTarget = row.original;
                      deleteOpen = true;
                    }
                  "
                >
                  <Icon name="heroicons:trash" class="size-4" />
                </UiButton>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="text-muted-foreground hover:text-foreground"
                  :title="`Edit ${row.original.page}`"
                  @click="openEdit(row.original)"
                >
                  <Icon name="heroicons:pencil" class="size-4" />
                </UiButton>
              </div>
            </template>

            <template #footer="{ table }">
              <div
                class="flex flex-col gap-4 border-t border-border/60 px-6 py-4 text-sm font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
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
                    <Icon name="heroicons:chevron-left" class="size-4" />
                    Previous
                  </UiButton>
                  <UiButton
                    variant="outline"
                    size="sm"
                    :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()"
                  >
                    Next
                    <Icon name="heroicons:chevron-right" class="size-4" />
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
  import { Motion } from "motion-v";
  import type { ColumnDef } from "@tanstack/vue-table";
  import type { ApexOptions } from "apexcharts";
  import type { MotionProps } from "motion-v";

  // Animation variants
  const metricsContainerVariant: MotionProps["variants"] = {
    initial: {},
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.22 } },
  };

  const metricCardVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // User data
  const currentUser = {
    name: "Behon Baker",
    firstName: "Behon",
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

  // Search modal
  const searchOpen = ref(false);

  const recentSearches = [
    "Total sessions last 30 days",
    "Organic traffic conversion rate",
    "Mobile bounce rate by page",
  ];

  const quickLinks = [
    { label: "Analytics overview", icon: "heroicons:chart-bar", path: "/analytics" },
    { label: "Traffic sources report", icon: "heroicons:arrow-trending-up", path: "/traffic" },
    { label: "Page performance", icon: "heroicons:document-text", path: "/pages" },
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

  // Settings toggles
  const compactRows = ref(false);
  const showTrends = ref(true);

  // Traffic source tabs
  const sourceTabs = [
    "All sessions",
    "Direct traffic",
    "Organic traffic",
    "Paid traffic",
    "Mobile users",
    "Returning users",
  ];
  const activeSource = ref("All sessions");

  // Time range tabs
  const timeRanges = [
    { label: "12m", value: "12months" },
    { label: "30d", value: "30days" },
    { label: "7d", value: "7days" },
    { label: "24h", value: "24hours" },
  ];
  const activeRange = ref("30days");

  // Metric cards
  const metrics = [
    {
      label: "Total sessions",
      value: "526",
      change: "2.4%",
      series: [
        {
          name: "Sessions",
          data: [120, 108, 140, 118, 155, 138, 165, 145, 180, 162, 195, 178],
        },
      ],
    },
    {
      label: "Session duration",
      value: "2:24",
      change: "8.6%",
      series: [
        {
          name: "Duration",
          data: [100, 122, 110, 135, 115, 148, 130, 158, 142, 165, 152, 175],
        },
      ],
    },
    {
      label: "Pages per session",
      value: "316",
      change: "6.0%",
      series: [
        {
          name: "Pages",
          data: [80, 95, 88, 110, 98, 122, 112, 132, 118, 145, 135, 158],
        },
      ],
    },
  ];

  const sparklineOptions = ref<ApexOptions>({
    chart: {
      type: "area",
      sparkline: { enabled: true },
      parentHeightOffset: 0,
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.25,
        opacityTo: 0.02,
        stops: [0, 95, 100],
      },
    },
    colors: ["#10b981"],
    tooltip: { enabled: false },
  });

  // Edit sheet
  const editOpen = ref(false);
  const editTarget = ref<PageRow | null>(null);
  const editForm = reactive({ page: "", folder: "", visibility: "" as "public" | "private" });

  const openEdit = (row: PageRow) => {
    editTarget.value = row;
    editForm.page = row.page;
    editForm.folder = row.folder;
    editForm.visibility = row.visibility;
    editOpen.value = true;
  };

  const saveEdit = () => {
    editOpen.value = false;
    useSonner("Page updated", { description: `'${editForm.page}' has been saved.` });
  };

  // Delete dialog
  const deleteOpen = ref(false);
  const deleteTarget = ref<PageRow | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget.value) return;
    useSonner(`'${deleteTarget.value.page}' deleted`, {
      description: "The page has been permanently removed.",
    });
    deleteTarget.value = null;
  };

  // Pages table
  type PageRow = {
    id: number;
    page: string;
    sessions: number;
    avgTime: string;
    percentage: number;
    folder: string;
    visibility: "public" | "private";
  };

  const tableFilters = ["View all", "Public", "Private"] as const;
  const activeFilter = ref("View all");
  const tableSearch = ref("");

  const pageColumns: ColumnDef<PageRow>[] = [
    {
      id: "select",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-12", td: "w-12" } },
    },
    {
      accessorKey: "page",
      header: "Page",
    },
    {
      accessorKey: "sessions",
      header: "Sessions",
      meta: { class: { th: "tabular-nums", td: "tabular-nums" } },
    },
    {
      accessorKey: "avgTime",
      header: "Avg time",
    },
    {
      id: "percentage",
      accessorKey: "percentage",
      header: "% of total",
      enableSorting: true,
    },
    {
      id: "folder",
      accessorKey: "folder",
      header: "Folder",
      enableSorting: false,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-20", td: "w-20" } },
    },
  ];

  const basePaths = [
    "uithing.com",
    "uithing.com/free-icons",
    "uithing.com/icons",
    "uithing.com/components",
    "uithing.com/pricing",
    "uithing.com/faqs",
    "uithing.com/blog",
    "uithing.com/templates",
    "uithing.com/dashboard",
    "uithing.com/signup",
    "uithing.com/login",
    "uithing.com/docs",
    "uithing.com/resources",
    "uithing.com/changelog",
    "uithing.com/about",
  ];

  const avgTimes = [
    "48s",
    "56s",
    "1m 8s",
    "1m 12s",
    "1m 24s",
    "1m 36s",
    "2m 2s",
    "2m 14s",
    "2m 22s",
    "45s",
  ];

  const folders = ["General", "Marketing", "Docs", "Blog", "Resources"];

  const createPage = (i: number): PageRow => {
    const base = basePaths[i % basePaths.length];
    const page = i < basePaths.length ? base : `${base}?ref=${Math.floor(i / basePaths.length)}`;
    const sessions = Math.max(8, Math.round(4288 / (i * 0.65 + 1)));
    const percentage = Math.round((sessions / 4288) * 62.4 * 10) / 10;
    return {
      id: i + 1,
      page,
      sessions,
      avgTime: avgTimes[i % avgTimes.length],
      percentage,
      folder: folders[i % folders.length],
      visibility: i % 4 === 0 ? "private" : "public",
    };
  };

  const { data: pagesData, pending: pagesPending } = await useAsyncData<PageRow[]>(
    "block-dashboard3-pages",
    async () => Array.from({ length: 100 }, (_, i) => createPage(i)),
    { default: () => [] }
  );

  const pages = computed(() => pagesData.value ?? []);

  const filteredPages = computed(() => {
    let result = pages.value;
    if (activeFilter.value === "Public") result = result.filter((p) => p.visibility === "public");
    if (activeFilter.value === "Private") result = result.filter((p) => p.visibility === "private");
    if (tableSearch.value.trim()) {
      const q = tableSearch.value.toLowerCase();
      result = result.filter((p) => p.page.toLowerCase().includes(q));
    }
    return result;
  });
</script>
