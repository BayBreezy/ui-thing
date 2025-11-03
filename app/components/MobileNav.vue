<template>
  <DefineNavItem v-slot="{ items }">
    <template v-for="(item, i) in items" :key="i">
      <template v-if="item.children && item.children.length">
        <div>
          <div class="flex items-center gap-2">
            <!-- <Icon v-if="item.icon" :name="item.icon" /> -->
            <p class="text-sm font-semibold">{{ item.title }}</p>
          </div>
          <div class="mt-2 flex flex-col pl-2">
            <RenderNavItem :items="item.children" />
          </div>
        </div>
        <UiDivider type="dashed" />
      </template>
      <template v-else>
        <div class="inline-flex items-center">
          <NuxtLink
            :to="item.path"
            :target="item.target ? (item.target as string) : '_self'"
            class="inline-block rounded-md px-2 py-1 text-sm text-muted-foreground aria-[current=page]:mr-2 aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
            @click="mobileNavState = false"
          >
            {{ item.title }}
          </NuxtLink>
          <span v-if="item.label" class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
        </div>
      </template>
    </template>
  </DefineNavItem>
  <UiDrawer v-model:open="mobileNavState" should-scale-background>
    <UiDrawerContent hide-knob class="h-full border-0! bg-transparent">
      <UiDrawerTitle class="sr-only mb-1.5">Mobile Menu</UiDrawerTitle>
      <UiDrawerDescription class="sr-only">
        A list of navigation items for mobile
      </UiDrawerDescription>

      <div class="m-2 flex h-full flex-col overflow-y-auto rounded-xl border bg-background">
        <div
          class="sticky top-0 z-10 bg-linear-to-b from-background via-background via-70% to-background/70 to-90% px-4 pt-4 pb-6"
        >
          <UiVeeInput v-model="search" icon="lucide:search" placeholder="Search documentation..." />
        </div>
        <nav
          v-if="results && results.length"
          class="flex flex-col gap-4 px-4"
          aria-label="Mobile documentation navigation"
        >
          <RenderNavItem :items="results.map((item) => item.item)" />
        </nav>
        <template v-else>
          <UiEmpty>
            <UiEmptyHeader>
              <UiEmptyMedia variant="icon">
                <Icon name="lucide:inbox" class="size-8 text-muted-foreground" />
              </UiEmptyMedia>
              <UiEmptyTitle>No results found</UiEmptyTitle>
              <UiEmptyDescription>
                Try adjusting your search terms and try again.
              </UiEmptyDescription>
            </UiEmptyHeader>
          </UiEmpty>
        </template>
      </div>
    </UiDrawerContent>
  </UiDrawer>
</template>

<script lang="ts" setup>
  import { useFuse } from "@vueuse/integrations/useFuse";
  import type { ContentNavigationItem } from "@nuxt/content";

  const { content } = await useDocNavigation();
  const mobileNavState = useMobileNavState();

  const [DefineNavItem, RenderNavItem] = createReusableTemplate<{
    items: Array<ContentNavigationItem> | undefined;
  }>({ inheritAttrs: false });

  const search = shallowRef("");

  const { results } = useFuse(search, content || [], {
    matchAllWhenSearchEmpty: true,
    resultLimit: 10,
    fuseOptions: {
      minMatchCharLength: 2,
      threshold: 0.4,
      keys: ["children.title", "children.path"],
    },
  });
</script>
