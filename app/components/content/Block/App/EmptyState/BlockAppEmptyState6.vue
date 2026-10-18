<template>
  <!--
    Upload empty state with a working drop zone
    Features: Drag and drop with a highlighted drag state, browse button, accepted file type chips, selected file list with remove buttons
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="w-full max-w-lg">
      <div
        class="flex flex-col items-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors"
        :class="dragging ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/40'"
        @dragenter.prevent="dragging = true"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="onDrop"
      >
        <div class="relative mb-5 h-20 w-24" aria-hidden="true">
          <div class="bg-muted absolute top-2 left-1 h-16 w-14 -rotate-12 rounded-lg border" />
          <div class="bg-muted/70 absolute top-2 right-1 h-16 w-14 rotate-12 rounded-lg border" />
          <div
            class="bg-card absolute inset-x-5 top-0 flex h-[4.5rem] items-center justify-center rounded-lg border shadow-md transition-transform"
            :class="dragging && '-translate-y-1 scale-105'"
          >
            <Icon
              :name="dragging ? 'lucide:arrow-down-to-line' : 'lucide:cloud-upload'"
              class="text-primary size-8"
            />
          </div>
        </div>

        <slot name="title">
          <h2 class="text-lg font-bold tracking-tight">
            {{ dragging ? "Drop to upload" : props.title }}
          </h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground mt-1.5 text-sm text-balance">{{ props.description }}</p>
        </slot>

        <div class="mt-4 flex flex-wrap justify-center gap-1.5">
          <UiBadge v-for="type in props.types" :key="type" variant="secondary">{{ type }}</UiBadge>
        </div>

        <UiButton class="mt-6" @click="input?.click()">
          <Icon name="lucide:upload" class="size-4" />
          Browse files
        </UiButton>
        <input ref="input" type="file" multiple class="sr-only" @change="onPick" />
      </div>

      <ul v-if="files.length" class="mt-4 space-y-2">
        <li
          v-for="file in files"
          :key="file.name"
          class="bg-card flex items-center gap-3 rounded-lg border p-3 text-left"
        >
          <span class="bg-muted flex size-9 items-center justify-center rounded-md">
            <Icon name="lucide:file" class="size-4" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ file.name }}</p>
            <p class="text-muted-foreground text-xs">{{ formatSize(file.size) }}</p>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`Remove ${file.name}`"
            @click="files = files.filter((item) => item !== file)"
          >
            <Icon name="lucide:x" class="size-4" />
          </UiButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      types?: string[];
    }>(),
    {
      title: "Drag and drop your files",
      description: "Upload your first file to get started. You can add more at any time.",
      types: () => ["PDF", "PNG", "JPG", "CSV", "Up to 10 MB"],
    }
  );

  const dragging = ref(false);
  const files = ref<File[]>([]);
  const input = ref<HTMLInputElement>();

  function add(list: FileList | null | undefined) {
    if (!list?.length) return;
    files.value = [...files.value, ...Array.from(list)];
    useSonner.success(`${list.length} ${list.length === 1 ? "file" : "files"} added`);
  }

  function onDrop(event: DragEvent) {
    dragging.value = false;
    add(event.dataTransfer?.files);
  }

  function onPick(event: Event) {
    const target = event.target as HTMLInputElement;
    add(target.files);
    target.value = "";
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
</script>
