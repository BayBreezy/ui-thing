<template>
  <UiNavbar sticky>
    <UiContainer class="flex h-16 items-center justify-between">
      <DocsLogo />
      <DocsHeader />
    </UiContainer>
  </UiNavbar>

  <div
    class="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden [--customizer-width:--spacing(52)] [--gap:--spacing(4)] md:[--gap:--spacing(6)] 2xl:[--customizer-width:--spacing(56)]"
    :style="{ height: `calc(100svh - 4rem)` }"
  >
    <ClientOnly>
      <div
        data-slot="designer"
        class="flex min-h-0 flex-1 flex-col items-start gap-(--gap) p-(--gap) pt-[calc(var(--gap)*0.25)] md:flex-row-reverse"
      >
        <TypesetDocsPanel />
        <TypesetPreview />
        <TypesetCustomizer />
      </div>
      <template #fallback>
        <TypesetSkeleton />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  // Exactly one caller sets up the undo stack's recording watcher and its ⌘Z
  // shortcuts; every other component just reads the shared state.
  useTypesetHistory({ record: true });

  definePageMeta({ layout: "blank" });

  const route = useRoute();
  const title = "Typeset";
  const description = "Typography for markdown you don't control.";

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

  useSeo({
    title,
    description,
    lang: "en",
  });

  defineOgImage("Docs.takumi", {
    title,
    description,
  });
</script>
