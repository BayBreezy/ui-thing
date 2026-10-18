<template>
  <!--
    Compact changelog list
    Features: A dense two column list with the date on the left and the title and type badge on the right, year headings, a short description that expands on click and a show more button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-end justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Changelog</h1>
        <UiButton variant="outline" size="sm" @click="useSonner.info('Open your RSS feed here')"
          ><Icon name="lucide:rss" class="size-4" />RSS</UiButton
        >
      </div>

      <div class="mt-6 space-y-8" aria-live="polite">
        <section v-for="group in groups" :key="group.year" :aria-label="group.year">
          <h2 class="text-muted-foreground mb-2 text-sm font-semibold">{{ group.year }}</h2>
          <ul class="divide-y border-y">
            <li v-for="item in group.items" :key="item.id">
              <button
                type="button"
                class="hover:bg-accent/40 focus-visible:bg-accent/40 grid w-full grid-cols-[5rem_1fr_auto] items-start gap-3 py-3 text-left outline-none"
                :aria-expanded="open === item.id"
                @click="open = open === item.id ? '' : item.id"
              >
                <time
                  class="text-muted-foreground pt-0.5 text-sm tabular-nums"
                  :datetime="item.date"
                  >{{ shortDate(item.date) }}</time
                >
                <span class="min-w-0">
                  <span class="block text-sm font-medium">{{ item.title }}</span>
                  <span v-if="open === item.id" class="text-muted-foreground mt-1 block text-sm">{{
                    item.body
                  }}</span>
                </span>
                <UiBadge variant="soft" shape="pill" :color="colors[item.type]">{{
                  item.type
                }}</UiBadge>
              </button>
            </li>
          </ul>
        </section>
      </div>

      <div class="mt-6 text-center">
        <UiButton v-if="count < entries.length" variant="outline" size="sm" @click="count += 4"
          >Show more</UiButton
        >
        <p v-else class="text-muted-foreground text-sm">That is every update.</p>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Type = "feature" | "improvement" | "fix";
  type Entry = { id: string; date: string; title: string; body: string; type: Type };

  const props = withDefaults(
    defineProps<{
      entries?: Entry[];
    }>(),
    {
      entries: () => [
        {
          id: "k1",
          date: "2026-10-14",
          title: "Saved views",
          body: "Save a set of filters and share it with your team.",
          type: "feature",
        },
        {
          id: "k2",
          date: "2026-10-09",
          title: "Faster report loading",
          body: "Large reports now load up to 3 times faster.",
          type: "improvement",
        },
        {
          id: "k3",
          date: "2026-10-02",
          title: "Fixed duplicate emails",
          body: "Notification emails no longer repeat after a retry.",
          type: "fix",
        },
        {
          id: "k4",
          date: "2026-09-18",
          title: "Team workspaces",
          body: "Invite people and give them a role.",
          type: "feature",
        },
        {
          id: "k5",
          date: "2026-09-04",
          title: "Better dark mode charts",
          body: "Charts have more contrast on dark backgrounds.",
          type: "improvement",
        },
        {
          id: "k6",
          date: "2026-08-21",
          title: "CSV import",
          body: "Import with column matching and a preview.",
          type: "feature",
        },
        {
          id: "k7",
          date: "2025-12-12",
          title: "Public API beta",
          body: "Keys, scopes and webhooks are available to everyone.",
          type: "feature",
        },
        {
          id: "k8",
          date: "2025-11-03",
          title: "Fixed timezone offsets",
          body: "Reports now use your workspace time zone.",
          type: "fix",
        },
      ],
    }
  );

  const colors: Record<Type, string> = { feature: "green", improvement: "blue", fix: "amber" };
  const count = ref(5);
  const open = ref("");

  const groups = computed(() => {
    const years = new Map<string, Entry[]>();
    for (const entry of [...props.entries]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, count.value)) {
      const year = entry.date.slice(0, 4);
      years.set(year, [...(years.get(year) ?? []), entry]);
    }
    return [...years].map(([year, items]) => ({ year, items }));
  });

  const shortDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
</script>
