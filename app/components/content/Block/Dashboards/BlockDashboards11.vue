<template>
  <div class="bg-background text-foreground min-h-screen">
    <!-- ─── Upgrade dialog ──────────────────────────────────────────────────── -->
    <UiDialog v-model:open="upgradeOpen">
      <UiDialogContent class="sm:max-w-lg">
        <UiDialogHeader>
          <UiDialogTitle>Choose your plan</UiDialogTitle>
          <UiDialogDescription>
            Upgrade to unlock advanced analytics, more team members, and priority support.
          </UiDialogDescription>
        </UiDialogHeader>

        <UiRadioGroup
          v-model="selectedPlan"
          orientation="horizontal"
          class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div
            v-for="plan in plans"
            :key="plan.id"
            class="relative cursor-pointer rounded-xl border-2 p-5 transition-all"
            :class="
              selectedPlan === plan.id
                ? 'border-primary bg-primary/5'
                : 'border-border/60 hover:border-border'
            "
            @click="selectedPlan = plan.id"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <p class="leading-none font-semibold">{{ plan.name }}</p>
                <p class="text-muted-foreground mt-1 text-xs">{{ plan.tagline }}</p>
              </div>
              <UiRadioGroupItem :value="plan.id" @click.stop />
            </div>

            <div class="mt-4 flex items-baseline gap-1">
              <span class="text-3xl font-bold">${{ plan.price }}</span>
              <span class="text-muted-foreground text-sm">/mo</span>
            </div>

            <ul class="mt-4 space-y-2">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="text-muted-foreground flex items-center gap-2 text-xs"
              >
                <Icon name="heroicons:check-circle" class="size-3.5 shrink-0 text-emerald-500" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </UiRadioGroup>

        <UiDialogFooter class="mt-2">
          <UiButton variant="outline" @click="upgradeOpen = false">Cancel</UiButton>
          <UiButton class="gap-2" @click="submitUpgrade">
            <Icon name="heroicons:bolt" class="size-4" />
            {{ selectedPlan === "pro" ? "Upgrade to Pro" : "Continue with Free" }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Filter dialog ──────────────────────────────────────────────────── -->
    <UiDialog v-model:open="filterOpen">
      <UiDialogContent class="sm:max-w-sm">
        <UiDialogHeader>
          <UiDialogTitle>Filter options</UiDialogTitle>
          <UiDialogDescription
            >Narrow the dashboard data by channel, status, and product type.</UiDialogDescription
          >
        </UiDialogHeader>

        <div class="space-y-5 py-1">
          <div class="space-y-2.5">
            <p class="text-sm font-medium">Channels</p>
            <div class="space-y-2">
              <label
                v-for="ch in filterChannels"
                :key="ch.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`ch-${ch.key}`" v-model:checked="ch.checked" />
                {{ ch.label }}
              </label>
            </div>
          </div>

          <div class="space-y-2.5">
            <p class="text-sm font-medium">Status</p>
            <div class="space-y-2">
              <label
                v-for="st in filterStatuses"
                :key="st.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`st-${st.key}`" v-model:checked="st.checked" />
                {{ st.label }}
              </label>
            </div>
          </div>

          <div class="space-y-2.5">
            <p class="text-sm font-medium">Products</p>
            <div class="space-y-2">
              <label
                v-for="pr in filterProducts"
                :key="pr.key"
                class="flex cursor-pointer items-center gap-2.5 text-sm"
              >
                <UiCheckbox :id="`pr-${pr.key}`" v-model:checked="pr.checked" />
                {{ pr.label }}
              </label>
            </div>
          </div>
        </div>

        <UiDialogFooter>
          <UiButton variant="outline" @click="resetFilters">Reset</UiButton>
          <UiButton @click="applyFilters">Apply filters</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>

    <!-- ─── Command search dialog ──────────────────────────────────────────── -->
    <UiCommandDialog
      v-model:open="searchOpen"
      title="Search"
      description="Search across your sales data"
    >
      <UiCommandInput placeholder="Search anything…" />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Quick actions">
          <UiCommandItem value="Export report" @select="searchOpen = false">
            <Icon name="heroicons:arrow-down-tray" />
            <span>Export report</span>
          </UiCommandItem>
          <UiCommandItem value="Invite team member" @select="searchOpen = false">
            <Icon name="heroicons:user-plus" />
            <span>Invite team member</span>
          </UiCommandItem>
          <UiCommandItem
            value="Upgrade plan"
            @select="
              () => {
                searchOpen = false;
                upgradeOpen = true;
              }
            "
          >
            <Icon name="heroicons:bolt" />
            <span>Upgrade plan</span>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Reports">
          <UiCommandItem value="Sales report" @select="searchOpen = false">
            <Icon name="heroicons:chart-bar" />
            <span>Sales report</span>
          </UiCommandItem>
          <UiCommandItem value="Revenue analytics" @select="searchOpen = false">
            <Icon name="heroicons:currency-dollar" />
            <span>Revenue analytics</span>
          </UiCommandItem>
          <UiCommandItem value="Customer overview" @select="searchOpen = false">
            <Icon name="heroicons:users" />
            <span>Customer overview</span>
          </UiCommandItem>
          <UiCommandItem value="Product performance" @select="searchOpen = false">
            <Icon name="heroicons:shopping-bag" />
            <span>Product performance</span>
          </UiCommandItem>
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Recent purchases">
          <UiCommandItem
            v-for="item in activityFeed.slice(0, 4)"
            :key="item.name + item.product"
            :value="item.name"
            @select="searchOpen = false"
          >
            <Icon name="heroicons:shopping-bag" />
            <span>{{ item.name }} — {{ item.product }}</span>
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
                  :class="
                    item.active ? 'bg-muted text-foreground shadow-xs' : 'text-muted-foreground'
                  "
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

        <!-- Right actions -->
        <div class="flex items-center gap-2">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton size="sm" class="hidden gap-1.5 sm:flex" @click="upgradeOpen = true">
                <Icon name="heroicons:bolt" class="size-4" />
                Upgrade now
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>View upgrade options</p></UiTooltipContent>
          </UiTooltip>
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="sm:hidden"
                @click="upgradeOpen = true"
              >
                <Icon name="heroicons:bolt" class="size-4" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Upgrade</p></UiTooltipContent>
          </UiTooltip>

          <div class="flex items-center gap-1">
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
                  <UiDropdownMenuItem icon="heroicons:shield-check" title="Security" />
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
                    icon="heroicons:shopping-bag"
                    title="Demi Wikinson purchased Webflow 101"
                  >
                    <template #shortcut>1m ago</template>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem
                    icon="heroicons:arrow-trending-up"
                    title="Revenue up 15% today"
                  >
                    <template #shortcut>1h ago</template>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem icon="heroicons:users" title="3 new team invites pending">
                    <template #shortcut>3h ago</template>
                  </UiDropdownMenuItem>
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
                    <div class="flex flex-col gap-0.5">
                      <p class="text-sm font-medium">Olivia Rhye</p>
                      <p class="text-muted-foreground text-xs font-normal">olivia@ui-thing.com</p>
                    </div>
                  </UiDropdownMenuLabel>
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem icon="heroicons:user" title="Profile" />
                  <UiDropdownMenuItem icon="heroicons:cog-6-tooth" title="Settings" />
                  <UiDropdownMenuItem icon="heroicons:credit-card" title="Billing" />
                  <UiDropdownMenuItem icon="heroicons:users" title="Team" />
                  <UiDropdownMenuSeparator />
                  <UiDropdownMenuItem
                    icon="heroicons:question-mark-circle"
                    title="Help & support"
                  />
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

    <!-- ─── Page content ───────────────────────────────────────────────────── -->
    <UiContainer class="space-y-6 py-8">
      <!-- Welcome + search row -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
        class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Welcome back, Olivia</h1>
          <p class="text-muted-foreground mt-0.5 text-sm">
            Your current sales summary and activity.
          </p>
        </div>

        <!-- Search button (desktop) -->
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton
              variant="outline"
              class="text-muted-foreground hidden w-64 justify-between gap-2 sm:flex"
              @click="searchOpen = true"
            >
              <span class="flex items-center gap-2">
                <Icon name="heroicons:magnifying-glass" class="size-4" />
                Search
              </span>
              <UiKbd>⌘K</UiKbd>
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent><p>Search (⌘K)</p></UiTooltipContent>
        </UiTooltip>
      </Motion>

      <!-- Time tabs + date/filter row -->
      <Motion
        :initial="{ opacity: 0, y: 8 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.15, ease: 'easeOut' }"
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <!-- Time filter tabs -->
        <UiButtonGroup>
          <UiButton
            v-for="tab in timeTabs"
            :key="tab.value"
            variant="outline"
            size="sm"
            :class="activeTimeTab === tab.value ? 'bg-muted shadow-xs' : 'text-muted-foreground'"
            @click="activeTimeTab = tab.value"
          >
            <span class="hidden sm:inline">{{ tab.label }}</span>
            <span class="sm:hidden">{{ tab.short }}</span>
          </UiButton>
        </UiButtonGroup>

        <!-- Date + filter actions -->
        <div class="flex items-center gap-2">
          <!-- Date picker -->
          <UiDatepicker v-model.range="dateRange" :columns="2">
            <template #default="{ togglePopover }">
              <UiTooltip>
                <UiTooltipTrigger as-child>
                  <UiButton variant="outline" size="sm" class="gap-2" @click="togglePopover">
                    <Icon name="heroicons:calendar-days" class="text-muted-foreground size-4" />
                    <span class="hidden sm:inline">
                      {{ useDateFormat(dateRange.start, "MMM D, YYYY").value }} –
                      {{ useDateFormat(dateRange.end, "MMM D, YYYY").value }}
                    </span>
                    <span class="sm:hidden">Select dates</span>
                  </UiButton>
                </UiTooltipTrigger>
                <UiTooltipContent><p>Select date range</p></UiTooltipContent>
              </UiTooltip>
            </template>
          </UiDatepicker>

          <!-- Filters -->
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton variant="outline" size="sm" class="gap-2" @click="filterOpen = true">
                <Icon name="heroicons:adjustments-horizontal" class="size-4" />
                <span class="hidden sm:inline">Filters</span>
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Filter data</p></UiTooltipContent>
          </UiTooltip>

          <!-- Mobile search icon -->
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                variant="outline"
                size="icon-sm"
                class="sm:hidden"
                @click="searchOpen = true"
              >
                <Icon name="heroicons:magnifying-glass" class="size-4" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent><p>Search</p></UiTooltipContent>
          </UiTooltip>
        </div>
      </Motion>

      <!-- Stacked bar chart -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.2, ease: 'easeOut' }"
      >
        <div class="border-border/70 bg-card rounded-xl border p-5 shadow-xs">
          <UiApexchart
            :key="activeTimeTab"
            type="bar"
            height="280"
            :series="chartSeries"
            :options="chartOptions"
          />
        </div>
      </Motion>

      <!-- KPI metric cards -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.25, ease: 'easeOut' }"
        class="grid gap-4 sm:grid-cols-3"
      >
        <div
          v-for="kpi in kpiCards"
          :key="kpi.label"
          class="border-border/70 bg-card flex flex-col rounded-xl border shadow-xs"
        >
          <div class="flex items-start justify-between p-5 pb-2">
            <div class="space-y-1">
              <p class="text-muted-foreground text-sm">{{ kpi.label }}</p>
              <p class="text-2xl font-bold tracking-tight">{{ kpi.value }}</p>
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
                  <UiDropdownMenuItem icon="heroicons:eye" title="View full report" />
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </UiTooltip>
          </div>

          <div class="flex items-center gap-1.5 px-5 pb-3 text-xs">
            <span
              class="flex items-center gap-0.5 font-semibold"
              :class="
                kpi.positive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-500 dark:text-red-400'
              "
            >
              <Icon
                :name="
                  kpi.positive ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'
                "
                class="size-3.5"
              />
              {{ kpi.trend }}
            </span>
            <span class="text-muted-foreground">last mth</span>
          </div>

          <!-- Sparkline -->
          <div class="-mx-0.5 mt-auto -mb-0.5">
            <UiApexchart
              type="area"
              height="72"
              :series="[{ name: kpi.label, data: kpi.sparkData }]"
              :options="sparklineOptions(kpi.positive)"
            />
          </div>
        </div>
      </Motion>

      <!-- Recent activity -->
      <Motion
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.3, ease: 'easeOut' }"
        class="space-y-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-base font-semibold">Recent activity</h2>
          <div class="flex items-center gap-2">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton variant="outline" size="sm" @click="downloadActivity">Download</UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent><p>Download activity log</p></UiTooltipContent>
            </UiTooltip>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton size="sm">View all</UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent><p>View all activity</p></UiTooltipContent>
            </UiTooltip>
          </div>
        </div>

        <div class="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <div
            v-for="item in activityFeed"
            :key="item.name + item.product"
            class="flex items-center gap-3"
          >
            <div class="relative shrink-0">
              <UiAvatar
                :src="item.avatar"
                :alt="item.name"
                :fallback="item.name[0]"
                class="size-9"
              />
              <span
                v-if="item.online"
                class="border-background absolute right-0 bottom-0 size-2.5 rounded-full border-2 bg-emerald-500"
              />
            </div>
            <div class="min-w-0 flex-1 text-sm leading-snug">
              <span class="font-medium">{{ item.name }}</span>
              <span v-if="item.time" class="text-muted-foreground ml-1 text-xs">{{
                item.time
              }}</span>
              <p class="text-muted-foreground">
                Purchased
                <button class="font-medium" :style="{ color: 'var(--color-primary)' }">
                  {{ item.product }}
                </button>
              </p>
            </div>
          </div>
        </div>
      </Motion>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import type { ApexOptions } from "apexcharts";
  import { Motion } from "motion-v";

  // ─── Navigation ─────────────────────────────────────────────────────────────
  const navItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  // ─── Upgrade dialog ──────────────────────────────────────────────────────────
  const upgradeOpen = ref(false);
  const selectedPlan = ref("pro");

  const plans = [
    {
      id: "free",
      name: "Free",
      tagline: "For individuals and small teams",
      price: 0,
      features: [
        "5 projects",
        "Basic analytics",
        "2 team members",
        "1 GB storage",
        "Email support",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For growing teams and businesses",
      price: 29,
      features: [
        "Unlimited projects",
        "Advanced analytics",
        "15 team members",
        "50 GB storage",
        "Priority support",
      ],
    },
  ];

  const submitUpgrade = () => {
    upgradeOpen.value = false;
    useSonner(selectedPlan.value === "pro" ? "Upgraded to Pro 🎉" : "Staying on Free plan", {
      description:
        selectedPlan.value === "pro"
          ? "Your plan has been upgraded. Enjoy unlimited access!"
          : "You can upgrade at any time from Settings.",
    });
  };

  // ─── Filter dialog ────────────────────────────────────────────────────────────
  const filterOpen = ref(false);

  const filterChannels = reactive([
    { key: "direct", label: "Direct", checked: true },
    { key: "organic", label: "Organic search", checked: true },
    { key: "referral", label: "Referral", checked: false },
    { key: "email", label: "Email", checked: false },
    { key: "social", label: "Social media", checked: false },
  ]);

  const filterStatuses = reactive([
    { key: "active", label: "Active", checked: true },
    { key: "inactive", label: "Inactive", checked: false },
    { key: "pending", label: "Pending", checked: false },
  ]);

  const filterProducts = reactive([
    { key: "courses", label: "Courses", checked: true },
    { key: "templates", label: "Templates", checked: true },
    { key: "mockups", label: "Mockups", checked: false },
    { key: "guides", label: "Guides", checked: false },
  ]);

  const resetFilters = () => {
    filterChannels.forEach((c) => (c.checked = false));
    filterStatuses.forEach((s) => (s.checked = false));
    filterProducts.forEach((p) => (p.checked = false));
  };

  const applyFilters = () => {
    filterOpen.value = false;
    useSonner("Filters applied", {
      description: "The dashboard has been updated with your filter selection.",
    });
  };

  // ─── Command / search dialog ─────────────────────────────────────────────────
  const searchOpen = ref(false);
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      searchOpen.value = true;
    }
  };
  onMounted(() => document.addEventListener("keydown", handleKeydown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeydown));

  // ─── Date range ───────────────────────────────────────────────────────────────
  const dateRange = ref({ start: new Date("2025-01-10"), end: new Date("2025-01-16") });

  // ─── Time tabs + stacked bar chart ────────────────────────────────────────────
  const timeTabs = [
    { value: "12m", label: "12 months", short: "12m" },
    { value: "30d", label: "30 days", short: "30d" },
    { value: "7d", label: "7 days", short: "7d" },
    { value: "24h", label: "24 hours", short: "24h" },
  ];
  const activeTimeTab = ref("12m");

  const chartDataByTab: Record<
    string,
    { categories: string[]; series: { name: string; data: number[] }[] }
  > = {
    "12m": {
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
      series: [
        { name: "2025", data: [65, 72, 68, 80, 85, 92, 98, 88, 96, 102, 110, 122] },
        { name: "2024", data: [48, 55, 52, 62, 68, 74, 78, 70, 78, 84, 90, 98] },
        { name: "2023", data: [32, 38, 35, 44, 50, 56, 58, 52, 60, 66, 70, 78] },
        { name: "Series 4", data: [18, 22, 20, 26, 28, 32, 34, 28, 34, 38, 40, 46] },
      ],
    },
    "30d": {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { name: "2025", data: [280, 312, 295, 334] },
        { name: "2024", data: [218, 242, 228, 260] },
        { name: "2023", data: [155, 178, 162, 188] },
        { name: "Series 4", data: [86, 100, 90, 112] },
      ],
    },
    "7d": {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "2025", data: [38, 52, 46, 60, 72, 56, 42] },
        { name: "2024", data: [30, 42, 36, 48, 58, 44, 34] },
        { name: "2023", data: [22, 30, 26, 34, 42, 32, 24] },
        { name: "Series 4", data: [12, 16, 14, 20, 24, 18, 14] },
      ],
    },
    "24h": {
      categories: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
      series: [
        { name: "2025", data: [4, 2, 8, 24, 42, 55, 46, 28] },
        { name: "2024", data: [3, 2, 6, 19, 34, 44, 36, 22] },
        { name: "2023", data: [2, 1, 4, 14, 24, 32, 26, 16] },
        { name: "Series 4", data: [1, 1, 3, 8, 14, 18, 15, 10] },
      ],
    },
  };

  const chartSeries = computed(() => chartDataByTab[activeTimeTab.value].series);

  const chartOptions = computed<ApexOptions>(() => ({
    chart: {
      type: "bar",
      stacked: true,
      background: "transparent",
      toolbar: { show: false },
      parentHeightOffset: 0,
      animations: { enabled: true, speed: 350, easing: "easeinout" },
    },
    colors: [
      "var(--color-primary)",
      "color-mix(in oklab, var(--color-primary) 70%, white)",
      "color-mix(in oklab, var(--color-primary) 45%, white)",
      "color-mix(in oklab, var(--color-primary) 22%, white)",
    ],
    plotOptions: {
      bar: { columnWidth: "55%", borderRadius: 3, borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    grid: {
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 0, right: 0 },
    },
    xaxis: {
      categories: chartDataByTab[activeTimeTab.value].categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -4,
      markers: { size: 6 },
    },
    tooltip: { shared: true, intersect: false },
  }));

  // ─── KPI cards ───────────────────────────────────────────────────────────────
  const kpiCards = [
    {
      label: "Today's revenue",
      value: "$1,280",
      trend: "15%",
      positive: true,
      sparkData: [22, 28, 24, 32, 30, 38, 35, 40, 36, 44, 48, 52, 58, 62],
    },
    {
      label: "Today's orders",
      value: "14",
      trend: "10%",
      positive: false,
      sparkData: [30, 28, 32, 25, 22, 28, 20, 18, 22, 16, 14, 18, 12, 10],
    },
    {
      label: "Avg. order value",
      value: "$91.42",
      trend: "20%",
      positive: true,
      sparkData: [55, 58, 54, 60, 64, 62, 68, 72, 70, 78, 82, 86, 88, 92],
    },
  ];

  const sparklineOptions = (positive: boolean): ApexOptions => ({
    chart: {
      type: "area",
      background: "transparent",
      sparkline: { enabled: true },
      parentHeightOffset: 0,
      animations: { enabled: false },
    },
    stroke: { width: 2, curve: "smooth" },
    colors: [positive ? "#10b981" : "#ef4444"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: positive ? 0.18 : 0.12,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    tooltip: { enabled: false },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  });

  // ─── Activity actions ─────────────────────────────────────────────────────────
  const downloadActivity = () => {
    useSonner("Downloading records…", {
      description: "Your activity records are being prepared and will download shortly.",
    });
  };

  // ─── Activity feed ────────────────────────────────────────────────────────────
  const activityFeed = [
    {
      name: "Demi Wikinson",
      product: "Webflow 101",
      avatar: "https://i.pravatar.cc/150?img=1",
      online: true,
      time: undefined,
    },
    {
      name: "Drew Cano",
      product: "The Figma Dashboard Bundle",
      avatar: "https://i.pravatar.cc/150?img=8",
      online: false,
      time: "3 hours ago",
    },
    {
      name: "Aliah Lane",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=2",
      online: true,
      time: undefined,
    },
    {
      name: "Zahir Mays",
      product: "The Figma Dashboard Bundle",
      avatar: "https://i.pravatar.cc/150?img=9",
      online: false,
      time: "4 hours ago",
    },
    {
      name: "Lana Steiner",
      product: "Figma Mockups",
      avatar: "https://i.pravatar.cc/150?img=3",
      online: true,
      time: undefined,
    },
    {
      name: "Rene Wells",
      product: "The Design Handbook",
      avatar: "https://i.pravatar.cc/150?img=10",
      online: false,
      time: "4 hours ago",
    },
    {
      name: "Candice Wu",
      product: "Webflow 101",
      avatar: "https://i.pravatar.cc/150?img=4",
      online: false,
      time: undefined,
    },
    {
      name: "Joshua Wilson",
      product: "Phone 13 Mockups",
      avatar: "https://i.pravatar.cc/150?img=11",
      online: false,
      time: "4 hours ago",
    },
    {
      name: "Ava Wright",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=5",
      online: false,
      time: undefined,
    },
    {
      name: "Lori Bryson",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=12",
      online: false,
      time: "4 hours ago",
    },
    {
      name: "Koray Okumus",
      product: "SEO Masterclass",
      avatar: "https://i.pravatar.cc/150?img=6",
      online: false,
      time: undefined,
    },
    {
      name: "Loki Bright",
      product: "Figma Mockups",
      avatar: "https://i.pravatar.cc/150?img=13",
      online: false,
      time: "5 hours ago",
    },
    {
      name: "Andi Lane",
      product: "The Guide to Backlinks",
      avatar: "https://i.pravatar.cc/150?img=7",
      online: true,
      time: undefined,
    },
    {
      name: "Anita Cruz",
      product: "The Guide to Backlinks",
      avatar: "https://i.pravatar.cc/150?img=14",
      online: false,
      time: "6 hours ago",
    },
  ];
</script>
