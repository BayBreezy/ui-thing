<template>
  <div class="not-prose mb-10">
    <UiBreadcrumbs :items="items" class="mb-6" />
    <div class="flex flex-wrap items-start justify-between gap-4">
      <h1 class="text-4xl leading-none font-bold">{{ page?.title }}</h1>
      <DocsHeaderLinks />
    </div>
    <p v-if="page?.description" class="mt-3 mb-6 text-lg text-muted-foreground">
      {{ page?.description }}
    </p>
    <div v-if="page?.links && page?.links?.length" class="not-prose flex flex-wrap gap-2">
      <template v-for="(link, i) in page?.links" :key="i">
        <UiBadge
          :href="link?.href"
          target="_blank"
          variant="outline"
          size="md"
          class="transition-colors duration-300"
        >
          <Icon
            v-if="link?.icon"
            :name="link.icon"
            class="size-3.5 shrink-0 text-muted-foreground"
          />{{ link?.title }}
        </UiBadge>

        <br />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { ContentCollectionItem } from "@nuxt/content";
  import { compact, startCase } from "lodash-es";

  const props = defineProps<{
    page: ContentCollectionItem;
  }>();

  const items = computed(() => {
    const starting = startCase(compact(props.page?.path?.split("/"))[0] || "");
    const title = startCase(props.page?.title || "");
    return [{ label: starting }, { label: title }];
  });
</script>
