<template>
  <!--
    Recent files
    Features: A quick access row of frequent folders, recent files grouped into today, yesterday and earlier, who changed each file and when, star and share actions, a type filter and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-2xl font-bold tracking-tight">Recent</h1>

      <section class="mt-6" aria-label="Quick access">
        <h2 class="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
          Quick access
        </h2>
        <ul class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <li v-for="folder in folders" :key="folder.name">
            <button
              type="button"
              class="hover:bg-accent/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 rounded-xl border p-3 text-left outline-none focus-visible:ring-[3px]"
              @click="useSonner.info(`Open ${folder.name} here`)"
            >
              <Icon name="lucide:folder" class="size-6 shrink-0 text-amber-500" />
              <span class="min-w-0">
                <span class="block truncate text-sm font-medium">{{ folder.name }}</span>
                <span class="text-muted-foreground block text-xs">{{ folder.items }} items</span>
              </span>
            </button>
          </li>
        </ul>
      </section>

      <div class="mt-8 flex items-center justify-between gap-3">
        <h2 class="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
          Recent files
        </h2>
        <UiToggleGroup
          :model-value="type"
          type="single"
          size="sm"
          variant="outline"
          aria-label="File type"
          @update:model-value="(value) => (type = (value as string) || 'all')"
        >
          <UiToggleGroupItem value="all">All</UiToggleGroupItem>
          <UiToggleGroupItem value="doc">Docs</UiToggleGroupItem>
          <UiToggleGroupItem value="image">Images</UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <div v-if="groups.length" class="mt-4 space-y-6" aria-live="polite">
        <section v-for="group in groups" :key="group.label" :aria-label="group.label">
          <h3 class="mb-2 text-sm font-medium">{{ group.label }}</h3>
          <ul class="divide-y rounded-xl border">
            <li
              v-for="file in group.items"
              :key="file.id"
              class="flex items-center gap-3 px-4 py-3"
            >
              <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-lg"
                ><Icon
                  :name="file.type === 'image' ? 'lucide:image' : 'lucide:file-text'"
                  class="size-5"
                  :class="file.type === 'image' ? 'text-violet-500' : 'text-blue-500'"
              /></span>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">{{ file.name }}</p>
                <p class="text-muted-foreground truncate text-xs">
                  {{ file.action }} by {{ file.by }} · {{ time(file.at) }}
                </p>
              </div>
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-pressed="file.starred"
                :aria-label="`${file.starred ? 'Unstar' : 'Star'} ${file.name}`"
                @click="file.starred = !file.starred"
                ><Icon
                  name="lucide:star"
                  class="size-4"
                  :class="file.starred ? 'fill-amber-400 text-amber-400' : ''"
              /></UiButton>
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Share ${file.name}`"
                @click="useSonner.info(`Share ${file.name}`)"
                ><Icon name="lucide:share-2" class="size-4"
              /></UiButton>
            </li>
          </ul>
        </section>
      </div>
      <div
        v-else
        class="text-muted-foreground mt-4 rounded-xl border border-dashed py-12 text-center text-sm"
        aria-live="polite"
      >
        No recent files of this type.
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type FileItem = {
    id: string;
    name: string;
    type: "doc" | "image";
    action: string;
    by: string;
    at: string;
    starred?: boolean;
  };

  const props = withDefaults(
    defineProps<{
      now?: string;
      folders?: { name: string; items: number }[];
      files?: FileItem[];
    }>(),
    {
      now: "2026-10-18T10:20",
      folders: () => [
        { name: "Projects", items: 42 },
        { name: "Invoices", items: 18 },
        { name: "Brand", items: 64 },
        { name: "Photos", items: 230 },
      ],
      files: () => [
        {
          id: "r1",
          name: "Meeting notes.docx",
          type: "doc",
          action: "Edited",
          by: "you",
          at: "2026-10-18T09:50",
        },
        {
          id: "r2",
          name: "Launch plan.docx",
          type: "doc",
          action: "Edited",
          by: "Maya Patel",
          at: "2026-10-18T08:15",
          starred: true,
        },
        {
          id: "r3",
          name: "Hero banner.png",
          type: "image",
          action: "Uploaded",
          by: "Leo Fischer",
          at: "2026-10-17T17:30",
        },
        {
          id: "r4",
          name: "Budget 2027.docx",
          type: "doc",
          action: "Opened",
          by: "you",
          at: "2026-10-17T11:00",
        },
        {
          id: "r5",
          name: "Team photo.jpg",
          type: "image",
          action: "Uploaded",
          by: "Sofia Alvarez",
          at: "2026-10-14T16:20",
        },
        {
          id: "r6",
          name: "Onboarding guide.docx",
          type: "doc",
          action: "Edited",
          by: "Noah Kim",
          at: "2026-10-12T10:05",
        },
      ],
    }
  );

  const type = ref("all");
  const items = ref<FileItem[]>(props.files.map((file) => ({ ...file })));

  const diff = (iso: string) =>
    Math.round(
      (new Date(`${props.now.slice(0, 10)}T00:00:00Z`).getTime() -
        new Date(`${iso.slice(0, 10)}T00:00:00Z`).getTime()) /
        86_400_000
    );

  const groups = computed(() => {
    const buckets: Record<string, FileItem[]> = { Today: [], Yesterday: [], Earlier: [] };
    for (const file of items.value.filter(
      (item) => type.value === "all" || item.type === type.value
    )) {
      const days = diff(file.at);
      buckets[days === 0 ? "Today" : days === 1 ? "Yesterday" : "Earlier"]!.push(file);
    }
    return Object.entries(buckets)
      .filter(([, list]) => list.length)
      .map(([label, list]) => ({ label, items: list }));
  });

  const time = (iso: string) =>
    new Date(`${iso}:00Z`).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });
</script>
