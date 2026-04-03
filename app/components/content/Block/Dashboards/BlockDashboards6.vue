<template>
  <div
    class="min-h-screen bg-background text-foreground [--color-primary:#0ea5e9] [--primary:#0ea5e9] [--radius:12px] [--ring:#0ea5e9]"
  >
    <!-- Import CSV dialog -->
    <UiDialog v-model:open="importOpen">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Import customers</UiDialogTitle>
          <UiDialogDescription>
            Upload a CSV file to import customers in bulk. The file must include columns for company
            name, domain, and status.
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="space-y-4 py-2">
          <!-- Drop zone -->
          <label
            class="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border/70 bg-muted/30 px-6 py-10 text-center transition-colors hover:bg-muted/50"
            :class="{ 'border-[--color-primary] bg-sky-50/50 dark:bg-sky-950/20': importDragOver }"
            @dragover.prevent="importDragOver = true"
            @dragleave.prevent="importDragOver = false"
            @drop.prevent="onImportDrop"
          >
            <div
              class="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"
            >
              <Icon name="heroicons:arrow-up-tray" class="size-6" />
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium">
                <span class="text-[--color-primary]">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-muted-foreground">CSV files only, up to 10 MB</p>
            </div>
            <input type="file" accept=".csv" class="sr-only" @change="onImportFileChange" />
          </label>

          <!-- Selected file -->
          <div
            v-if="importFile"
            class="flex items-center gap-3 rounded-lg border border-border/70 bg-card px-4 py-3"
          >
            <Icon name="heroicons:document-text" class="size-5 shrink-0 text-[--color-primary]" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ importFile.name }}</p>
              <p class="text-xs text-muted-foreground">
                {{ (importFile.size / 1024).toFixed(1) }} KB
              </p>
            </div>
            <UiButton
              variant="ghost"
              size="icon-sm"
              class="shrink-0 text-muted-foreground"
              @click="importFile = null"
            >
              <Icon name="heroicons:x-mark" class="size-4" />
            </UiButton>
          </div>

          <!-- Download template link -->
          <p class="text-center text-xs text-muted-foreground">
            Not sure about the format?
            <button class="font-medium text-[--color-primary] underline-offset-2 hover:underline">
              Download template
            </button>
          </p>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="importOpen = false">Cancel</UiButton>
          <UiButton :disabled="!importFile" @click="onImportSubmit">
            <Icon name="heroicons:arrow-up-tray" class="size-4" />
            Import customers
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- Add customer sheet -->
    <UiSheet v-model:open="addOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Add customer"
        description="Fill in the details below to add a new customer."
      >
        <template #content>
          <form class="space-y-5 px-6" @submit="submitAdd">
            <fieldset :disabled="isSubmittingAdd" class="space-y-5">
              <UiVeeInput required label="Company name" name="addName" placeholder="Acme Corp" />
              <UiVeeInput required label="Domain" name="addDomain" placeholder="acme.com" />
              <UiVeeInput
                label="About / product"
                name="addProduct"
                placeholder="e.g. Project management tool"
              />
              <UiVeeSelect required label="Status" name="addStatus">
                <option disabled>Select an option</option>
                <option value="Customer">Customer</option>
                <option value="Churned">Churned</option>
              </UiVeeSelect>
              <UiVeeInput
                label="Number of users"
                name="addUsers"
                type="number"
                placeholder="e.g. 10"
              />
            </fieldset>
          </form>
        </template>
        <template #footer>
          <UiSheetFooter class="px-6 pb-6">
            <UiSheetClose as-child>
              <UiButton variant="outline" class="w-full">Cancel</UiButton>
            </UiSheetClose>
            <UiButton class="w-full" :disabled="isSubmittingAdd" @click="submitAdd">
              Add customer
            </UiButton>
          </UiSheetFooter>
        </template>
      </UiSheetContent>
    </UiSheet>

    <!-- Edit company sheet -->
    <UiSheet v-model:open="editOpen">
      <UiSheetContent
        side="right"
        variant="floating"
        translucent
        title="Edit customer"
        description="Update the customer's details below."
      >
        <template #content>
          <form class="space-y-5 px-6" @submit="submitEdit">
            <fieldset :disabled="isSubmittingEdit" class="space-y-5">
              <UiVeeInput required label="Company name" name="editName" placeholder="Acme Corp" />
              <UiVeeInput required label="Domain" name="editDomain" placeholder="acme.com" />
              <UiVeeSelect required label="Status" name="editStatus">
                <option disabled>Select an option</option>
                <option value="Customer">Customer</option>
                <option value="Churned">Churned</option>
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

    <!-- Command / search dialog -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search customers"
      description="Search by company name, domain, or product"
    >
      <UiCommandInput placeholder="Search customers..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick actions">
          <UiCommandItem value="Add customer">
            <Icon name="heroicons:plus" />
            <span>Add customer</span>
          </UiCommandItem>
          <UiCommandItem value="Import customers">
            <Icon name="heroicons:arrow-up-tray" />
            <span>Import customers</span>
          </UiCommandItem>
          <UiCommandItem value="Export list">
            <Icon name="heroicons:arrow-down-tray" />
            <span>Export list</span>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Filter by status">
          <UiCommandItem value="Customers only">
            <Icon name="heroicons:check-circle" />
            <span>Customers only</span>
          </UiCommandItem>
          <UiCommandItem value="Churned only">
            <Icon name="heroicons:x-circle" />
            <span>Churned only</span>
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
      <div
        class="flex items-center gap-5 border-t border-border/70 bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground"
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
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="rounded-full"
                aria-label="Open search"
                @click="searchOpen = true"
              >
                <Icon name="heroicons:magnifying-glass" class="size-5 text-muted-foreground" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Search</p></UiTooltipContent>
          </UiTooltip>

          <!-- Settings dropdown -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiTooltipTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                    <Icon name="heroicons:cog-6-tooth" class="size-5 text-muted-foreground" />
                  </UiButton>
                </UiTooltipTrigger>
              </UiDropdownMenuTrigger>
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

          <!-- Notifications dropdown -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiTooltipTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                    <Icon name="heroicons:bell" class="size-5 text-muted-foreground" />
                  </UiButton>
                </UiTooltipTrigger>
              </UiDropdownMenuTrigger>
              <UiTooltipContent><p>Notifications</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-96">
                <UiDropdownMenuLabel class="flex items-center justify-between">
                  <span>Notifications</span>
                  <UiBadge variant="secondary" size="sm">2 new</UiBadge>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user-plus" title="Ephemeral signed a new plan">
                  <template #shortcut>1h ago</template>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  icon="heroicons:arrow-trending-up"
                  title="Customer growth up 12% this week"
                >
                  <template #shortcut>3h ago</template>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <!-- User avatar dropdown -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiTooltipTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                    <UiAvatar
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Current user"
                      fallback="SH"
                      class="size-8 cursor-pointer"
                    />
                  </UiButton>
                </UiTooltipTrigger>
              </UiDropdownMenuTrigger>
              <UiTooltipContent><p>Account</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-52">
                <UiDropdownMenuLabel>
                  <div class="flex flex-col">
                    <p class="text-sm font-medium">Sienna Hewitt</p>
                    <p class="text-xs text-muted-foreground">sienna@ui-thing.com</p>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
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
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <h1 class="text-2xl font-bold tracking-tight">Customers</h1>
        <div class="flex items-center gap-3">
          <UiButton variant="outline" size="sm" @click="importOpen = true">
            <Icon name="heroicons:arrow-up-tray" class="size-4" />
            Import
          </UiButton>
          <UiButton size="sm" @click="addOpen = true">
            <Icon name="heroicons:plus" class="size-4" />
            Add customer
          </UiButton>
        </div>
      </Motion>

      <!-- Two-column charts row -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
        class="grid gap-4 lg:grid-cols-[1fr_2fr]"
      >
        <!-- Active now — radial rings card -->
        <div class="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs">
          <div class="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <h2 class="text-sm font-semibold">Active now</h2>
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="-mr-1 text-muted-foreground">
                      <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem icon="heroicons:arrow-path" title="Refresh" />
                  <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Export" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
              <UiTooltipContent><p>Options</p></UiTooltipContent>
            </UiTooltip>
          </div>
          <div class="p-2">
            <UiApexchart
              type="radialBar"
              height="280"
              :series="radialSeries"
              :options="radialOptions"
            />
          </div>
        </div>

        <!-- Total customers — multi-line chart card -->
        <div class="overflow-hidden rounded-xl border border-border/70 bg-card shadow-xs">
          <div class="flex items-center justify-between border-b border-border/60 px-5 py-4">
            <h2 class="text-sm font-semibold">Total customers</h2>
            <UiTooltip>
              <UiDropdownMenu>
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="-mr-1 text-muted-foreground">
                      <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                </UiTooltipTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem icon="heroicons:arrow-path" title="Refresh" />
                  <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Export" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
              <UiTooltipContent><p>Options</p></UiTooltipContent>
            </UiTooltip>
          </div>
          <UiApexchart type="area" height="280" :series="lineSeries" :options="lineOptions" />
        </div>
      </Motion>

      <!-- Filters + search row -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.3, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Filter chips -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="chip in activeFilters"
            :key="chip.label"
            class="flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted/60"
            @click="removeFilter(chip.label)"
          >
            {{ chip.label }}
            <Icon name="heroicons:x-mark" class="size-3.5 text-muted-foreground" />
          </button>
          <UiButton variant="outline" size="sm" class="h-7 rounded-full text-xs">
            <Icon name="heroicons:funnel" class="size-3.5" />
            More filters
          </UiButton>
        </div>

        <!-- Search input (filters table) -->
        <div class="relative w-full sm:w-64">
          <Icon
            name="heroicons:magnifying-glass"
            class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <input
            v-model="tableSearch"
            type="text"
            placeholder="Search customers..."
            class="h-9 w-full rounded-lg border border-border/70 bg-card pr-3 pl-9 text-sm text-foreground shadow-xs transition-colors placeholder:text-muted-foreground focus:border-[--color-primary] focus:ring-1 focus:ring-[--color-primary] focus:outline-none"
          />
        </div>
      </Motion>

      <!-- Customers table card -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.35, ease: 'easeOut' }"
      >
        <UiCard class="gap-0 overflow-hidden border-border/70 py-0 shadow-xs">
          <UiTanStackTable
            :data="filteredCompanies"
            :columns="companyColumns"
            :show-rows-per-page="false"
            :show-page-info="false"
            :show-pagination="false"
            :show-selected-count="false"
            :show-footer="true"
            :loading="companiesPending"
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

            <!-- Company cell: logo + name + domain -->
            <template #company-cell="{ row }">
              <div class="flex items-center gap-3">
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  :style="{ backgroundColor: row.original.logoColor }"
                >
                  {{ row.original.logoInitial }}
                </div>
                <div class="flex min-w-0 flex-col">
                  <span class="truncate text-sm font-medium">{{ row.original.name }}</span>
                  <span class="truncate text-xs text-muted-foreground">{{
                    row.original.domain
                  }}</span>
                </div>
              </div>
            </template>

            <!-- Status cell -->
            <template #status-cell="{ row }">
              <UiBadge
                v-if="row.original.status === 'Customer'"
                variant="outline"
                class="rounded-full border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
              >
                {{ row.original.status }}
              </UiBadge>
              <span v-else class="text-sm text-muted-foreground">{{ row.original.status }}</span>
            </template>

            <!-- About cell: product + description -->
            <template #about-cell="{ row }">
              <div class="flex min-w-0 flex-col">
                <span class="truncate text-sm font-medium">{{ row.original.aboutProduct }}</span>
                <span class="truncate text-xs text-muted-foreground">{{
                  row.original.aboutDescription
                }}</span>
              </div>
            </template>

            <!-- Users cell: avatar group -->
            <template #users-cell="{ row }">
              <div class="flex items-center">
                <div class="flex -space-x-2">
                  <UiAvatar
                    v-for="(url, i) in row.original.userAvatars"
                    :key="i"
                    :src="url"
                    :alt="`User ${i + 1}`"
                    fallback="U"
                    class="size-7 shrink-0 ring-2 ring-background"
                  />
                </div>
                <span class="ml-1.5 text-xs text-muted-foreground">+5</span>
              </div>
            </template>

            <!-- License use cell: progress bar + value -->
            <template #licenseUse-cell="{ row }">
              <div class="flex w-28 flex-col gap-1.5">
                <span class="text-xs text-muted-foreground">{{ row.original.licenseUse }}%</span>
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    class="h-full rounded-full"
                    :style="{
                      width: `${row.original.licenseUse}%`,
                      backgroundColor: 'var(--color-primary)',
                    }"
                  />
                </div>
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
                      aria-label="Delete customer"
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
                  <UiTooltipContent><p>Delete customer</p></UiTooltipContent>
                </UiTooltip>
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="text-muted-foreground"
                      aria-label="Edit customer"
                      @click="openEdit(row.original)"
                    >
                      <Icon name="heroicons:pencil" class="size-4" />
                    </UiButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Edit customer</p></UiTooltipContent>
                </UiTooltip>
              </div>
            </template>

            <!-- Footer with pagination -->
            <template #footer="{ table }">
              <div
                class="flex w-full flex-col gap-3 border-t border-border/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <p class="shrink-0 text-sm text-muted-foreground">
                  <template v-if="table.getFilteredSelectedRowModel().rows.length > 0">
                    {{ table.getFilteredSelectedRowModel().rows.length }} selected
                  </template>
                </p>

                <!-- Desktop pagination -->
                <UiPagination
                  class="mx-0! hidden! justify-end! sm:flex!"
                  :total="filteredCompanies.length"
                  :items-per-page="10"
                  :sibling-count="1"
                  :page="table.getState().pagination.pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList class="w-full justify-between gap-1">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="sm">
                        <Icon name="heroicons:chevron-left" class="size-4" />
                        Previous
                      </UiButton>
                    </UiPaginationPrev>
                    <div class="text-sm text-muted-foreground">
                      Page
                      <span class="font-medium text-foreground">{{
                        table.getState().pagination.pageIndex + 1
                      }}</span>
                      of
                      <span class="font-medium text-foreground">{{ table.getPageCount() }}</span>
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
                  :total="filteredCompanies.length"
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
                    <span class="text-sm text-muted-foreground">
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
  import { object, string } from "yup";
  import type { InferType } from "yup";

  // ─── Navigation ────────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Customers", active: true },
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

  // ─── Filter chips ──────────────────────────────────────────────────────────────
  const activeFilters = ref([{ label: "All time" }, { label: "US, AU, +4" }]);
  const removeFilter = (label: string) => {
    activeFilters.value = activeFilters.value.filter((f) => f.label !== label);
  };

  // ─── Radial chart (Active now) ─────────────────────────────────────────────────
  // Three concentric rings representing engagement tiers across 2025, 2024, 2023
  const radialSeries = [78, 54, 38];

  const radialOptions: ApexOptions = {
    chart: { type: "radialBar", background: "transparent", parentHeightOffset: 0 },
    stroke: { lineCap: "round" },
    colors: ["#0ea5e9", "#38bdf8", "#7dd3fc"],
    plotOptions: {
      radialBar: {
        hollow: { size: "42%", background: "transparent", margin: 0 },
        track: { background: "transparent", margin: 6 },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "11px",
            offsetY: 24,
          },
          value: {
            show: true,
            fontSize: "30px",
            fontWeight: "700",
            offsetY: -8,
          },
          total: {
            show: true,
            label: "Active users",
            formatter: () => "316",
          },
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
    },
    labels: ["2025", "2024", "2023"],
    states: { hover: { filter: { type: "none" } }, active: { filter: { type: "none" } } },
  };

  // ─── Line chart (Total customers) ─────────────────────────────────────────────
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
    { name: "2025", data: [320, 380, 410, 460, 520, 590, 640, 700, 780, 850, 920, 1010] },
    { name: "2024", data: [200, 240, 260, 295, 330, 370, 395, 430, 470, 510, 550, 590] },
    { name: "2023", data: [120, 145, 158, 175, 195, 220, 235, 255, 275, 295, 315, 340] },
  ];

  const lineOptions: ApexOptions = {
    chart: { type: "area", background: "transparent", parentHeightOffset: 0 },
    stroke: { width: [2, 1.5, 1.5], dashArray: [0, 6, 3] },
    colors: ["#0ea5e9", "#38bdf8", "#7dd3fc"],
    fill: {
      type: ["gradient", "solid", "solid"],
      gradient: {
        type: "vertical",
        gradientToColors: ["#0ea5e9"],
        shadeIntensity: 0,
        opacityFrom: 0.15,
        opacityTo: 0,
        stops: [0, 100],
      },
      opacity: [1, 0, 0],
    },
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
    },
    yaxis: {
      labels: {
        formatter: (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)),
      },
    },
    tooltip: { y: { formatter: (v: number) => `${v.toLocaleString()} customers` } },
    markers: { size: 0, hover: { size: 5 } },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      markers: { size: 6, shape: "circle" },
    },
  };

  // ─── Company table ─────────────────────────────────────────────────────────────
  type CompanyRow = {
    id: number;
    name: string;
    domain: string;
    logoColor: string;
    logoInitial: string;
    status: "Customer" | "Churned";
    aboutProduct: string;
    aboutDescription: string;
    userAvatars: string[];
    licenseUse: number;
  };

  const logoColors = [
    "#0ea5e9",
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#8b5cf6",
    "#84cc16",
  ];

  const createCompany = (i: number): CompanyRow => {
    faker.seed(i + 200);
    const name = faker.company.name();
    const domain = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 12)}.com`;
    const status: "Customer" | "Churned" = i % 5 === 1 ? "Churned" : "Customer";
    const logoColor = logoColors[i % logoColors.length]!;
    const logoInitial = name[0]?.toUpperCase() ?? "C";
    const userAvatars = Array.from(
      { length: 3 },
      (_, j) => `https://i.pravatar.cc/150?img=${((i * 3 + j) % 70) + 1}`
    );
    const licenseUse = faker.number.int({ min: 15, max: 95 });
    const aboutProduct = faker.commerce.productName();
    const aboutDescription = faker.commerce.productDescription().slice(0, 48);
    return {
      id: i + 1,
      name,
      domain,
      logoColor,
      logoInitial,
      status,
      aboutProduct,
      aboutDescription,
      userAvatars,
      licenseUse,
    };
  };

  const { data: companiesData, pending: companiesPending } = await useAsyncData<CompanyRow[]>(
    "block-dashboards6-companies",
    async () => Array.from({ length: 100 }, (_, i) => createCompany(i)),
    { default: () => [] }
  );

  const companies = computed(() => companiesData.value ?? []);

  const tableSearch = ref("");

  const filteredCompanies = computed(() => {
    const q = tableSearch.value.trim().toLowerCase();
    if (!q) return companies.value;
    return companies.value.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.aboutProduct.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q)
    );
  });

  // ─── Table columns ─────────────────────────────────────────────────────────────
  const companyColumns: ColumnDef<CompanyRow>[] = [
    {
      id: "select",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-12", td: "w-12" } },
    },
    {
      id: "company",
      accessorKey: "name",
      header: "Company",
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "about",
      accessorKey: "aboutProduct",
      header: "About",
      enableSorting: false,
      meta: { class: { th: "hidden md:table-cell", td: "hidden md:table-cell" } },
    },
    {
      id: "users",
      accessorKey: "userAvatars",
      header: "Users",
      enableSorting: false,
      meta: { class: { th: "hidden lg:table-cell", td: "hidden lg:table-cell" } },
    },
    {
      id: "licenseUse",
      accessorKey: "licenseUse",
      header: "License use",
      enableSorting: false,
      meta: { class: { th: "hidden lg:table-cell w-36", td: "hidden lg:table-cell w-36" } },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: { class: { th: "w-20", td: "w-20" } },
    },
  ];

  // ─── Add customer sheet (vee-validate) ────────────────────────────────────────
  const addOpen = ref(false);

  const AddSchema = object({
    addName: string().required().label("Company name").min(2).max(100),
    addDomain: string().required().label("Domain").min(3).max(80),
    addProduct: string().optional().label("About / product").max(120),
    addStatus: string().required().label("Status"),
    addUsers: string().optional().label("Number of users"),
  });

  const {
    handleSubmit: handleAddSubmit,
    isSubmitting: isSubmittingAdd,
    resetForm: resetAddForm,
    controlledValues: addControlledValues,
  } = useForm({ name: "addForm", validationSchema: toTypedSchema(AddSchema) });

  const submitAdd = handleAddSubmit(() => {
    addOpen.value = false;
    useSonner("Customer added", {
      description: `'${addControlledValues.value.addName}' has been added.`,
    });
    resetAddForm();
  });

  // ─── Edit sheet (vee-validate) ─────────────────────────────────────────────────
  const editOpen = ref(false);
  const editTarget = ref<CompanyRow | null>(null);

  const EditSchema = object({
    editName: string().required().label("Company name").min(2).max(100),
    editDomain: string().required().label("Domain").min(3).max(80),
    editStatus: string().required().label("Status"),
  });

  const {
    handleSubmit: handleEditSubmit,
    isSubmitting: isSubmittingEdit,
    setValues,
  } = useForm<InferType<typeof EditSchema>>({
    validationSchema: EditSchema,
  });

  const submitEdit = handleEditSubmit(() => {
    editOpen.value = false;
    useSonner("Customer updated", {
      description: `'${editTarget.value?.name}' has been saved.`,
    });
  });

  const openEdit = (company: CompanyRow) => {
    editTarget.value = company;
    setValues({
      editName: company.name,
      editDomain: company.domain,
      editStatus: company.status,
    });
    editOpen.value = true;
  };

  // ─── Import CSV dialog ─────────────────────────────────────────────────────────
  const importOpen = ref(false);
  const importFile = ref<File | null>(null);
  const importDragOver = ref(false);

  const onImportFileChange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) importFile.value = file;
  };

  const onImportDrop = (e: DragEvent) => {
    importDragOver.value = false;
    const file = e.dataTransfer?.files?.[0];
    if (file && file.name.endsWith(".csv")) importFile.value = file;
  };

  const onImportSubmit = () => {
    if (!importFile.value) return;
    importOpen.value = false;
    useSonner("Import started", {
      description: `'${importFile.value.name}' is being processed.`,
    });
    importFile.value = null;
  };

  // ─── Delete dialog ─────────────────────────────────────────────────────────────
  const deleteOpen = ref(false);
  const deleteTarget = ref<CompanyRow | null>(null);

  const confirmDelete = () => {
    if (!deleteTarget.value) return;
    useSonner(`'${deleteTarget.value.name}' removed`, {
      description: "The customer has been permanently removed.",
    });
    deleteTarget.value = null;
  };
</script>
