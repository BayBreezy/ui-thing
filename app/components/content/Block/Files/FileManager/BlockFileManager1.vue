<template>
  <!--
    File grid with selection
    Features: Grid of file and folder cards with image previews and type icons, a checkbox on every card, a bulk bar to download or delete, a sort select, search, inline rename from the card menu and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h1 class="text-2xl font-bold tracking-tight">Files</h1>
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <Icon
            name="lucide:search"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            v-model="query"
            class="w-48 pl-9"
            placeholder="Search files"
            aria-label="Search files"
          />
        </div>
        <UiSelect v-model="sort">
          <UiSelectTrigger class="w-36" aria-label="Sort files"><UiSelectValue /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="name">Name</UiSelectItem>
            <UiSelectItem value="modified">Last modified</UiSelectItem>
            <UiSelectItem value="size">Size</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>
    </div>

    <div class="mt-4 flex min-h-9 items-center gap-3" aria-live="polite">
      <p v-if="!selected.size" class="text-muted-foreground text-sm">{{ visible.length }} items</p>
      <template v-else>
        <p class="text-sm font-medium">{{ selected.size }} selected</p>
        <UiButton
          variant="outline"
          size="sm"
          @click="useSonner.success(`Downloading ${selected.size} items`)"
          ><Icon name="lucide:download" class="size-4" />Download</UiButton
        >
        <UiButton variant="outline" size="sm" class="text-destructive" @click="removeSelected"
          ><Icon name="lucide:trash-2" class="size-4" />Delete</UiButton
        >
        <UiButton variant="ghost" size="sm" @click="selected = new Set()">Clear</UiButton>
      </template>
    </div>

    <ul v-if="visible.length" class="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <li
        v-for="file in visible"
        :key="file.id"
        class="group bg-card relative overflow-hidden rounded-xl border"
        :class="selected.has(file.id) ? 'ring-primary ring-2' : ''"
      >
        <div class="bg-muted relative grid aspect-[4/3] place-items-center overflow-hidden">
          <img
            v-if="file.preview"
            :src="file.preview"
            :alt="file.name"
            class="size-full object-cover"
            loading="lazy"
          />
          <Icon
            v-else
            :name="kinds[file.kind].icon"
            class="size-10"
            :class="kinds[file.kind].tint"
          />
          <UiCheckbox
            class="bg-background absolute top-2 left-2"
            :model-value="selected.has(file.id)"
            :aria-label="`Select ${file.name}`"
            @update:model-value="toggle(file.id)"
          />
        </div>
        <div class="flex items-start gap-1 p-3">
          <div class="min-w-0 flex-1">
            <form v-if="renaming === file.id" @submit.prevent="commitRename(file)">
              <UiInput
                v-model="draft"
                :aria-label="`New name for ${file.name}`"
                class="h-7 text-sm"
                @keydown.esc="renaming = ''"
              />
            </form>
            <template v-else>
              <p class="truncate text-sm font-medium">{{ file.name }}</p>
              <p class="text-muted-foreground text-xs">
                {{ file.kind === "folder" ? `${file.items} items` : size(file.bytes) }}
              </p>
            </template>
          </div>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="size-7"
                :aria-label="`Actions for ${file.name}`"
                ><Icon name="lucide:ellipsis-vertical" class="size-4"
              /></UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem @select="startRename(file)"
                ><Icon name="lucide:pencil" class="size-4" />Rename</UiDropdownMenuItem
              >
              <UiDropdownMenuItem @select="useSonner.success(`Downloading ${file.name}`)"
                ><Icon name="lucide:download" class="size-4" />Download</UiDropdownMenuItem
              >
              <UiDropdownMenuItem class="text-destructive" @select="remove(file.id)"
                ><Icon name="lucide:trash-2" class="size-4" />Delete</UiDropdownMenuItem
              >
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="text-muted-foreground mt-4 rounded-xl border border-dashed py-16 text-center text-sm"
      aria-live="polite"
    >
      <Icon name="lucide:folder-search" class="mx-auto mb-2 size-7" />
      No files found.
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "folder" | "image" | "pdf" | "doc" | "sheet" | "video" | "zip";
  type FileItem = {
    id: string;
    name: string;
    kind: Kind;
    bytes: number;
    modified: string;
    items?: number;
    preview?: string;
  };

  const props = withDefaults(
    defineProps<{
      files?: FileItem[];
    }>(),
    {
      files: () => [
        {
          id: "f1",
          name: "Brand assets",
          kind: "folder",
          bytes: 0,
          modified: "2026-10-17T15:00",
          items: 24,
        },
        {
          id: "f2",
          name: "Contracts",
          kind: "folder",
          bytes: 0,
          modified: "2026-10-12T09:30",
          items: 8,
        },
        {
          id: "f3",
          name: "Mountain lake.jpg",
          kind: "image",
          bytes: 3_400_000,
          modified: "2026-10-16T11:20",
          preview: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=480&q=70",
        },
        {
          id: "f4",
          name: "Forest trail.jpg",
          kind: "image",
          bytes: 2_900_000,
          modified: "2026-10-15T18:05",
          preview: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=480&q=70",
        },
        {
          id: "f5",
          name: "Q3 report.pdf",
          kind: "pdf",
          bytes: 1_200_000,
          modified: "2026-10-14T10:00",
        },
        {
          id: "f6",
          name: "Meeting notes.docx",
          kind: "doc",
          bytes: 48_000,
          modified: "2026-10-18T08:40",
        },
        {
          id: "f7",
          name: "Budget 2027.xlsx",
          kind: "sheet",
          bytes: 310_000,
          modified: "2026-10-13T16:15",
        },
        {
          id: "f8",
          name: "Product demo.mp4",
          kind: "video",
          bytes: 84_000_000,
          modified: "2026-10-10T13:00",
        },
        {
          id: "f9",
          name: "Archive 2025.zip",
          kind: "zip",
          bytes: 420_000_000,
          modified: "2026-09-30T12:00",
        },
        {
          id: "f10",
          name: "Valley view.jpg",
          kind: "image",
          bytes: 4_100_000,
          modified: "2026-10-09T07:45",
          preview: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=480&q=70",
        },
      ],
    }
  );

  const kinds: Record<Kind, { icon: string; tint: string }> = {
    folder: { icon: "lucide:folder", tint: "text-amber-500" },
    image: { icon: "lucide:image", tint: "text-violet-500" },
    pdf: { icon: "lucide:file-text", tint: "text-red-500" },
    doc: { icon: "lucide:file-text", tint: "text-blue-500" },
    sheet: { icon: "lucide:file-spreadsheet", tint: "text-green-500" },
    video: { icon: "lucide:file-video", tint: "text-pink-500" },
    zip: { icon: "lucide:file-archive", tint: "text-slate-500" },
  };

  const items = ref<FileItem[]>(props.files.map((file) => ({ ...file })));
  const query = ref("");
  const sort = ref("name");
  const selected = ref(new Set<string>());
  const renaming = ref("");
  const draft = ref("");

  const visible = computed(() => {
    const text = query.value.trim().toLowerCase();
    return items.value
      .filter((file) => !text || file.name.toLowerCase().includes(text))
      .sort((a, b) => {
        if (a.kind === "folder" && b.kind !== "folder") return -1;
        if (b.kind === "folder" && a.kind !== "folder") return 1;
        if (sort.value === "size") return b.bytes - a.bytes;
        if (sort.value === "modified") return b.modified.localeCompare(a.modified);
        return a.name.localeCompare(b.name);
      });
  });

  function size(bytes: number) {
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
  }

  function toggle(id: string) {
    const next = new Set(selected.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selected.value = next;
  }

  function startRename(file: FileItem) {
    draft.value = file.name;
    renaming.value = file.id;
  }

  function commitRename(file: FileItem) {
    if (draft.value.trim()) file.name = draft.value.trim();
    renaming.value = "";
  }

  function remove(id: string) {
    const file = items.value.find((item) => item.id === id);
    items.value = items.value.filter((item) => item.id !== id);
    selected.value.delete(id);
    if (file) useSonner.success(`Moved ${file.name} to trash`);
  }

  function removeSelected() {
    const count = selected.value.size;
    items.value = items.value.filter((file) => !selected.value.has(file.id));
    selected.value = new Set();
    useSonner.success(`Moved ${count} items to trash`);
  }
</script>
