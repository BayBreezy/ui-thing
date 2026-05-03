<template>
  <div class="flex flex-col gap-2">
    <input ref="inputRef" hidden aria-label="Upload image file" />
    <!-- Drop area -->
    <div
      ref="dropzoneRef"
      :data-files="files.length > 0 || undefined"
      class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
    >
      <div v-if="files.length > 0" class="flex w-full flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <h3 class="truncate text-sm font-medium">Files ({{ files.length }})</h3>
          <div class="flex gap-2">
            <UiButton size="sm" variant="outline" @click="openFileDialog">
              <Icon name="lucide:file-up" class="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
              Add files
            </UiButton>
            <UiButton size="sm" variant="outline" @click="clearFiles">
              <Icon name="lucide:trash-2" class="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
              Remove all
            </UiButton>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div v-for="file in files" :key="file.id" class="relative">
            <div class="bg-background relative flex flex-col overflow-hidden rounded-md border">
              <div class="bg-accent flex aspect-square items-center justify-center overflow-hidden">
                <img
                  v-if="getFilePreview(file).type === 'image'"
                  :src="getFilePreview(file).url"
                  :alt="getFilePreview(file).alt"
                  class="size-full object-cover"
                />
                <Icon v-else :name="getFilePreview(file).component!" class="size-5 opacity-60" />
              </div>
              <div class="flex min-w-0 flex-col gap-0.5 border-t p-3">
                <p class="truncate text-[13px] font-medium">
                  {{ file.file.name }}
                </p>
                <p class="text-muted-foreground truncate text-xs">
                  {{ formatBytes(file.file.size) }}
                </p>
              </div>
            </div>
            <UiButton
              size="icon"
              class="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
              aria-label="Remove file"
              @click="removeFile(file.id)"
            >
              <Icon name="lucide:x" class="size-3.5" />
            </UiButton>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center px-4 py-3 text-center">
        <div
          class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <Icon name="lucide:image" class="size-4 opacity-60" />
        </div>
        <p class="mb-1.5 text-sm font-medium">Drop your files here</p>
        <p class="text-muted-foreground text-xs">
          Max {{ maxFiles }} files ∙ Up to {{ maxSizeMB }}MB
        </p>
        <UiButton size="sm" variant="outline" class="mt-4" @click="openFileDialog">
          <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
          Select images
        </UiButton>
      </div>
    </div>

    <div
      v-if="errors.length > 0"
      class="text-destructive flex items-center gap-1 text-xs"
      role="alert"
    >
      <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
      <span>{{ errors[0] }}</span>
    </div>

    <p aria-live="polite" role="region" class="text-muted-foreground mt-2 text-center text-xs">
      Mixed content w/ card
    </p>
  </div>
</template>

<script setup lang="ts">
  const initialFiles = [
    {
      name: "intro.zip",
      size: 252873,
      type: "application/zip",
      url: "https://example.com/intro.zip",
      id: "intro.zip-1744638436563-8u5xuls",
    },
    {
      name: "image-01.jpg",
      size: 1528737,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=1",
      id: "image-01-123456789",
    },
    {
      name: "audio.mp3",
      size: 1528737,
      type: "audio/mpeg",
      url: "https://example.com/audio.mp3",
      id: "audio-123456789",
    },
  ];

  const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    const iconMap = {
      pdf: {
        icon: "lucide:file-text",
        conditions: (type: string, name: string) =>
          type.includes("pdf") ||
          name.endsWith(".pdf") ||
          type.includes("word") ||
          name.endsWith(".doc") ||
          name.endsWith(".docx"),
      },
      archive: {
        icon: "lucide:file-archive",
        conditions: (type: string, name: string) =>
          type.includes("zip") ||
          type.includes("archive") ||
          name.endsWith(".zip") ||
          name.endsWith(".rar"),
      },
      excel: {
        icon: "lucide:file-spreadsheet",
        conditions: (type: string, name: string) =>
          type.includes("excel") || name.endsWith(".xls") || name.endsWith(".xlsx"),
      },
      video: {
        icon: "lucide:video",
        conditions: (type: string) => type.includes("video/"),
      },
      audio: {
        icon: "lucide:headphones",
        conditions: (type: string) => type.includes("audio/"),
      },
      image: {
        icon: "lucide:image",
        conditions: (type: string) => type.startsWith("image/"),
      },
    };

    for (const { icon, conditions } of Object.values(iconMap)) {
      if (conditions(fileType, fileName)) {
        return icon;
      }
    }

    return "lucide:file";
  };

  const getFilePreview = (file: { file: File | { type: string; name: string; url?: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    if (fileType.startsWith("image/")) {
      if (file.file instanceof File) {
        return {
          type: "image",
          url: URL.createObjectURL(file.file),
          alt: fileName,
        };
      } else if (file.file.url) {
        return {
          type: "image",
          url: file.file.url,
          alt: fileName,
        };
      }
    }
    return {
      type: "icon",
      component: getFileIcon(file),
    };
  };

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  const { files, errors, dropzoneRef, openFileDialog, removeFile, clearFiles, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });
</script>
