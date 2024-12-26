<template>
  <!-- Page content -->
  <div
    class="prose prose-lg mx-auto w-full min-w-0 max-w-none py-5 dark:prose-invert lg:prose-base prose-headings:scroll-mt-16 prose-headings:tracking-tight prose-h2:mt-6 prose-h2:border-b prose-h2:pb-3 first:prose-h2:mt-10 prose-a:decoration-primary prose-a:decoration-wavy prose-a:underline-offset-2 hover:prose-a:text-primary prose-pre:text-lg lg:prose-pre:text-base"
  >
    <DocsHeader v-if="page" :page />
    <ContentRenderer v-if="page" :value="page" />
    <DocsFooter />
  </div>
  <!-- Table of contents for current page -->
  <ClientOnly>
    <aside
      v-if="toc && toc.links && toc.links.length"
      class="sticky top-14 z-20 hidden h-[calc(100dvh-57px)] overflow-y-auto border-l bg-card text-card-foreground xl:block"
    >
      <div class="p-5">
        <p class="mb-5 text-sm font-semibold">Page contents</p>
        <DocsToclink :set-active="setActive" :active-id="activeId" :links="toc.links" />
      </div>
    </aside>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { useActiveScroll } from "vue-use-active-scroll";
  import type { Targets } from "vue-use-active-scroll";

  const route = useRoute();
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection("content").path(route.path).first();
  });
  const toc = computed(() => {
    if (!page.value) return;
    return page.value?.body?.toc;
  });

  const targets = computed(() =>
    toc.value?.links?.flatMap(({ id, children = [] }: any) => [
      id,
      ...children.map(({ id }: { id: string }) => id),
    ])
  );

  const { activeId, setActive } = useActiveScroll(targets as Targets, {
    replaceHash: true,
    overlayHeight: 80,
  });
</script>
