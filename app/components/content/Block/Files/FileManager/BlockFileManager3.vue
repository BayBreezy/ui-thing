<template>
  <!--
    Folder browser with breadcrumbs and toolbar
    Features: Breadcrumbs that follow the folder you are in, a back button, open a folder with a click or Enter, a toolbar with a new folder dialog, an upload button, a grid or list toggle and search, and an empty folder state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <UiButton
          variant="ghost"
          size="icon"
          aria-label="Go up one folder"
          :disabled="!path.length"
          @click="path.pop()"
          ><Icon name="lucide:arrow-left" class="size-4"
        /></UiButton>
        <nav aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-1 text-sm">
            <li class="flex items-center gap-1">
              <button
                type="button"
                class="hover:bg-accent rounded px-1.5 py-1 font-medium"
                :aria-current="!path.length ? 'page' : undefined"
                @click="path = []"
              >
                My files
              </button>
            </li>
            <li v-for="(id, index) in path" :key="id" class="flex items-center gap-1">
              <Icon name="lucide:chevron-right" class="text-muted-foreground size-3.5" />
              <button
                type="button"
                class="hover:bg-accent rounded px-1.5 py-1 font-medium"
                :aria-current="index === path.length - 1 ? 'page' : undefined"
                @click="path = path.slice(0, index + 1)"
              >
                {{ nameOf(id) }}
              </button>
            </li>
          </ol>
        </nav>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div class="relative">
          <Icon
            name="lucide:search"
            class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            v-model="query"
            class="w-44 pl-9"
            placeholder="Search here"
            aria-label="Search this folder"
          />
        </div>
        <UiToggleGroup
          :model-value="view"
          type="single"
          variant="outline"
          aria-label="View"
          @update:model-value="(value) => (view = (value as 'grid' | 'list') || 'grid')"
        >
          <UiToggleGroupItem value="grid" aria-label="Grid view"
            ><Icon name="lucide:layout-grid" class="size-4"
          /></UiToggleGroupItem>
          <UiToggleGroupItem value="list" aria-label="List view"
            ><Icon name="lucide:list" class="size-4"
          /></UiToggleGroupItem>
        </UiToggleGroup>
        <UiDialog v-model:open="dialog">
          <UiDialogTrigger as-child>
            <UiButton variant="outline"
              ><Icon name="lucide:folder-plus" class="size-4" />New folder</UiButton
            >
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-sm">
            <UiDialogHeader>
              <UiDialogTitle>New folder</UiDialogTitle>
              <UiDialogDescription
                >Create it in
                {{
                  path.length ? nameOf(path[path.length - 1]!) : "My files"
                }}.</UiDialogDescription
              >
            </UiDialogHeader>
            <form class="grid gap-4" @submit.prevent="createFolder">
              <div class="grid gap-1.5">
                <UiLabel for="folder-name">Name</UiLabel>
                <UiInput id="folder-name" v-model="folderName" placeholder="Untitled folder" />
                <p v-if="folderError" class="text-destructive text-sm">{{ folderError }}</p>
              </div>
              <UiDialogFooter>
                <UiButton type="button" variant="outline" @click="dialog = false">Cancel</UiButton>
                <UiButton type="submit">Create</UiButton>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
        <UiButton @click="useSonner.info('Open your file picker here')"
          ><Icon name="lucide:upload" class="size-4" />Upload</UiButton
        >
      </div>
    </div>

    <div v-if="listed.length" class="mt-6" aria-live="polite">
      <ul v-if="view === 'grid'" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <li v-for="entry in listed" :key="entry.id">
          <button
            type="button"
            class="hover:bg-accent/50 focus-visible:ring-ring/50 flex w-full flex-col items-center gap-2 rounded-xl border p-4 text-center outline-none focus-visible:ring-[3px]"
            :aria-label="entry.folder ? `Open folder ${entry.name}` : entry.name"
            @click="open(entry)"
          >
            <Icon
              :name="entry.folder ? 'lucide:folder' : 'lucide:file'"
              class="size-10"
              :class="entry.folder ? 'text-amber-500' : 'text-muted-foreground'"
            />
            <span class="w-full truncate text-sm font-medium">{{ entry.name }}</span>
            <span class="text-muted-foreground text-xs">{{
              entry.folder ? `${count(entry.id)} items` : entry.size
            }}</span>
          </button>
        </li>
      </ul>
      <ul v-else class="divide-y rounded-xl border">
        <li v-for="entry in listed" :key="entry.id">
          <button
            type="button"
            class="hover:bg-accent/50 focus-visible:bg-accent/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none"
            :aria-label="entry.folder ? `Open folder ${entry.name}` : entry.name"
            @click="open(entry)"
          >
            <Icon
              :name="entry.folder ? 'lucide:folder' : 'lucide:file'"
              class="size-5"
              :class="entry.folder ? 'text-amber-500' : 'text-muted-foreground'"
            />
            <span class="flex-1 truncate text-sm font-medium">{{ entry.name }}</span>
            <span class="text-muted-foreground text-xs">{{
              entry.folder ? `${count(entry.id)} items` : entry.size
            }}</span>
          </button>
        </li>
      </ul>
    </div>
    <div
      v-else
      class="text-muted-foreground mt-6 rounded-xl border border-dashed py-16 text-center text-sm"
      aria-live="polite"
    >
      <Icon name="lucide:folder-open" class="mx-auto mb-2 size-7" />
      {{ query ? "Nothing matches your search." : "This folder is empty." }}
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Entry = { id: string; name: string; parent: string | null; folder?: boolean; size?: string };

  const props = withDefaults(
    defineProps<{
      entries?: Entry[];
    }>(),
    {
      entries: () => [
        { id: "d1", name: "Projects", parent: null, folder: true },
        { id: "d2", name: "Invoices", parent: null, folder: true },
        { id: "d3", name: "Photos", parent: null, folder: true },
        { id: "f1", name: "Readme.md", parent: null, size: "4 KB" },
        { id: "d4", name: "Website", parent: "d1", folder: true },
        { id: "d5", name: "Mobile app", parent: "d1", folder: true },
        { id: "f2", name: "Roadmap.pdf", parent: "d1", size: "820 KB" },
        { id: "f3", name: "Wireframes.fig", parent: "d4", size: "12 MB" },
        { id: "f4", name: "Sitemap.png", parent: "d4", size: "640 KB" },
        { id: "f5", name: "Invoice 1041.pdf", parent: "d2", size: "92 KB" },
        { id: "f6", name: "Invoice 1042.pdf", parent: "d2", size: "88 KB" },
        { id: "f7", name: "Berlin.jpg", parent: "d3", size: "3.1 MB" },
      ],
    }
  );

  const items = ref<Entry[]>(props.entries.map((entry) => ({ ...entry })));
  const path = ref<string[]>([]);
  const view = ref<"grid" | "list">("grid");
  const query = ref("");
  const dialog = ref(false);
  const folderName = ref("");
  const folderError = ref("");

  const current = computed(() => path.value[path.value.length - 1] ?? null);
  const nameOf = (id: string) => items.value.find((entry) => entry.id === id)?.name ?? "";
  const count = (id: string) => items.value.filter((entry) => entry.parent === id).length;
  const listed = computed(() => {
    const text = query.value.trim().toLowerCase();
    return items.value
      .filter((entry) => entry.parent === current.value)
      .filter((entry) => !text || entry.name.toLowerCase().includes(text))
      .sort((a, b) => Number(!!b.folder) - Number(!!a.folder) || a.name.localeCompare(b.name));
  });

  watch(path, () => (query.value = ""), { deep: true });

  function open(entry: Entry) {
    if (entry.folder) path.value = [...path.value, entry.id];
    else useSonner.info(`Open ${entry.name} here`);
  }

  function createFolder() {
    const name = folderName.value.trim();
    if (!name) {
      folderError.value = "Enter a name.";
      return;
    }
    if (
      items.value.some(
        (entry) => entry.parent === current.value && entry.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      folderError.value = "A file or folder with this name already exists.";
      return;
    }
    items.value.push({
      id: `new-${items.value.length}`,
      name,
      parent: current.value,
      folder: true,
    });
    folderName.value = "";
    folderError.value = "";
    dialog.value = false;
    useSonner.success(`Created ${name}`);
  }
</script>
