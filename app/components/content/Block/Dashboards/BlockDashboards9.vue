<template>
  <div class="bg-background text-foreground min-h-screen">
    <!-- Delete confirmation dialog -->
    <UiAlertDialog v-model:open="deleteOpen">
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle title="Remove vendor?" />
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

    <!-- Add vendor sheet -->
    <UiSheet v-model:open="addOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Add vendor"
        description="Fill in the details to add a new vendor."
      >
        <template #content>
          <form class="space-y-5 px-6" @submit="submitAdd">
            <fieldset :disabled="isSubmittingAdd" class="space-y-5">
              <UiVeeInput required label="Vendor name" name="addName" placeholder="Acme Corp" />
              <UiVeeInput required label="Domain" name="addDomain" placeholder="acme.com" />
              <UiVeeSelect required label="Status" name="addStatus">
                <option disabled>Select an option</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </UiVeeSelect>
            </fieldset>
          </form>
        </template>
        <template #footer>
          <UiSheetFooter class="px-6 pb-6">
            <UiSheetClose as-child>
              <UiButton variant="outline" class="w-full">Cancel</UiButton>
            </UiSheetClose>
            <UiButton class="w-full" :disabled="isSubmittingAdd" @click="submitAdd">
              Add vendor
            </UiButton>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>

    <!-- Edit vendor sheet -->
    <UiSheet v-model:open="editOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Edit vendor"
        description="Update the vendor's details below."
      >
        <template #content>
          <form class="space-y-5 px-6" @submit="submitEdit">
            <fieldset :disabled="isSubmittingEdit" class="space-y-5">
              <UiVeeInput required label="Vendor name" name="editName" placeholder="Acme Corp" />
              <UiVeeInput required label="Domain" name="editDomain" placeholder="acme.com" />
              <UiVeeSelect required label="Status" name="editStatus">
                <option disabled>Select an option</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </UiVeeSelect>
            </fieldset>
          </form>
        </template>
        <template #footer>
          <UiSheetFooter class="px-6 pb-6">
            <UiSheetClose as-child>
              <UiButton variant="outline" class="w-full">Cancel</UiButton>
            </UiSheetClose>
            <UiButton class="w-full" @click="submitEdit">Save changes</UiButton>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>

    <!-- Command search dialog -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search vendors"
      description="Search by vendor name, domain, or category"
    >
      <UiCommandInput placeholder="Search vendors..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick actions">
          <UiCommandItem value="Add vendor">
            <Icon name="heroicons:plus" />
            <span>Add vendor</span>
          </UiCommandItem>
          <UiCommandItem value="Import vendors">
            <Icon name="heroicons:arrow-up-tray" />
            <span>Import vendors</span>
          </UiCommandItem>
          <UiCommandItem value="Export data">
            <Icon name="heroicons:arrow-down-tray" />
            <span>Export data</span>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Filter by status">
          <UiCommandItem value="Active vendors">
            <Icon name="heroicons:check-circle" />
            <span>Active vendors</span>
          </UiCommandItem>
          <UiCommandItem value="Inactive vendors">
            <Icon name="heroicons:x-circle" />
            <span>Inactive vendors</span>
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
              <UiButton variant="ghost" size="icon-sm" class="lg:hidden">
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
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="rounded-full"
                @click="searchOpen = true"
              >
                <Icon name="heroicons:magnifying-glass" class="text-muted-foreground size-5" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Search</p></UiTooltipContent>
          </UiTooltip>

          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                    <Icon name="heroicons:cog-6-tooth" class="text-muted-foreground size-5" />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Settings</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-52">
                <UiDropdownMenuLabel>Settings</UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Account settings" />
                <UiDropdownMenuItem icon="heroicons:swatch" title="Appearance" />
                <UiDropdownMenuItem icon="heroicons:bell" title="Notifications" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  variant="destructive"
                  icon="heroicons:arrow-right-on-rectangle"
                  title="Sign out"
                />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                    <Icon name="heroicons:bell" class="text-muted-foreground size-5" />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Notifications</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-96">
                <UiDropdownMenuLabel class="flex items-center justify-between">
                  <span>Notifications</span>
                  <UiBadge variant="secondary" size="sm">2 new</UiBadge>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  icon="heroicons:shield-check"
                  title="Warpspeed passed security review"
                >
                  <template #shortcut>2h ago</template>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  icon="heroicons:arrow-trending-down"
                  title="CloudWatch rating dropped below 40"
                >
                  <template #shortcut>5h ago</template>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                    <UiAvatar
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Sasha Smith"
                      fallback="OR"
                      class="size-8 cursor-pointer"
                    />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Account</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-52">
                <UiDropdownMenuLabel>
                  <div class="flex flex-col">
                    <p class="text-sm font-medium">Sasha Smith</p>
                    <p class="text-muted-foreground text-xs">sasha@ui-thing.com</p>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
                <UiDropdownMenuItem icon="heroicons:users" title="Team" />
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
          </UiTooltip>
        </div>
      </UiContainer>
    </Motion>

    <!-- Page content -->
    <UiContainer class="space-y-6 py-8">
      <!-- Page header -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <h1 class="text-2xl font-bold tracking-tight">Welcome back, Sasha</h1>
        <div class="flex items-center gap-2">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="hidden sm:flex"
                @click="searchOpen = true"
              >
                <Icon name="heroicons:magnifying-glass" class="text-muted-foreground size-4" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Search vendors</p></UiTooltipContent>
          </UiTooltip>
          <UiButton variant="outline" size="sm" class="gap-2">
            <Icon name="heroicons:squares-2x2" class="size-4" />
            Customize
          </UiButton>
          <UiButton variant="outline" size="sm" class="gap-2">
            <Icon name="heroicons:arrow-up-tray" class="size-4" />
            Export
          </UiButton>
        </div>
      </Motion>

      <!-- Two-column charts row -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.18, ease: 'easeOut' }"
        class="grid gap-4 lg:grid-cols-[3fr_2fr]"
      >
        <!-- Vendor breakdown — line chart -->
        <div class="border-border/70 bg-card overflow-hidden rounded-xl border shadow-xs">
          <!-- Card header -->
          <div class="border-border/60 flex items-start justify-between border-b px-5 py-4">
            <div class="flex items-center gap-3">
              <div
                class="bg-foreground flex size-10 shrink-0 items-center justify-center rounded-full"
              >
                <Icon name="heroicons:arrow-path" class="text-background size-5" />
              </div>
              <div>
                <p class="text-sm font-semibold">Vendor breakdown</p>
                <p class="text-muted-foreground text-xs">
                  Keep track of vendors and their security ratings.
                </p>
              </div>
            </div>
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="text-muted-foreground -mr-1 shrink-0"
                    >
                      <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Options</p></UiTooltipContent>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem icon="heroicons:arrow-path" title="Refresh" />
                  <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Export" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>
          </div>

          <!-- Line chart -->
          <UiApexchart type="line" height="300" :series="lineSeries" :options="lineOptions" />

          <!-- Footer -->
          <div class="border-border/60 border-t px-5 py-3">
            <UiButton variant="outline" size="sm" class="w-full">View full report</UiButton>
          </div>
        </div>

        <!-- Vendors monitored — donut card -->
        <div
          class="border-border/70 bg-card flex flex-col overflow-hidden rounded-xl border shadow-xs"
        >
          <!-- Card header -->
          <div class="border-border/60 flex items-start justify-between border-b px-5 py-4">
            <div>
              <p class="text-sm font-semibold">Vendors monitored</p>
              <p class="text-muted-foreground text-xs">You're using 80% of available spots.</p>
            </div>
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="text-muted-foreground -mr-1 shrink-0"
                    >
                      <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Options</p></UiTooltipContent>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem icon="heroicons:arrow-path" title="Refresh" />
                  <UiDropdownMenuItem icon="heroicons:arrow-up-tray" title="Upgrade plan" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>
          </div>

          <!-- Donut chart area -->
          <div class="relative flex-1 px-5 pt-2">
            <!-- +10% trend badge -->
            <div class="flex justify-end">
              <span
                class="flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
              >
                <Icon name="heroicons:arrow-up" class="size-3" />
                10%
              </span>
            </div>
            <UiApexchart type="donut" height="200" :series="donutSeries" :options="donutOptions" />
          </div>

          <!-- Warning message -->
          <div class="border-border/60 space-y-3 border-t px-5 py-4">
            <div>
              <p class="text-sm font-semibold">You've almost reached your limit</p>
              <p class="text-muted-foreground mt-0.5 text-xs">
                You have used 80% of your available spots. Upgrade plan to monitor more vendors.
              </p>
            </div>
            <UiButton variant="outline" size="sm" class="w-full gap-2">
              <Icon name="heroicons:bolt" class="size-4" />
              Upgrade plan
            </UiButton>
          </div>
        </div>
      </Motion>

      <!-- Vendor movements card -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.26, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
          <!-- Section header -->
          <div
            class="border-border/60 flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-base font-bold tracking-tight">Vendor movements</h2>
                <UiBadge variant="secondary" class="rounded-full text-xs font-medium">
                  240 vendors
                </UiBadge>
              </div>
              <p class="text-muted-foreground mt-0.5 text-sm">
                Keep track of vendor and their security ratings.
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <UiButton variant="outline" size="sm" class="gap-2">
                <Icon name="heroicons:arrow-up-tray" class="size-4" />
                Import
              </UiButton>
              <UiButton size="sm" class="gap-2" @click="addOpen = true">
                <Icon name="heroicons:plus" class="size-4" />
                Add vendor
              </UiButton>
            </div>
          </div>

          <!-- Filter tabs + search row -->
          <div
            class="border-border/60 flex flex-col gap-3 border-b px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <!-- Tab buttons -->
            <UiButtonGroup>
              <UiButton
                v-for="tab in filterTabs"
                :key="tab.value"
                variant="outline"
                size="sm"
                :class="activeFilter === tab.value ? 'text-primary hover:text-primary' : ''"
                @click="activeFilter = tab.value"
              >
                {{ tab.label }}
              </UiButton>
            </UiButtonGroup>

            <!-- Search + filters -->
            <div class="flex items-center gap-2">
              <div class="relative w-full sm:w-52">
                <Icon
                  name="heroicons:magnifying-glass"
                  class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                <UiInput v-model="tableSearch" placeholder="Search" class="pr-12 pl-9" />
                <div class="absolute top-1/2 right-2.5 -translate-y-1/2">
                  <UiKbd class="text-[10px]">⌘K</UiKbd>
                </div>
              </div>
              <UiButton variant="outline" size="sm" class="shrink-0 gap-2">
                <Icon name="heroicons:adjustments-horizontal" class="size-4" />
                <span class="hidden sm:inline">Filters</span>
              </UiButton>
            </div>
          </div>

          <!-- Table -->
          <UiTanStackTable
            :data="filteredVendors"
            :columns="vendorColumns"
            :show-rows-per-page="false"
            :show-page-info="false"
            :show-pagination="false"
            :show-selected-count="false"
            :show-footer="true"
            :loading="vendorsPending"
            :table-options="{ enableRowSelection: true }"
          >
            <!-- Select all -->
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

            <!-- Vendor cell: avatar + name + domain -->
            <template #vendor-cell="{ row }">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-10 shrink-0 items-center justify-center rounded-full"
                  :style="{ backgroundColor: row.original.logoColor }"
                >
                  <Icon :name="row.original.logoIcon" class="size-5 text-white" />
                </div>
                <div class="flex min-w-0 flex-col">
                  <span class="truncate text-sm font-semibold">{{ row.original.name }}</span>
                  <span class="text-muted-foreground truncate text-xs">{{
                    row.original.domain
                  }}</span>
                </div>
              </div>
            </template>

            <!-- Rating cell: progress bar + number + trend badge -->
            <template #rating-cell="{ row }">
              <div class="flex items-center gap-3">
                <div class="bg-muted h-1.5 w-32 overflow-hidden rounded-full">
                  <div
                    class="h-full rounded-full transition-all"
                    :style="{
                      width: `${row.original.rating}%`,
                      backgroundColor: 'var(--color-primary)',
                    }"
                  />
                </div>
                <span class="w-6 shrink-0 text-sm font-medium tabular-nums">{{
                  row.original.rating
                }}</span>
                <span
                  class="flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium"
                  :class="
                    row.original.trendPositive
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                  "
                >
                  <Icon
                    :name="
                      row.original.trendPositive ? 'heroicons:arrow-up' : 'heroicons:arrow-down'
                    "
                    class="size-2.5"
                  />
                  {{ Math.abs(row.original.trendPct) }}%
                </span>
              </div>
            </template>

            <!-- Last assessed cell -->
            <template #lastAssessed-cell="{ row }">
              <span class="text-muted-foreground text-sm">{{ row.original.lastAssessed }}</span>
            </template>

            <!-- Categories cell: status + tags + overflow -->
            <template #categories-cell="{ row }">
              <div class="flex flex-wrap items-center gap-1.5">
                <span
                  class="flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium"
                  :class="
                    row.original.status === 'Active'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400'
                      : 'border-border/70 bg-muted/50 text-muted-foreground'
                  "
                >
                  <span
                    class="size-1.5 rounded-full"
                    :class="
                      row.original.status === 'Active' ? 'bg-emerald-500' : 'bg-muted-foreground'
                    "
                  />
                  {{ row.original.status }}
                </span>
                <span
                  v-for="cat in row.original.categories.slice(0, 2)"
                  :key="cat"
                  class="border-border/60 bg-card text-foreground rounded-full border px-2 py-0.5 text-xs font-medium"
                >
                  {{ cat }}
                </span>
                <span
                  v-if="row.original.categories.length > 2"
                  class="border-border/60 bg-card text-muted-foreground rounded-full border px-2 py-0.5 text-xs font-medium"
                >
                  +{{ row.original.categories.length - 2 }}
                </span>
              </div>
            </template>

            <!-- Actions cell -->
            <template #actions-cell="{ row }">
              <div class="flex items-center gap-1">
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="text-muted-foreground hover:text-destructive"
                      aria-label="Delete vendor"
                      @click="
                        () => {
                          deleteTarget = row.original;
                          deleteOpen = true;
                        }
                      "
                    >
                      <Icon name="heroicons:trash" class="size-4" />
                    </UiButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Delete vendor</p></UiTooltipContent>
                </UiTooltip>
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="text-muted-foreground"
                      aria-label="Edit vendor"
                      @click="openEdit(row.original)"
                    >
                      <Icon name="heroicons:pencil" class="size-4" />
                    </UiButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Edit vendor</p></UiTooltipContent>
                </UiTooltip>
              </div>
            </template>

            <!-- Footer with pagination -->
            <template #footer="{ table }">
              <div
                class="border-border/60 flex w-full items-center justify-between border-t px-5 py-4"
              >
                <p class="text-muted-foreground text-sm">
                  Page {{ table.getState().pagination.pageIndex + 1 }} of
                  {{ table.getPageCount() }}
                </p>

                <!-- Desktop pagination -->
                <UiPagination
                  class="mx-0! hidden! justify-end! sm:flex!"
                  :total="filteredVendors.length"
                  :items-per-page="10"
                  :sibling-count="1"
                  :page="table.getState().pagination.pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList class="gap-1">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="sm">
                        <Icon name="heroicons:chevron-left" class="size-4" />
                        Previous
                      </UiButton>
                    </UiPaginationPrev>
                    <UiPaginationNext as-child>
                      <UiButton variant="outline" size="sm">
                        Next
                        <Icon name="heroicons:chevron-right" class="size-4" />
                      </UiButton>
                    </UiPaginationNext>
                  </UiPaginationList>
                </UiPagination>

                <!-- Mobile pagination -->
                <UiPagination
                  class="mx-0! sm:hidden!"
                  :total="filteredVendors.length"
                  :items-per-page="10"
                  :page="table.getState().pagination.pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList class="gap-1">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="icon-sm">
                        <Icon name="heroicons:arrow-left" class="size-4" />
                      </UiButton>
                    </UiPaginationPrev>
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
  import { object, string } from "yup";
  import type { InferType } from "yup";

  // ─── Navigation ────────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // ─── Search dialog ─────────────────────────────────────────────────────────────
  const searchOpen = ref(false);
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") searchOpen.value = false;
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
  };
  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // ─── Line chart (Vendor breakdown) ────────────────────────────────────────────
  const months = [
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
  ];

  const lineSeries = [
    { name: "Your rating", data: [42, 46, 50, 53, 58, 62, 66, 70, 76, 80, 85, 90] },
    { name: "Industry average", data: [8, 10, 13, 14, 18, 20, 22, 26, 28, 32, 36, 40] },
  ];

  const lineOptions: ApexOptions = {
    chart: {
      type: "line",
      background: "transparent",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ["var(--color-primary)", "#94a3b8"],
    stroke: { width: [2, 2], curve: "smooth" },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    markers: { size: 0, hover: { size: 5 } },
    grid: {
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 8, right: 8 },
    },
    xaxis: {
      categories: months,
      axisBorder: { show: false },
      axisTicks: { show: false },
      title: { text: "Month", offsetY: -4, style: { fontSize: "11px", fontWeight: 400 } },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      title: { text: "Security rating", style: { fontSize: "11px", fontWeight: 400 } },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      markers: { size: 6, shape: "circle" },
    },
    tooltip: { y: { formatter: (v: number) => `${v} / 100` } },
  };

  // ─── Donut chart (Vendors monitored) ──────────────────────────────────────────
  const donutSeries = [80, 20];

  const donutOptions: ApexOptions = {
    chart: {
      type: "donut",
      background: "transparent",
      parentHeightOffset: 0,
    },
    colors: ["var(--color-primary)", "#e2e8f0"],
    labels: ["Used", "Available"],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: { show: false },
            value: {
              show: true,
              fontSize: "36px",
              fontWeight: "700",
              offsetY: 10,
              color: undefined,
              formatter: () => "240",
            },
            total: {
              show: true,
              label: "",
              formatter: () => "240",
            },
          },
        },
      },
    },
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { enabled: false },
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  };

  // ─── Filter tabs ──────────────────────────────────────────────────────────────
  const filterTabs = [
    { label: "View all", value: "all" },
    { label: "Monitored", value: "monitored" },
    { label: "Unmonitored", value: "unmonitored" },
  ];
  const activeFilter = ref("all");

  // ─── Vendor table ──────────────────────────────────────────────────────────────
  type VendorRow = {
    id: number;
    name: string;
    domain: string;
    logoColor: string;
    logoIcon: string;
    rating: number;
    trendPct: number;
    trendPositive: boolean;
    lastAssessed: string;
    status: "Active" | "Inactive";
    monitored: boolean;
    categories: string[];
  };

  const logoColors = [
    "#6366f1",
    "#0ea5e9",
    "#1a1a2e",
    "#38bdf8",
    "#6d28d9",
    "#0f172a",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
  ];

  const logoIcons = [
    "heroicons:cpu-chip",
    "heroicons:cube-transparent",
    "heroicons:bolt",
    "heroicons:cloud",
    "heroicons:eye",
    "heroicons:signal",
    "heroicons:arrow-path",
    "heroicons:globe-alt",
    "heroicons:shield-check",
    "heroicons:chart-bar",
  ];

  const allCategories = [
    "Customer data",
    "Business data",
    "Database access",
    "Salesforce",
    "Financials",
    "Admin",
    "HR data",
    "Legal",
  ];

  const assessmentDates = [
    "22 Jan 2025",
    "20 Jan 2025",
    "24 Jan 2025",
    "26 Jan 2025",
    "18 Jan 2025",
    "28 Jan 2025",
    "16 Jan 2025",
    "14 Jan 2025",
    "30 Jan 2025",
    "12 Jan 2025",
  ];

  const vendorNames = [
    "Ephemeral",
    "Stack3d Lab",
    "Warpspeed",
    "CloudWatch",
    "ContrastAI",
    "Convergence",
    "Sisyphus",
    "NovaSec",
    "DataForge",
    "Axiom",
    "Meridian",
    "Vaultix",
    "TrustLayer",
    "CipherBase",
    "Sentinel",
    "Gridlock",
    "Helios",
    "Prism",
    "Velox",
    "Ironclad",
  ];

  const vendorDomains = [
    "ephemeral.io",
    "stack3dlab.com",
    "getwarpspeed.com",
    "cloudwatch.app",
    "contrastai.com",
    "convergence.io",
    "sisyphus.com",
    "novasec.io",
    "dataforge.co",
    "axiom.xyz",
    "meridian.ai",
    "vaultix.com",
    "trustlayer.io",
    "cipherbase.dev",
    "sentinel.app",
    "gridlock.io",
    "helios.ai",
    "prism.co",
    "velox.app",
    "ironclad.io",
  ];

  const createVendor = (i: number): VendorRow => {
    faker.seed(i + 900);
    const trendPct = faker.number.int({ min: -10, max: 10 });
    const catCount = faker.number.int({ min: 2, max: 5 });
    const shuffled = [...allCategories].sort(() => faker.number.float() - 0.5);
    return {
      id: i + 1,
      name: vendorNames[i % vendorNames.length]!,
      domain: vendorDomains[i % vendorDomains.length]!,
      logoColor: logoColors[i % logoColors.length]!,
      logoIcon: logoIcons[i % logoIcons.length]!,
      rating: faker.number.int({ min: 28, max: 95 }),
      trendPct,
      trendPositive: trendPct >= 0,
      lastAssessed: assessmentDates[i % assessmentDates.length]!,
      status: i % 6 === 4 ? "Inactive" : "Active",
      monitored: i % 4 !== 3,
      categories: shuffled.slice(0, catCount),
    };
  };

  const { data: vendorsData, pending: vendorsPending } = await useAsyncData<VendorRow[]>(
    "block-dashboards9-vendors",
    async () => Array.from({ length: 100 }, (_, i) => createVendor(i)),
    { default: () => [] }
  );

  const vendors = computed(() => vendorsData.value ?? []);

  const tableSearch = ref("");

  const filteredVendors = computed(() => {
    let list = vendors.value;

    if (activeFilter.value === "monitored") list = list.filter((v) => v.monitored);
    else if (activeFilter.value === "unmonitored") list = list.filter((v) => !v.monitored);

    const q = tableSearch.value.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.domain.toLowerCase().includes(q) ||
        v.status.toLowerCase().includes(q) ||
        v.categories.some((c) => c.toLowerCase().includes(q))
    );
  });

  // ─── Table columns ─────────────────────────────────────────────────────────────
  const vendorColumns: ColumnDef<VendorRow>[] = [
    {
      id: "select",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-12", td: "w-12" } },
    },
    {
      id: "vendor",
      accessorKey: "name",
      header: "Vendor",
    },
    {
      id: "rating",
      accessorKey: "rating",
      header: "Rating",
      meta: { class: { th: "min-w-[220px]", td: "min-w-[220px]" } },
    },
    {
      id: "lastAssessed",
      accessorKey: "lastAssessed",
      header: "Last assessed",
      enableSorting: false,
      meta: { class: { th: "hidden md:table-cell", td: "hidden md:table-cell" } },
    },
    {
      id: "categories",
      accessorKey: "categories",
      header: "Categories",
      enableSorting: false,
      meta: { class: { th: "hidden lg:table-cell", td: "hidden lg:table-cell" } },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-20", td: "w-20" } },
    },
  ];

  // ─── Add vendor sheet ──────────────────────────────────────────────────────────
  const addOpen = ref(false);

  const AddSchema = object({
    addName: string().required().label("Vendor name").min(2).max(100),
    addDomain: string().required().label("Domain").min(3).max(80),
    addStatus: string().required().label("Status"),
  });

  const {
    handleSubmit: handleAddSubmit,
    isSubmitting: isSubmittingAdd,
    resetForm: resetAddForm,
    controlledValues: addControlledValues,
  } = useForm({ name: "addVendorForm9", validationSchema: toTypedSchema(AddSchema) });

  const submitAdd = handleAddSubmit(() => {
    addOpen.value = false;
    useSonner("Vendor added", {
      description: `'${addControlledValues.value.addName}' has been added.`,
    });
    resetAddForm();
  });

  // ─── Edit vendor sheet ─────────────────────────────────────────────────────────
  const editOpen = ref(false);
  const editTarget = ref<VendorRow | null>(null);

  const EditSchema = object({
    editName: string().required().label("Vendor name").min(2).max(100),
    editDomain: string().required().label("Domain").min(3).max(80),
    editStatus: string().required().label("Status"),
  });

  const {
    handleSubmit: handleEditSubmit,
    isSubmitting: isSubmittingEdit,
    setValues,
  } = useForm<InferType<typeof EditSchema>>({ validationSchema: EditSchema });

  const submitEdit = handleEditSubmit(() => {
    editOpen.value = false;
    useSonner("Vendor updated", {
      description: `'${editTarget.value?.name}' has been saved.`,
    });
  });

  const openEdit = (vendor: VendorRow) => {
    editTarget.value = vendor;
    setValues({ editName: vendor.name, editDomain: vendor.domain, editStatus: vendor.status });
    editOpen.value = true;
  };

  // ─── Delete dialog ─────────────────────────────────────────────────────────────
  const deleteOpen = ref(false);
  const deleteTarget = ref<VendorRow | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget.value) return;
    useSonner(`'${deleteTarget.value.name}' removed`, {
      description: "The vendor has been permanently removed.",
    });
    deleteTarget.value = null;
  };
</script>
