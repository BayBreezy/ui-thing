<template>
  <div>
    <Heading
      title="Dropfile"
      subtext="Allow users to upload files by dragging and dropping them onto the page."
    />

    <UIDropfile @dropped="files = $event" />
    <div class="mt-5" v-if="files && files.length">
      <div
        v-for="(file, i) in files"
        :key="file.name"
        class="group relative mb-2 flex items-center rounded border px-3 py-3"
      >
        <Icon name="heroicons:document" class="mr-3 h-5 w-5 opacity-60" />
        <p class="w-[80%] truncate text-sm">{{ file.name }}</p>
        <p class="ml-auto text-xs text-muted-foreground/60 transition group-hover:hidden">
          {{ formatFileSize(file.size) }}
        </p>

        <div class="absolute inset-y-0 right-1.5 hidden pt-1.5 transition group-hover:block">
          <UIButton @click="removeFile(i)" size="icon" variant="outline">
            <Icon name="heroicons:x-mark" class="h-3.5 w-3.5" />
          </UIButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const files = ref<File[]>([]);

  function formatFileSize(fileSize: number) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let size = fileSize;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  const removeFile = (index: number) => {
    files.value.splice(index, 1);
  };
</script>
