<template>
  <!--
    Header with compact dropdown menus
    Features: Narrow single column dropdowns with icons and descriptions, learn more footer links, active page state, sheet menu with grouped links on small screens
  -->
  <header class="bg-background/90 sticky top-0 z-20 border-b backdrop-blur">
    <UiContainer class="flex h-16 items-center justify-between gap-6">
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
            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child>
                <UiButton to="#" variant="ghost" size="sm" class="bg-muted">Home</UiButton>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem v-for="menu in menus" :key="menu.title">
              <UiNavigationMenuTrigger class="h-9 px-3 text-sm">{{
                menu.title
              }}</UiNavigationMenuTrigger>
              <UiNavigationMenuContent>
                <ul class="w-80 p-2">
                  <li v-for="item in menu.items" :key="item.title">
                    <UiNavigationMenuLink as-child>
                      <NuxtLink
                        to="#"
                        class="hover:bg-muted flex flex-row gap-3 rounded-lg p-3 transition-colors"
                      >
                        <Icon :name="item.icon" class="text-primary mt-0.5 size-5 shrink-0" />
                        <span>
                          <span class="block text-sm font-medium">{{ item.title }}</span>
                          <span class="text-muted-foreground block text-xs">{{
                            item.description
                          }}</span>
                        </span>
                      </NuxtLink>
                    </UiNavigationMenuLink>
                  </li>
                  <li class="mt-1 border-t p-1 pt-2">
                    <NuxtLink
                      to="#"
                      class="hover:bg-muted flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium"
                    >
                      Learn more
                      <Icon name="lucide:arrow-right" class="size-4" />
                    </NuxtLink>
                  </li>
                </ul>
              </UiNavigationMenuContent>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child>
                <UiButton to="#" variant="ghost" size="sm">Pricing</UiButton>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>

      <div class="flex items-center gap-2">
        <UiButton variant="ghost" size="sm" class="hidden sm:inline-flex">Log in</UiButton>
        <UiButton size="sm" class="hidden sm:inline-flex">Sign up</UiButton>
        <UiSheet v-model:open="open">
          <UiSheetTrigger as-child>
            <UiButton variant="outline" size="icon" class="lg:hidden" aria-label="Open menu">
              <Icon name="lucide:menu" class="size-5" />
            </UiButton>
          </UiSheetTrigger>
          <UiSheetContent side="right" class="w-[88%] overflow-y-auto p-0 sm:max-w-sm">
            <UiSheetTitle class="sr-only" title="Menu" />
            <UiSheetDescription class="sr-only" description="Site navigation" />
            <UiSheetX class="z-20" />
            <div class="border-b p-5 text-lg font-semibold">{{ props.name }}</div>
            <nav class="space-y-5 p-5" aria-label="Mobile">
              <NuxtLink to="#" class="block text-sm font-semibold" @click="open = false"
                >Home</NuxtLink
              >
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
                      <Icon :name="item.icon" class="text-primary size-4" />
                      {{ item.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <NuxtLink to="#" class="block text-sm font-semibold" @click="open = false"
                >Pricing</NuxtLink
              >
            </nav>
            <div class="grid grid-cols-2 gap-3 border-t p-5">
              <UiButton variant="outline">Log in</UiButton>
              <UiButton>Sign up</UiButton>
            </div>
          </UiSheetContent>
        </UiSheet>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const open = ref(false);
  const menus = [
    {
      title: "Products",
      items: [
        { title: "Boards", description: "Plan and track work visually.", icon: "lucide:kanban" },
        { title: "Docs", description: "Write and share knowledge.", icon: "lucide:file-text" },
        { title: "Roadmaps", description: "Align everyone on what's next.", icon: "lucide:map" },
        {
          title: "Insights",
          description: "Measure what your team ships.",
          icon: "lucide:chart-line",
        },
      ],
    },
    {
      title: "Resources",
      items: [
        { title: "Blog", description: "News, tips and product updates.", icon: "lucide:newspaper" },
        { title: "Guides", description: "Step by step walkthroughs.", icon: "lucide:book-open" },
        {
          title: "Community",
          description: "Ask questions and share ideas.",
          icon: "lucide:messages-square",
        },
        {
          title: "Help center",
          description: "Answers to every question.",
          icon: "lucide:life-buoy",
        },
      ],
    },
  ];
</script>
