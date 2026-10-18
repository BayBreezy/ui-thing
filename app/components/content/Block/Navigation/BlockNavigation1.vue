<template>
  <!--
    Mega menu header with grouped columns and a featured card
    Features: Product and solutions columns with icons and descriptions, featured announcement card in the dropdown, sheet menu with accordions on small screens, sticky blurred bar
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
            <UiNavigationMenuItem>
              <UiNavigationMenuTrigger class="h-9 px-3 text-sm">Product</UiNavigationMenuTrigger>
              <UiNavigationMenuContent>
                <div class="grid w-[52rem] grid-cols-[1fr_1fr_15rem] gap-6 p-5">
                  <div v-for="group in groups" :key="group.title">
                    <p
                      class="text-muted-foreground mb-3 px-3 text-xs font-semibold tracking-wide uppercase"
                    >
                      {{ group.title }}
                    </p>
                    <ul class="space-y-1">
                      <li v-for="item in group.items" :key="item.title">
                        <UiNavigationMenuLink as-child>
                          <NuxtLink
                            to="#"
                            class="hover:bg-muted flex flex-row gap-3 rounded-lg p-3 transition-colors"
                          >
                            <UiFancyIcon
                              :icon="item.icon"
                              theme="modern"
                              color="gray"
                              size="sm"
                              class="size-9"
                            />
                            <span>
                              <span class="block text-sm font-medium">{{ item.title }}</span>
                              <span class="text-muted-foreground block text-xs">{{
                                item.description
                              }}</span>
                            </span>
                          </NuxtLink>
                        </UiNavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                  <NuxtLink
                    to="#"
                    class="from-primary to-primary/80 text-primary-foreground group relative flex flex-col justify-end overflow-hidden rounded-xl bg-linear-to-br p-5"
                  >
                    <div
                      class="bg-primary-foreground/15 absolute -top-10 -right-10 size-40 rounded-full blur-2xl"
                    />
                    <UiBadge variant="secondary" class="relative mb-3 w-fit">New</UiBadge>
                    <p class="relative font-semibold">Introducing AI planning</p>
                    <p class="text-primary-foreground/75 relative mt-1 text-sm">
                      Turn goals into scoped work in seconds.
                    </p>
                    <span class="relative mt-4 flex items-center gap-1 text-sm font-medium">
                      Learn more
                      <Icon
                        name="lucide:arrow-right"
                        class="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </NuxtLink>
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
            <nav class="p-3" aria-label="Mobile">
              <UiCollapsible
                v-for="group in groups"
                :key="group.title"
                class="border-b last:border-b-0"
              >
                <UiCollapsibleTrigger
                  class="group flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-semibold"
                >
                  {{ group.title }}
                  <Icon
                    name="lucide:chevron-down"
                    class="size-4 transition-transform group-data-[state=open]:rotate-180"
                  />
                </UiCollapsibleTrigger>
                <UiCollapsibleContent>
                  <ul class="pb-2">
                    <li v-for="item in group.items" :key="item.title">
                      <NuxtLink
                        to="#"
                        class="hover:bg-muted flex items-center gap-3 rounded-md px-3 py-2.5 text-sm"
                        @click="open = false"
                      >
                        <Icon :name="item.icon" class="text-muted-foreground size-4" />
                        {{ item.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </UiCollapsibleContent>
              </UiCollapsible>
              <NuxtLink
                v-for="link in links"
                :key="link"
                to="#"
                class="hover:bg-muted block rounded-md px-3 py-3 text-sm font-semibold"
              >
                {{ link }}
              </NuxtLink>
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
  const links = ["Pricing", "Docs", "Company"];
  const groups = [
    {
      title: "Platform",
      items: [
        {
          title: "Analytics",
          description: "Understand how people use your product.",
          icon: "lucide:chart-no-axes-combined",
        },
        {
          title: "Automations",
          description: "Hand repetitive work to workflows.",
          icon: "lucide:workflow",
        },
        {
          title: "Integrations",
          description: "Connect the tools you already use.",
          icon: "lucide:plug",
        },
      ],
    },
    {
      title: "Solutions",
      items: [
        {
          title: "For startups",
          description: "Move fast without the overhead.",
          icon: "lucide:rocket",
        },
        {
          title: "For enterprise",
          description: "Security and control at scale.",
          icon: "lucide:building-2",
        },
        {
          title: "For agencies",
          description: "Manage every client in one place.",
          icon: "lucide:briefcase",
        },
      ],
    },
  ];
</script>
