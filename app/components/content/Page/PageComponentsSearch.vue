<template>
  <div class="not-prose">
    <!-- Loading State -->
    <div v-if="pending" class="flex min-h-[400px] flex-col items-center justify-center">
      <p class="text-2xl font-semibold">Hold on a moment</p>
      <UiLoader class="size-14" />
    </div>
    <!-- Beam Bg with search bar inside -->
    <div
      v-else
      class="dark relative mb-10 flex h-[50dvh] w-full items-end overflow-hidden rounded-xl border"
    >
      <VueBitsBgBeam
        :beam-width="3"
        :beam-height="20"
        :beam-number="26"
        :speed="2"
        :rotation="20"
      />
      <div
        class="not-prose absolute z-10 flex size-full flex-col items-center justify-end gap-6 px-4 pb-16 text-center"
      >
        <h2 class="mb-10 text-xl font-semibold tracking-tight text-white md:mb-20 md:text-4xl">
          Search For Something
        </h2>
        <InspiraInputVanishingInput
          v-model="searchQuery"
          :vanish-after-submit="false"
          :placeholders
          :rotation-interval="5000"
        />
        <!-- Stats -->
        <div class="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <UiIcon name="lucide:box" class="size-4" />
            <span
              >{{ filteredComponents.length }}
              {{ filteredComponents.length === 1 ? "Component" : "Components" }}</span
            >
          </div>
          <div v-if="searchQuery" class="flex items-center gap-2">
            <UiIcon name="lucide:filter" class="size-4" />
            <span>Filtered results</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Components Grid -->
    <div
      v-if="!pending && filteredComponents && filteredComponents.length > 0"
      class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <NuxtLink
        v-for="component in filteredComponents"
        :key="component.path"
        :to="component.path"
        class="group relative overflow-hidden rounded-lg bg-card ring-1 ring-border transition-all hover:shadow-lg hover:shadow-primary/10 hover:ring-border/40"
      >
        <UiBorderBeam
          class="hidden from-transparent via-primary to-transparent group-hover:block"
          :size="200"
          :duration="10"
        />
        <div class="relative p-6">
          <div class="mb-3 flex items-start justify-between gap-2">
            <h3 class="font-semibold transition-colors group-hover:text-primary">
              {{ component.title }}
            </h3>
            <UiBadge v-if="component.label" variant="secondary" class="shrink-0">
              {{ component.label }}
            </UiBadge>
          </div>
          <p class="line-clamp-2 text-sm text-muted-foreground">
            {{ component.description }}
          </p>
        </div>

        <!-- Arrow indicator -->
        <div
          class="absolute right-4 bottom-4 flex size-8 items-center justify-center rounded-full border bg-background opacity-0 transition-all group-hover:opacity-100"
        >
          <UiIcon name="lucide:arrow-right" class="size-4" />
        </div>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <UiEmpty v-if="!pending && filteredComponents.length === 0" class="mt-20">
      <UiEmptyHeader>
        <UiEmptyMedia>
          <UiFancyIcon icon="lucide:search" theme="modern-neue" />
        </UiEmptyMedia>
        <UiEmptyTitle>No Component Found</UiEmptyTitle>
        <UiEmptyDescription>
          Try adjusting your search criteria or explore other sections.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton variant="outline" @click="searchQuery = ''">Clear Search</UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>

<script setup lang="ts">
  import { useFuse } from "@vueuse/integrations/useFuse.js";

  const searchQuery = ref("");

  // Query all components from the content collection
  const { data: components, pending } = await useAsyncData(
    "components-list",
    async () => {
      const items = await queryCollection("content")
        .where("path", "LIKE", "/components/%")
        .where("extension", "=", "md")
        .select("path", "title", "description", "label")
        .all();
      return items;
    },
    { default: () => [] }
  );

  const placeholders = [
    "Search components by title, description, or label...",
    "Looking for a button, card, or modal?",
    "Type to filter components...",
    "Find the perfect UI component...",
    "What component are you searching for?",
  ];

  // Filter components based on search query
  const { results } = useFuse(searchQuery, components, {
    matchAllWhenSearchEmpty: true,
    fuseOptions: {
      keys: ["path", "title", "description"],
      threshold: 0.3,
      isCaseSensitive: false,
    },
  });
  const filteredComponents = computed(() => results.value.map((result) => result.item));
</script>
