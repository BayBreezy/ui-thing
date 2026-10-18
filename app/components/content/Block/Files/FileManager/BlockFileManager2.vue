<template>
  <!--
    File table
    Features: Table with name, owner, last modified and size columns, sortable headers with aria-sort, a star toggle, row checkboxes with a select all, a bulk bar and relative modified dates
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-2xl font-bold tracking-tight">All files</h1>

    <div class="mt-4 flex min-h-9 items-center gap-3" aria-live="polite">
      <p v-if="!selected.size" class="text-muted-foreground text-sm">{{ rows.length }} items</p>
      <template v-else>
        <p class="text-sm font-medium">{{ selected.size }} selected</p>
        <UiButton
          variant="outline"
          size="sm"
          @click="useSonner.success(`Downloading ${selected.size} items`)"
          ><Icon name="lucide:download" class="size-4" />Download</UiButton
        >
        <UiButton variant="outline" size="sm" @click="useSonner.info('Open the move dialog here')"
          ><Icon name="lucide:folder-input" class="size-4" />Move</UiButton
        >
        <UiButton variant="outline" size="sm" class="text-destructive" @click="removeSelected"
          ><Icon name="lucide:trash-2" class="size-4" />Delete</UiButton
        >
      </template>
    </div>

    <div class="mt-2 rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-10">
              <UiCheckbox
                :model-value="allSelected ? true : selected.size ? 'indeterminate' : false"
                aria-label="Select all files"
                @update:model-value="toggleAll"
              />
            </UiTableHead>
            <UiTableHead :aria-sort="ariaSort('name')">
              <button
                type="button"
                class="flex items-center gap-1 font-medium"
                @click="sortBy('name')"
              >
                Name<Icon :name="icon('name')" class="size-3.5" />
              </button>
            </UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Owner</UiTableHead>
            <UiTableHead class="hidden md:table-cell" :aria-sort="ariaSort('modified')">
              <button
                type="button"
                class="flex items-center gap-1 font-medium"
                @click="sortBy('modified')"
              >
                Modified<Icon :name="icon('modified')" class="size-3.5" />
              </button>
            </UiTableHead>
            <UiTableHead class="text-right" :aria-sort="ariaSort('bytes')">
              <button
                type="button"
                class="ml-auto flex items-center gap-1 font-medium"
                @click="sortBy('bytes')"
              >
                Size<Icon :name="icon('bytes')" class="size-3.5" />
              </button>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow
            v-for="file in rows"
            :key="file.id"
            :data-state="selected.has(file.id) ? 'selected' : undefined"
          >
            <UiTableCell>
              <UiCheckbox
                :model-value="selected.has(file.id)"
                :aria-label="`Select ${file.name}`"
                @update:model-value="toggle(file.id)"
              />
            </UiTableCell>
            <UiTableCell>
              <div class="flex items-center gap-3">
                <Icon
                  :name="kinds[file.kind].icon"
                  class="size-5 shrink-0"
                  :class="kinds[file.kind].tint"
                />
                <span class="truncate font-medium">{{ file.name }}</span>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  class="size-7"
                  :aria-pressed="file.starred"
                  :aria-label="`${file.starred ? 'Unstar' : 'Star'} ${file.name}`"
                  @click="file.starred = !file.starred"
                  ><Icon
                    name="lucide:star"
                    class="size-4"
                    :class="
                      file.starred ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'
                    "
                /></UiButton>
              </div>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden sm:table-cell">{{
              file.owner
            }}</UiTableCell>
            <UiTableCell class="text-muted-foreground hidden whitespace-nowrap md:table-cell">{{
              ago(file.modified)
            }}</UiTableCell>
            <UiTableCell class="text-muted-foreground text-right whitespace-nowrap">{{
              file.kind === "folder" ? "—" : size(file.bytes)
            }}</UiTableCell>
          </UiTableRow>
          <UiTableRow v-if="!rows.length">
            <UiTableCell colspan="5" class="text-muted-foreground py-10 text-center"
              >This folder is empty.</UiTableCell
            >
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "folder" | "image" | "pdf" | "doc" | "sheet" | "video" | "zip";
  type FileItem = {
    id: string;
    name: string;
    kind: Kind;
    owner: string;
    modified: string;
    bytes: number;
    starred?: boolean;
  };
  type Key = "name" | "modified" | "bytes";

  const props = withDefaults(
    defineProps<{
      now?: string;
      files?: FileItem[];
    }>(),
    {
      now: "2026-10-18T10:20",
      files: () => [
        {
          id: "t1",
          name: "Brand assets",
          kind: "folder",
          owner: "Maya Patel",
          modified: "2026-10-17T15:00",
          bytes: 0,
          starred: true,
        },
        {
          id: "t2",
          name: "Contracts",
          kind: "folder",
          owner: "Sofia Alvarez",
          modified: "2026-10-12T09:30",
          bytes: 0,
        },
        {
          id: "t3",
          name: "Q3 report.pdf",
          kind: "pdf",
          owner: "Priya Nair",
          modified: "2026-10-14T10:00",
          bytes: 1_200_000,
        },
        {
          id: "t4",
          name: "Meeting notes.docx",
          kind: "doc",
          owner: "You",
          modified: "2026-10-18T08:40",
          bytes: 48_000,
          starred: true,
        },
        {
          id: "t5",
          name: "Budget 2027.xlsx",
          kind: "sheet",
          owner: "Noah Kim",
          modified: "2026-10-13T16:15",
          bytes: 310_000,
        },
        {
          id: "t6",
          name: "Product demo.mp4",
          kind: "video",
          owner: "Leo Fischer",
          modified: "2026-10-10T13:00",
          bytes: 84_000_000,
        },
        {
          id: "t7",
          name: "Archive 2025.zip",
          kind: "zip",
          owner: "You",
          modified: "2026-09-30T12:00",
          bytes: 420_000_000,
        },
        {
          id: "t8",
          name: "Hero image.png",
          kind: "image",
          owner: "Maya Patel",
          modified: "2026-10-09T07:45",
          bytes: 2_100_000,
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
  const selected = ref(new Set<string>());
  const key = ref<Key>("name");
  const asc = ref(true);

  const rows = computed(() =>
    [...items.value].sort((a, b) => {
      const dir = asc.value ? 1 : -1;
      if (a.kind === "folder" && b.kind !== "folder") return -1;
      if (b.kind === "folder" && a.kind !== "folder") return 1;
      if (key.value === "name") return a.name.localeCompare(b.name) * dir;
      if (key.value === "modified") return a.modified.localeCompare(b.modified) * dir;
      return (a.bytes - b.bytes) * dir;
    })
  );
  const allSelected = computed(
    () => rows.value.length > 0 && rows.value.every((file) => selected.value.has(file.id))
  );

  const ariaSort = (value: Key) =>
    key.value === value ? (asc.value ? "ascending" : "descending") : "none";
  const icon = (value: Key) =>
    key.value === value
      ? asc.value
        ? "lucide:arrow-up"
        : "lucide:arrow-down"
      : "lucide:chevrons-up-down";

  function sortBy(value: Key) {
    if (key.value === value) asc.value = !asc.value;
    else {
      key.value = value;
      asc.value = value === "name";
    }
  }

  function size(bytes: number) {
    if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
    if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
  }

  function ago(iso: string) {
    const diff = Math.round(
      (new Date(`${props.now}:00Z`).getTime() - new Date(`${iso}:00Z`).getTime()) / 60000
    );
    if (diff < 60) return `${Math.max(diff, 1)} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;
    const days = Math.floor(diff / 1440);
    return days === 1 ? "Yesterday" : `${days} days ago`;
  }

  function toggle(id: string) {
    const next = new Set(selected.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selected.value = next;
  }

  function toggleAll() {
    selected.value = allSelected.value ? new Set() : new Set(rows.value.map((file) => file.id));
  }

  function removeSelected() {
    const count = selected.value.size;
    items.value = items.value.filter((file) => !selected.value.has(file.id));
    selected.value = new Set();
    useSonner.success(`Moved ${count} items to trash`);
  }
</script>
