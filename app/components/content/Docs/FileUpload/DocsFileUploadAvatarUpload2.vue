<template>
  <div class="flex flex-col items-center gap-2">
    <div class="relative inline-flex">
      <!-- Drop area -->
      <div
        ref="dropzoneRef"
        role="button"
        class="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex size-26 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        @click="openFileDialog"
      >
        <input ref="inputRef" hidden aria-label="Upload image file" />
        <img
          v-if="currentFile"
          :src="currentFile.preview"
          :alt="currentFile.file.name"
          class="size-full object-cover"
          width="64"
          height="64"
          style="object-fit: cover"
        />
        <div v-else aria-hidden="true">
          <Icon name="lucide:user" class="size-6 opacity-60" />
        </div>
      </div>
      <UiButton
        v-if="currentFile"
        size="icon"
        class="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
        aria-label="Remove image"
        @click="removeFile(currentFile.id)"
      >
        <Icon name="lucide:x" class="size-3.5" />
      </UiButton>
    </div>
    <p class="text-sm font-bold">Upload Avatar</p>
    <p aria-live="polite" role="region" class="text-muted-foreground text-xs">
      Avatar uploader with droppable area
    </p>
  </div>
</template>

<script lang="ts" setup>
  const { files, removeFile, openFileDialog, dropzoneRef, inputRef } = useFileUpload({
    accept: "image/*",
    multiple: false,
    maxSize: 2 * 1024 * 1024, // 2MB
  });

  const currentFile = computed(() => files.value?.[0]);
</script>
