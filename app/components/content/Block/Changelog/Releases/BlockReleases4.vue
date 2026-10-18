<template>
  <!--
    Changelog with tags and filters
    Features: Search, toggle chips for tags such as api, billing and dashboard that can be combined, entries grouped by month, a result count with a clear filters button and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-3xl font-bold tracking-tight">Product updates</h1>

      <div class="relative mt-6">
        <Icon
          name="lucide:search"
          class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput
          v-model="query"
          class="pl-9"
          placeholder="Search updates"
          aria-label="Search updates"
        />
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by tag">
        <UiButton
          v-for="tag in tags"
          :key="tag"
          size="sm"
          class="rounded-full"
          :variant="active.has(tag) ? 'default' : 'outline'"
          :aria-pressed="active.has(tag)"
          @click="toggle(tag)"
          >{{ tag }}</UiButton
        >
        <UiButton v-if="active.size || query" variant="ghost" size="sm" @click="clear"
          >Clear filters</UiButton
        >
      </div>
      <p class="text-muted-foreground mt-3 text-sm" aria-live="polite">
        {{ visible.length }} {{ visible.length === 1 ? "update" : "updates" }}
      </p>

      <div v-if="groups.length" class="mt-6 space-y-8" aria-live="polite">
        <section v-for="group in groups" :key="group.label" :aria-label="group.label">
          <h2 class="text-muted-foreground mb-3 text-sm font-semibold">{{ group.label }}</h2>
          <ul class="divide-y rounded-xl border">
            <li v-for="item in group.items" :key="item.id" class="px-5 py-4">
              <div class="flex flex-wrap items-center gap-2">
                <p class="font-medium">{{ item.title }}</p>
                <UiBadge v-for="tag in item.tags" :key="tag" variant="soft" shape="pill">{{
                  tag
                }}</UiBadge>
                <time class="text-muted-foreground ml-auto text-xs" :datetime="item.date">{{
                  shortDate(item.date)
                }}</time>
              </div>
              <p class="text-muted-foreground mt-1 text-sm">{{ item.body }}</p>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="mt-6 rounded-xl border border-dashed py-14 text-center" aria-live="polite">
        <Icon name="lucide:search-x" class="text-muted-foreground mx-auto size-6" />
        <p class="mt-2 text-sm font-medium">No updates match</p>
        <UiButton variant="link" size="sm" @click="clear">Clear filters</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Entry = { id: string; date: string; title: string; body: string; tags: string[] };

  const props = withDefaults(
    defineProps<{
      entries?: Entry[];
    }>(),
    {
      entries: () => [
        {
          id: "c1",
          date: "2026-10-14",
          title: "Saved views",
          body: "Save filters on the dashboard and share them with your team.",
          tags: ["dashboard"],
        },
        {
          id: "c2",
          date: "2026-10-09",
          title: "Webhook retries",
          body: "Failed webhooks are retried with backoff for up to 24 hours.",
          tags: ["api"],
        },
        {
          id: "c3",
          date: "2026-10-02",
          title: "Annual billing",
          body: "Switch to yearly billing and save 20 percent.",
          tags: ["billing"],
        },
        {
          id: "c4",
          date: "2026-09-26",
          title: "Rate limit headers",
          body: "Responses now include remaining and reset headers.",
          tags: ["api"],
        },
        {
          id: "c5",
          date: "2026-09-18",
          title: "Team workspaces",
          body: "Invite people and give them a role.",
          tags: ["dashboard", "billing"],
        },
        {
          id: "c6",
          date: "2026-09-04",
          title: "Invoice PDF redesign",
          body: "Invoices now show your logo and tax details.",
          tags: ["billing"],
        },
        {
          id: "c7",
          date: "2026-08-21",
          title: "CSV import",
          body: "Import with column matching and a preview.",
          tags: ["dashboard"],
        },
      ],
    }
  );

  const query = ref("");
  const active = ref(new Set<string>());

  const tags = computed(() => [...new Set(props.entries.flatMap((entry) => entry.tags))].sort());
  const visible = computed(() => {
    const text = query.value.trim().toLowerCase();
    return props.entries
      .filter((entry) => !active.value.size || entry.tags.some((tag) => active.value.has(tag)))
      .filter((entry) => !text || `${entry.title} ${entry.body}`.toLowerCase().includes(text))
      .sort((a, b) => b.date.localeCompare(a.date));
  });

  const groups = computed(() => {
    const byMonth = new Map<string, Entry[]>();
    for (const entry of visible.value) {
      const key = entry.date.slice(0, 7);
      byMonth.set(key, [...(byMonth.get(key) ?? []), entry]);
    }
    return [...byMonth].map(([key, items]) => ({
      label: new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      items,
    }));
  });

  function toggle(tag: string) {
    const next = new Set(active.value);
    if (next.has(tag)) next.delete(tag);
    else next.add(tag);
    active.value = next;
  }

  function clear() {
    active.value = new Set();
    query.value = "";
  }

  const shortDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
</script>
