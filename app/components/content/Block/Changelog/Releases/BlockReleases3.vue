<template>
  <!--
    Release notes grouped by type
    Features: A version select that switches the release, changes grouped under new, improved and fixed headings with colored icons, a count for each group, the release date and a copy as markdown button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">What is new in {{ current.version }}</h1>
          <p class="text-muted-foreground mt-1 text-sm">Released {{ format(current.date) }}</p>
        </div>
        <div class="flex items-center gap-2">
          <UiSelect v-model="version">
            <UiSelectTrigger class="w-32" aria-label="Version"><UiSelectValue /></UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem
                v-for="release in releases"
                :key="release.version"
                :value="release.version"
                >v{{ release.version }}</UiSelectItem
              >
            </UiSelectContent>
          </UiSelect>
          <UiButton
            variant="outline"
            size="icon"
            aria-label="Copy as markdown"
            @click="copy(markdown)"
            ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4"
          /></UiButton>
        </div>
      </div>

      <div class="mt-8 space-y-8" aria-live="polite">
        <section v-for="group in groups" :key="group.key" :aria-label="group.title">
          <h2 class="flex items-center gap-2 text-lg font-semibold">
            <span class="grid size-7 place-items-center rounded-md" :class="group.tint"
              ><Icon :name="group.icon" class="size-4"
            /></span>
            {{ group.title }}
            <span class="text-muted-foreground text-sm font-normal">{{ group.items.length }}</span>
          </h2>
          <ul class="mt-3 space-y-3">
            <li v-for="item in group.items" :key="item.title" class="border-border border-l-2 pl-4">
              <p class="font-medium">{{ item.title }}</p>
              <p v-if="item.detail" class="text-muted-foreground text-sm">{{ item.detail }}</p>
            </li>
          </ul>
        </section>
        <p
          v-if="!groups.length"
          class="text-muted-foreground rounded-xl border border-dashed py-10 text-center text-sm"
        >
          No notes for this version.
        </p>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Type = "new" | "improved" | "fixed";
  type Release = {
    version: string;
    date: string;
    changes: { type: Type; title: string; detail?: string }[];
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
          changes: [
            {
              type: "new",
              title: "Saved views",
              detail: "Save a set of filters on the dashboard and share it with your team.",
            },
            {
              type: "new",
              title: "Command menu shortcuts",
              detail: "Press Cmd K, then type to jump to any page.",
            },
            {
              type: "improved",
              title: "Faster reports",
              detail: "Large reports now load up to 3 times faster.",
            },
            { type: "improved", title: "Clearer empty states" },
            {
              type: "fixed",
              title: "Export crash",
              detail: "Exporting tables with more than 50,000 rows no longer fails.",
            },
          ],
        },
        {
          version: "2.3.0",
          date: "2026-09-18",
          changes: [
            {
              type: "new",
              title: "Team workspaces",
              detail: "Invite people and give them a role.",
            },
            { type: "improved", title: "Sharing links keep their settings" },
            { type: "fixed", title: "Repeated notification emails" },
          ],
        },
        {
          version: "2.2.0",
          date: "2026-08-21",
          changes: [
            { type: "new", title: "CSV import" },
            { type: "new", title: "CSV and JSON export" },
          ],
        },
      ],
    }
  );

  const meta: Record<Type, { title: string; icon: string; tint: string }> = {
    new: {
      title: "New",
      icon: "lucide:sparkles",
      tint: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    },
    improved: {
      title: "Improved",
      icon: "lucide:trending-up",
      tint: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    },
    fixed: {
      title: "Fixed",
      icon: "lucide:wrench",
      tint: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    },
  };

  const version = ref(props.releases[0]?.version ?? "");
  const current = computed(
    () => props.releases.find((release) => release.version === version.value) ?? props.releases[0]!
  );

  const groups = computed(() =>
    (["new", "improved", "fixed"] as Type[])
      .map((key) => ({
        key,
        ...meta[key],
        items: current.value.changes.filter((change) => change.type === key),
      }))
      .filter((group) => group.items.length)
  );

  const markdown = computed(
    () =>
      `## v${current.value.version}\n\n` +
      groups.value
        .map(
          (group) =>
            `### ${group.title}\n${group.items.map((item) => `- ${item.title}`).join("\n")}`
        )
        .join("\n\n")
  );

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  const format = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
</script>
