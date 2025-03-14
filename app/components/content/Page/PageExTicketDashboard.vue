<template>
  <div class="mx-auto h-[calc(100vh-57px)] max-w-screen-2xl">
    <UiSplitter
      id="ticket-dashboard-splitter-group"
      direction="horizontal"
      @layout="layout = $event"
    >
      <UiSplitterPanel
        v-if="breakpoints.isGreaterOrEqual('md')"
        id="ticket-dashboard-splitter-panel-1"
        v-slot="{ isCollapsed }"
        collapsible
        :collapsed-size="xlUp ? 4 : lg ? 5 : 8"
        :min-size="xlUp ? 18 : lg ? 20 : 28"
        :default-size="layout[0]"
        :max-size="xlUp ? 26 : lg ? 30 : 40"
        class="group/splitter"
      >
        <UiScrollArea type="hover" class="h-full">
          <div
            class="sticky top-0 z-10 flex h-[65px] items-center gap-3 border-b bg-background/80 px-6 font-bold tracking-[6px] backdrop-blur group-data-[state=collapsed]/splitter:justify-center group-data-[state=collapsed]/splitter:px-2"
          >
            <!-- eslint-disable-next-line vue/html-self-closing -->
            <img
              class="h-5 shrink-0"
              src="https://img.logoipsum.com/361.svg"
              alt="Logoipsum Logo"
            />
            <span class="group-data-[state=collapsed]/splitter:hidden">MATRIX</span>
          </div>
          <nav
            class="flex flex-col px-6 pb-5 group-data-[state=collapsed]/splitter:items-center group-data-[state=collapsed]/splitter:px-2 group-data-[state=collapsed]/splitter:pt-4"
          >
            <template v-for="(menu, index) in sideMenu" :key="index">
              <p
                class="mb-4 ml-3 mt-4 text-xs tracking-widest text-muted-foreground group-data-[state=collapsed]/splitter:hidden"
              >
                {{ menu.heading }}
              </p>
              <ExamplesTicketDashboardNavMenu :is-collapsed :items="menu.items" />
              <UiDivider class="mt-4 group-data-[state=collapsed]/splitter:mb-4" />
            </template>
          </nav>
        </UiScrollArea>
      </UiSplitterPanel>
      <UiSplitterHandle
        v-if="breakpoints.isGreaterOrEqual('md')"
        id="ticket-dashboard-splitter-handle-1"
        with-handle
      />
      <UiSplitterPanel id="ticket-dashboard-splitter-panel-2" :default-size="layout[1]">
        <UiNavbar sticky>
          <UiContainer class="flex h-16 items-center justify-between lg:px-6">
            <div class="flex items-center gap-2">
              <UiButton
                size="icon-sm"
                variant="outline"
                class="md:hidden"
                @click="showMenu = !showMenu"
              >
                <Icon name="solar:hamburger-menu-line-duotone" class="size-5" />
              </UiButton>
              <UiButton
                size="sm"
                variant="outline"
                class="shrink-0 justify-between font-normal lg:w-[300px]"
              >
                <div class="flex items-center gap-3 text-sm">
                  <Icon name="solar:rounded-magnifer-line-duotone" class="size-4" />
                  <span class="hidden text-sm text-muted-foreground md:inline-block"
                    >Search here...</span
                  >
                </div>
                <UiKbd variant="solid" class="">{{ metaSymbol }}+J</UiKbd>
              </UiButton>
            </div>
            <div class="flex items-center gap-2">
              <UiButton
                v-tippy.bottom="'View Notifications'"
                variant="ghost"
                size="icon-xs"
                class="group shrink-0"
              >
                <Icon
                  name="solar:bell-line-duotone"
                  class="size-5 text-muted-foreground group-hover:text-foreground"
                />
              </UiButton>
              <UiButton
                v-tippy.bottom="'Add Record'"
                variant="ghost"
                size="icon-xs"
                class="group shrink-0"
              >
                <Icon
                  name="solar:add-circle-line-duotone"
                  class="size-5 text-muted-foreground group-hover:text-foreground"
                />
              </UiButton>
              <UiDivider orientation="vertical" class="ml-2 mr-4 hidden h-7 md:flex" />
              <div class="flex shrink-0 items-center gap-3">
                <UiAvatar
                  class="size-7"
                  src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                />
                <div class="hidden shrink-0 flex-col items-start text-xs md:flex">
                  <span class="font-medium">John Doe</span>
                  <span class="text-xs text-muted-foreground">Free Plan</span>
                </div>
              </div>
            </div>
          </UiContainer>
        </UiNavbar>
        <UiContainer class="h-full overflow-y-auto py-6 pb-20 lg:px-6">
          <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 class="text-2xl font-semibold lg:text-3xl">Dashboard</h1>
            <div class="flex items-center gap-3">
              <UiButton variant="outline" size="sm" class="shrink-0">
                <Icon name="solar:filter-line-duotone" class="size-4" />
                Filter
              </UiButton>
              <UiButton size="sm" class="shrink-0">
                <Icon name="solar:cloud-download-linear" class="size-4" />
                Export CSV</UiButton
              >
            </div>
          </div>
          <UiDivider class="mt-8" />
          <div class="my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="stat in stats"
              :key="stat.title"
              class="flex flex-col gap-4 border-b p-8 last:border-b-0 md:border-b-0 xl:border-r xl:last:border-r-0"
            >
              <p class="tracking-wide text-muted-foreground">{{ stat.title }}</p>
              <p class="text-4xl font-bold">{{ stat.value }}</p>
              <p class="text-muted-foreground">{{ stat.subTitle }}</p>
            </div>
          </div>
          <UiDivider class="mb-6" />
          <div class="flex flex-col justify-between gap-4 md:flex-row">
            <h3 class="text-xl font-semibold">Total Revenue</h3>
            <div class="flex items-center gap-2">
              <UiButton variant="outline" size="sm" class="shrink-0">
                <Icon name="solar:filter-line-duotone" class="size-4" />
                Filter
              </UiButton>
              <UiButton variant="outline" size="sm" class="shrink-0">
                <Icon name="solar:tuning-2-linear" class="size-4" />
                Manage
              </UiButton>
            </div>
          </div>

          <div class="mt-8">
            <UiChartLine
              :show-legend="false"
              :curve-type="CurveType.Cardinal"
              :data="data"
              index="year"
              :categories="['Income']"
              :y-formatter="
                (tick) => {
                  return typeof tick === 'number' ? shortenCurrency(tick) : '';
                }
              "
            />
          </div>
          <UiDivider class="my-8" />
          <div class="flex flex-col justify-between gap-4 md:flex-row">
            <h3 class="text-xl font-semibold">Avg. Tickets Created</h3>
            <div class="flex items-center gap-2">
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton variant="outline" size="sm" class="shrink-0">
                    {{ period }}
                    <Icon name="solar:alt-arrow-down-linear" class="size-3 text-muted-foreground" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuRadioGroup v-model="period">
                    <UiDropdownMenuRadioItem
                      v-for="n in ['Yearly', 'Monthly', 'Weekly']"
                      :key="n"
                      :value="n"
                      :text-value="n"
                      :title="n"
                    />
                  </UiDropdownMenuRadioGroup>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
          </div>
          <div class="my-6">
            <UiChartBar
              index="name"
              :data="ticketCreated"
              :categories="['Created', 'Solved']"
              type="stacked"
            />
          </div>
        </UiContainer>
      </UiSplitterPanel>
    </UiSplitter>

    <UiDrawer v-model:open="showMenu" should-scale-background>
      <UiDrawerContent>
        <UiDrawerTitle class="sr-only">Mobile Drawer</UiDrawerTitle>
        <UiDrawerDescription class="sr-only">Mobile Drawer Description</UiDrawerDescription>
        <nav
          class="flex flex-col overflow-y-auto px-6 pb-5 group-data-[state=collapsed]/splitter:items-center group-data-[state=collapsed]/splitter:px-2 group-data-[state=collapsed]/splitter:pt-4"
        >
          <template v-for="(menu, index) in sideMenu" :key="index">
            <p
              class="mb-4 ml-3 mt-4 text-xs tracking-widest text-muted-foreground group-data-[state=collapsed]/splitter:hidden"
            >
              {{ menu.heading }}
            </p>
            <ExamplesTicketDashboardNavMenu :items="menu.items" />
            <UiDivider class="mt-4 group-data-[state=collapsed]/splitter:mb-4" />
          </template>
        </nav>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { CurveType } from "@unovis/ts";
  import { breakpointsTailwind } from "@vueuse/core";
  import dayjs from "dayjs";

  const { metaSymbol } = useShortcuts();

  const breakpoints = useBreakpoints(breakpointsTailwind);
  const lg = breakpoints.lg.value;
  const xlUp = breakpoints.isGreaterOrEqual("xl");
  const showMenu = ref(false);
  const period = useState("ticket-dashboard-period", () => "Yearly");

  const layout = useCookie<number[]>("ticket-dashboard-layout", {
    default: () => [xlUp ? 22 : lg ? 25 : 35, xlUp ? 78 : lg ? 75 : 65],
  });

  // return the number formatted as K or M -> 1.2K or 1.2M
  const shortenCurrency = (v: number = 0) => {
    if (v < 1000) return "$" + v;
    if (v < 1000000) return "$" + (v / 1000).toFixed(1) + "K";
    return "$" + (v / 1000000).toFixed(1) + "M";
  };

  const { data } = await useAsyncData(
    async () => {
      return Array.from({ length: 10 }, (_, i) => {
        const year = dayjs().subtract(i, "year").format("YYYY");
        return {
          year,
          Income: faker.number.float({ min: 1000, max: 12000, fractionDigits: 2 }),
        };
      }).reverse();
    },
    { default: () => [] }
  );

  const { data: ticketCreated } = await useAsyncData(
    async () => {
      return Array.from({ length: 12 }, (_, i) => {
        const month = dayjs().month(i).format("MMM");
        return {
          name: month,
          Created: faker.number.int({ min: 5, max: 100 }),
          Solved: faker.number.int({ min: 5, max: 100 }),
        };
      });
    },
    { default: () => [] }
  );

  const stats = [
    { title: "Product Revenue", value: "$12.9K", subTitle: "+$1,243.87 Revenue" },
    { title: "Total Deals", value: "1,435", subTitle: "+463 Deals" },
    { title: "Created Tickets", value: "3,779", subTitle: "+1,097 Tickets" },
    { title: "Average Reply", value: "4:37", subTitle: "+0:23 Faster" },
  ];

  const sideMenu = [
    {
      heading: "MAIN",
      items: [
        { title: "Dashboard", icon: "solar:home-2-linear", link: "#" },
        { title: "Inbox", icon: "solar:inbox-line-line-duotone", link: "#" },
        { title: "Customers", icon: "solar:users-group-rounded-line-duotone", link: "#" },
        {
          title: "Tickets",
          icon: "solar:ticket-line-duotone",
          items: [
            { title: "All Tickets", link: "#", icon: "solar:slash-circle-line-duotone" },
            { title: "Sold Tickets", link: "#", icon: "solar:slash-circle-line-duotone" },
            { title: "New Tickets", link: "#", icon: "solar:slash-circle-line-duotone" },
          ],
        },
      ],
    },
    {
      heading: "TOOLS",
      items: [
        { title: "Insight", icon: "solar:lightbulb-bolt-line-duotone", link: "#" },
        { title: "Forum", icon: "solar:chat-line-line-duotone", link: "#" },
        { title: "Reports", icon: "solar:chart-2-bold-duotone", link: "#" },
      ],
    },
    {
      heading: "CONVERSATIONS",
      items: [
        { title: "Phone", icon: "solar:phone-calling-linear", link: "#" },
        { title: "Email", icon: "solar:letter-linear", link: "#" },
        { title: "SMS", icon: "solar:chat-round-call-line-duotone", link: "#" },
      ],
    },
  ];
</script>
