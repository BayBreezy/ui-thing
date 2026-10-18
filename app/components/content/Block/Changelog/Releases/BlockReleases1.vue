<template>
  <!--
    Release timeline
    Features: A vertical timeline of releases with version, date and a label for major, minor and patch releases, highlights for each release, a latest badge and a load older releases button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">Changelog</h1>
      <p class="text-muted-foreground mt-2">
        New features, improvements and fixes in every release.
      </p>

      <ol class="border-border mt-10 ml-2 space-y-10 border-l" aria-live="polite">
        <li v-for="release in shown" :key="release.version" class="relative pl-8">
          <span
            class="ring-background absolute top-1.5 -left-[0.4375rem] size-3.5 rounded-full ring-4"
            :class="isLatest(release) ? 'bg-primary' : 'bg-muted-foreground/40'"
            aria-hidden="true"
          />
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-xl font-semibold">v{{ release.version }}</h2>
            <UiBadge v-if="isLatest(release)" variant="solid" color="blue" shape="pill"
              >Latest</UiBadge
            >
            <UiBadge variant="soft" shape="pill" :color="kinds[release.kind]">{{
              release.kind
            }}</UiBadge>
            <time class="text-muted-foreground ml-auto text-sm" :datetime="release.date">{{
              format(release.date)
            }}</time>
          </div>
          <p class="text-muted-foreground mt-2">{{ release.summary }}</p>
          <ul class="mt-3 space-y-1.5 text-sm">
            <li v-for="line in release.highlights" :key="line" class="flex items-start gap-2">
              <Icon name="lucide:check" class="mt-0.5 size-4 shrink-0 text-green-500" />{{ line }}
            </li>
          </ul>
        </li>
      </ol>

      <div class="mt-10 text-center">
        <UiButton v-if="count < releases.length" variant="outline" @click="count += 3"
          >Load older releases</UiButton
        >
        <p v-else class="text-muted-foreground text-sm">You have reached the first release.</p>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Release = {
    version: string;
    date: string;
    kind: "major" | "minor" | "patch";
    summary: string;
    highlights: string[];
  };

  const props = withDefaults(
    defineProps<{
      releases?: Release[];
    }>(),
    {
      releases: () => [
        {
          version: "2.4.0",
          date: "2026-10-14",
          kind: "minor",
          summary: "Faster reports and a calmer dashboard.",
          highlights: [
            "Reports load up to 3 times faster",
            "New saved views on the dashboard",
            "Keyboard shortcuts for the command menu",
          ],
        },
        {
          version: "2.3.2",
          date: "2026-10-02",
          kind: "patch",
          summary: "Stability fixes.",
          highlights: [
            "Fixed a rare crash when exporting large tables",
            "Dates now follow your time zone everywhere",
          ],
        },
        {
          version: "2.3.0",
          date: "2026-09-18",
          kind: "minor",
          summary: "Team workspaces.",
          highlights: [
            "Invite teammates with roles",
            "Share saved views with a link",
            "Audit log for admins",
          ],
        },
        {
          version: "2.2.1",
          date: "2026-09-04",
          kind: "patch",
          summary: "Small fixes.",
          highlights: [
            "Email notifications no longer repeat",
            "Fixed dark mode contrast on charts",
          ],
        },
        {
          version: "2.2.0",
          date: "2026-08-21",
          kind: "minor",
          summary: "Import and export.",
          highlights: ["Import from CSV with column matching", "Export any table as CSV or JSON"],
        },
        {
          version: "2.0.0",
          date: "2026-07-01",
          kind: "major",
          summary: "The new Acme.",
          highlights: [
            "A redesigned interface",
            "A public API with keys and webhooks",
            "Single sign on for business plans",
          ],
        },
      ],
    }
  );

  const count = ref(3);
  const shown = computed(() => props.releases.slice(0, count.value));
  const isLatest = (release: Release) => release.version === props.releases[0]?.version;
  const kinds = { major: "violet", minor: "blue", patch: "gray" } as const;

  const format = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
</script>
