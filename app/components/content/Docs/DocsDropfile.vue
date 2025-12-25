<template>
  <div class="mx-auto max-w-100">
    <UiDropfile @dropped="files = $event" />
    <div v-if="files && files.length" class="mt-5">
      <div
        v-for="(file, i) in files"
        :key="file.name"
        class="group relative mb-2 flex h-12 items-center justify-between rounded-md border px-3 py-3"
      >
        <div class="relative flex grow items-center gap-3">
          <Icon name="lucide:file" class="mr-3 h-5 w-5 opacity-60" />
          <p class="w-[80%] truncate text-sm">{{ file.name }}</p>
          <p
            class="absolute right-3 ml-auto text-xs whitespace-nowrap text-muted-foreground/60 opacity-100 transition group-hover:opacity-0"
          >
            {{ formatFileSize(file.size) }}
          </p>
        </div>

        <div
          class="absolute right-3 scale-50 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
        >
          <UiButton size="icon-sm" variant="outline" @click="removeFile(i)">
            <Icon name="heroicons:x-mark" class="h-3.5 w-3.5" />
          </UiButton>
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
