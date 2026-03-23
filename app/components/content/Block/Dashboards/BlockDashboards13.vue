<template>
  <div class="min-h-screen bg-muted/40 text-foreground dark:bg-muted/10">
    <!-- ─── Deposit dialog ─────────────────────────────────────────────────────── -->
    <UiDialog v-model:open="depositOpen" @update:open="(o) => !o && resetDepositForm()">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>New bank deposit</UiDialogTitle>
          <UiDialogDescription>Transfer funds to a recipient's bank account.</UiDialogDescription>
        </UiDialogHeader>
        <form @submit="submitDeposit">
          <fieldset :disabled="isSubmittingDeposit" class="space-y-4 py-1">
            <UiVeeSelect required label="From account" name="fromAccount">
              <option value="" disabled>Select account</option>
              <option value="primary">
                Primary — ${{
                  user.primaryAccount.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })
                }}
              </option>
              <option value="secondary">
                Secondary — ${{
                  user.secondaryAccount.balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })
                }}
              </option>
            </UiVeeSelect>
            <UiVeeInput
              required
              label="Recipient name"
              name="recipientName"
              placeholder="e.g. Jane Smith"
            />
            <UiVeeInput
              required
              label="Bank name"
              name="bankName"
              placeholder="e.g. First National Bank"
            />
            <div class="grid grid-cols-2 gap-3">
              <UiVeeInput
                required
                label="Account number"
                name="accountNumber"
                placeholder="e.g. 12345678"
              />
              <UiVeeInput
                required
                label="Routing number"
                name="routingNumber"
                placeholder="9 digits"
                :maxlength="9"
                pattern="[0-9]{9}"
              />
            </div>
            <UiVeeInput required label="Amount ($)" name="amount" placeholder="0.00" />
            <UiVeeInput label="Memo (optional)" name="memo" placeholder="e.g. Invoice #1024" />
          </fieldset>
          <UiDialogFooter class="mt-5">
            <UiButton type="button" variant="outline" @click="depositOpen = false">Cancel</UiButton>
            <UiButton type="submit" :disabled="isSubmittingDeposit">Send deposit</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Send funds dialog ──────────────────────────────────────────────────── -->
    <UiDialog v-model:open="sendFundsOpen" @update:open="(o) => !o && resetSendFundsForm()">
      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Send funds</UiDialogTitle>
          <UiDialogDescription>Send money to a friend or business instantly.</UiDialogDescription>
        </UiDialogHeader>
        <form @submit="submitSendFunds">
          <fieldset :disabled="isSubmittingSendFunds" class="space-y-4 py-1">
            <UiVeeInput
              required
              label="To"
              name="recipient"
              placeholder="Name, email, or phone number"
            />
            <UiVeeInput required label="Amount ($)" name="amount" placeholder="0.00" />
            <UiVeeSelect required label="From account" name="fromAccount">
              <option value="" disabled>Select account</option>
              <option value="primary">Primary account</option>
              <option value="secondary">Secondary account</option>
            </UiVeeSelect>
            <UiVeeSelect required label="Transfer type" name="transferType">
              <option value="" disabled>Select type</option>
              <option value="instant">Instant (arrives in minutes)</option>
              <option value="standard">Standard (1–3 business days)</option>
            </UiVeeSelect>
            <UiVeeInput label="Note (optional)" name="note" placeholder="What's it for?" />
          </fieldset>
          <UiDialogFooter class="mt-5">
            <UiButton type="button" variant="outline" @click="sendFundsOpen = false"
              >Cancel</UiButton
            >
            <UiButton type="submit" :disabled="isSubmittingSendFunds">Send funds</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Filters dialog ────────────────────────────────────────────────────── -->
    <UiDialog v-model:open="filtersOpen">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Filter transactions</UiDialogTitle>
          <UiDialogDescription>Narrow down your account activity.</UiDialogDescription>
        </UiDialogHeader>
        <div class="space-y-5 py-1">
          <div>
            <p class="mb-2.5 text-sm font-medium">Transaction type</p>
            <div class="space-y-2">
              <label
                v-for="t in filterTypes"
                :key="t.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`type-${t.key}`" v-model:checked="t.checked" />
                {{ t.label }}
              </label>
            </div>
          </div>
          <div>
            <p class="mb-2.5 text-sm font-medium">Account</p>
            <div class="space-y-2">
              <label
                v-for="a in filterAccounts"
                :key="a.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`acc-${a.key}`" v-model:checked="a.checked" />
                {{ a.label }}
              </label>
            </div>
          </div>
          <div>
            <p class="mb-2.5 text-sm font-medium">Status</p>
            <div class="space-y-2">
              <label
                v-for="s in filterStatuses"
                :key="s.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`status-${s.key}`" v-model:checked="s.checked" />
                {{ s.label }}
              </label>
            </div>
          </div>
        </div>
        <UiDialogFooter class="mt-2">
          <UiButton variant="outline" @click="resetFilters">Reset</UiButton>
          <UiButton @click="applyFilters">Apply filters</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Command dialog ────────────────────────────────────────────────────── -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search transactions and actions"
    >
      <UiCommandInput placeholder="Search transactions, accounts…" />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick actions">
          <UiCommandItem
            value="New deposit"
            @select="
              () => {
                searchOpen = false;
                depositOpen = true;
              }
            "
          >
            <Icon name="heroicons:arrow-down-circle" class="mr-2 size-4" />
            New deposit
          </UiCommandItem>
          <UiCommandItem
            value="Send funds"
            @select="
              () => {
                searchOpen = false;
                sendFundsOpen = true;
              }
            "
          >
            <Icon name="heroicons:paper-airplane" class="mr-2 size-4" />
            Send funds
          </UiCommandItem>
          <UiCommandItem value="View statements" @select="searchOpen = false">
            <Icon name="heroicons:document-text" class="mr-2 size-4" />
            Download statement
          </UiCommandItem>
          <UiCommandItem
            value="Apply filters"
            @select="
              () => {
                searchOpen = false;
                filtersOpen = true;
              }
            "
          >
            <Icon name="heroicons:funnel" class="mr-2 size-4" />
            Apply filters
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Recent deposits">
          <UiCommandItem
            v-for="d in deposits.slice(0, 4)"
            :key="d.id"
            :value="d.description"
            @select="searchOpen = false"
          >
            <Icon name="heroicons:banknotes" class="mr-2 size-4" />
            {{ d.description }} — +${{ d.amount.toFixed(2) }}
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Accounts">
          <UiCommandItem value="Primary account" @select="searchOpen = false">
            <Icon name="heroicons:credit-card" class="mr-2 size-4" />
            Primary — ${{ user.primaryAccount.balance.toLocaleString() }}
          </UiCommandItem>
          <UiCommandItem value="Secondary account" @select="searchOpen = false">
            <Icon name="heroicons:credit-card" class="mr-2 size-4" />
            Secondary — ${{ user.secondaryAccount.balance.toLocaleString() }}
          </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
      <div
        class="flex items-center justify-between border-t border-border/60 px-3 py-2 text-xs text-muted-foreground"
      >
        <span class="flex items-center gap-1.5"><UiKbd>↵</UiKbd> to select</span>
        <span class="flex items-center gap-1.5"><UiKbd>↑↓</UiKbd> to navigate</span>
        <span class="flex items-center gap-1.5"><UiKbd>ESC</UiKbd> to close</span>
      </div>
    </UiCommandDialog>

    <!-- ─── Header ────────────────────────────────────────────────────────────── -->
    <header class="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <UiContainer class="flex min-h-[3.5rem] items-center justify-between gap-4">
        <!-- Logo + nav -->
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2.5">
            <div class="flex size-7 items-center justify-center rounded-lg bg-primary">
              <Icon name="heroicons:cube-transparent" class="size-4 text-primary-foreground" />
            </div>
            <span class="hidden text-sm font-semibold sm:inline">UI Thing</span>
          </div>
          <nav class="hidden items-center gap-0.5 lg:flex">
            <UiButton
              v-for="item in navItems"
              :key="item.label"
              variant="ghost"
              size="sm"
              :class="
                item.active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
              "
            >
              {{ item.label }}
            </UiButton>
          </nav>
        </div>

        <!-- Icon buttons -->
        <div class="flex items-center gap-1">
          <!-- Search -->
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" @click="searchOpen = true">
                <Icon name="heroicons:magnifying-glass" class="size-4" />
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
                    <Icon name="heroicons:cog-6-tooth" class="size-4" />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Settings</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-52">
                <UiDropdownMenuLabel>Settings</UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Account settings" />
                <UiDropdownMenuItem icon="heroicons:shield-check" title="Security & privacy" />
                <UiDropdownMenuItem icon="heroicons:bell" title="Notification preferences" />
                <UiDropdownMenuItem icon="heroicons:swatch" title="Appearance" />
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
                    <Icon name="heroicons:bell" class="size-4" />
                    <span class="absolute top-1 right-0 size-1.5 rounded-full bg-primary" />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Notifications</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-80">
                <UiDropdownMenuLabel class="flex items-center justify-between">
                  Notifications
                  <UiBadge variant="secondary" size="sm">2 new</UiBadge>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  icon="heroicons:banknotes"
                  title="Stripe deposit of $408.00 received"
                />
                <UiDropdownMenuItem
                  icon="heroicons:arrow-trending-up"
                  title="Balance increased by $244.00"
                />
                <UiDropdownMenuItem
                  icon="heroicons:exclamation-triangle"
                  title="Card statement ready for June 2025"
                />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:check" title="Mark all as read" />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <!-- Avatar / account -->
          <UiTooltip>
            <UiDropdownMenu>
              <UiTooltipTrigger as-child>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="rounded-full p-0">
                    <UiAvatar
                      :src="user.avatar"
                      :alt="user.name"
                      :fallback="user.initials"
                      class="size-8 cursor-pointer"
                    />
                  </UiButton>
                </UiDropdownMenuTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Account</p></UiTooltipContent>
              <UiDropdownMenuContent align="end" class="w-52">
                <UiDropdownMenuLabel>
                  <p class="font-semibold">{{ user.name }}</p>
                  <p class="text-xs font-normal text-muted-foreground">{{ user.email }}</p>
                </UiDropdownMenuLabel>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem
                  variant="destructive"
                  icon="heroicons:arrow-right-on-rectangle"
                  title="Sign out"
                />
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </UiTooltip>

          <!-- Mobile menu -->
          <UiTooltip>
            <UiPopover class="lg:hidden">
              <UiTooltipTrigger as-child>
                <UiPopoverTrigger as-child>
                  <UiButton variant="ghost" size="icon-sm" class="lg:hidden">
                    <Icon name="heroicons:bars-3" class="size-4" />
                  </UiButton>
                </UiPopoverTrigger>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Menu</p></UiTooltipContent>
              <UiPopoverContent align="end" class="w-48 p-1">
                <UiButton
                  v-for="item in navItems"
                  :key="item.label"
                  variant="ghost"
                  size="sm"
                  class="w-full justify-start"
                  :class="item.active ? 'text-foreground' : 'text-muted-foreground'"
                >
                  {{ item.label }}
                </UiButton>
              </UiPopoverContent>
            </UiPopover>
          </UiTooltip>
        </div>
      </UiContainer>
    </header>

    <!-- ─── Main ──────────────────────────────────────────────────────────────── -->
    <UiContainer class="space-y-5 py-8">
      <!-- Page header -->
      <Motion
        :initial="{ opacity: 0, y: -8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, ease: 'easeOut' }"
      >
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Banking Dashboard</h1>
            <p class="mt-0.5 text-sm text-muted-foreground">
              Here's your account details and deposits.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <UiButton variant="outline" class="gap-2" @click="depositOpen = true">
              <Icon name="heroicons:arrow-down-circle" class="size-4" />
              Deposit
            </UiButton>
            <UiButton class="gap-2" @click="sendFundsOpen = true">
              <Icon name="heroicons:paper-airplane" class="size-4" />
              Send funds
            </UiButton>
          </div>
        </div>
      </Motion>

      <!-- Time tabs + date picker + filters -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3, delay: 0.05, ease: 'easeOut' }"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <UiButtonGroup>
            <UiButton
              v-for="tab in timeTabs"
              :key="tab.value"
              :variant="activeTab === tab.value ? 'default' : 'outline'"
              size="sm"
              @click="activeTab = tab.value"
            >
              <span class="hidden sm:inline">{{ tab.label }}</span>
              <span class="sm:hidden">{{ tab.short }}</span>
            </UiButton>
          </UiButtonGroup>

          <div class="flex items-center gap-2">
            <UiDatepicker v-model.range="dateRange">
              <template #default="{ togglePopover }">
                <UiTooltip>
                  <UiTooltipTrigger as-child>
                    <UiButton variant="outline" size="sm" class="gap-2" @click="togglePopover">
                      <Icon name="heroicons:calendar-days" class="size-4" />
                      Select dates
                    </UiButton>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Select date range</p></UiTooltipContent>
                </UiTooltip>
              </template>
            </UiDatepicker>

            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton variant="outline" size="sm" class="gap-2" @click="filtersOpen = true">
                  <Icon name="heroicons:funnel" class="size-4" />
                  Filters
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Filter transactions</p></UiTooltipContent>
            </UiTooltip>
          </div>
        </div>
      </Motion>

      <!-- Account balance cards -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <!-- Primary account -->
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.35, delay: 0.1, ease: 'easeOut' }"
        >
          <UiCard class="relative gap-0 overflow-hidden p-4 shadow-xs">
            <div class="flex items-start justify-between">
              <div class="flex grow flex-col gap-4 lg:flex-row lg:items-center">
                <div class="mx-auto shrink-0">
                  <UiApexchart
                    :key="`primary-${activeTab}`"
                    type="radialBar"
                    :width="200"
                    :height="200"
                    :series="[chartDataByTab[activeTab as TabKey].primary]"
                    :options="radialBarOptions"
                  />
                </div>
                <div class="grow text-center lg:text-left">
                  <p class="font-semibold">{{ user.primaryAccount.name }}</p>
                  <p class="mt-6 mb-2 text-sm text-muted-foreground">Current balance</p>
                  <div class="flex flex-col items-center justify-between lg:flex-row">
                    <p class="text-3xl font-bold tracking-tight">
                      ${{
                        user.primaryAccount.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <div
                      class="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      <Icon name="heroicons:arrow-trending-up" class="size-3.5" />
                      {{ user.primaryAccount.growth }}%
                    </div>
                  </div>
                </div>
              </div>
              <UiTooltip>
                <UiDropdownMenu>
                  <UiTooltipTrigger as-child>
                    <UiDropdownMenuTrigger as-child>
                      <UiButton
                        variant="ghost"
                        size="icon-sm"
                        class="absolute top-5 right-5 shrink-0 text-muted-foreground"
                      >
                        <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                      </UiButton>
                    </UiDropdownMenuTrigger>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Account options</p></UiTooltipContent>
                  <UiDropdownMenuContent align="end">
                    <UiDropdownMenuItem icon="heroicons:eye" title="View details" />
                    <UiDropdownMenuItem
                      icon="heroicons:arrow-down-circle"
                      title="Deposit funds"
                      @click.stop="depositOpen = true"
                    />
                    <UiDropdownMenuItem icon="heroicons:document-text" title="Download statement" />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTooltip>
            </div>
          </UiCard>
        </Motion>

        <!-- Secondary account -->
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.35, delay: 0.15, ease: 'easeOut' }"
        >
          <UiCard class="relative gap-0 overflow-hidden p-4 shadow-xs">
            <div class="flex items-start justify-between">
              <div class="flex grow flex-col gap-4 lg:flex-row lg:items-center">
                <div class="mx-auto">
                  <UiApexchart
                    :key="`secondary-${activeTab}`"
                    type="radialBar"
                    :width="200"
                    :height="200"
                    :series="[chartDataByTab[activeTab as TabKey].secondary]"
                    :options="radialBarOptions"
                  />
                </div>
                <div class="grow text-center lg:text-left">
                  <p class="font-semibold">{{ user.secondaryAccount.name }}</p>
                  <p class="mt-6 mb-2 text-sm text-muted-foreground">Current balance</p>
                  <div class="flex flex-col items-center justify-between lg:flex-row">
                    <p class="text-3xl font-bold tracking-tight">
                      ${{
                        user.secondaryAccount.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <div
                      class="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      <Icon name="heroicons:arrow-trending-up" class="size-3.5" />
                      {{ user.secondaryAccount.growth }}%
                    </div>
                  </div>
                </div>
              </div>
              <UiTooltip>
                <UiDropdownMenu>
                  <UiTooltipTrigger as-child>
                    <UiDropdownMenuTrigger as-child>
                      <UiButton
                        variant="ghost"
                        size="icon-sm"
                        class="absolute top-5 right-5 shrink-0 text-muted-foreground"
                      >
                        <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                      </UiButton>
                    </UiDropdownMenuTrigger>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Account options</p></UiTooltipContent>
                  <UiDropdownMenuContent align="end">
                    <UiDropdownMenuItem icon="heroicons:eye" title="View details" />
                    <UiDropdownMenuItem
                      icon="heroicons:arrow-down-circle"
                      title="Deposit funds"
                      @click.stop="depositOpen = true"
                    />
                    <UiDropdownMenuItem icon="heroicons:document-text" title="Download statement" />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTooltip>
            </div>
          </UiCard>
        </Motion>
      </div>

      <!-- Main content: left = chart + cards, right = deposits -->
      <div class="grid grid-cols-1 items-start gap-4 xl:grid-cols-[1fr_380px]">
        <!-- Left column: balance chart + cards stacked -->
        <div class="space-y-4">
          <!-- Balance over time -->
          <Motion
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.35, delay: 0.2, ease: 'easeOut' }"
          >
            <UiCard>
              <UiCardHeader class="flex items-center justify-between">
                <div class="space-y-1">
                  <UiCardTitle>Balance over time</UiCardTitle>
                  <UiCardDescription>Track your account balance changes.</UiCardDescription>
                </div>
                <UiTooltip>
                  <UiDropdownMenu>
                    <UiTooltipTrigger as-child>
                      <UiDropdownMenuTrigger as-child>
                        <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground">
                          <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                        </UiButton>
                      </UiDropdownMenuTrigger>
                    </UiTooltipTrigger>
                    <UiTooltipContent><p>Chart options</p></UiTooltipContent>
                    <UiDropdownMenuContent align="end">
                      <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Download chart" />
                      <UiDropdownMenuItem
                        icon="heroicons:arrows-pointing-out"
                        title="Full screen"
                      />
                      <UiDropdownMenuItem icon="heroicons:table-cells" title="View as table" />
                    </UiDropdownMenuContent>
                  </UiDropdownMenu>
                </UiTooltip>
              </UiCardHeader>
              <UiCardContent>
                <UiApexchart
                  :key="`line-${activeTab}`"
                  type="area"
                  height="300"
                  :series="activeChartSeries"
                  :options="lineChartOptions"
                />
              </UiCardContent>
            </UiCard>
          </Motion>

          <!-- Your cards -->
          <Motion
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.35, delay: 0.28, ease: 'easeOut' }"
          >
            <UiCard>
              <UiCardHeader class="flex items-start justify-between">
                <div class="space-y-1">
                  <UiCardTitle>Your cards</UiCardTitle>
                  <UiCardDescription>Manage your saved payment methods.</UiCardDescription>
                </div>
                <UiTooltip>
                  <UiDropdownMenu>
                    <UiTooltipTrigger as-child>
                      <UiDropdownMenuTrigger as-child>
                        <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground">
                          <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                        </UiButton>
                      </UiDropdownMenuTrigger>
                    </UiTooltipTrigger>
                    <UiTooltipContent><p>Card options</p></UiTooltipContent>
                    <UiDropdownMenuContent align="end">
                      <UiDropdownMenuItem icon="heroicons:plus" title="Add new card" />
                      <UiDropdownMenuItem icon="heroicons:pencil" title="Edit cards" />
                      <UiDropdownMenuItem icon="heroicons:lock-closed" title="Freeze all cards" />
                    </UiDropdownMenuContent>
                  </UiDropdownMenu>
                </UiTooltip>
              </UiCardHeader>
              <UiCardContent>
                <div
                  class="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <div v-for="card in user.cards" :key="card.id" class="shrink-0">
                    <UiCreditCard
                      :variant="card.variant === 'primary' ? 'brand-dark' : 'gray-strip'"
                      :company="card.label"
                      :card-holder="card.holderName"
                      :card-number="card.cardNumber"
                      :card-expiration="card.expiry"
                    />

                    <!-- Spending progress -->
                    <div class="mt-3">
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-muted-foreground">Spending this month</span>
                        <span class="font-medium">
                          ${{ card.spending.toLocaleString("en-US", { minimumFractionDigits: 2 }) }}
                        </span>
                      </div>
                      <UiProgress
                        class="mt-2 h-2"
                        :model-value="(card.spending / card.spendLimit) * 100"
                      />
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex">
                  <UiButton
                    variant="outline"
                    @click="
                      useSonner('Coming soon', { description: 'Card management is on the way.' })
                    "
                  >
                    Manage cards
                  </UiButton>
                </div>
              </UiCardContent>
            </UiCard>
          </Motion>
        </div>

        <!-- Right column: recent deposits -->
        <Motion
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.35, delay: 0.25, ease: 'easeOut' }"
        >
          <UiCard>
            <UiCardHeader class="flex items-start justify-between">
              <div class="space-y-1">
                <UiCardTitle>Recent deposits</UiCardTitle>
                <UiCardDescription
                  >Latest incoming transactions to your accounts.</UiCardDescription
                >
              </div>
              <UiTooltip>
                <UiDropdownMenu>
                  <UiTooltipTrigger as-child>
                    <UiDropdownMenuTrigger as-child>
                      <UiButton variant="ghost" size="icon-sm" class="text-muted-foreground">
                        <Icon name="heroicons:ellipsis-vertical" class="size-4" />
                      </UiButton>
                    </UiDropdownMenuTrigger>
                  </UiTooltipTrigger>
                  <UiTooltipContent><p>Deposit options</p></UiTooltipContent>
                  <UiDropdownMenuContent align="end">
                    <UiDropdownMenuItem
                      icon="heroicons:arrow-down-circle"
                      title="New deposit"
                      @click.stop="depositOpen = true"
                    />
                    <UiDropdownMenuItem icon="heroicons:arrow-down-tray" title="Export CSV" />
                    <UiDropdownMenuItem icon="heroicons:eye" title="View all deposits" />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </UiTooltip>
            </UiCardHeader>

            <div class="divide-y divide-border/50">
              <div
                v-for="deposit in visibleDeposits"
                :key="deposit.id"
                class="flex items-center gap-3 px-5 py-3"
              >
                <!-- Payment method badge -->
                <div
                  class="flex h-9 w-12 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/30"
                >
                  <template v-if="deposit.method === 'visa'">
                    <Icon name="simple-icons:visa" class="size-6 shrink-0" />
                  </template>
                  <template v-else-if="deposit.method === 'stripe'">
                    <Icon name="logos:stripe" class="size-8 shrink-0" />
                  </template>
                  <template v-else-if="deposit.method === 'mastercard'">
                    <Icon name="logos:mastercard" class="size-6 shrink-0" />
                  </template>
                  <template v-else-if="deposit.method === 'paypal'">
                    <Icon name="logos:paypal" class="size-5 shrink-0" />
                  </template>
                  <template v-else-if="deposit.method === 'applepay'">
                    <Icon name="simple-icons:apple" class="size-6 shrink-0" />
                  </template>
                </div>

                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium">{{ deposit.description }}</p>
                  <p class="truncate text-xs text-muted-foreground">{{ deposit.sub }}</p>
                </div>
                <p class="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  +${{ deposit.amount.toFixed(2) }}
                </p>
              </div>
            </div>

            <div class="border-t border-border/50 px-5 py-3">
              <UiButton
                variant="link"
                class="h-auto p-0 text-primary"
                @click="showAllDeposits = !showAllDeposits"
              >
                {{ showAllDeposits ? "Show less" : "Show more" }}
              </UiButton>
            </div>
          </UiCard>
        </Motion>
      </div>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import { Motion } from "motion-v";
  import { object, string } from "yup";
  import type { ApexOptions } from "apexcharts";

  // ─── User data ────────────────────────────────────────────────────────────────
  interface UserCard {
    id: string;
    label: string;
    holderName: string;
    cardNumber: string;
    expiry: string;
    variant: "primary" | "secondary";
    spending: number;
    spendLimit: number;
    active: boolean;
  }

  const user = reactive({
    name: "George Reid",
    email: "george@ui-thing.com",
    avatar: "https://i.pravatar.cc/150?img=68",
    initials: "GR",
    primaryAccount: { name: "Primary account", balance: 40206.2, growth: 3.4, lastFour: "4242" },
    secondaryAccount: { name: "Secondary account", balance: 6421.1, growth: 2.0, lastFour: "8899" },
    cards: [
      {
        id: "1",
        label: "UI Thing.",
        holderName: "GEORGE REID",
        cardNumber: "1234  1234  1234  1234",
        expiry: "06/28",
        variant: "primary",
        spending: 2840.4,
        spendLimit: 5000,
        active: true,
      },
      {
        id: "2",
        label: "UI Thing.",
        holderName: "GEORGE REID",
        cardNumber: "5678  5678  5678  5678",
        expiry: "11/27",
        variant: "secondary",
        spending: 1260.2,
        spendLimit: 3000,
        active: false,
      },
    ] as UserCard[],
  });

  // ─── Navigation ───────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // ─── Dialog state ─────────────────────────────────────────────────────────────
  const depositOpen = ref(false);
  const sendFundsOpen = ref(false);
  const filtersOpen = ref(false);
  const searchOpen = ref(false);

  // ─── Keyboard shortcut ────────────────────────────────────────────────────────
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = !searchOpen.value;
    }
  };
  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // ─── Deposit form ─────────────────────────────────────────────────────────────
  const DepositSchema = object({
    fromAccount: string().required().label("From account"),
    recipientName: string().required().label("Recipient name").min(2).max(80),
    bankName: string().required().label("Bank name").min(2).max(80),
    accountNumber: string().required().label("Account number"),
    routingNumber: string().required().label("Routing number"),
    amount: string().required().label("Amount"),
    memo: string().optional().label("Memo").max(100),
  });

  const {
    handleSubmit: handleDepositSubmit,
    isSubmitting: isSubmittingDeposit,
    resetForm: resetDepositForm,
  } = useForm({ name: "depositForm13", validationSchema: toTypedSchema(DepositSchema) });

  const submitDeposit = handleDepositSubmit((values) => {
    depositOpen.value = false;
    useSonner("Deposit initiated", {
      description: `$${values.amount} to ${values.recipientName} is being processed.`,
    });
    resetDepositForm();
  });

  // ─── Send funds form ──────────────────────────────────────────────────────────
  const SendFundsSchema = object({
    recipient: string().required().label("Recipient").min(2).max(80),
    amount: string().required().label("Amount"),
    fromAccount: string().required().label("From account"),
    transferType: string().required().label("Transfer type"),
    note: string().optional().label("Note").max(100),
  });

  const {
    handleSubmit: handleSendFundsSubmit,
    isSubmitting: isSubmittingSendFunds,
    resetForm: resetSendFundsForm,
  } = useForm({ name: "sendFundsForm13", validationSchema: toTypedSchema(SendFundsSchema) });

  const submitSendFunds = handleSendFundsSubmit((values) => {
    sendFundsOpen.value = false;
    useSonner("Funds sent", { description: `$${values.amount} sent to ${values.recipient}.` });
    resetSendFundsForm();
  });

  // ─── Filters ──────────────────────────────────────────────────────────────────
  const filterTypes = reactive([
    { key: "deposits", label: "Deposits", checked: true },
    { key: "withdrawals", label: "Withdrawals", checked: true },
    { key: "transfers", label: "Transfers", checked: true },
  ]);
  const filterAccounts = reactive([
    { key: "all", label: "All accounts", checked: true },
    { key: "primary", label: "Primary account", checked: false },
    { key: "secondary", label: "Secondary account", checked: false },
  ]);
  const filterStatuses = reactive([
    { key: "completed", label: "Completed", checked: true },
    { key: "pending", label: "Pending", checked: true },
    { key: "failed", label: "Failed", checked: false },
  ]);

  const resetFilters = () => {
    filterTypes.forEach((t) => (t.checked = true));
    filterAccounts.forEach((a) => (a.checked = a.key === "all"));
    filterStatuses.forEach((s) => (s.checked = s.key !== "failed"));
    filtersOpen.value = false;
  };

  const applyFilters = () => {
    filtersOpen.value = false;
    useSonner("Filters applied", { description: "Your transaction view has been updated." });
  };

  // ─── Time tabs ────────────────────────────────────────────────────────────────
  const timeTabs = [
    { value: "12m", label: "12 months", short: "12m" },
    { value: "30d", label: "30 days", short: "30d" },
    { value: "7d", label: "7 days", short: "7d" },
    { value: "24h", label: "24 hours", short: "24h" },
  ];
  const activeTab = ref("12m");

  // ─── Date range ───────────────────────────────────────────────────────────────
  const dateRange = ref<{ start: Date; end: Date }>({} as any);

  // ─── Deposits data ────────────────────────────────────────────────────────────
  const deposits = [
    {
      id: 1,
      method: "visa",
      description: "Visa ending in 1234",
      sub: "Expiry 06/2025",
      amount: 244.0,
    },
    {
      id: 2,
      method: "mastercard",
      description: "Mastercard ending in 5678",
      sub: "Expiry 06/2025",
      amount: 326.0,
    },
    {
      id: 3,
      method: "stripe",
      description: "Stripe deposit",
      sub: "billing@ui-thing.com",
      amount: 408.0,
    },
    {
      id: 4,
      method: "visa",
      description: "Visa ending in 1234",
      sub: "Expiry 06/2025",
      amount: 628.0,
    },
    {
      id: 5,
      method: "paypal",
      description: "PayPal deposit",
      sub: "alina@ui-thing.com",
      amount: 166.0,
    },
    {
      id: 6,
      method: "applepay",
      description: "Apple Pay",
      sub: "molly@ui-thing.com",
      amount: 250.0,
    },
    {
      id: 7,
      method: "visa",
      description: "Visa ending in 1234",
      sub: "Expiry 06/2025",
      amount: 144.0,
    },
    {
      id: 8,
      method: "stripe",
      description: "Stripe deposit",
      sub: "billing@ui-thing.com",
      amount: 408.0,
    },
  ];

  const showAllDeposits = ref(false);
  const visibleDeposits = computed(() => (showAllDeposits.value ? deposits : deposits.slice(0, 5)));

  // ─── Chart data ───────────────────────────────────────────────────────────────
  type TabKey = "12m" | "30d" | "7d" | "24h";

  const chartDataByTab: Record<
    TabKey,
    {
      primary: number;
      secondary: number;
      series: { name: string; data: number[] }[];
      categories: string[];
    }
  > = {
    "12m": {
      primary: 68,
      secondary: 42,
      series: [
        {
          name: "Primary",
          data: [
            28000, 30000, 29500, 32000, 33500, 35000, 34000, 36000, 37500, 38000, 39500, 40206,
          ],
        },
        {
          name: "Secondary",
          data: [5000, 5200, 5100, 5500, 5600, 5800, 5700, 5900, 6000, 6100, 6300, 6421],
        },
      ],
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
    },
    "30d": {
      primary: 45,
      secondary: 28,
      series: [
        {
          name: "Primary",
          data: [38000, 38500, 37800, 39200, 38800, 39500, 40000, 39800, 40100, 40206],
        },
        { name: "Secondary", data: [6200, 6150, 6250, 6300, 6280, 6350, 6380, 6410, 6415, 6421] },
      ],
      categories: [
        "Day 1",
        "Day 4",
        "Day 7",
        "Day 10",
        "Day 14",
        "Day 17",
        "Day 20",
        "Day 24",
        "Day 27",
        "Day 30",
      ],
    },
    "7d": {
      primary: 23,
      secondary: 15,
      series: [
        { name: "Primary", data: [39800, 39900, 40000, 40050, 40100, 40150, 40206] },
        { name: "Secondary", data: [6400, 6405, 6410, 6412, 6415, 6418, 6421] },
      ],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "24h": {
      primary: 8,
      secondary: 5,
      series: [
        { name: "Primary", data: [40150, 40165, 40170, 40182, 40190, 40198, 40202, 40206] },
        { name: "Secondary", data: [6418, 6419, 6419, 6420, 6420, 6421, 6421, 6421] },
      ],
      categories: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "Now"],
    },
  };

  const activeChartSeries = computed(() => chartDataByTab[activeTab.value as TabKey].series);
  const activeChartCategories = computed(
    () => chartDataByTab[activeTab.value as TabKey].categories
  );

  // ─── Chart options ────────────────────────────────────────────────────────────
  const radialBarOptions = computed<ApexOptions>(() => ({
    chart: { type: "radialBar" },
    plotOptions: {
      radialBar: {
        hollow: { size: "50%", background: "transparent" },
        track: { background: "var(--muted)", strokeWidth: "70%" },
        dataLabels: { show: false },
      },
    },
    colors: ["var(--primary)"],
    stroke: { lineCap: "round" },
  }));

  const lineChartOptions = computed<ApexOptions>(() => ({
    chart: { type: "area" },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: [2, 1.5] },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.2, opacityTo: 0.0, stops: [0, 100] },
    },
    colors: ["var(--primary)", "var(--muted-foreground)"],
    xaxis: { categories: activeChartCategories.value },
    yaxis: { show: false },
    grid: {
      strokeDashArray: 4,
      yaxis: { lines: { show: false } },
    },
    legend: { show: false },
  }));
</script>
