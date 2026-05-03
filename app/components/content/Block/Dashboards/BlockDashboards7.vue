<template>
  <div class="bg-background text-foreground min-h-screen">
    <!-- Upgrade plan dialog -->
    <UiDialog v-model:open="upgradeOpen">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader class="text-center sm:text-center">
          <div
            class="mx-auto mb-3 flex size-12 items-center justify-center rounded-full"
            :style="{ backgroundColor: 'var(--color-primary)' }"
          >
            <Icon name="heroicons:bolt" class="size-6 text-white" />
          </div>
          <UiDialogTitle class="text-xl">Upgrade to Pro</UiDialogTitle>
          <UiDialogDescription>
            Unlock unlimited customers, advanced analytics, and priority support.
          </UiDialogDescription>
        </UiDialogHeader>

        <div class="space-y-3 py-2">
          <!-- Plan cards (radio-style) -->
          <div class="grid grid-cols-2 gap-3">
            <!-- Free -->
            <button
              type="button"
              class="relative cursor-pointer rounded-xl border-2 p-4 text-left transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              :class="
                selectedPlan === 'free'
                  ? 'border-foreground bg-card shadow-sm'
                  : 'border-border/60 bg-muted/30 hover:border-border hover:bg-muted/50'
              "
              :style="
                selectedPlan === 'free'
                  ? { borderColor: 'var(--color-primary)', outline: 'none' }
                  : {}
              "
              @click="selectedPlan = 'free'"
            >
              <!-- Selected check -->
              <div
                class="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full border-2 transition-colors"
                :style="
                  selectedPlan === 'free'
                    ? {
                        borderColor: 'var(--color-primary)',
                        backgroundColor: 'var(--color-primary)',
                      }
                    : { borderColor: 'var(--border)' }
                "
              >
                <Icon
                  v-if="selectedPlan === 'free'"
                  name="heroicons:check"
                  class="size-3 text-white"
                />
              </div>

              <p class="text-muted-foreground pr-6 text-xs font-semibold tracking-wider uppercase">
                Free
              </p>
              <p class="mt-2 text-2xl font-bold">$0<span class="text-sm font-normal">/mo</span></p>
              <ul class="text-muted-foreground mt-3 space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:check" class="size-4 shrink-0 text-emerald-500" />
                  Up to 250 customers
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:check" class="size-4 shrink-0 text-emerald-500" />
                  Basic analytics
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:x-mark" class="text-muted-foreground/40 size-4 shrink-0" />
                  CSV import
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:x-mark" class="text-muted-foreground/40 size-4 shrink-0" />
                  Priority support
                </li>
              </ul>
            </button>

            <!-- Pro -->
            <button
              type="button"
              class="relative cursor-pointer rounded-xl border-2 p-4 text-left transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              :class="
                selectedPlan === 'pro'
                  ? 'bg-card shadow-sm'
                  : 'border-border/60 bg-muted/30 hover:border-border hover:bg-muted/50'
              "
              :style="selectedPlan === 'pro' ? { borderColor: 'var(--color-primary)' } : {}"
              @click="selectedPlan = 'pro'"
            >
              <!-- Selected check -->
              <div
                class="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full border-2 transition-colors"
                :style="
                  selectedPlan === 'pro'
                    ? {
                        borderColor: 'var(--color-primary)',
                        backgroundColor: 'var(--color-primary)',
                      }
                    : { borderColor: 'var(--border)' }
                "
              >
                <Icon
                  v-if="selectedPlan === 'pro'"
                  name="heroicons:check"
                  class="size-3 text-white"
                />
              </div>

              <p
                class="pr-6 text-xs font-semibold tracking-wider uppercase"
                :style="{ color: 'var(--color-primary)' }"
              >
                Pro
              </p>
              <p class="mt-2 text-2xl font-bold">$29<span class="text-sm font-normal">/mo</span></p>
              <ul class="mt-3 space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:check" class="size-4 shrink-0 text-emerald-500" />
                  Unlimited customers
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:check" class="size-4 shrink-0 text-emerald-500" />
                  Advanced analytics
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:check" class="size-4 shrink-0 text-emerald-500" />
                  CSV import &amp; export
                </li>
                <li class="flex items-center gap-2">
                  <Icon name="heroicons:check" class="size-4 shrink-0 text-emerald-500" />
                  Priority support
                </li>
              </ul>
            </button>
          </div>

          <p class="text-muted-foreground text-center text-xs">
            No credit card required. Cancel anytime.
          </p>
        </div>

        <UiDialogFooter class="flex-col gap-2 sm:flex-col">
          <UiButton v-if="selectedPlan === 'pro'" class="w-full gap-2" @click="upgradeOpen = false">
            <Icon name="heroicons:bolt" class="size-4" />
            Upgrade to Pro — $29/mo
          </UiButton>
          <UiButton v-else variant="outline" class="w-full" @click="upgradeOpen = false">
            Continue with Free
          </UiButton>
          <UiButton variant="ghost" class="w-full" @click="upgradeOpen = false">
            Maybe later
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

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
          <label
            class="border-border/70 bg-muted/30 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors"
            :class="{ 'border-[--color-primary] bg-sky-50/50 dark:bg-sky-950/20': importDragOver }"
            @dragover.prevent="importDragOver = true"
            @dragleave.prevent="importDragOver = false"
            @drop.prevent="onImportDrop"
          >
            <div
              class="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full"
            >
              <Icon name="heroicons:arrow-up-tray" class="size-6" />
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium">
                <span class="text-[--color-primary]">Click to upload</span> or drag and drop
              </p>
              <p class="text-muted-foreground text-xs">CSV files only, up to 10 MB</p>
            </div>
            <input type="file" accept=".csv" class="sr-only" @change="onImportFileChange" />
          </label>

          <div
            v-if="importFile"
            class="border-border/70 bg-card flex items-center gap-3 rounded-lg border px-4 py-3"
          >
            <Icon name="heroicons:document-text" class="size-5 shrink-0 text-[--color-primary]" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ importFile.name }}</p>
              <p class="text-muted-foreground text-xs">
                {{ (importFile.size / 1024).toFixed(1) }} KB
              </p>
            </div>
            <UiButton
              variant="ghost"
              size="icon-sm"
              class="text-muted-foreground shrink-0"
              @click="importFile = null"
            >
              <Icon name="heroicons:x-mark" class="size-4" />
            </UiButton>
          </div>

          <p class="text-muted-foreground text-center text-xs">
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

    <!-- Edit customer sheet -->
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
        <div class="flex items-center gap-2">
          <!-- Upgrade now button -->
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <!-- Desktop: icon + label -->
              <UiButton size="sm" class="hidden gap-1.5 sm:flex" @click="upgradeOpen = true">
                <Icon name="heroicons:bolt" class="size-4" />
                Upgrade now
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent class="sm:hidden"><p>Upgrade to Pro</p></UiTooltipContent>
          </UiTooltip>
          <!-- Mobile: icon only -->
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton size="icon-sm" class="sm:hidden" @click="upgradeOpen = true">
                <Icon name="heroicons:bolt" class="size-4" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Upgrade to Pro</p></UiTooltipContent>
          </UiTooltip>

          <div class="flex items-center gap-1">
            <!-- Settings dropdown -->
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

            <!-- Notifications dropdown -->
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
                    icon="heroicons:user-plus"
                    title="Ephemeral signed a new plan"
                  >
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
                <UiTooltipTrigger as-child>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                      <UiAvatar
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Olivia Rhye"
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
        </div>
      </UiContainer>
    </Motion>

    <!-- Secondary tab nav -->
    <Motion
      :initial="{ opacity: 0, y: -8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, delay: 0.05, ease: 'easeOut' }"
      class="border-border/70 bg-background border-b"
    >
      <UiContainer class="flex items-center justify-between gap-4 py-0">
        <!-- Tabs (desktop) -->
        <div class="hidden items-center gap-0.5 overflow-x-auto sm:flex">
          <button
            v-for="tab in secondaryTabs"
            :key="tab.label"
            class="relative shrink-0 px-3 py-3.5 text-sm font-medium transition-colors"
            :class="
              tab.active
                ? 'text-foreground after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5'
                : 'text-muted-foreground hover:text-foreground'
            "
            @click="setActiveTab(tab.label)"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Mobile tab selector -->
        <UiPopover class="sm:hidden">
          <UiPopoverTrigger as-child>
            <UiButton variant="ghost" size="sm" class="gap-1.5 text-sm font-medium sm:hidden">
              {{ activeTabLabel }}
              <Icon name="heroicons:chevron-down" class="text-muted-foreground size-4" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent align="start" class="w-52 p-1">
            <UiButton
              v-for="tab in secondaryTabs"
              :key="tab.label"
              variant="ghost"
              size="sm"
              class="w-full justify-start"
              :class="tab.active ? 'bg-muted font-semibold' : 'text-muted-foreground'"
              @click="setActiveTab(tab.label)"
            >
              {{ tab.label }}
            </UiButton>
          </UiPopoverContent>
        </UiPopover>

        <!-- ⌘K search button -->
        <UiButton
          variant="outline"
          size="sm"
          class="text-muted-foreground hidden shrink-0 gap-2 sm:flex"
          @click="searchOpen = true"
        >
          <Icon name="heroicons:magnifying-glass" class="size-4" />
          <span class="text-sm">Search...</span>
          <UiKbd class="ml-1">⌘K</UiKbd>
        </UiButton>
      </UiContainer>
    </Motion>

    <!-- Page content -->
    <UiContainer class="space-y-6 py-8">
      <!-- Page header -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Welcome back, Olivia</h1>
          <p class="text-muted-foreground mt-1 text-sm">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
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

      <!-- Stat cards row -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.18, ease: 'easeOut' }"
        class="grid gap-4 sm:grid-cols-3"
      >
        <div
          v-for="stat in statCards"
          :key="stat.label"
          class="border-border/70 bg-card flex flex-col justify-between overflow-hidden rounded-xl border p-5 shadow-xs"
        >
          <!-- Card header -->
          <div class="flex items-center justify-between">
            <p class="text-muted-foreground text-sm font-medium">{{ stat.label }}</p>
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

          <!-- Value + trend -->
          <div class="mt-3 flex items-end justify-between gap-3">
            <div>
              <p class="text-3xl font-bold tracking-tight">{{ stat.value }}</p>
              <div class="mt-1.5 flex items-center gap-1.5">
                <span
                  class="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium"
                  :class="
                    stat.positive
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                  "
                >
                  <Icon
                    :name="
                      stat.positive
                        ? 'heroicons:arrow-trending-up'
                        : 'heroicons:arrow-trending-down'
                    "
                    class="size-3"
                  />
                  {{ stat.trend }}
                </span>
                <span class="text-muted-foreground text-xs">vs last month</span>
              </div>
            </div>

            <!-- Sparkline -->
            <div class="-mr-2 -mb-1 w-28 shrink-0">
              <UiApexchart
                type="line"
                height="56"
                :series="[{ name: stat.label, data: stat.sparkData }]"
                :options="sparklineOptions(stat.positive)"
              />
            </div>
          </div>
        </div>
      </Motion>

      <!-- Filter row -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.26, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Filter chips -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="chip in activeFilters"
            :key="chip.label"
            class="border-border/70 bg-card text-foreground hover:bg-muted/60 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
            @click="removeFilter(chip.label)"
          >
            {{ chip.label }}
            <Icon name="heroicons:x-mark" class="text-muted-foreground size-3.5" />
          </button>
          <UiButton variant="outline" size="sm" class="h-7 rounded-full text-xs">
            <Icon name="heroicons:funnel" class="size-3.5" />
            More filters
          </UiButton>
        </div>

        <!-- Table search -->
        <div class="relative w-full sm:w-64">
          <Icon
            name="heroicons:magnifying-glass"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <input
            v-model="tableSearch"
            type="text"
            placeholder="Search customers..."
            class="border-border/70 bg-card text-foreground placeholder:text-muted-foreground h-9 w-full rounded-lg border pr-3 pl-9 text-sm shadow-xs transition-colors focus:border-[--color-primary] focus:ring-1 focus:ring-[--color-primary] focus:outline-none"
          />
        </div>
      </Motion>

      <!-- Customers table card -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.32, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
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
                  <span class="text-muted-foreground truncate text-xs">{{
                    row.original.domain
                  }}</span>
                </div>
              </div>
            </template>

            <!-- License use cell: progress bar + value -->
            <template #licenseUse-cell="{ row }">
              <div class="flex w-28 flex-col gap-1.5">
                <span class="text-muted-foreground text-xs">{{ row.original.licenseUse }}%</span>
                <div class="bg-muted h-1.5 w-full overflow-hidden rounded-full">
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

            <!-- Status cell -->
            <template #status-cell="{ row }">
              <UiBadge
                v-if="row.original.status === 'Customer'"
                variant="outline"
                class="rounded-full border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
              >
                {{ row.original.status }}
              </UiBadge>
              <span v-else class="text-muted-foreground text-sm">{{ row.original.status }}</span>
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
                    class="ring-background size-7 shrink-0 ring-2"
                  />
                </div>
                <span class="text-muted-foreground ml-1.5 text-xs">+5</span>
              </div>
            </template>

            <!-- About cell: product + description -->
            <template #about-cell="{ row }">
              <div class="flex min-w-0 flex-col">
                <span class="truncate text-sm font-medium">{{ row.original.aboutProduct }}</span>
                <span class="text-muted-foreground truncate text-xs">{{
                  row.original.aboutDescription
                }}</span>
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
                    <div class="text-muted-foreground text-sm">
                      Page
                      <span class="text-foreground font-medium">{{
                        table.getState().pagination.pageIndex + 1
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

  // ─── Secondary tabs ─────────────────────────────────────────────────────────────
  const secondaryTabs = ref([
    { label: "Overview", active: true },
    { label: "Notifications", active: false },
    { label: "Analytics", active: false },
    { label: "Saved reports", active: false },
    { label: "Scheduled reports", active: false },
    { label: "User reports", active: false },
  ]);

  const activeTabLabel = computed(
    () => secondaryTabs.value.find((t) => t.active)?.label ?? "Overview"
  );

  const setActiveTab = (label: string) => {
    secondaryTabs.value = secondaryTabs.value.map((t) => ({ ...t, active: t.label === label }));
  };

  // ─── Upgrade dialog ────────────────────────────────────────────────────────────
  const upgradeOpen = ref(false);
  const selectedPlan = ref<"free" | "pro">("pro");

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

  // ─── Stat cards with sparklines ────────────────────────────────────────────────
  const statCards = [
    {
      label: "Total customers",
      value: "2,420",
      trend: "+40%",
      positive: true,
      sparkData: [18, 22, 19, 25, 30, 28, 35, 32, 40, 38, 45, 48],
    },
    {
      label: "Members",
      value: "1,210",
      trend: "-10%",
      positive: false,
      sparkData: [30, 28, 32, 25, 22, 28, 20, 18, 22, 16, 14, 12],
    },
    {
      label: "Active now",
      value: "316",
      trend: "+20%",
      positive: true,
      sparkData: [10, 14, 12, 18, 16, 22, 20, 26, 24, 28, 30, 32],
    },
  ];

  const sparklineOptions = (positive: boolean): ApexOptions => ({
    chart: {
      type: "line",
      background: "transparent",
      sparkline: { enabled: true },
      parentHeightOffset: 0,
      animations: { enabled: false },
    },
    stroke: { width: 2, curve: "smooth" },
    colors: [positive ? "#10b981" : "#ef4444"],
    markers: {
      size: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
      colors: [positive ? "#10b981" : "#ef4444"],
      strokeWidth: 0,
      hover: { size: 5 },
    },
    tooltip: { enabled: false },
    grid: { show: false },
    xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
  });

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
    faker.seed(i + 700);
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
    "block-dashboards7-companies",
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
      id: "licenseUse",
      accessorKey: "licenseUse",
      header: "License use",
      enableSorting: false,
      meta: { class: { th: "hidden lg:table-cell w-36", td: "hidden lg:table-cell w-36" } },
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "users",
      accessorKey: "userAvatars",
      header: "Users",
      enableSorting: false,
      meta: { class: { th: "hidden lg:table-cell", td: "hidden lg:table-cell" } },
    },
    {
      id: "about",
      accessorKey: "aboutProduct",
      header: "About",
      enableSorting: false,
      meta: { class: { th: "hidden md:table-cell", td: "hidden md:table-cell" } },
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
  } = useForm({ name: "addForm7", validationSchema: toTypedSchema(AddSchema) });

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
