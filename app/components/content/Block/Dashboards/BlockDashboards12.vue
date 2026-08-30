<template>
  <div class="bg-background text-foreground min-h-screen">
    <!-- ─── Add card dialog ─────────────────────────────────────────────────── -->
    <UiDialog v-model:open="addCardOpen" @update:open="onAddCardClose">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Add new card</UiDialogTitle>
          <UiDialogDescription>Enter your card details below.</UiDialogDescription>
        </UiDialogHeader>

        <form @submit="submitAddCard">
          <fieldset :disabled="isAddingCard" class="space-y-4 py-1">
            <UiVeeInput required label="Card label" name="label" placeholder="e.g. Personal Visa" />
            <UiVeeInput
              required
              label="Cardholder name"
              name="holderName"
              placeholder="e.g. SASHA PRYCE"
            />
            <div class="grid grid-cols-2 gap-3">
              <UiVeeInput
                required
                label="Card number"
                name="cardNumber"
                placeholder="1234 1234 1234 1234"
                :maxlength="19"
                @input="formatCardNumber"
              />
              <UiVeeInput
                required
                label="Expiry"
                name="expiry"
                placeholder="06/28"
                :maxlength="5"
                @input="formatExpiry"
              />
            </div>
          </fieldset>

          <UiDialogFooter class="mt-4">
            <UiButton type="button" variant="outline" @click="addCardOpen = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="isAddingCard">Add card</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Filter dialog ──────────────────────────────────────────────────── -->
    <UiDialog v-model:open="filterOpen">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Apply filter</UiDialogTitle>
          <UiDialogDescription
            >Filter transactions by category, account, or amount.</UiDialogDescription
          >
        </UiDialogHeader>

        <div class="space-y-5 py-1">
          <div class="space-y-2.5">
            <p class="text-sm font-medium">Category</p>
            <div class="space-y-2">
              <label
                v-for="cat in filterCategories"
                :key="cat.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`cat-${cat.key}`" v-model:checked="cat.checked" />
                {{ cat.label }}
              </label>
            </div>
          </div>

          <div class="space-y-2.5">
            <p class="text-sm font-medium">Account</p>
            <div class="space-y-2">
              <label
                v-for="acc in filterAccounts"
                :key="acc.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`acc-${acc.key}`" v-model:checked="acc.checked" />
                {{ acc.label }}
              </label>
            </div>
          </div>

          <div class="space-y-2.5">
            <p class="text-sm font-medium">Transaction type</p>
            <div class="space-y-2">
              <label
                v-for="type in filterTypes"
                :key="type.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`type-${type.key}`" v-model:checked="type.checked" />
                {{ type.label }}
              </label>
            </div>
          </div>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="resetFilters">Reset</UiButton>
          <UiButton @click="applyFilters">Apply</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Command dialog ─────────────────────────────────────────────────── -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search transactions and actions"
    >
      <UiCommandInput placeholder="Search transactions, categories…" />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick actions">
          <UiCommandItem
            value="Add card"
            @select="
              () => {
                searchOpen = false;
                addCardOpen = true;
              }
            "
          >
            <Icon name="heroicons:credit-card" /><span>Add new card</span>
          </UiCommandItem>
          <UiCommandItem
            value="Apply filter"
            @select="
              () => {
                searchOpen = false;
                filterOpen = true;
              }
            "
          >
            <Icon name="heroicons:funnel" /><span>Apply filter</span>
          </UiCommandItem>
          <UiCommandItem value="Export transactions" @select="searchOpen = false">
            <Icon name="heroicons:arrow-down-tray" /><span>Export transactions</span>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Transactions">
          <UiCommandItem
            v-for="tx in allTransactions.slice(0, 5)"
            :key="tx.id"
            :value="tx.name"
            @select="searchOpen = false"
          >
            <Icon name="heroicons:banknotes" />
            <span
              >{{ tx.name }} — {{ tx.amount > 0 ? "+" : "" }}${{
                Math.abs(tx.amount).toFixed(2)
              }}</span
            >
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Categories">
          <UiCommandItem
            v-for="cat in categoryOptions"
            :key="cat"
            :value="cat"
            @select="searchOpen = false"
          >
            <Icon name="heroicons:tag" /><span>{{ cat }}</span>
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

    <!-- ─── Sticky header ──────────────────────────────────────────────────── -->
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

          <!-- Mobile menu -->
          <UiTooltip>
            <UiPopover class="lg:hidden">
              <UiTooltipTrigger as-child>
                <UiPopoverTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="lg:hidden">
                    <Icon name="heroicons:bars-3" class="size-5" />
                  </UiButton>
                </UiPopoverTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Menu</p></UiTooltipContent>
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
          </UiTooltip>

          <!-- Desktop nav -->
          <nav class="hidden items-center gap-1 lg:flex">
            <UiButton
              v-for="item in navItems"
              :key="item.label"
              variant="ghost"
              size="sm"
              :class="item.active ? 'bg-muted text-foreground shadow-xs' : 'text-muted-foreground'"
            >
              {{ item.label }}
            </UiButton>
          </nav>
        </div>

        <!-- Right icon actions -->
        <div class="flex items-center gap-1">
          <!-- Search -->
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" @click="searchOpen = true">
                <Icon name="heroicons:magnifying-glass" class="text-muted-foreground size-5" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Search (⌘K)</p></UiTooltipContent>
          </UiTooltip>

          <!-- Settings -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm">
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
                <UiDropdownMenuItem icon="heroicons:bell" title="Notification preferences" />
                <UiDropdownMenuItem icon="heroicons:shield-check" title="Security & privacy" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing & plans" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  variant="destructive"
                  icon="heroicons:arrow-right-on-rectangle"
                  title="Sign out"
                />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <!-- Notifications -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="relative">
                    <Icon name="heroicons:bell" class="text-muted-foreground size-5" />
                    <span
                      class="border-background bg-primary absolute top-1.5 right-1.5 size-2 rounded-full border"
                    />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Notifications</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-96">
                <UiDropdownMenuLabel class="flex items-center justify-between">
                  <span>Notifications</span>
                  <UiBadge variant="secondary" size="sm">3 new</UiBadge>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  icon="heroicons:credit-card"
                  title="New card transaction: -$18.99 Spotify"
                >
                  <template #shortcut>2m ago</template>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  icon="heroicons:arrow-trending-up"
                  title="Balance increased by $88.00"
                >
                  <template #shortcut>1h ago</template>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  icon="heroicons:exclamation-triangle"
                  title="Subscription renewal in 3 days"
                >
                  <template #shortcut>Today</template>
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:check" title="Mark all as read" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <!-- Avatar -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                    <UiAvatar
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Sasha Pryce"
                      fallback="OR"
                      class="size-8 cursor-pointer"
                    />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Account</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-52">
                <UiDropdownMenuLabel>
                  <div class="flex flex-col gap-0.5">
                    <p class="text-sm font-medium">Sasha Pryce</p>
                    <p class="text-muted-foreground text-xs font-normal">sasha@ui-thing.com</p>
                  </div>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
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

    <!-- ─── Page content ───────────────────────────────────────────────────── -->
    <UiContainer class="py-8">
      <div class="grid gap-6 lg:grid-cols-[1fr_440px]">
        <!-- ─── Left: Balance + Transactions ──────────────────────────────── -->
        <Motion
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
          class="border-border/70 bg-card rounded-2xl border shadow-xs"
        >
          <!-- Balance section -->
          <div class="flex flex-col gap-4 p-6 pb-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-muted-foreground text-sm">Your balance</p>
              <p class="mt-1 flex items-center gap-2 text-3xl font-bold tracking-tight">
                <span>🇺🇸</span>
                {{ balanceByTab[activeBalanceTab] }}
              </p>
            </div>
            <!-- Account type tabs -->
            <UiButtonGroup class="self-start">
              <UiButton
                v-for="tab in balanceTabs"
                :key="tab.value"
                variant="outline"
                size="sm"
                :class="
                  activeBalanceTab === tab.value ? 'bg-muted shadow-xs' : 'text-muted-foreground'
                "
                @click="activeBalanceTab = tab.value"
              >
                {{ tab.label }}
              </UiButton>
            </UiButtonGroup>
          </div>

          <!-- Area chart -->
          <div class="px-2">
            <UiApexchart
              :key="activeBalanceTab"
              type="area"
              height="200"
              :series="chartSeries"
              :options="chartOptions"
            />
          </div>

          <!-- Transaction history -->
          <div class="px-6 pt-2 pb-3">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="text-base font-semibold">Transaction history</h2>
              <div class="flex items-center gap-2">
                <!-- Date picker -->
                <UiDatepicker v-model.range="txDateRange">
                  <template #default="{ togglePopover }">
                    <UiTooltip>
                      <UiTooltipTrigger as-child>
                        <UiButton variant="outline" size="sm" class="gap-2" @click="togglePopover">
                          <Icon
                            name="heroicons:calendar-days"
                            class="text-muted-foreground size-4"
                          />
                          <span class="hidden sm:inline">Select dates</span>
                        </UiButton>
                      </UiTooltipTrigger>
                      <UiTooltipContent><p>Select date range</p></UiTooltipContent>
                    </UiTooltip>
                  </template>
                </UiDatepicker>

                <!-- Filter -->
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <UiButton variant="outline" size="sm" class="gap-2" @click="filterOpen = true">
                      <Icon name="heroicons:adjustments-horizontal" class="size-4" />
                      <span class="hidden sm:inline">Apply filter</span>
                    </UiButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Filter transactions</p></UiTooltipContent>
                </UiTooltip>
              </div>
            </div>
          </div>

          <!-- TanStack table -->
          <UiTanStackTable
            :data="allTransactions"
            :columns="txColumns"
            :show-rows-per-page="false"
            :show-page-info="false"
            :show-pagination="false"
            :show-selected-count="false"
            :show-footer="true"
            :table-options="{ initialState: { pagination: { pageSize: 7, pageIndex: 0 } } }"
          >
            <!-- Transaction cell -->
            <template #transaction-cell="{ row }">
              <div class="flex items-center gap-3">
                <span
                  class="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                  :style="{ backgroundColor: row.original.iconBg, color: row.original.iconColor }"
                >
                  {{ row.original.fallback }}
                </span>
                <span class="text-sm font-medium">{{ row.original.name }}</span>
              </div>
            </template>

            <!-- Amount cell -->
            <template #amount-cell="{ row }">
              <span
                class="text-sm font-semibold tabular-nums"
                :class="
                  row.original.amount > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-foreground'
                "
              >
                {{ row.original.amount > 0 ? "+" : "" }}${{
                  Math.abs(row.original.amount).toFixed(2)
                }}
              </span>
            </template>

            <!-- Category cell -->
            <template #category-cell="{ row }">
              <span
                class="border-border/60 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
              >
                <span
                  class="size-1.5 shrink-0 rounded-full"
                  :style="{ backgroundColor: row.original.categoryColor }"
                />
                {{ row.original.category }}
              </span>
            </template>

            <!-- Account cell -->
            <template #account-cell="{ row }">
              <div class="flex items-center gap-2">
                <!-- <span
                  class="flex h-5 items-center justify-center rounded px-1.5 text-[10px] font-black tracking-wide"
                  :style="
                    row.original.cardType === 'visa'
                      ? { background: '#1a1f71', color: '#fff' }
                      : { background: '#eb001b', color: '#fff' }
                  "
                >
                  {{ row.original.cardType === "visa" ? "VISA" : "MC" }}
                </span> -->
                <div
                  v-if="row.original.cardType == 'visa'"
                  class="inline-flex items-center justify-center rounded border px-1"
                >
                  <Icon name="simple-icons:visa" class="size-8 shrink-0" />
                </div>
                <div v-else class="inline-flex items-center justify-center rounded border px-1">
                  <Icon name="simple-icons:mastercard" class="size-8 shrink-0" />
                </div>
                <div class="leading-tight">
                  <p class="text-xs font-medium">
                    {{ row.original.cardType === "visa" ? "Visa" : "Mastercard" }}
                    {{ row.original.cardLast4 }}
                  </p>
                  <p class="text-muted-foreground text-xs">Expiry {{ row.original.expiry }}</p>
                </div>
              </div>
            </template>

            <!-- Actions cell -->
            <template #actions-cell="{ row }">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton
                    variant="ghost"
                    size="icon-sm"
                    class="text-muted-foreground"
                    @click="editTransaction(row.original)"
                  >
                    <Icon name="heroicons:pencil-square" class="size-4" />
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Edit transaction</p></UiTooltipContent>
              </UiTooltip>
            </template>

            <!-- Footer with pagination -->
            <template #footer="{ table }">
              <div
                class="border-border/60 flex w-full flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <p class="text-muted-foreground shrink-0 text-xs">
                  {{ allTransactions.length }} transactions
                </p>
                <UiPagination
                  class="mx-0! justify-end!"
                  :total="allTransactions.length"
                  :items-per-page="7"
                  :sibling-count="1"
                  :page="table.atoms.pagination.get().pageIndex + 1"
                  @update:page="(p) => table.setPageIndex(p - 1)"
                >
                  <UiPaginationList v-slot="{ items }" class="gap-1">
                    <UiPaginationPrev as-child>
                      <UiButton variant="outline" size="sm" class="gap-1.5">
                        <Icon name="heroicons:chevron-left" class="size-3.5" />
                        <span class="hidden sm:inline">Previous</span>
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
                      <UiButton variant="outline" size="sm" class="gap-1.5">
                        <span class="hidden sm:inline">Next</span>
                        <Icon name="heroicons:chevron-right" class="size-3.5" />
                      </UiButton>
                    </UiPaginationNext>
                  </UiPaginationList>
                </UiPagination>
              </div>
            </template>
          </UiTanStackTable>
        </Motion>

        <!-- ─── Right: Profile + Cards + Budgets ──────────────────────────── -->
        <Motion
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: 0.18, ease: 'easeOut' }"
          class="border-border/70 bg-card overflow-hidden rounded-2xl border shadow-xs"
        >
          <!-- Profile banner -->
          <div
            class="relative h-28 bg-linear-to-br from-indigo-200 via-purple-100 to-rose-200 dark:from-indigo-900/60 dark:via-purple-900/40 dark:to-rose-900/60"
          />

          <!-- Avatar + name section -->
          <div class="px-5 pb-5">
            <div class="relative -mt-10 mb-3 flex items-end gap-3">
              <div class="relative shrink-0">
                <UiAvatar
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Sasha Pryce"
                  fallback="OR"
                  class="ring-card size-20 ring-4"
                />
                <div
                  class="ring-card absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full bg-blue-500 ring-2"
                >
                  <Icon name="heroicons:check" class="size-3 text-white" />
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-xl font-bold">Sasha Pryce</h2>
              <span
                class="border-border/60 bg-muted/40 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium"
              >
                <span class="bg-primary size-1.5 rounded-full" />
                Premium
              </span>
            </div>
            <p class="text-muted-foreground mt-0.5 text-sm">sasha@ui-thing.com</p>
          </div>

          <div class="border-border/60 border-t" />

          <!-- My cards section -->
          <div class="p-5">
            <div class="mb-3 flex items-center justify-between">
              <h3 class="text-sm font-semibold">My cards</h3>
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton
                    variant="ghost"
                    size="sm"
                    class="text-muted-foreground h-7 gap-1.5 text-xs"
                    @click="addCardOpen = true"
                  >
                    <Icon name="heroicons:plus" class="size-3.5" />
                    Add card
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Add new card</p></UiTooltipContent>
              </UiTooltip>
            </div>

            <!-- Scrollable cards -->
            <div
              class="flex scrollbar-none gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div
                v-for="card in cards"
                :key="card.id"
                class="border-border/50 w-60 shrink-0 overflow-hidden rounded-lg border shadow-sm"
              >
                <!-- Card top -->
                <div
                  class="from-muted to-muted/50 flex items-start justify-between bg-linear-to-br px-3.5 py-3.5"
                >
                  <p class="text-muted-foreground truncate text-sm font-medium">{{ card.label }}</p>
                  <Icon name="heroicons:signal" class="text-muted-foreground/60 size-5 rotate-90" />
                </div>
                <!-- Card bottom -->
                <div class="bg-zinc-900 px-3.5 py-4 text-zinc-50">
                  <div class="mb-2 flex items-center justify-between">
                    <div class="leading-tight">
                      <p class="text-xs font-medium tracking-wider uppercase opacity-60">
                        {{ card.holderName }}
                      </p>
                      <p class="text-xs opacity-60">{{ card.expiry }}</p>
                    </div>
                    <!-- Toggle -->
                    <UiSwitch v-model="card.active" />
                  </div>
                  <p class="font-mono text-sm tracking-widest opacity-80">
                    {{ card.cardNumber }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Dot indicators -->
            <div class="mt-2.5 flex items-center gap-1.5">
              <span
                v-for="(card, i) in cards"
                :key="card.id"
                class="rounded-full transition-all"
                :class="i === 0 ? 'bg-primary size-2' : 'bg-muted-foreground/30 size-1.5'"
              />
            </div>
          </div>

          <div class="border-border/60 border-t" />

          <!-- My budgets section -->
          <div class="p-5">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-sm font-semibold">My budgets</h3>
              <UiTooltip>
                <UiDropdownMenu>
                  <UiTooltipTrigger as-child>
                    <UiDropdownMenuTrigger as-child>
                      <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground">
                        <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                      </UiButton>
                    </UiDropdownMenuTrigger>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Budget options</p></UiTooltipContent>
                  <UiDropdownMenuContent align="end">
                    <UiDropdownMenuItem icon="heroicons:plus" title="Add budget" />
                    <UiDropdownMenuItem icon="heroicons:pencil" title="Edit budgets" />
                    <UiDropdownMenuItem icon="heroicons:arrow-path" title="Reset periods" />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTooltip>
            </div>

            <div class="space-y-3">
              <div
                v-for="budget in budgets"
                :key="budget.name"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5"
                :style="{ backgroundColor: isDark ? budget.darkBgColor : budget.bgColor }"
              >
                <div
                  class="flex size-9 shrink-0 items-center justify-center rounded-xl"
                  :style="{ backgroundColor: isDark ? budget.darkIconBg : budget.iconBg }"
                >
                  <Icon :name="budget.icon" class="size-4" :style="{ color: budget.color }" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between">
                    <p class="text-xs font-semibold" :style="{ color: budget.color }">
                      {{ budget.name }}
                    </p>
                    <p class="text-muted-foreground text-xs font-medium">${{ budget.left }} left</p>
                  </div>
                  <div
                    class="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10"
                  >
                    <div
                      class="h-full rounded-full transition-all"
                      :style="{ width: `${budget.percent}%`, backgroundColor: budget.color }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import type { ColumnDef } from "@tanstack/vue-table";
  import type { ApexOptions } from "apexcharts";
  import { Motion } from "motion-v";
  import { object, string } from "yup";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  // ─── Navigation ──────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // ─── Keyboard shortcut ────────────────────────────────────────────────────────
  const searchOpen = ref(false);
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
  };
  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // ─── Balance tabs + chart ─────────────────────────────────────────────────────
  const balanceTabs = [
    { value: "personal", label: "Personal" },
    { value: "business", label: "Business" },
    { value: "credit", label: "Credit" },
  ];
  const activeBalanceTab = ref("personal");

  const balanceByTab: Record<string, string> = {
    personal: "$40,206.20",
    business: "$128,450.00",
    credit: "-$3,120.55",
  };

  const chartDataByTab: Record<string, { name: string; data: number[] }[]> = {
    personal: [
      {
        name: "Balance",
        data: [38200, 39100, 38700, 39800, 39400, 40200, 40800, 39900, 40500, 41200, 40800, 40206],
      },
      {
        name: "Spending",
        data: [1100, 1350, 1080, 1520, 1240, 1480, 1720, 1180, 1360, 1540, 1660, 1480],
      },
      {
        name: "Income",
        data: [2400, 2700, 2550, 2850, 2650, 2950, 3100, 2750, 3000, 3200, 2850, 3050],
      },
    ],
    business: [
      {
        name: "Revenue",
        data: [
          98000, 104000, 97500, 112000, 108000, 118000, 122000, 115000, 124000, 131000, 127000,
          128450,
        ],
      },
      {
        name: "Expenses",
        data: [42000, 46000, 41000, 50000, 47000, 52000, 55000, 50000, 54000, 58000, 56000, 58000],
      },
      {
        name: "Profit",
        data: [56000, 58000, 56500, 62000, 61000, 66000, 67000, 65000, 70000, 73000, 71000, 70450],
      },
    ],
    credit: [
      {
        name: "Balance",
        data: [-1800, -2100, -1650, -2400, -2200, -2550, -2800, -2400, -2700, -3000, -2900, -3121],
      },
      {
        name: "Limit",
        data: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
      },
      { name: "Payments", data: [600, 750, 580, 880, 780, 920, 1050, 820, 960, 1080, 980, 1020] },
    ],
  };

  const chartSeries = computed(() => chartDataByTab[activeBalanceTab.value]);

  const chartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      parentHeightOffset: 0,
      animations: { enabled: true, speed: 400, easing: "easeinout" },
    },
    colors: [
      "var(--color-primary)",
      "color-mix(in oklab, var(--color-primary) 60%, white)",
      "color-mix(in oklab, var(--color-primary) 30%, white)",
    ],
    stroke: { width: [2, 2, 2], curve: "smooth" },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 0.5,
        opacityFrom: 0.15,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    grid: {
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 4, right: 4 },
    },
    xaxis: {
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
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "11px" } },
    },
    yaxis: { show: false },
    legend: { show: false },
    tooltip: { shared: true, intersect: false },
  }));

  // ─── Date picker ─────────────────────────────────────────────────────────────
  const txDateRange = ref({ start: new Date("2025-01-01"), end: new Date("2025-12-31") });

  // ─── Filter dialog ────────────────────────────────────────────────────────────
  const filterOpen = ref(false);

  const filterCategories = reactive([
    { key: "income", label: "Income", checked: true },
    { key: "subscriptions", label: "Subscriptions", checked: true },
    { key: "food", label: "Food and dining", checked: true },
    { key: "groceries", label: "Groceries", checked: true },
    { key: "travel", label: "Travel", checked: false },
    { key: "entertainment", label: "Entertainment", checked: false },
  ]);

  const filterAccounts = reactive([
    { key: "visa", label: "Visa 1234", checked: true },
    { key: "mastercard", label: "Mastercard 1234", checked: true },
    { key: "savings", label: "Savings account", checked: false },
  ]);

  const filterTypes = reactive([
    { key: "debit", label: "Debits (outgoing)", checked: true },
    { key: "credit", label: "Credits (incoming)", checked: true },
  ]);

  const resetFilters = () => {
    filterCategories.forEach((c) => (c.checked = false));
    filterAccounts.forEach((a) => (a.checked = false));
    filterTypes.forEach((t) => (t.checked = false));
  };

  const applyFilters = () => {
    filterOpen.value = false;
    useSonner("Filters applied", {
      description: "Transaction history has been updated with your filter selection.",
    });
  };

  // ─── Transaction table ────────────────────────────────────────────────────────
  type TransactionRow = {
    id: number;
    name: string;
    fallback: string;
    iconBg: string;
    iconColor: string;
    amount: number;
    category: string;
    categoryColor: string;
    cardType: "visa" | "mastercard";
    cardLast4: string;
    expiry: string;
  };

  const txColumns: ColumnDef<TanStackTableFeatures, TransactionRow>[] = [
    {
      id: "transaction",
      accessorKey: "name",
      header: "Transaction",
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: "Amount",
      meta: { class: { th: "w-28", td: "w-28" } },
    },
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
      enableSorting: false,
      meta: { class: { th: "hidden sm:table-cell", td: "hidden sm:table-cell" } },
    },
    {
      id: "account",
      accessorKey: "cardLast4",
      header: "Account",
      enableSorting: false,
      meta: { class: { th: "hidden md:table-cell", td: "hidden md:table-cell" } },
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      meta: { class: { th: "w-10", td: "w-10" } },
    },
  ];

  const categoryOptions = ["Income", "Subscriptions", "Food and dining", "Groceries", "Travel"];

  const allTransactions: TransactionRow[] = [
    {
      id: 1,
      name: "Spotify",
      fallback: "🎵",
      iconBg: "#1DB954",
      iconColor: "#fff",
      amount: -18.99,
      category: "Subscriptions",
      categoryColor: "#6366f1",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 2,
      name: "A Coffee",
      fallback: "AC",
      iconBg: "#e5e7eb",
      iconColor: "#374151",
      amount: -4.5,
      category: "Food and dining",
      categoryColor: "#ec4899",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 3,
      name: "Stripe",
      fallback: "S",
      iconBg: "#635bff",
      iconColor: "#fff",
      amount: 88.0,
      category: "Income",
      categoryColor: "#10b981",
      cardType: "mastercard",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 4,
      name: "Figma",
      fallback: "F",
      iconBg: "#1e1e1e",
      iconColor: "#fff",
      amount: -15.0,
      category: "Subscriptions",
      categoryColor: "#6366f1",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 5,
      name: "TBF Bakery",
      fallback: "TB",
      iconBg: "#fef3c7",
      iconColor: "#92400e",
      amount: -12.5,
      category: "Food and dining",
      categoryColor: "#ec4899",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 6,
      name: "Fresh F&V",
      fallback: "FV",
      iconBg: "#dcfce7",
      iconColor: "#166534",
      amount: -40.2,
      category: "Groceries",
      categoryColor: "#3b82f6",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 7,
      name: "Stripe",
      fallback: "S",
      iconBg: "#635bff",
      iconColor: "#fff",
      amount: 88.0,
      category: "Income",
      categoryColor: "#10b981",
      cardType: "mastercard",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 8,
      name: "Netflix",
      fallback: "N",
      iconBg: "#e50914",
      iconColor: "#fff",
      amount: -15.99,
      category: "Subscriptions",
      categoryColor: "#6366f1",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 9,
      name: "Amazon",
      fallback: "A",
      iconBg: "#ff9900",
      iconColor: "#000",
      amount: -67.8,
      category: "Groceries",
      categoryColor: "#3b82f6",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 10,
      name: "Freelance",
      fallback: "FL",
      iconBg: "#dbeafe",
      iconColor: "#1d4ed8",
      amount: 350.0,
      category: "Income",
      categoryColor: "#10b981",
      cardType: "mastercard",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 11,
      name: "Uber Eats",
      fallback: "UE",
      iconBg: "#1c1c1c",
      iconColor: "#06c167",
      amount: -32.4,
      category: "Food and dining",
      categoryColor: "#ec4899",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 12,
      name: "Apple",
      fallback: "🍎",
      iconBg: "#f3f4f6",
      iconColor: "#111827",
      amount: -9.99,
      category: "Subscriptions",
      categoryColor: "#6366f1",
      cardType: "visa",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 13,
      name: "Whole Foods",
      fallback: "WF",
      iconBg: "#f0fdf4",
      iconColor: "#15803d",
      amount: -55.3,
      category: "Groceries",
      categoryColor: "#3b82f6",
      cardType: "mastercard",
      cardLast4: "1234",
      expiry: "06/2025",
    },
    {
      id: 14,
      name: "Consulting",
      fallback: "CO",
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
      amount: 500.0,
      category: "Income",
      categoryColor: "#10b981",
      cardType: "mastercard",
      cardLast4: "1234",
      expiry: "06/2025",
    },
  ];

  const editTransaction = (row: TransactionRow) => {
    useSonner(`Editing transaction`, { description: `Opening editor for "${row.name}"` });
  };

  // ─── Add card dialog ──────────────────────────────────────────────────────────
  const addCardOpen = ref(false);

  interface CardItem {
    id: string;
    label: string;
    cardNumber: string;
    holderName: string;
    expiry: string;
    active: boolean;
  }

  const cards = ref<CardItem[]>([
    {
      id: "1",
      label: "Personal Visa",
      cardNumber: "1234 1234 1234 1234",
      holderName: "SASHA PRYCE",
      expiry: "06/28",
      active: true,
    },
    {
      id: "2",
      label: "Business Card",
      cardNumber: "5678 5678 5678 5678",
      holderName: "SASHA PRYCE",
      expiry: "09/26",
      active: false,
    },
  ]);

  const AddCardSchema = object({
    label: string().required().label("Card label").min(1).max(50),
    holderName: string().required().label("Cardholder name").min(2).max(60),
    cardNumber: string()
      .required()
      .label("Card number")
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Must be a valid 16-digit card number"),
    expiry: string()
      .required()
      .label("Expiry")
      .matches(/^\d{2}\/\d{2}$/, "Must be in MM/YY format"),
  });

  const {
    handleSubmit: handleAddCardSubmit,
    isSubmitting: isAddingCard,
    resetForm: resetAddCardForm,
    setFieldValue,
  } = useForm({ name: "addCardForm12", validationSchema: toTypedSchema(AddCardSchema) });

  const formatCardNumber = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const cleaned = input.value.replace(/\D/g, "").slice(0, 16);
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim();
    input.value = formatted;
    setFieldValue("cardNumber", formatted);
  };

  const formatExpiry = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, "").slice(0, 4);
    if (val.length > 2) val = val.slice(0, 2) + "/" + val.slice(2);
    input.value = val;
    setFieldValue("expiry", val);
  };

  const submitAddCard = handleAddCardSubmit((values) => {
    cards.value.push({
      id: Date.now().toString(),
      label: values.label,
      cardNumber: values.cardNumber,
      holderName: values.holderName.toUpperCase(),
      expiry: values.expiry,
      active: true,
    });
    addCardOpen.value = false;
    useSonner("Card added", { description: `"${values.label}" has been added to your cards.` });
    resetAddCardForm();
  });

  const onAddCardClose = (open: boolean) => {
    if (!open) resetAddCardForm();
  };

  // ─── Budgets ──────────────────────────────────────────────────────────────────
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");

  const budgets = [
    {
      name: "Subscriptions",
      icon: "heroicons:computer-desktop",
      left: 25,
      percent: 82,
      color: "#6366f1",
      iconBg: "#e0e7ff",
      bgColor: "#eef2ff",
      darkIconBg: "rgba(99,102,241,0.18)",
      darkBgColor: "rgba(99,102,241,0.1)",
    },
    {
      name: "Food and booze",
      icon: "heroicons:shopping-bag",
      left: 120,
      percent: 56,
      color: "#ec4899",
      iconBg: "#fce7f3",
      bgColor: "#fdf2f8",
      darkIconBg: "rgba(236,72,153,0.18)",
      darkBgColor: "rgba(236,72,153,0.1)",
    },
    {
      name: "Groceries",
      icon: "heroicons:shopping-cart",
      left: 200,
      percent: 44,
      color: "#3b82f6",
      iconBg: "#dbeafe",
      bgColor: "#eff6ff",
      darkIconBg: "rgba(59,130,246,0.18)",
      darkBgColor: "rgba(59,130,246,0.1)",
    },
    {
      name: "Savings",
      icon: "heroicons:banknotes",
      left: 50,
      percent: 68,
      color: "#10b981",
      iconBg: "#d1fae5",
      bgColor: "#f0fdf4",
      darkIconBg: "rgba(16,185,129,0.18)",
      darkBgColor: "rgba(16,185,129,0.1)",
    },
  ];
</script>
