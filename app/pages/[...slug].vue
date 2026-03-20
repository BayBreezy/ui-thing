<template>
  <div
    :class="[
      toc && toc.links && toc.links.length && !isBlocksPage
        ? 'xl:grid-cols-[1fr_250px]'
        : 'xl:grid-cols-1',
    ]"
    class="xl:grid xl:gap-5"
  >
    <!-- Page content -->
    <div
      class="mx-auto prose prose-base max-w-none min-w-0 py-5 xl:container dark:prose-invert prose-headings:scroll-mt-16 prose-headings:tracking-tight prose-h2:mt-6 prose-h2:border-b prose-h2:pb-3 first:prose-h2:mt-10 prose-a:decoration-primary prose-a:decoration-wavy prose-a:underline-offset-2 prose-a:hover:text-primary prose-pre:my-0 prose-pre:rounded-sm prose-pre:p-2 prose-pre:px-0 prose-pre:text-base"
    >
      <DocsHeader v-if="page" :page />
      <ContentRenderer
        v-if="page"
        :value="page"
        :data="{
          siteUrl: SITE_URL,
        }"
      />
      <DocsFooter />
    </div>
    <!-- Table of contents for current page -->

    <aside
      v-if="toc && toc.links && toc.links.length && !isBlocksPage"
      class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] xl:block"
    >
      <UiScrollArea type="auto" class="h-full">
        <div class="flex flex-col gap-5 p-5">
          <p class="text-sm font-semibold">On this page</p>
          <UiScrollspy smooth mode="multiple" :offset="80">
            <DocsTocRail>
              <DocsToclink :links="toc.links" />
            </DocsTocRail>
          </UiScrollspy>

          <p class="text-sm font-semibold">Extra stuff</p>
          <DocsExtraStuff />
        </div>
      </UiScrollArea>
    </aside>
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const { contentPage: page } = await useDocPage();

  const toc = computed(() => {
    if (!page) return;
    return page?.body?.toc;
  });

  // Check if a page starts with `/blocks/` The sidenave will be removed if this is true
  const isBlocksPage = computed(() => route.path.startsWith("/blocks/"));

  useSeoMeta({
    title: page?.title,
    titleTemplate: `%s | ${SITE_NAME}`,
    description: page?.description,
    keywords: SITE_KEYWORDS.join(", "),
    ogTitle: page?.title,
    ogDescription: page?.description,
    twitterTitle: page?.title,
    twitterDescription: page?.description,
    twitterCard: "summary_large_image",
    ogUrl: `${SITE_URL}${route.path}`,
  });

  defineOgImage("UIThing", {
    title: page?.title,
    description: page?.description,
  });
</script>
