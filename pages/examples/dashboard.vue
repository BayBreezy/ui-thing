<template>
  <div class="py-5 min-[1440px]:container max-[1440px]:px-10">
    <div class="rounded-md border bg-background shadow">
      <div class="flex flex-col">
        <ExamplesDashboardHeader />
        <div class="flex-1 space-y-4 p-8 pt-6">
          <div class="flex items-center justify-between space-y-2">
            <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div class="flex items-center space-x-2">
              <div>
                <UIDatepicker :columns="2" v-model.range="date">
                  <template #default="{ togglePopover }">
                    <UIButton
                      variant="outline"
                      :class="['w-[260px] justify-start text-left']"
                      @click="togglePopover"
                    >
                      <Icon name="lucide:calendar" class="h-4 w-4" />
                      {{ format(date.start, "MMM dd, yyyy") }} -
                      {{ format(date.end, "MMM dd, yyyy") }}
                    </UIButton>
                  </template>
                </UIDatepicker>
              </div>
              <UIButton>Download</UIButton>
            </div>
          </div>

          <!-- Tabs for page content -->
          <UITabs defaultValue="overview" class="space-y-4">
            <UITabsList>
              <template v-for="(t, i) in tabItems" :key="i">
                <UITabsTrigger :value="t.title.toLowerCase()" :disabled="t.disabled">{{
                  t.title
                }}</UITabsTrigger>
              </template>
            </UITabsList>

            <UITabsContent value="overview" class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <template v-for="(s, i) in statusCards" :key="i">
                  <UICard>
                    <UICardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                      <UICardTitle class="text-sm font-medium"> {{ s.title }} </UICardTitle>
                      <Icon :name="s.icon" class="h-4 w-4 text-muted-foreground" />
                    </UICardHeader>
                    <UICardContent>
                      <div class="text-2xl font-bold">{{ s.amount }}</div>
                      <p class="text-xs text-muted-foreground">{{ s.subtext }}</p>
                    </UICardContent>
                  </UICard>
                </template>
              </div>
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <UICard class="col-span-4" title="Overview">
                  <template #content>
                    <UICardContent class="h-full px-4">
                      <div class="h-[80%]" ref="chart"></div>
                    </UICardContent>
                  </template>
                </UICard>
                <UICard
                  class="col-span-3"
                  title="Recent Sales"
                  description="You made 265 sales this month."
                >
                  <template #content>
                    <UICardContent>
                      <div class="space-y-8">
                        <template v-for="(r, i) in recentSales" :key="i">
                          <div class="flex items-center">
                            <UIAvatar
                              class="h-9 w-9"
                              :src="r.avatar"
                              alt="Avatar"
                              :fallback="r.initials"
                            />
                            <div class="ml-4 space-y-1">
                              <p class="text-sm font-medium leading-none">{{ r.name }}</p>
                              <p class="text-sm text-muted-foreground">{{ r.email }}</p>
                            </div>
                            <div class="ml-auto font-medium">{{ r.amount }}</div>
                          </div>
                        </template>
                      </div>
                    </UICardContent>
                  </template>
                </UICard>
              </div>
            </UITabsContent>
          </UITabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { _colors } from "#tailwind-config/theme";
  import { addDays, format } from "date-fns";
  definePageMeta({ layout: "examples" });
  useSeoMeta({ title: "Dashboard" });

  type DataRecord = { name: string; total: number };
  const chart = ref<HTMLDivElement | null>(null);

  onMounted(async () => {
    const XYContainer = (await import("@unovis/ts")).XYContainer;
    const Axis = (await import("@unovis/ts")).Axis;
    const GroupedBar = (await import("@unovis/ts")).GroupedBar;
    const Tooltip = (await import("@unovis/ts")).Tooltip;

    const tooltip = new Tooltip({
      horizontalPlacement: "right",
      triggers: {
        [GroupedBar.selectors.bar]: (d: DataRecord) =>
          `<span class='text-sm font-medium'>${d.name}: ${new Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(d.total)}</span>`,
      },
    });
    const data: DataRecord[] = [
      {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
      {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000,
      },
    ];

    const bar = new GroupedBar<DataRecord>({
      x: (d, i) => i,
      y: (d) => d.total,
      color: "#adfa1d",
      barPadding: 0.05,
      roundedCorners: 4,
    });
    await nextTick(() => {
      new XYContainer(
        chart.value!,
        {
          height: "100%",
          components: [bar],
          xAxis: new Axis<DataRecord>({
            tickFormat: (d: number) => data[d].name,
            numTicks: data.length,
            gridLine: false,
            domainLine: false,
            tickLine: false,
          }),
          yAxis: new Axis<DataRecord>({
            gridLine: false,
            tickLine: false,
            domainLine: false,
          }),
          tooltip,
        },
        data
      );
    });
  });

  const date = ref({
    start: new Date(),
    end: addDays(new Date(), 30),
  });

  const tabItems = [
    { title: "Overview", disabled: false },
    { title: "Analytics", disabled: true },
    { title: "Reports", disabled: true },
    { title: "Notifications", disabled: true },
  ];
  const statusCards = [
    {
      title: "Total Revenue",
      icon: "lucide:dollar-sign",
      amount: "$45,231.89",
      subtext: "+20.1% from last month",
    },
    {
      title: "Subscriptions",
      icon: "lucide:users",
      amount: "+2350",
      subtext: "+180.1% from last month",
    },
    {
      title: "Sales",
      icon: "lucide:credit-card",
      amount: "+12,234",
      subtext: "+19% from last month",
    },
    {
      title: "Active Now",
      icon: "lucide:activity",
      amount: "+573",
      subtext: "+201 since last hour",
    },
  ];

  const recentSales = [
    {
      avatar: "https://avatar.vercel.sh/oliviamartin",
      initials: "OM",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
    },
    {
      avatar: "https://avatar.vercel.sh/jackson",
      initials: "JL",
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
    },
    {
      avatar: "https://avatar.vercel.sh/isabellanguyen",
      initials: "IN",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
    },
    {
      avatar: "https://avatar.vercel.sh/williamkim",
      initials: "WK",
      name: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
    },
    {
      avatar: "https://avatar.vercel.sh/sofiadavis",
      initials: "SD",
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
    },
  ];
</script>
