<template>
  <!--
    Header with a content menu of post cards
    Features: Dropdown grid of featured posts with CSS gradient thumbnails and categories, view all link, no images needed, sheet menu on small screens
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
            <UiNavigationMenuItem v-for="link in links" :key="link">
              <UiNavigationMenuLink as-child>
                <UiButton to="#" variant="ghost" size="sm">{{ link }}</UiButton>
              </UiNavigationMenuLink>
            </UiNavigationMenuItem>
            <UiNavigationMenuItem>
              <UiNavigationMenuTrigger class="h-9 px-3 text-sm"
                >From the blog</UiNavigationMenuTrigger
              >
              <UiNavigationMenuContent>
                <div class="w-[50rem] p-5">
                  <div class="grid grid-cols-3 gap-4">
                    <NuxtLink v-for="post in posts" :key="post.title" to="#" class="group block">
                      <div
                        class="relative aspect-video overflow-hidden rounded-lg bg-linear-to-br"
                        :class="post.gradient"
                      >
                        <div
                          class="absolute -top-6 -right-6 size-24 rounded-full bg-white/25 blur-xl"
                        />
                        <Icon
                          :name="post.icon"
                          class="absolute right-3 bottom-3 size-7 text-white/90 transition-transform group-hover:scale-110"
                        />
                      </div>
                      <p class="text-muted-foreground mt-3 text-xs font-medium">
                        {{ post.category }}
                      </p>
                      <p
                        class="mt-1 text-sm font-semibold group-hover:underline group-hover:underline-offset-4"
                      >
                        {{ post.title }}
                      </p>
                      <p class="text-muted-foreground mt-1 line-clamp-2 text-xs">
                        {{ post.excerpt }}
                      </p>
                    </NuxtLink>
                  </div>
                  <div class="mt-5 flex justify-end border-t pt-4">
                    <NuxtLink
                      to="#"
                      class="flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      View all posts
                      <Icon name="lucide:arrow-right" class="size-4" />
                    </NuxtLink>
                  </div>
                </div>
              </UiNavigationMenuContent>
            </UiNavigationMenuItem>
          </UiNavigationMenuList>
        </UiNavigationMenu>
      </div>

      <div class="flex items-center gap-2">
        <UiButton variant="ghost" size="sm" class="hidden sm:inline-flex">Log in</UiButton>
        <UiButton size="sm" class="hidden sm:inline-flex">Subscribe</UiButton>
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
            <nav class="p-4" aria-label="Mobile">
              <NuxtLink
                v-for="link in links"
                :key="link"
                to="#"
                class="hover:bg-muted block rounded-md px-3 py-3 text-sm font-semibold"
                @click="open = false"
              >
                {{ link }}
              </NuxtLink>
              <p
                class="text-muted-foreground mt-4 mb-2 px-3 text-xs font-semibold tracking-wide uppercase"
              >
                From the blog
              </p>
              <NuxtLink
                v-for="post in posts"
                :key="post.title"
                to="#"
                class="hover:bg-muted flex items-center gap-3 rounded-md px-3 py-2.5"
                @click="open = false"
              >
                <span
                  class="flex size-10 shrink-0 items-center justify-center rounded-md bg-linear-to-br text-white"
                  :class="post.gradient"
                >
                  <Icon :name="post.icon" class="size-5" />
                </span>
                <span class="text-sm font-medium">{{ post.title }}</span>
              </NuxtLink>
            </nav>
            <div class="grid grid-cols-2 gap-3 border-t p-5">
              <UiButton variant="outline">Log in</UiButton>
              <UiButton>Subscribe</UiButton>
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
  const links = ["Home", "Pricing", "About"];
  const posts = [
    {
      title: "How we cut build times by 70%",
      category: "Engineering",
      excerpt: "A look at the caching and tooling changes behind faster deploys.",
      icon: "lucide:zap",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Designing for dark mode first",
      category: "Design",
      excerpt: "What we learned rebuilding every component with theme tokens.",
      icon: "lucide:moon",
      gradient: "from-sky-500 to-cyan-500",
    },
    {
      title: "A tour of the new dashboard",
      category: "Product",
      excerpt: "Filters, saved views and a calmer way to see your data.",
      icon: "lucide:layout-dashboard",
      gradient: "from-rose-500 to-orange-500",
    },
  ];
</script>
