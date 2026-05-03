<template>
  <header class="bg-background/90 z-20 border-b backdrop-blur">
    <UiContainer class="flex h-16 items-center justify-between lg:h-20">
      <div class="flex items-center gap-10">
        <NuxtLink to="#" class="flex items-center gap-3">
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-6 rounded object-contain lg:h-8"
          />
          <span class="font-semibold lg:text-lg">UI Thing</span>
        </NuxtLink>
        <UiNavigationMenu as="nav" class="hidden items-center justify-start gap-8 lg:flex">
          <UiNavigationMenuList class="gap-2">
            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child>
                <UiButton to="#" variant="ghost" size="sm"> Home</UiButton>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
            <template v-for="l in links" :key="l.title">
              <UiNavigationMenuItem>
                <UiNavigationMenuTrigger class="h-9 px-3 text-sm capitalize" :title="l.title" />
                <UiNavigationMenuContent class="p-0">
                  <div class="bg-background w-[360px] shadow">
                    <ul class="flex flex-col gap-3 p-3">
                      <li v-for="(item, k) in l.items" :key="k">
                        <UiNavigationMenuLink as-child>
                          <NuxtLink
                            to="#"
                            class="group hover:bg-muted/80 focus-visible:ring-ring/50 dark:hover:bg-muted/20 flex flex-row gap-4 rounded-md p-3 transition focus-visible:ring-2 focus-visible:outline-none"
                          >
                            <Icon :name="item.icon" class="text-primary mt-px h-5 w-5 shrink-0" />
                            <div class="flex flex-col gap-1.5 leading-none">
                              <p class="text-sm font-semibold">{{ item.name }}</p>
                              <p class="text-muted-foreground text-sm" v-html="item.description" />
                            </div>
                          </NuxtLink>
                        </UiNavigationMenuLink>
                      </li>
                    </ul>
                    <div
                      class="bg-muted/20 dark:bg-muted/5 col-span-full flex items-center justify-center py-5"
                    >
                      <NuxtLink
                        class="text-primary flex items-center gap-2 text-sm font-semibold hover:underline"
                        to="#"
                        >Learn more <Icon class="shrink-0" name="lucide:arrow-right"
                      /></NuxtLink>
                    </div>
                  </div>
                </UiNavigationMenuContent>
              </UiNavigationMenuItem>
            </template>

            <UiNavigationMenuItem>
              <UiNavigationMenuLink as-child>
                <UiButton to="#" variant="ghost" size="sm">Pricing</UiButton>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>
      <div class="lg:hidden">
        <UiSheet>
          <UiSheetTrigger as-child>
            <UiButton variant="ghost" size="icon-sm">
              <Icon name="lucide:menu" class="h-5 w-5" />
            </UiButton>
            <UiSheetContent class="w-[90%] p-0">
              <template #content>
                <UiSheetTitle class="sr-only" title="Mobile menu" />
                <UiSheetDescription class="sr-only" description="Mobile menu" />
                <UiSheetX class="z-20" />

                <UiScrollArea class="h-full p-5">
                  <div class="flex flex-col gap-2">
                    <UiButton variant="ghost" class="justify-start text-base" to="#">Home</UiButton>

                    <template v-for="l in links" :key="l.title">
                      <UiCollapsible>
                        <UiCollapsibleTrigger as-child>
                          <UiButton
                            variant="ghost"
                            class="w-full justify-start text-base capitalize *:data-[state=open]:-rotate-180"
                            to="#"
                            >{{ l.title }}
                            <Icon name="lucide:chevron-down" class="ml-auto size-4 transition"
                          /></UiButton>
                        </UiCollapsibleTrigger>
                        <UiCollapsibleContent
                          class="data-[state=closed]:animate-none data-[state=open]:p-3 data-[state=open]:pt-0"
                        >
                          <div class="mt-5">
                            <ul class="flex w-full flex-col gap-5">
                              <li v-for="item in l.items" :key="item.name">
                                <NuxtLink
                                  :to="item.href"
                                  class="hover:bg-muted/80 focus-visible:ring-ring/50 flex gap-4 rounded-md p-3 transition focus-visible:ring-2 focus-visible:outline-none"
                                >
                                  <Icon
                                    :name="item.icon"
                                    class="text-primary mt-px h-5 w-5 shrink-0"
                                  />
                                  <div class="flex flex-col gap-1.5 leading-none">
                                    <p class="text-sm font-semibold">{{ item.name }}</p>
                                  </div>
                                </NuxtLink>
                              </li>
                            </ul>
                          </div>
                        </UiCollapsibleContent>
                      </UiCollapsible>
                    </template>
                    <UiButton variant="ghost" class="justify-start text-base" to="#"
                      >Pricing</UiButton
                    >

                    <UiGradientDivider class="my-5" />

                    <ul class="grid grid-cols-2 gap-x-3 gap-y-5 px-4">
                      <li v-for="(m, j) in miniLinks" :key="j">
                        <NuxtLink class="py-2" :to="m.href">{{ m.name }}</NuxtLink>
                      </li>
                    </ul>
                    <UiGradientDivider class="my-5" />
                    <UiButton to="#">Sign up</UiButton>
                    <UiButton variant="outline" to="#">Log in</UiButton>
                  </div>
                </UiScrollArea>
              </template>
            </UiSheetContent>
          </UiSheetTrigger>
        </UiSheet>
      </div>
      <div class="hidden items-center gap-3 lg:flex">
        <UiButton to="#" variant="ghost" size="sm">Log in</UiButton>
        <UiButton to="#" size="sm">Sign up</UiButton>
      </div>
    </UiContainer>
  </header>
</template>

<script lang="ts" setup>
  const miniLinks = [
    { name: "About us", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Legal", href: "#" },
    { name: "Support", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Sitemap", href: "#" },
    { name: "Cookie settings", href: "#" },
  ];
  const links = [
    {
      title: "products",

      items: [
        {
          name: "Blog",
          description: "The latest industry news, updates and info.",
          icon: "lucide:book",
          href: "#",
        },
        {
          name: "About us",
          description: "The latest industry news, updates and info.",
          icon: "lucide:info",
          href: "#",
        },
        {
          name: "Video tutorials",
          description: "All the information you need to know about our platform.",
          icon: "lucide:play-circle",
          href: "#",
        },
        {
          name: "Customer stories",
          description: "See how our customers use our platform to grow their business.",
          icon: "lucide:sparkle",
          href: "#",
        },
        {
          name: "Help center",
          description: "Get all your questions answered in our help center.",
          icon: "lucide:life-buoy",
          href: "#",
        },
      ],
    },
    {
      title: "resources",
      items: [
        {
          name: "About us",
          description: "The latest industry news, updates and info.",
          icon: "lucide:info",
          href: "#",
        },
        {
          name: "Customer stories",
          description: "See how our customers use our platform to grow their business.",
          icon: "lucide:sparkle",
          href: "#",
        },
        {
          name: "Video tutorials",
          description: "All the information you need to know about our platform.",
          icon: "lucide:play-circle",
          href: "#",
        },
        {
          name: "Help center",
          description: "Get all your questions answered in our help center.",
          icon: "lucide:life-buoy",
          href: "#",
        },
        {
          name: "Blog",
          description: "The latest industry news, updates and info.",
          icon: "lucide:book",
          href: "#",
        },
      ],
    },
  ];
</script>
