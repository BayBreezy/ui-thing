<template>
  <!--
    Dropzone with validation
    Features: A drag and drop area built with the Dropfile component, a browse button that works with the keyboard, checks for file type, size and duplicates with a list of rejected files, a list of the chosen files with remove buttons and an upload action
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <h1 class="text-2xl font-bold tracking-tight">Upload documents</h1>
      <p class="text-muted-foreground mt-1 text-sm">PNG, JPG or PDF, up to {{ maxMb }} MB each.</p>

      <UiDropfile
        class="mt-6"
        title="Drag and drop files here"
        :subtext="`or use the button below. Up to ${maxMb} MB each.`"
        accept=".png,.jpg,.jpeg,.pdf"
        @dropped="add"
      />
      <div class="mt-3 flex items-center gap-3">
        <UiButton variant="outline" @click="browse()"
          ><Icon name="lucide:folder-open" class="size-4" />Browse files</UiButton
        >
        <span class="text-muted-foreground text-sm"
          >{{ chosen.length }} {{ chosen.length === 1 ? "file" : "files" }} chosen</span
        >
      </div>

      <UiAlert
        v-if="rejected.length"
        role="alert"
        class="mt-4"
        icon="lucide:triangle-alert"
        title="Some files were skipped"
        :description="rejected.join(' ')"
      />

      <ul v-if="chosen.length" class="mt-4 divide-y rounded-xl border" aria-live="polite">
        <li v-for="item in chosen" :key="item.id" class="flex items-center gap-3 px-4 py-3">
          <Icon
            :name="item.file.type === 'application/pdf' ? 'lucide:file-text' : 'lucide:image'"
            class="text-muted-foreground size-5 shrink-0"
          />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ item.file.name }}</p>
            <p class="text-muted-foreground text-xs">{{ size(item.file.size) }}</p>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`Remove ${item.file.name}`"
            @click="remove(item.id)"
            ><Icon name="lucide:x" class="size-4"
          /></UiButton>
        </li>
      </ul>

      <div class="mt-6 flex justify-end gap-2">
        <UiButton variant="ghost" :disabled="!chosen.length" @click="chosen = []">Clear</UiButton>
        <UiButton :disabled="!chosen.length" @click="upload"
          >Upload {{ chosen.length || "" }}</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      maxMb?: number;
      types?: string[];
    }>(),
    {
      maxMb: 5,
      types: () => ["image/png", "image/jpeg", "application/pdf"],
    }
  );

  const chosen = ref<{ id: string; file: File }[]>([]);
  const rejected = ref<string[]>([]);

  const {
    open: browse,
    onChange,
    reset,
  } = useFileDialog({
    accept: ".png,.jpg,.jpeg,.pdf",
    multiple: true,
  });
  onChange((files) => {
    if (files?.length) {
      add(Array.from(files));
      reset();
    }
  });

  const size = (bytes: number) =>
    bytes >= 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`;

  function add(files: File[]) {
    const problems: string[] = [];
    for (const file of files) {
      if (!props.types.includes(file.type)) problems.push(`${file.name} is not a PNG, JPG or PDF.`);
      else if (file.size > props.maxMb * 1024 * 1024)
        problems.push(`${file.name} is larger than ${props.maxMb} MB.`);
      else if (
        chosen.value.some((item) => item.file.name === file.name && item.file.size === file.size)
      )
        problems.push(`${file.name} was already added.`);
      else chosen.value.push({ id: `${file.name}-${file.size}-${chosen.value.length}`, file });
    }
    rejected.value = problems;
  }

  function remove(id: string) {
    chosen.value = chosen.value.filter((item) => item.id !== id);
  }

  function upload() {
    const count = chosen.value.length;
    chosen.value = [];
    rejected.value = [];
    useSonner.success(`Uploaded ${count} ${count === 1 ? "file" : "files"}`);
  }
</script>
