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
          <UiCommandItem value="Export data">
            <Icon name="heroicons:arrow-down-tray" />
            <span>Export data</span>
          </UiCommandItem>
          <UiCommandItem value="Customize columns">
            <Icon name="heroicons:adjustments-horizontal" />
            <span>Customize columns</span>
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
                      alt="Current user"
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
                    <p class="text-sm font-medium">Olivia Rhye</p>
                    <p class="text-muted-foreground text-xs">olivia@ui-thing.com</p>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
                <UiDropdownMenuItem icon="heroicons:users" title="Team" />
                <UiDropdownMenuItem icon="heroicons:shield-check" title="Security" />
                <UiDropdownMenuItem icon="heroicons:bell" title="Notification preferences" />
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
        <h1 class="text-2xl font-bold tracking-tight">Organization overview</h1>

        <div class="flex flex-wrap items-center gap-2">
          <!-- Search icon (desktop only) -->
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

          <!-- Filters (desktop) -->
          <UiButton variant="outline" size="sm" class="hidden gap-2 sm:flex">
            <Icon name="heroicons:adjustments-horizontal" class="size-4" />
            Filters
          </UiButton>

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

      <!-- Charts row -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.18, ease: 'easeOut' }"
        class="grid gap-4 lg:grid-cols-[5fr_7fr]"
      >
        <!-- Vendor breakdown — radar chart -->
        <div class="border-border/70 bg-card overflow-hidden rounded-xl border shadow-xs">
          <div class="border-border/60 flex items-center justify-between border-b px-5 py-4">
            <h2 class="text-sm font-semibold">Vendor breakdown</h2>
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground -mr-1">
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

          <div class="p-2">
            <UiApexchart type="radar" height="300" :series="radarSeries" :options="radarOptions" />
          </div>

          <div class="border-border/60 border-t px-5 py-3">
            <UiButton variant="outline" size="sm" class="w-full">View full report</UiButton>
          </div>
        </div>

        <!-- Average vendor rating — stacked bar chart -->
        <div class="border-border/70 bg-card overflow-hidden rounded-xl border shadow-xs">
          <div class="border-border/60 flex items-start justify-between border-b px-5 py-4">
            <div>
              <h2 class="text-sm font-semibold">Average vendor rating</h2>
              <p class="text-muted-foreground mt-0.5 text-xs">
                Track how your rating compares to your industry average.
              </p>
            </div>
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground -mr-1">
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

          <UiApexchart type="bar" height="340" :series="barSeries" :options="barOptions" />
        </div>
      </Motion>

      <!-- Vendor movements section header -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.26, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h2 class="text-lg font-bold tracking-tight">Vendor movements</h2>
          <p class="text-muted-foreground mt-0.5 text-sm">
            Keep track of vendors and their security ratings.
          </p>
        </div>

        <!-- Search input (desktop) -->
        <div class="relative hidden w-64 sm:block">
          <Icon
            name="heroicons:magnifying-glass"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <input
            v-model="tableSearch"
            type="text"
            placeholder="Search"
            class="border-border/70 bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-lg border pr-12 pl-9 text-sm shadow-xs transition-colors focus:ring-1 focus:outline-none"
          />
          <div class="absolute top-1/2 right-2.5 -translate-y-1/2">
            <UiKbd class="text-[10px]">⌘K</UiKbd>
          </div>
        </div>
      </Motion>

      <!-- Mobile: search + filters row -->
      <Motion
        :initial="{ opacity: 0, y: 4 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.3, ease: 'easeOut' }"
        class="flex flex-col gap-2 sm:hidden"
      >
        <div class="relative">
          <Icon
            name="heroicons:magnifying-glass"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <input
            v-model="tableSearch"
            type="text"
            placeholder="Search"
            class="border-border/70 bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary h-9 w-full rounded-lg border pr-12 pl-9 text-sm shadow-xs transition-colors focus:ring-1 focus:outline-none"
          />
          <div class="absolute top-1/2 right-2.5 -translate-y-1/2">
            <UiKbd class="text-[10px]">⌘K</UiKbd>
          </div>
        </div>
        <UiButton variant="outline" size="sm" class="w-full gap-2">
          <Icon name="heroicons:adjustments-horizontal" class="size-4" />
          Filters
        </UiButton>
      </Motion>

      <!-- Vendor table -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.33, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
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
                <!-- Status badge with dot -->
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

                <!-- Category tags (up to 2 visible) -->
                <span
                  v-for="cat in row.original.categories.slice(0, 2)"
                  :key="cat"
                  class="border-border/60 bg-card text-foreground rounded-full border px-2 py-0.5 text-xs font-medium"
                >
                  {{ cat }}
                </span>

                <!-- Overflow count -->
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
                class="border-border/60 flex w-full flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p class="text-muted-foreground shrink-0 text-sm">
                  <template v-if="table.getFilteredSelectedRowModel().rows.length > 0">
                    {{ table.getFilteredSelectedRowModel().rows.length }} selected
                  </template>
                </p>

                <!-- Desktop pagination -->
                <UiPagination
                  class="mx-0! hidden! justify-end! sm:flex!"
                  :total="filteredVendors.length"
                  :items-per-page="10"
                  :sibling-count="1"
                  :page="table.atoms.pagination.get().pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList class="w-full justify-between gap-1">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="sm">
                        <Icon name="heroicons:chevron-left" class="size-4" />
                        Previous
                      </UiButton>
                    </UiPaginationPrev>
                    <div class="text-muted-foreground text-sm">
                      Page
                      <span class="text-foreground font-medium">{{
                        table.atoms.pagination.get().pageIndex + 1
                      }}</span>
                      of
                      <span class="text-foreground font-medium">{{ table.getPageCount() }}</span>
                    </div>
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
                  :page="table.atoms.pagination.get().pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList class="w-full justify-between">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="icon-sm">
                        <Icon name="heroicons:arrow-left" class="size-4" />
                      </UiButton>
                    </UiPaginationPrev>
                    <span class="text-muted-foreground text-sm">
                      Page {{ table.atoms.pagination.get().pageIndex + 1 }} of
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
  import { object, string } from "yup";
  import type { InferType } from "yup";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

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

  // ─── Radar chart (Vendor breakdown) ───────────────────────────────────────────
  const radarSeries = [
    { name: "2025", data: [850, 750, 620, 380, 480, 420, 680] },
    { name: "2024", data: [680, 900, 480, 340, 320, 370, 560] },
    { name: "2023", data: [580, 620, 730, 480, 430, 580, 480] },
  ];

  const radarOptions: ApexOptions = {
    chart: {
      type: "radar",
      background: "transparent",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ["#0ea5e9", "#f43f5e", "#a78bfa"],
    fill: { opacity: 0.15 },
    stroke: { width: 2 },
    markers: { size: 0 },
    xaxis: {
      categories: ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5", "Tier 6", "Tier 7"],
    },
    yaxis: { show: true, tickAmount: 4, min: 0, max: 1000 },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
    },
    tooltip: { y: { formatter: (v: number) => v.toLocaleString() } },
  };

  // ─── Stacked bar chart (Average vendor rating) ─────────────────────────────────
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

  const barSeries = [
    { name: "Your rating", data: [58, 55, 64, 56, 62, 62, 54, 58, 60, 62, 64, 60] },
    { name: "Industry Average", data: [24, 22, 16, 22, 18, 18, 22, 18, 16, 16, 20, 14] },
  ];

  const barOptions: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      background: "transparent",
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    colors: ["var(--primary)", "#cbd5e1"],
    plotOptions: {
      bar: { borderRadius: 2, columnWidth: "55%", borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
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
    grid: {
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 8, right: 8 },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      markers: { size: 7, shape: "circle" },
    },
    tooltip: {
      y: { formatter: (v: number) => `${v} / 100` },
    },
  };

  // ─── Vendor table ───────────────────────────────────────────────────────────────
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
    faker.seed(i + 800);
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
      categories: shuffled.slice(0, catCount),
    };
  };

  const { data: vendorsData, pending: vendorsPending } = await useAsyncData<VendorRow[]>(
    "block-dashboards8-vendors",
    async () => Array.from({ length: 100 }, (_, i) => createVendor(i)),
    { default: () => [] }
  );

  const vendors = computed(() => vendorsData.value ?? []);

  const tableSearch = ref("");

  const filteredVendors = computed(() => {
    const q = tableSearch.value.trim().toLowerCase();
    if (!q) return vendors.value;
    return vendors.value.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.domain.toLowerCase().includes(q) ||
        v.status.toLowerCase().includes(q) ||
        v.categories.some((c) => c.toLowerCase().includes(q))
    );
  });

  // ─── Table columns ──────────────────────────────────────────────────────────────
  const vendorColumns: ColumnDef<TanStackTableFeatures, VendorRow>[] = [
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

  // ─── Edit sheet (vee-validate) ──────────────────────────────────────────────────
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
    setValues({
      editName: vendor.name,
      editDomain: vendor.domain,
      editStatus: vendor.status,
    });
    editOpen.value = true;
  };

  // ─── Delete dialog ───────────────────────────────────────────────────────────────
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
