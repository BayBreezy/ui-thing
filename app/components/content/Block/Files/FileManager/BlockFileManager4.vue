<template>
  <!--
    File manager with a folder tree
    Features: A sidebar folder tree built with the Tree component, expand and collapse with the arrow keys, the selected folder drives the file list, item counts per folder and a storage meter at the bottom of the sidebar
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="grid overflow-hidden rounded-xl border md:grid-cols-[16rem_1fr]">
      <aside class="bg-muted/30 flex flex-col border-b md:border-r md:border-b-0">
        <p class="px-4 pt-4 pb-2 text-xs font-semibold tracking-wide uppercase">Folders</p>
        <UiTree
          v-slot="{ flattenItems }"
          v-model="selected"
          :items="tree"
          :get-key="(item) => item.id"
          :default-expanded="['root', 'work']"
          class="flex flex-1 flex-col px-2 pb-2"
          aria-label="Folders"
        >
          <template v-for="item in flattenItems" :key="item._id">
            <UiTreeItem
              v-slot="{ isExpanded, isSelected }"
              :data-folder="item.hasChildren == true || undefined"
              v-bind="item.bind"
              :style="{ 'padding-left': `${item.level * 14}px` }"
              class="outline-hidden select-none not-last:pb-0.5"
            >
              <div
                :class="isSelected ? 'bg-accent font-medium' : ''"
                class="hover:bg-accent focus-visible:ring-ring/50 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0"
              >
                <Icon
                  v-if="item.hasChildren"
                  name="lucide:chevron-right"
                  class="text-muted-foreground size-3.5 transition-transform"
                  :class="isExpanded ? 'rotate-90' : ''"
                />
                <span v-else class="w-3.5" />
                <Icon
                  :name="isExpanded && item.hasChildren ? 'lucide:folder-open' : 'lucide:folder'"
                  class="size-4 text-amber-500"
                />
                <span class="flex-1 truncate">{{ item.value.name }}</span>
                <span class="text-muted-foreground text-xs tabular-nums">{{
                  countIn(item.value.id)
                }}</span>
              </div>
            </UiTreeItem>
          </template>
        </UiTree>
        <div class="border-t p-4">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted-foreground">Storage</span>
            <span class="tabular-nums">{{ used }} of {{ quota }} GB</span>
          </div>
          <UiProgress
            :model-value="(used / quota) * 100"
            class="mt-2 h-1.5"
            aria-label="Storage used"
          />
        </div>
      </aside>

      <section class="min-w-0 p-5" :aria-label="current.name">
        <div class="flex items-center justify-between gap-3">
          <div>
            <h1 class="text-lg font-semibold">{{ current.name }}</h1>
            <p class="text-muted-foreground text-sm" aria-live="polite">
              {{ files.length }} {{ files.length === 1 ? "file" : "files" }}
            </p>
          </div>
          <UiButton size="sm" @click="useSonner.info('Open your file picker here')"
            ><Icon name="lucide:upload" class="size-4" />Upload</UiButton
          >
        </div>
        <ul v-if="files.length" class="mt-4 divide-y rounded-lg border" aria-live="polite">
          <li v-for="file in files" :key="file.id" class="flex items-center gap-3 px-4 py-3">
            <Icon name="lucide:file" class="text-muted-foreground size-5 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ file.name }}</p>
              <p class="text-muted-foreground text-xs">{{ file.modified }}</p>
            </div>
            <span class="text-muted-foreground text-xs">{{ file.size }}</span>
          </li>
        </ul>
        <div
          v-else
          class="text-muted-foreground mt-4 rounded-lg border border-dashed py-14 text-center text-sm"
          aria-live="polite"
        >
          <Icon name="lucide:folder-open" class="mx-auto mb-2 size-6" />
          No files in this folder.
        </div>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Folder = { id: string; name: string; children?: Folder[] };
  type FileItem = { id: string; name: string; folder: string; size: string; modified: string };

  const props = withDefaults(
    defineProps<{
      tree?: Folder[];
      files?: FileItem[];
      used?: number;
      quota?: number;
    }>(),
    {
      used: 7.4,
      quota: 15,
      tree: () => [
        {
          id: "root",
          name: "My files",
          children: [
            {
              id: "work",
              name: "Work",
              children: [
                { id: "clients", name: "Clients" },
                { id: "reports", name: "Reports" },
              ],
            },
            { id: "personal", name: "Personal", children: [{ id: "taxes", name: "Taxes" }] },
            { id: "shared", name: "Shared with me" },
          ],
        },
      ],
      files: () => [
        { id: "a1", name: "Q3 report.pdf", folder: "reports", size: "1.2 MB", modified: "Oct 14" },
        { id: "a2", name: "Q2 report.pdf", folder: "reports", size: "1.1 MB", modified: "Jul 12" },
        {
          id: "a3",
          name: "Northwind contract.pdf",
          folder: "clients",
          size: "320 KB",
          modified: "Oct 9",
        },
        { id: "a4", name: "Acme brief.docx", folder: "clients", size: "54 KB", modified: "Oct 2" },
        {
          id: "a5",
          name: "Tax return 2025.pdf",
          folder: "taxes",
          size: "2.4 MB",
          modified: "Apr 11",
        },
        {
          id: "a6",
          name: "Passport scan.jpg",
          folder: "personal",
          size: "3.8 MB",
          modified: "Jan 6",
        },
        {
          id: "a7",
          name: "Team offsite plan.docx",
          folder: "shared",
          size: "88 KB",
          modified: "Oct 17",
        },
        { id: "a8", name: "Handbook.pdf", folder: "work", size: "4.6 MB", modified: "Sep 1" },
      ],
    }
  );

  const selected = ref<Folder | undefined>(props.tree[0]?.children?.[0]?.children?.[1]);

  const flat = computed(() => {
    const out: Folder[] = [];
    const walk = (list: Folder[]) =>
      list.forEach((folder) => {
        out.push(folder);
        if (folder.children) walk(folder.children);
      });
    walk(props.tree);
    return out;
  });

  const idsUnder = (folder: Folder): string[] => [
    folder.id,
    ...(folder.children ?? []).flatMap((child) => idsUnder(child)),
  ];
  const countIn = (id: string) => {
    const folder = flat.value.find((item) => item.id === id);
    if (!folder) return 0;
    const ids = idsUnder(folder);
    return props.files.filter((file) => ids.includes(file.folder)).length;
  };

  const current = computed(() => selected.value ?? props.tree[0]!);
  const files = computed(() => {
    const ids = idsUnder(current.value);
    return props.files.filter((file) => ids.includes(file.folder));
  });
</script>
