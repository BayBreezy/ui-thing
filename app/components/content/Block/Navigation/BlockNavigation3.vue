<template>
  <header class="z-20 border-b bg-background/90 backdrop-blur">
    <UiContainer class="flex h-16 items-center justify-between lg:h-20">
      <div class="flex items-center gap-10">
        <NuxtLink to="#" class="flex items-center gap-3">
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            src="/icon.png"
            fit="contain"
            alt="Company Logo"
            title="Company Logo"
            class="h-6 object-contain lg:h-8"
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
            <UiNavigationMenuItem>
              <UiNavigationMenuTrigger class="h-9 px-3 text-sm capitalize" title="Blogs" />
              <UiNavigationMenuContent>
                <div class="bg-background ring-1 ring-muted lg:w-[750px] xl:w-[1000px]">
                  <ul class="grid w-full grid-cols-3 flex-col gap-5 px-4 py-5 xl:grid-cols-3">
                    <li v-for="b in 9" :key="b">
                      <UiNavigationMenuLink as-child>
                        <NuxtLink
                          to="#"
                          class="group flex gap-4 rounded-md p-3 transition hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:hover:bg-muted/20"
                        >
                          <div class="h-[80px] w-[800px] overflow-hidden rounded-lg shadow-sm">
                            <!-- eslint-disable-next-line vue/html-self-closing -->
                            <img
                              loading="lazy"
                              :src="`http://unsplash.it/400/90?random=${b}&gravity=center.webp`"
                              alt="Random blog image"
                              width="400"
                              height="90"
                              class="h-full w-[400px] object-cover transition hover:scale-110 group-hover:scale-110"
                            />
                          </div>
                          <div class="flex flex-col gap-1.5 leading-none">
                            <p class="text-sm font-semibold">Auto layout explained</p>
                            <p class="line-clamp-2 overflow-ellipsis text-sm text-muted-foreground">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                              voluptatum, voluptate, quibusdam, quia voluptas quod exercitationem
                              quos quas voluptatibus quidem
                            </p>
                          </div>
                        </NuxtLink>
                      </UiNavigationMenuLink>
                    </li>
                  </ul>
                  <div
                    class="col-span-full flex items-center justify-center bg-muted/20 py-5 dark:bg-muted/5"
                  >
                    <NuxtLink class="font-semibold text-primary hover:underline" to="#"
                      >View all blog posts <icon name="lucide:arrow-right"
                    /></NuxtLink>
                  </div>
                </div>
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

                    <UiCollapsible>
                      <UiCollapsibleTrigger as-child>
                        <UiButton
                          variant="ghost"
                          class="w-full justify-start text-base capitalize *:data-[state=open]:-rotate-180"
                          to="#"
                          >Blogs
                          <Icon name="lucide:chevron-down" class="ml-auto h-4 w-4 transition"
                        /></UiButton>
                      </UiCollapsibleTrigger>
                      <UiCollapsibleContent
                        class="data-[state=closed]:animate-none data-[state=open]:p-3 data-[state=open]:pt-0"
                      >
                        <div class="mt-5">
                          <ul class="flex w-full flex-col gap-5">
                            <li v-for="b in 3" :key="b">
                              <NuxtLink
                                to="#"
                                class="flex flex-col gap-5 rounded-md transition hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:hover:bg-muted/20"
                              >
                                <div class="h-[200px] w-full overflow-hidden rounded-lg shadow-sm">
                                  <!-- eslint-disable-next-line vue/html-self-closing -->
                                  <img
                                    :src="`http://unsplash.it/400/210?random=${b}&gravity=center.webp`"
                                    alt="Random blog image"
                                    width="400"
                                    loading="lazy"
                                    height="200"
                                    class="h-full w-full object-cover transition hover:scale-110 group-hover:scale-110"
                                  />
                                </div>
                                <div class="flex flex-col gap-1.5 leading-none">
                                  <p class="line-clamp-1 overflow-ellipsis font-semibold">
                                    Auto layout explained
                                  </p>
                                  <p
                                    class="line-clamp-2 overflow-ellipsis text-sm text-muted-foreground"
                                  >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod
                                    exercitationem quos quas voluptatibus quidem
                                  </p>
                                </div>
                              </NuxtLink>
                            </li>
                          </ul>
                        </div>
                      </UiCollapsibleContent>
                    </UiCollapsible>

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
</script>
