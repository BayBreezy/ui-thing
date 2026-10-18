<template>
  <!--
    Version cards
    Features: A grid of release cards with a large version number, the date, a short summary, counts of new, improved and fixed items and a notes toggle that expands the full list inside the card
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-5xl">
      <h1 class="text-3xl font-bold tracking-tight">Release notes</h1>
      <div class="mt-8 grid items-start gap-5 md:grid-cols-2">
        <UiCard v-for="release in releases" :key="release.version" class="gap-4">
          <UiCardHeader>
            <div class="flex items-baseline justify-between gap-3">
              <UiCardTitle class="text-3xl tabular-nums">{{ release.version }}</UiCardTitle>
              <time class="text-muted-foreground text-sm" :datetime="release.date">{{
                format(release.date)
              }}</time>
            </div>
            <UiCardDescription>{{ release.summary }}</UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <UiBadge
                v-for="kind in kinds"
                :key="kind.key"
                variant="soft"
                shape="pill"
                :color="kind.color"
                >{{ count(release, kind.key) }} {{ kind.label }}</UiBadge
              >
            </div>
            <UiButton
              variant="ghost"
              size="sm"
              class="-ml-2"
              :aria-expanded="open.has(release.version)"
              :aria-controls="`notes-${release.version}`"
              @click="toggle(release.version)"
            >
              <Icon
                name="lucide:chevron-down"
                class="size-4 transition-transform"
                :class="open.has(release.version) ? 'rotate-180' : ''"
              />
              {{ open.has(release.version) ? "Hide notes" : "Read notes" }}
            </UiButton>
            <ul
              v-if="open.has(release.version)"
              :id="`notes-${release.version}`"
              class="space-y-2 border-t pt-4 text-sm"
            >
              <li v-for="item in release.items" :key="item.text" class="flex items-start gap-2">
                <UiBadge
                  variant="soft"
                  shape="pill"
                  :color="colorOf(item.type)"
                  class="mt-0.5 shrink-0"
                  >{{ item.type }}</UiBadge
                >
                <span>{{ item.text }}</span>
              </li>
            </ul>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Type = "new" | "improved" | "fixed";
  type Release = {
    version: string;
    date: string;
    summary: string;
    items: { type: Type; text: string }[];
  };

  withDefaults(
    defineProps<{
      releases?: Release[];
    }>(),
    {
      releases: () => [
        {
          version: "2.4",
          date: "2026-10-14",
          summary: "Faster reports and saved views.",
          items: [
            { type: "new", text: "Saved views on the dashboard" },
            { type: "new", text: "Command menu shortcuts" },
            { type: "improved", text: "Reports load up to 3 times faster" },
            { type: "fixed", text: "Exports of large tables no longer crash" },
          ],
        },
        {
          version: "2.3",
          date: "2026-09-18",
          summary: "Team workspaces for everyone.",
          items: [
            { type: "new", text: "Invite teammates with roles" },
            { type: "new", text: "Audit log for admins" },
            { type: "improved", text: "Sharing links keep their settings" },
            { type: "fixed", text: "Notification emails no longer repeat" },
            { type: "fixed", text: "Dark mode contrast on charts" },
          ],
        },
        {
          version: "2.2",
          date: "2026-08-21",
          summary: "Bring your data in and out.",
          items: [
            { type: "new", text: "Import from CSV with column matching" },
            { type: "new", text: "Export any table as CSV or JSON" },
            { type: "improved", text: "Tables remember their sort order" },
          ],
        },
        {
          version: "2.1",
          date: "2026-07-24",
          summary: "A round of polish after the big release.",
          items: [
            { type: "improved", text: "Smaller bundle for faster first load" },
            { type: "fixed", text: "Pagination jumping on mobile" },
            { type: "fixed", text: "Wrong currency in invoices for some regions" },
          ],
        },
      ],
    }
  );

  const open = ref(new Set<string>(["2.4"]));
  const kinds: { key: Type; label: string; color: string }[] = [
    { key: "new", label: "new", color: "green" },
    { key: "improved", label: "improved", color: "blue" },
    { key: "fixed", label: "fixed", color: "amber" },
  ];

  const colorOf = (type: Type) => kinds.find((kind) => kind.key === type)!.color;
  const count = (release: Release, type: Type) =>
    release.items.filter((item) => item.type === type).length;

  function toggle(version: string) {
    const next = new Set(open.value);
    if (next.has(version)) next.delete(version);
    else next.add(version);
    open.value = next;
  }

  const format = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
</script>
