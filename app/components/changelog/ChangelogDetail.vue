<template>
  <div data-slot="changelog-detail" class="space-y-4">
    <div class="flex flex-wrap items-center gap-2">
      <UiBadge :variant="categoryMeta.badge" size="sm">
        <Icon :name="categoryMeta.icon" class="size-3" />
        {{ categoryMeta.label }}
      </UiBadge>
      <UiBadge v-if="entry.breaking" variant="destructive" size="sm">
        <Icon name="lucide:alert-triangle" class="size-3" />
        Breaking Change
      </UiBadge>
    </div>

    <div class="max-w-none">
      <MDC :value="entry.body" tag="div" />
    </div>

    <div v-if="entry.tags.length" class="flex flex-wrap gap-1.5">
      <UiBadge v-for="tag in entry.tags" :key="tag" variant="outline" size="sm">{{ tag }}</UiBadge>
    </div>

    <div v-if="entry.links.length" class="flex flex-wrap gap-4 border-t pt-3">
      <UiButton
        v-for="link in entry.links"
        :key="link.href"
        :href="link.href"
        variant="link"
        size="sm"
        class="h-auto p-0"
      >
        {{ link.label }}
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CHANGELOG_CATEGORIES, type ChangelogEntry } from "@/utils/changelog";

  const props = defineProps<{ entry: ChangelogEntry }>();

  const categoryMeta = computed(() => CHANGELOG_CATEGORIES[props.entry.category]);
</script>
