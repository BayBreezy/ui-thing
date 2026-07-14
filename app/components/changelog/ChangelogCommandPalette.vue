<template>
  <UiCommandDialog
    v-model:open="open"
    title="Search Changelog"
    description="Jump to any changelog entry"
  >
    <UiCommandInput placeholder="Search changelog..." @update:model-value="onSearch" />
    <UiCommandList>
      <UiCommandEmpty>No changelog entries found.</UiCommandEmpty>
      <template v-for="group in groupedResults" :key="group.year">
        <UiCommandGroup :heading="String(group.year)">
          <UiCommandItem
            v-for="entry in group.entries"
            :key="entry.slug"
            :value="entry.slug"
            class="items-start px-3 py-2"
            @select="onSelect(entry)"
          >
            <Icon
              :name="CHANGELOG_CATEGORIES[entry.category].icon"
              class="text-muted-foreground/70 mt-0.5 size-4 shrink-0"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-foreground truncate font-medium">{{ entry.title }}</p>
                <UiBadge v-if="entry.breaking" variant="destructive" size="sm">Breaking</UiBadge>
              </div>
              <p class="text-muted-foreground truncate text-xs">
                {{ formatChangelogDate(entry.date) }}
              </p>
            </div>
          </UiCommandItem>
        </UiCommandGroup>
      </template>
    </UiCommandList>
    <UiCommandFooter />
  </UiCommandDialog>
</template>

<script setup lang="ts">
  import { useFuse } from "@vueuse/integrations/useFuse.js";

  import {
    CHANGELOG_CATEGORIES,
    formatChangelogDate,
    type ChangelogEntry,
  } from "@/utils/changelog";

  const props = defineProps<{ entries: ChangelogEntry[] }>();

  const open = defineModel<boolean>("open", { default: false });

  const searchQuery = ref("");
  function onSearch(value: string | number | undefined) {
    searchQuery.value = `${value ?? ""}`;
  }

  const { results } = useFuse(searchQuery, () => props.entries, {
    matchAllWhenSearchEmpty: true,
    fuseOptions: {
      keys: ["title", "summary", "tags"],
      threshold: 0.3,
      isCaseSensitive: false,
    },
  });
  const filtered = computed(() => results.value.map((result) => result.item));

  const groupedResults = computed(() => {
    const groups = new Map<number, ChangelogEntry[]>();
    for (const entry of filtered.value) {
      const year = new Date(entry.date).getFullYear();
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year)!.push(entry);
    }
    return [...groups.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, entries]) => ({ year, entries }));
  });

  function onSelect(entry: ChangelogEntry) {
    open.value = false;
    navigateTo(`/changelog/${entry.slug}`);
  }
</script>
