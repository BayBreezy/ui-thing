<template>
  <UiNavbar sticky>
    <UiContainer class="flex h-16 items-center justify-between">
      <DocsLogo />
      <DocsHeader />
    </UiContainer>
  </UiNavbar>

  <UiContainer class="max-w-3xl py-8 md:py-16">
    <UiButton href="/changelog" variant="ghost" size="sm" class="mb-6">
      <Icon name="lucide:arrow-left" class="size-3" />
      Back to changelog
    </UiButton>

    <template v-if="entry">
      <h1 class="text-3xl font-semibold tracking-tight lg:text-4xl">{{ entry.title }}</h1>
      <p class="text-muted-foreground mt-2 text-sm">{{ formatChangelogDate(entry.date) }}</p>

      <div class="mt-6">
        <ChangelogDetail :entry="entry" />
      </div>

      <div
        v-if="previousEntry || nextEntry"
        class="mt-12 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-2"
      >
        <UiButton
          v-if="previousEntry"
          :href="`/changelog/${previousEntry.slug}`"
          variant="outline"
          class="h-auto flex-col items-start gap-1 py-3 text-left"
        >
          <span class="text-muted-foreground flex items-center gap-1 text-xs">
            <Icon name="lucide:arrow-left" class="size-3" />
            Newer
          </span>
          <span class="font-medium">{{ previousEntry.title }}</span>
        </UiButton>
        <UiButton
          v-if="nextEntry"
          :href="`/changelog/${nextEntry.slug}`"
          variant="outline"
          class="h-auto flex-col items-end gap-1 py-3 text-right sm:col-start-2"
        >
          <span class="text-muted-foreground flex items-center gap-1 text-xs">
            Older
            <Icon name="lucide:arrow-right" class="size-3" />
          </span>
          <span class="font-medium">{{ nextEntry.title }}</span>
        </UiButton>
      </div>
    </template>
  </UiContainer>
</template>

<script lang="ts" setup>
  import { formatChangelogDate } from "@/utils/changelog";

  definePageMeta({ layout: "blank" });

  const route = useRoute();
  const slug = computed(() => route.params.slug as string);

  const { data: entries } = await useChangelogEntries();

  const entryIndex = computed(() => entries.value.findIndex((e) => e.slug === slug.value));
  const entry = computed(() => (entryIndex.value === -1 ? null : entries.value[entryIndex.value]));

  if (!entry.value) {
    throw createError({ statusCode: 404, statusMessage: "Changelog entry not found" });
  }

  const previousEntry = computed(() =>
    entryIndex.value > 0 ? entries.value[entryIndex.value - 1] : null
  );
  const nextEntry = computed(() =>
    entryIndex.value < entries.value.length - 1 ? entries.value[entryIndex.value + 1] : null
  );

  const title = entry.value.title;
  const description = entry.value.summary;

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
