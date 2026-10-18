<template>
  <!--
    Header with icon card dropdowns and a call to action footer
    Features: Dropdown of bordered feature cards with fancy icons, promo strip with a link at the bottom, resources dropdown, sheet menu on small screens
  -->
  <header class="bg-background/90 sticky top-0 z-20 border-b backdrop-blur">
    <UiContainer class="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
      <div class="flex items-center gap-8">
        <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            class="fill-primary h-6"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          {{ props.name }}
        </NuxtLink>

        <UiNavigationMenu as="nav" class="hidden lg:flex" aria-label="Main">
          <UiNavigationMenuList class="gap-1">
            <UiNavigationMenuItem v-for="menu in menus" :key="menu.title">
              <UiNavigationMenuTrigger class="h-9 px-3 text-sm">{{
                menu.title
              }}</UiNavigationMenuTrigger>
              <UiNavigationMenuContent>
                <div class="w-[44rem] p-4">
                  <ul class="grid grid-cols-2 gap-3">
                    <li v-for="item in menu.items" :key="item.title">
                      <UiNavigationMenuLink as-child>
                        <NuxtLink
                          to="#"
                          class="hover:border-ring/50 hover:bg-muted/50 group flex flex-row gap-4 rounded-xl border p-4 transition-colors"
                        >
                          <UiFancyIcon :icon="item.icon" theme="light" :color="item.color" />
                          <span>
                            <span class="block text-sm font-semibold">{{ item.title }}</span>
                            <span class="text-muted-foreground mt-0.5 block text-sm">{{
                              item.description
                            }}</span>
                          </span>
                        </NuxtLink>
                      </UiNavigationMenuLink>
                    </li>
                  </ul>
                  <div
                    class="bg-muted/60 mt-4 flex items-center justify-between rounded-xl px-4 py-3"
                  >
                    <p class="text-sm font-medium">{{ menu.cta }}</p>
                    <NuxtLink
                      to="#"
                      class="flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      Get in touch
                      <Icon name="lucide:arrow-right" class="size-4" />
                    </NuxtLink>
                  </div>
                </div>
              </UiNavigationMenuContent>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem v-for="link in links" :key="link">
              <UiNavigationMenuLink as-child>
                <UiButton to="#" variant="ghost" size="sm">{{ link }}</UiButton>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>

      <div class="flex items-center gap-2">
        <UiButton variant="ghost" size="sm" class="hidden sm:inline-flex">Log in</UiButton>
        <UiButton size="sm" class="hidden sm:inline-flex">Start free</UiButton>
        <UiSheet v-model:open="open">
          <UiSheetTrigger as-child>
            <UiButton variant="outline" size="icon" class="lg:hidden" aria-label="Open menu">
              <Icon name="lucide:menu" class="size-5" />
            </UiButton>
          </UiSheetTrigger>
          <UiSheetContent side="left" class="w-[88%] overflow-y-auto p-0 sm:max-w-sm">
            <UiSheetTitle class="sr-only" title="Menu" />
            <UiSheetDescription class="sr-only" description="Site navigation" />
            <UiSheetX class="z-20" />
            <div class="border-b p-5 text-lg font-semibold">{{ props.name }}</div>
            <nav class="space-y-6 p-5" aria-label="Mobile">
              <div v-for="menu in menus" :key="menu.title">
                <p class="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                  {{ menu.title }}
                </p>
                <ul class="space-y-1">
                  <li v-for="item in menu.items" :key="item.title">
                    <NuxtLink
                      to="#"
                      class="hover:bg-muted flex items-center gap-3 rounded-md px-2 py-2 text-sm"
                      @click="open = false"
                    >
                      <Icon :name="item.icon" class="size-4" />
                      {{ item.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <ul class="border-t pt-4">
                <li v-for="link in links" :key="link">
                  <NuxtLink
                    to="#"
                    class="hover:bg-muted block rounded-md px-2 py-2.5 text-sm font-semibold"
                    >{{ link }}</NuxtLink
                  >
                </li>
              </ul>
            </nav>
            <div class="grid grid-cols-2 gap-3 border-t p-5">
              <UiButton variant="outline">Log in</UiButton>
              <UiButton>Start free</UiButton>
            </div>
          </UiSheetContent>
        </UiSheet>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";

  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const open = ref(false);
  const links = ["Pricing", "Customers"];
  const menus: {
    title: string;
    cta: string;
    items: { title: string; description: string; icon: string; color: Color }[];
  }[] = [
    {
      title: "Features",
      cta: "Not sure where to start? Talk to our team.",
      items: [
        {
          title: "Dashboards",
          description: "Live views of what matters to you.",
          icon: "lucide:layout-dashboard",
          color: "info",
        },
        {
          title: "Workflows",
          description: "Automate the busywork away.",
          icon: "lucide:workflow",
          color: "warning",
        },
        {
          title: "Reports",
          description: "Schedule and share insights.",
          icon: "lucide:file-bar-chart",
          color: "success",
        },
        {
          title: "Security",
          description: "SSO, audit logs and fine grained roles.",
          icon: "lucide:shield-check",
          color: "error",
        },
      ],
    },
    {
      title: "Resources",
      cta: "Looking for a new career? Get in touch!",
      items: [
        {
          title: "Blog",
          description: "News, tips and product updates.",
          icon: "lucide:newspaper",
          color: "info",
        },
        {
          title: "Customer stories",
          description: "How teams grow with us.",
          icon: "lucide:sparkles",
          color: "warning",
        },
        {
          title: "Video tutorials",
          description: "Learn the product in minutes.",
          icon: "lucide:circle-play",
          color: "success",
        },
        {
          title: "Help center",
          description: "Answers to every question.",
          icon: "lucide:life-buoy",
          color: "primary",
        },
      ],
    },
  ];
</script>
