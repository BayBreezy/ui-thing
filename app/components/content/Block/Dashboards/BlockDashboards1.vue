<template>
  <div
    class="bg-background text-foreground min-h-screen [--color-primary:#8b5cf6] [--primary:#8b5cf6] [--radius:12px] [--ring:#8b5cf6]"
  >
    <!-- Top navigation -->
    <Motion
      as="header"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4, ease: 'easeOut' }"
      class="border-border/70 bg-background/85 sticky top-0 z-10 border-b backdrop-blur-md"
    >
      <UiContainer class="flex min-h-[4.5rem] items-center justify-between gap-4">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <div
              class="border-border/70 bg-muted flex size-10 items-center justify-center rounded-xl border shadow-xs"
            >
              <div
                class="size-5 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.95),rgba(255,255,255,0.2)_32%,transparent_34%),linear-gradient(135deg,var(--color-primary),color-mix(in_oklab,var(--color-primary)_40%,white))]"
              />
            </div>
            <div class="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span>UI Thing</span>
            </div>
          </div>

          <!-- Mobile nav popover -->
          <UiPopover class="lg:hidden">
            <UiPopoverTrigger as-child>
              <UiButton class="lg:hidden" variant="ghost" size="icon-sm">
                <Icon name="lucide:menu" class="size-4" />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="start" class="w-48 p-1">
              <UiButton
                v-for="item in navigationItems"
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
              v-for="item in navigationItems"
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

        <div class="flex items-center gap-2">
          <UiButton variant="outline" size="sm" class="hidden sm:inline-flex">
            <Icon name="lucide:sparkles" class="size-4" />
            Upgrade now
          </UiButton>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="lucide:settings-2" class="text-muted-foreground size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" side="left" class="w-64">
              <UiDropdownMenuLabel>Dashboard settings</UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuCheckboxItem v-model="compactMetrics" title="Compact KPI cards" />
              <UiDropdownMenuCheckboxItem v-model="emailAlerts" title="Email performance alerts" />
              <UiDropdownMenuCheckboxItem
                v-model="autoRefresh"
                title="Auto-refresh every 5 minutes"
              />
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="lucide:sliders-horizontal" title="Manage filters" />
              <UiDropdownMenuItem icon="lucide:users" title="Team permissions" />
              <UiDropdownMenuItem icon="lucide:keyboard" title="Keyboard shortcuts" shortcut="⌘/" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                <Icon name="lucide:bell" class="text-muted-foreground size-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" side="left" class="w-80">
              <UiDropdownMenuLabel class="flex items-center justify-between">
                <span>Notifications</span>
                <UiBadge variant="secondary" size="sm">3 new</UiBadge>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="lucide:shopping-cart" title="New order from Sienna Hewitt">
                <template #shortcut>2m ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem icon="lucide:triangle-alert" title="Refund requested for #26672">
                <template #shortcut>18m ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                icon="lucide:chart-column-big"
                title="Sales report is ready to review"
              >
                <template #shortcut>1h ago</template>
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem icon="lucide:badge-check" title="Mark all as read" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger>
              <UiAvatar
                :src="currentUser.avatar"
                :alt="currentUser.name"
                :fallback="currentUser.fallback"
              />
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" side="left" class="w-52">
              <UiDropdownMenuLabel>
                <div class="flex flex-col">
                  <p class="text-sm font-medium">{{ currentUser.name }}</p>
                  <p class="text-muted-foreground text-xs">{{ currentUser.email }}</p>
                </div>
              </UiDropdownMenuLabel>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem icon="lucide:user" title="Profile" />
                <UiDropdownMenuItem icon="lucide:settings" title="Settings" />
                <UiDropdownMenuItem icon="lucide:credit-card" title="Billing" />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem variant="destructive" icon="lucide:log-out" title="Sign out" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </UiContainer>
    </Motion>

    <UiContainer class="space-y-8 py-8 md:space-y-10 md:py-10">
      <!-- Welcome header -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.15, ease: 'easeOut' }"
        class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
      >
        <div class="flex items-center gap-4">
          <UiAvatar
            :src="currentUser.avatar"
            :alt="currentUser.name"
            :fallback="currentUser.fallback"
            class="size-14"
          />
          <div>
            <h1 class="text-3xl font-semibold tracking-tight md:text-[2rem]">
              Welcome back, {{ currentUser.firstName }}!
            </h1>

            <p class="text-muted-foreground mt-1 text-lg">
              <ClientOnly>
                {{ useDateFormat(new Date(), "DD MMMM, YYYY").value }}
              </ClientOnly>
            </p>
          </div>
        </div>
        <div class="w-full md:w-[380px]">
          <UiVeeInput icon="lucide:search" placeholder="Search dashboard..." />
        </div>
      </Motion>

      <!-- Range and date filters -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.25, ease: 'easeOut' }"
        class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <UiTabs v-model="activeRange">
          <UiTabsList class="border-border/70 bg-muted/30 border">
            <template v-for="item in ranges" :key="item">
              <UiTabsTrigger :value="item">{{ item }}</UiTabsTrigger>
            </template>
          </UiTabsList>
        </UiTabs>
        <UiDatepicker v-model.range="dateRange" :columns="2">
          <template #default="{ togglePopover }">
            <UiButton
              variant="outline"
              class="justify-start self-start text-left xl:self-auto"
              @click="togglePopover"
            >
              <Icon name="lucide:calendar-days" class="size-4" />
              {{ useDateFormat(dateRange.start, "MMM DD, YYYY").value }} -
              {{ useDateFormat(dateRange.end, "MMM DD, YYYY").value }}
            </UiButton>
          </template>
        </UiDatepicker>
      </Motion>

      <UiGradientDivider />

      <!-- KPI cards -->
      <Motion
        as="section"
        :variants="kpiContainerVariant"
        initial="initial"
        animate="animate"
        class="grid gap-5 lg:grid-cols-3"
      >
        <Motion
          v-for="metric in metrics"
          :key="metric.label"
          as-child
          :variants="kpiCardVariant"
          class="bg-card text-card-foreground relative overflow-hidden rounded-xl border shadow-sm"
        >
          <UiCard>
            <div
              :class="[
                'absolute inset-y-0 left-0 w-1',
                metric.trend === 'up'
                  ? 'bg-primary'
                  : metric.trend === 'down'
                    ? 'bg-red-500'
                    : 'bg-primary',
              ]"
            />
            <UiCardContent class="pl-8">
              <div class="flex items-start justify-between">
                <div class="flex-1 space-y-1">
                  <p class="text-muted-foreground text-sm font-medium">{{ metric.label }}</p>
                  <div class="flex items-baseline gap-2">
                    <h3 class="text-2xl font-bold tracking-tight">{{ metric.value }}</h3>
                    <span
                      :class="[
                        'text-sm font-medium',
                        metric.trend === 'up'
                          ? 'text-green-600 dark:text-green-500'
                          : metric.trend === 'down'
                            ? 'text-red-600 dark:text-red-500'
                            : 'text-muted-foreground',
                      ]"
                    >
                      {{ metric.change }}
                    </span>
                  </div>
                  <p class="text-muted-foreground text-xs">{{ metric.description }}</p>
                </div>
                <Icon :name="metric.icon" class="text-muted-foreground/50 size-8" />
              </div>
              <div class="mt-4 flex items-center gap-4 text-xs">
                <div class="flex items-center gap-1">
                  <div class="bg-primary size-2 rounded-full" />
                  <span class="text-muted-foreground">Current: {{ metric.current }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="bg-muted size-2 rounded-full" />
                  <span class="text-muted-foreground">Previous: {{ metric.previous }}</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </Motion>
      </Motion>

      <!-- Sales performance chart -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.45, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
          <UiCardHeader class="border-border/60 border-b pt-4 pb-3!">
            <UiCardTitle class="text-base font-semibold">Sales</UiCardTitle>
            <UiCardDescription>
              Total revenue generated in the selected date range, compared with the previous period.
            </UiCardDescription>
          </UiCardHeader>

          <UiCardContent class="space-y-8 py-6">
            <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p class="text-3xl font-semibold tracking-tight lg:text-5xl">$8,422.60</p>
                <p class="mt-3 flex items-center gap-2 lg:text-lg">
                  <span class="inline-flex items-center gap-1 font-medium text-emerald-600">
                    <Icon name="lucide:arrow-up" class="size-4" />
                    3.2%
                  </span>
                  <span class="text-muted-foreground">vs last 30 days</span>
                </p>
              </div>

              <UiTabs default-value="30 days">
                <UiTabsList class="border-border/70 bg-muted/30 border">
                  <UiTabsTrigger v-for="range in chartRanges" :key="range" :value="range">
                    {{ range }}
                  </UiTabsTrigger>
                </UiTabsList>
              </UiTabs>
            </div>

            <div class="bg-muted/20 h-[360px] overflow-hidden rounded-2xl p-2">
              <UiApexchart
                type="area"
                height="100%"
                :series="salesChartSeries"
                :options="salesChartOptions"
              />
            </div>
          </UiCardContent>
        </UiCard>
      </Motion>

      <!-- Orders table -->
      <Motion
        :initial="{ opacity: 0, y: 16 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: 0.1, ease: 'easeOut' }"
      >
        <UiCard class="border-border/70 gap-0 overflow-hidden py-0 shadow-xs">
          <UiCardHeader class="border-border/60 border-b py-4 pb-3!">
            <UiCardTitle class="text-base font-semibold">Orders</UiCardTitle>
            <UiCardDescription>
              Recent orders placed in the selected date range, compared with the previous period.
            </UiCardDescription>
          </UiCardHeader>

          <UiCardContent class="space-y-6 py-6">
            <!-- Orders summary and status tabs -->
            <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p class="text-3xl font-semibold tracking-tight lg:text-5xl">
                  {{ filteredOrders.length }}
                </p>
                <p class="mt-3 flex items-center gap-2 lg:text-lg">
                  <span class="inline-flex items-center gap-1 font-medium text-emerald-600">
                    <Icon name="lucide:arrow-up" class="size-4" />
                    8.6%
                  </span>
                  <span class="text-muted-foreground">vs last 30 days</span>
                </p>
              </div>

              <UiTabs v-model="activeOrderTab">
                <UiTabsList class="border-border/70 bg-muted/30 border">
                  <UiTabsTrigger v-for="tab in orderTabs" :key="tab" :value="tab">
                    {{ tab }}
                  </UiTabsTrigger>
                </UiTabsList>
              </UiTabs>
            </div>
          </UiCardContent>

          <!-- Orders data grid -->
          <div class="border-border/60 border-t">
            <UiTanStackTable
              :data="filteredOrders"
              :columns="orderColumns"
              :show-rows-per-page="false"
              :show-page-info="false"
              :show-pagination="false"
              :show-selected-count="false"
              :show-footer="true"
              :loading="ordersPending"
              :table-options="{ enableRowSelection: true }"
            >
              <template #select-header="{ table }">
                <UiCheckbox
                  aria-label="Select all orders"
                  :model-value="table.getIsAllPageRowsSelected()"
                  @update:model-value="table.toggleAllPageRowsSelected(!!$event)"
                />
              </template>

              <template #select-cell="{ row }">
                <UiCheckbox
                  :aria-label="`Select order ${row.original.id}`"
                  :model-value="row.getIsSelected()"
                  @update:model-value="row.toggleSelected(!!$event)"
                />
              </template>

              <template #status-cell="{ row }">
                <UiBadge
                  variant="outline"
                  size="sm"
                  class="h-7 gap-1 rounded-full px-2.5 text-[11px]"
                >
                  <span
                    :class="[
                      'size-1.5 rounded-full',
                      row.original.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500',
                    ]"
                  />
                  {{ row.original.status }}
                </UiBadge>
              </template>

              <template #rating-cell="{ row }">
                <UiRating
                  :model-value="row.original.rating"
                  size="sm"
                  filled-icon-class-name="fill-amber-400 text-amber-400"
                />
              </template>

              <template #customer-cell="{ row }">
                <UiAvatarLabelGroup
                  :src="row.original.avatar"
                  :alt="row.original.customer"
                  :fallback="row.original.initials"
                  :title="row.original.customer"
                  :subtitle="row.original.email"
                  size="sm"
                />
              </template>

              <template #actions-cell="{ row }">
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton variant="ghost" size="icon-sm" class="rounded-full">
                      <Icon name="lucide:ellipsis-vertical" class="text-muted-foreground size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="end" class="min-w-44">
                    <UiDropdownMenuItem
                      icon="lucide:eye"
                      title="View order"
                      @select="openOrderSheet(row.original)"
                    />
                    <UiDropdownMenuItem icon="lucide:receipt-text" title="Download invoice" />
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem
                      icon="lucide:rotate-ccw"
                      title="Refund order"
                      :disabled="row.original.status !== 'Paid'"
                      @select="openRefundDialog(row.original)"
                    />
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </template>

              <template #footer="{ table }">
                <div
                  class="border-border/60 text-muted-foreground flex w-full flex-col gap-4 border-t px-6 py-4 text-sm font-medium sm:flex-row sm:items-center sm:justify-between"
                >
                  <p>
                    Page {{ table.atoms.pagination.get().pageIndex + 1 }} of
                    {{ table.getPageCount() }}
                  </p>
                  <div class="flex items-center gap-3">
                    <UiButton
                      variant="outline"
                      size="sm"
                      :disabled="!table.getCanPreviousPage()"
                      @click="table.previousPage()"
                    >
                      Previous
                    </UiButton>
                    <UiButton
                      variant="outline"
                      size="sm"
                      :disabled="!table.getCanNextPage()"
                      @click="table.nextPage()"
                    >
                      Next
                    </UiButton>
                  </div>
                </div>
              </template>
            </UiTanStackTable>
          </div>
        </UiCard>
      </Motion>

      <!-- Refund confirmation dialog -->
      <UiAlertDialog v-model:open="showRefundDialog">
        <UiAlertDialogContent class="max-w-md">
          <UiAlertDialogHeader>
            <UiAlertDialogTitle>Refund this order?</UiAlertDialogTitle>
            <UiAlertDialogDescription>
              <template v-if="refundOrder">
                This will start a refund for order #{{ refundOrder.id }} placed by
                {{ refundOrder.customer }}. Confirm to continue.
              </template>
              <template v-else>Confirm to continue with the selected refund request.</template>
            </UiAlertDialogDescription>
          </UiAlertDialogHeader>
          <UiAlertDialogFooter>
            <UiAlertDialogCancel>Keep order</UiAlertDialogCancel>
            <UiAlertDialogAction variant="destructive" @click="confirmRefund">
              Confirm refund
            </UiAlertDialogAction>
          </UiAlertDialogFooter>
        </UiAlertDialogContent>
      </UiAlertDialog>

      <!-- Order details sheet -->
      <UiSheet v-model:open="showOrderSheet">
        <UiSheetContent side="right" translucent variant="floating" class="w-[90%] sm:max-w-xl">
          <UiSheetHeader>
            <UiSheetTitle>Order details</UiSheetTitle>
            <UiSheetDescription>
              Review the selected order, customer information, and fulfillment summary.
            </UiSheetDescription>
          </UiSheetHeader>

          <div v-if="selectedOrder" class="space-y-6 overflow-y-auto p-6">
            <UiCard class="border-border/70 shadow-xs">
              <UiCardContent class="space-y-5">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-muted-foreground text-sm font-medium">Order number</p>
                    <p class="mt-1 text-2xl font-semibold tracking-tight">
                      #{{ selectedOrder.id }}
                    </p>
                  </div>
                  <UiBadge
                    variant="outline"
                    size="sm"
                    class="h-7 gap-1 rounded-full px-2.5 text-[11px]"
                  >
                    <span
                      :class="[
                        'size-1.5 rounded-full',
                        selectedOrder.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-500',
                      ]"
                    />
                    {{ selectedOrder.status }}
                  </UiBadge>
                </div>

                <UiAvatarLabelGroup
                  :src="selectedOrder.avatar"
                  :alt="selectedOrder.customer"
                  :fallback="selectedOrder.initials"
                  :title="selectedOrder.customer"
                  :subtitle="selectedOrder.email"
                />

                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="border-border/70 bg-muted/20 rounded-xl border p-4">
                    <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      Amount
                    </p>
                    <p class="mt-2 text-xl font-semibold">{{ selectedOrder.amount }}</p>
                  </div>
                  <div class="border-border/70 bg-muted/20 rounded-xl border p-4">
                    <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                      Rating
                    </p>
                    <UiRating
                      :model-value="selectedOrder.rating"
                      class="mt-2"
                      filled-icon-class-name="fill-amber-400 text-amber-400"
                    />
                  </div>
                </div>
              </UiCardContent>
            </UiCard>

            <UiCard class="border-border/70 shadow-xs">
              <UiCardContent class="grid gap-4 sm:grid-cols-2">
                <div class="space-y-1.5">
                  <p class="text-muted-foreground text-sm font-medium">Placed on</p>
                  <p class="font-medium">{{ selectedOrder.date }}</p>
                </div>
                <div class="space-y-1.5">
                  <p class="text-muted-foreground text-sm font-medium">Payment method</p>
                  <p class="font-medium">Visa ending in {{ selectedOrder.id.slice(-4) }}</p>
                </div>
                <div class="space-y-1.5">
                  <p class="text-muted-foreground text-sm font-medium">Fulfillment</p>
                  <p class="font-medium">
                    {{ selectedOrder.status === "Paid" ? "Ready to ship" : "Refund pending" }}
                  </p>
                </div>
                <div class="space-y-1.5">
                  <p class="text-muted-foreground text-sm font-medium">Source</p>
                  <p class="font-medium">Online store</p>
                </div>
              </UiCardContent>
            </UiCard>

            <div class="border-border/70 bg-muted/20 rounded-2xl border border-dashed p-4">
              <p class="text-sm font-medium">Internal note</p>
              <p class="text-muted-foreground mt-2 text-sm leading-6">
                Customer activity and payment details look healthy. Consider following up with a
                shipping update if the order remains in this state for more than 24 hours.
              </p>
            </div>
          </div>
          <UiSheetX />
        </UiSheetContent>
      </UiSheet>
    </UiContainer>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import type { ColumnDef } from "@tanstack/vue-table";
  import type { ApexOptions } from "apexcharts";
  import dayjs from "dayjs";
  import { Motion } from "motion-v";
  import type { MotionProps } from "motion-v";

  import type { TanStackTableFeatures } from "~/components/Ui/TanStackTable.vue";

  const kpiContainerVariant: MotionProps["variants"] = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
  };

  const kpiCardVariant: MotionProps["variants"] = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  type Metric = {
    label: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
    description: string;
    icon: string;
    current: string;
    previous: string;
  };

  type Order = {
    id: string;
    date: string;
    status: "Paid" | "Refunded";
    amount: string;
    rating: number;
    customer: string;
    email: string;
    initials: string;
    avatar?: string;
  };

  const currentUser = {
    name: "Behon Baker",
    firstName: "Behon",
    email: "behon.baker@yahoo.com",
    avatar: "https://behonbaker.com/icon.png",
    fallback: "BB",
  };

  const navigationItems = [
    { label: "Home", active: false },
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Tasks", active: false },
    { label: "Reporting", active: false },
    { label: "Users", active: false },
  ];

  const ranges = ["Custom", "12 months", "30 days", "7 days", "24 hours"];
  const activeRange = ref("12 months");
  const compactMetrics = ref(true);
  const emailAlerts = ref(true);
  const autoRefresh = ref(false);
  const dateRange = useState(() => ({
    start: dayjs().toDate(),
    end: dayjs().add(7, "day").toDate(),
  }));

  const metrics: Metric[] = [
    {
      label: "Sales",
      value: "$2,114.40",
      change: "+2.4%",
      trend: "up",
      description: "Based on the last 30 days of completed purchases",
      icon: "lucide:badge-dollar-sign",
      current: "$2,114.40",
      previous: "$2,064.80",
    },
    {
      label: "Orders",
      value: "24",
      change: "+8.6%",
      trend: "up",
      description: "Confirmed orders compared with the previous period",
      icon: "lucide:shopping-bag",
      current: "24",
      previous: "22",
    },
    {
      label: "Average order value",
      value: "$88.10",
      change: "+6.0%",
      trend: "up",
      description: "Higher basket size driven by bundled product sales",
      icon: "lucide:chart-no-axes-column-increasing",
      current: "$88.10",
      previous: "$83.12",
    },
  ];

  const chartRanges = ["12 months", "30 days", "7 days", "24 hours"];
  const chartLabels = [
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
  ];

  const salesChartSeries = ref<ApexOptions["series"]>([
    {
      name: "Sales",
      data: [18, 21, 30, 34, 28, 31, 29, 24, 34, 32, 38, 41, 47, 45, 54],
    },
    {
      name: "Orders",
      data: [12, 15, 19, 23, 20, 18, 21, 17, 26, 24, 31, 29, 36, 33, 39],
    },
    {
      name: "Revenue target",
      data: [8, 10, 12, 16, 14, 13, 15, 14, 18, 19, 22, 24, 27, 28, 30],
    },
  ]);

  const salesChartOptions = ref<ApexOptions>({
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
    },
    colors: ["#8b5cf6", "#06b6d4", "#22c55e"],
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontWeight: 500,
      labels: {
        colors: "var(--color-muted-foreground)",
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.28,
        opacityTo: 0.03,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3, 2.5],
    },
    markers: {
      size: 0,
      hover: { size: 5 },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      borderColor: "color-mix(in oklab, var(--color-border) 70%, transparent)",
      strokeDashArray: 4,
      padding: {
        left: 12,
        right: 18,
        top: 10,
        bottom: 0,
      },
    },
    xaxis: {
      categories: chartLabels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        style: {
          colors: "var(--color-muted-foreground)",
          fontSize: "12px",
          fontFamily: "inherit",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      tickAmount: 4,
      labels: {
        show: false,
      },
    },
  });

  const orderTabs = ["All orders", "Paid", "Refunded"];
  const activeOrderTab = ref("All orders");
  const showOrderSheet = ref(false);
  const selectedOrder = ref<Order | null>(null);
  const showRefundDialog = ref(false);
  const refundOrder = ref<Order | null>(null);

  const orderColumns: ColumnDef<TanStackTableFeatures, Order>[] = [
    {
      id: "select",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: {
        class: {
          th: "w-12",
          td: "w-12",
        },
      },
    },
    {
      accessorKey: "id",
      header: "Order",
      cell: ({ row }) => `#${row.original.id}`,
    },
    {
      accessorKey: "date",
      header: "Date",
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
    },
    {
      id: "rating",
      accessorKey: "rating",
      header: "Rating",
      enableSorting: false,
    },
    {
      id: "customer",
      accessorKey: "customer",
      header: "Customer",
      enableSorting: false,
    },
    {
      id: "actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      meta: {
        class: {
          th: "w-12",
          td: "w-12 text-right",
        },
      },
    },
  ];

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const createOrder = (): Order => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: faker.string.numeric(5),
      date: dayjs(faker.date.between({ from: "2025-01-01", to: "2025-01-31" })).format(
        "MMM DD, YYYY"
      ),
      status: faker.helpers.weightedArrayElement([
        { value: "Paid" as const, weight: 8 },
        { value: "Refunded" as const, weight: 2 },
      ]),
      amount: currencyFormatter.format(
        faker.number.float({ min: 48, max: 240, fractionDigits: 2 })
      ),
      rating: faker.number.int({ min: 3, max: 5 }),
      customer: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      initials: `${firstName[0]}${lastName[0]}`,
      avatar: faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.85 }),
    };
  };

  const { data: ordersData, pending: ordersPending } = await useAsyncData<Order[]>(
    "block-dashboard1-orders",
    async () => Array.from({ length: 500 }, createOrder),
    {
      default: () => [],
    }
  );

  const orders = computed(() => ordersData.value ?? []);

  const filteredOrders = computed(() => {
    if (activeOrderTab.value === "All orders") {
      return orders.value;
    }

    return orders.value.filter((order) => order.status === activeOrderTab.value);
  });

  const openRefundDialog = (order: Order) => {
    refundOrder.value = order;
    showRefundDialog.value = true;
  };

  const openOrderSheet = (order: Order) => {
    selectedOrder.value = order;
    showOrderSheet.value = true;
  };

  const confirmRefund = () => {
    if (!refundOrder.value) return;

    useSonner.success("Refund started", {
      description: `Order #${refundOrder.value.id} for ${refundOrder.value.customer} has been queued for refund.`,
    });

    showRefundDialog.value = false;
    refundOrder.value = null;
  };
</script>
