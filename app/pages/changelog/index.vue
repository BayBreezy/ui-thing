<template>
  <UiNavbar sticky>
    <UiContainer class="flex h-16 items-center justify-between">
      <DocsLogo />
      <DocsHeader />
    </UiContainer>
  </UiNavbar>

  <UiContainer class="mx-auto max-w-5xl py-8 md:py-16">
    <div class="mx-auto max-w-2xl text-center">
      <h1 class="leading-tighter text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
        Changelog
      </h1>
      <p class="text-muted-foreground mt-3 text-lg text-balance">
        See what's new, updated, and fixed in UI Thing.
      </p>
      <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
        <UiButton href="/changelog.xml" external variant="outline" size="sm">
          <Icon name="lucide:rss" />
          RSS Feed
        </UiButton>
        <UiButton href="/api/changelog" external variant="outline" size="sm">
          <Icon name="lucide:braces" />
          API
        </UiButton>
        <UiButton variant="outline" size="sm" @click="paletteOpen = true">
          <Icon name="lucide:search" />
          Search
          <UiKbd class="ml-2">/</UiKbd>
        </UiButton>
      </div>
    </div>

    <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
      <UiBadge
        v-for="option in categoryOptions"
        :key="option.value ?? 'all'"
        :variant="activeCategory === option.value ? option.badge : 'outline'"
        class="cursor-pointer select-none"
        @click="activeCategory = activeCategory === option.value ? null : option.value"
      >
        {{ option.label }}
      </UiBadge>
      <UiDivider orientation="vertical" class="h-5" />
      <UiBadge
        :variant="breakingOnly ? 'destructive' : 'outline'"
        class="cursor-pointer gap-1 select-none"
        @click="breakingOnly = !breakingOnly"
      >
        <Icon name="lucide:alert-triangle" class="size-3" />
        Breaking changes only
      </UiBadge>
    </div>

    <section v-if="!activeCategory && !breakingOnly && latestEntries.length" class="mt-12">
      <h2 class="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
        Latest updates
      </h2>
      <div class="space-y-6">
        <ChangelogCard
          v-for="entry in latestEntries"
          :key="entry.slug"
          :entry="entry"
          variant="full"
        />
      </div>
    </section>

    <section class="mt-16">
      <h2 class="text-muted-foreground mb-4 text-sm font-medium tracking-wide uppercase">
        Browse all updates
      </h2>

      <UiEmpty v-if="!filteredEntries.length">
        <UiEmptyHeader>
          <UiEmptyMedia>
            <UiFancyIcon icon="lucide:search-x" theme="modern-neue" />
          </UiEmptyMedia>
          <UiEmptyTitle>No matching entries</UiEmptyTitle>
          <UiEmptyDescription>
            Try a different category or clear the breaking-changes filter.
          </UiEmptyDescription>
        </UiEmptyHeader>
        <UiEmptyContent>
          <UiButton variant="outline" @click="clearFilters">Clear filters</UiButton>
        </UiEmptyContent>
      </UiEmpty>

      <template v-else>
        <div class="grid gap-4 sm:grid-cols-2">
          <ChangelogCard
            v-for="entry in visibleEntries"
            :key="entry.slug"
            :entry="entry"
            variant="compact"
            @select="openSheet"
          />
        </div>
        <div v-if="visibleEntries.length < filteredEntries.length" class="mt-6 flex justify-center">
          <UiButton variant="outline" @click="visibleCount += PAGE_SIZE">Load more</UiButton>
        </div>
      </template>
    </section>
  </UiContainer>

  <ChangelogCommandPalette v-model:open="paletteOpen" :entries="entries" />

  <UiSheet v-model:open="sheetOpen">
    <UiSheetContent side="right" class="w-full overflow-y-auto sm:max-w-xl">
      <template v-if="selectedEntry">
        <UiSheetHeader>
          <UiSheetTitle :title="selectedEntry.title" />
          <UiSheetDescription :description="formatChangelogDate(selectedEntry.date)" />
        </UiSheetHeader>
        <div class="px-4 pb-6">
          <ChangelogDetail :entry="selectedEntry" />
          <UiButton
            :href="`/changelog/${selectedEntry.slug}`"
            variant="link"
            size="sm"
            class="mt-4 h-auto p-0"
          >
            View full page
          </UiButton>
        </div>
      </template>
    </UiSheetContent>
  </UiSheet>
</template>

<script lang="ts" setup>
  import {
    CHANGELOG_CATEGORIES,
    formatChangelogDate,
    type ChangelogCategory,
    type ChangelogEntry,
  } from "@/utils/changelog";

  definePageMeta({ layout: "blank" });

  const PAGE_SIZE = 12;

  const route = useRoute();
  const { data: entries } = await useChangelogEntries();
  const { markAsViewed } = useChangelogViewed();

  onMounted(markAsViewed);

  const activeCategory = ref<ChangelogCategory | null>(null);
  const breakingOnly = ref(false);
  const visibleCount = ref(PAGE_SIZE);
  const paletteOpen = ref(false);
  const sheetOpen = ref(false);
  const selectedEntry = ref<ChangelogEntry | null>(null);

  defineShortcuts({
    "/": () => {
      paletteOpen.value = true;
    },
  });

  const categoryOptions = (Object.keys(CHANGELOG_CATEGORIES) as ChangelogCategory[]).map(
    (value) => ({
      value,
      ...CHANGELOG_CATEGORIES[value],
    })
  );

  const latestEntries = computed(() => entries.value.slice(0, 4));

  const filteredEntries = computed(() => {
    return entries.value.filter((entry) => {
      if (activeCategory.value && entry.category !== activeCategory.value) return false;
      if (breakingOnly.value && !entry.breaking) return false;
      return true;
    });
  });

  const visibleEntries = computed(() => filteredEntries.value.slice(0, visibleCount.value));

  watch([activeCategory, breakingOnly], () => {
    visibleCount.value = PAGE_SIZE;
  });

  function clearFilters() {
    activeCategory.value = null;
    breakingOnly.value = false;
  }

  function openSheet(entry: ChangelogEntry) {
    selectedEntry.value = entry;
    sheetOpen.value = true;
  }

  const title = "Changelog";
  const description = "See what's new, updated, and fixed in UI Thing.";

  useSeoMeta({
    title,
    titleTemplate: `%s | ${SITE_NAME}`,
    description,
    keywords: SITE_KEYWORDS.join(", "),
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: "summary_large_image",
    ogUrl: `${SITE_URL}${route.path}`,
  });

  useSeo({ title, description, lang: "en" });

  defineOgImage("Docs.takumi", { title, description });
</script>
