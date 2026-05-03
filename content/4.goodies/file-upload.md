---
title: File Upload
description: Components used to allow users to upload files to your application.
---

## Credits

- [ReUI](https://reui.io/docs/file-upload)
- [Origin UI Vue](https://www.originui-vue.com/file-upload)

## Getting Started

:::prose-steps

::prose-step

### Installation

Add the following packages to your project

:prose-pm-install{name="@vueuse/core"}

::
::prose-step

### Add Composable

Add the following composable to your `composables` directory

:prose-code-snippet{file="/composables/useFileUpload.ts" language="ts" title="useFileUpload Composable" meta="noFormat"}

::

:::

## Usage

### Avatar Upload 1

::prose-show-case

:DocsFileUploadAvatarUpload1

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadAvatarUpload1.vue" code lang="vue" -->

```vue [DocsFileUploadAvatarUpload1.vue]
<template>
  <div class="flex flex-col items-center">
    <div class="inline-flex items-center gap-2 align-top">
      <div
        class="border-input relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border"
        :aria-label="previewUrl ? 'Preview of uploaded image' : 'Default user avatar'"
      >
        <img
          v-if="previewUrl"
          class="size-full cursor-pointer object-cover"
          :src="previewUrl"
          alt="Preview of uploaded image"
          width="32"
          height="32"
          @click="showImageDialog = true"
        />
        <div v-else aria-hidden="true" class="flex items-center justify-center">
          <Icon name="lucide:circle-user-round" class="opacity-60" :size="16" />
        </div>
      </div>
      <div class="relative inline-block">
        <UiButton aria-haspopup="dialog" @click="openFileDialog()">
          {{ file && file.file?.name ? "Change image" : "Upload image" }}
        </UiButton>
        <input ref="inputRef" hidden type="file" />
      </div>
    </div>
    <div v-if="file" class="mt-2">
      <div class="inline-flex gap-2 text-xs">
        <p class="text-muted-foreground truncate" aria-live="polite">
          {{ file?.file?.name }}
        </p>
        <button
          class="font-medium text-red-500 hover:underline"
          :aria-label="`Remove ${file.file?.name}`"
          @click="() => removeFile(file?.id)"
        >
          Remove
        </button>
      </div>
    </div>
    <div class="sr-only" aria-live="polite" role="status">
      {{ previewUrl ? "Image uploaded and preview available" : "No image uploaded" }}
    </div>

    <AnimatePresence mode="wait">
      <Motion
        v-if="showImageDialog"
        role="dialog"
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1, transition: { duration: 0.2 } }"
        :exit="{ opacity: 0, y: 20, transition: { duration: 0.15 } }"
        class="bg-background/50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
      >
        <div class="relative">
          <div class="absolute -top-4 -right-4">
            <UiButton class="rounded-full" size="icon-sm" @click="showImageDialog = false">
              <Icon name="lucide:x" :size="16" />
              <span class="sr-only">Close</span>
            </UiButton>
          </div>
          <img
            v-if="previewUrl"
            ref="imageDialog"
            class="border-input bg-background max-h-full max-w-full rounded-lg border"
            :src="previewUrl"
            alt="Preview of uploaded image"
            width="300"
            height="300"
          />
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>

<script lang="ts" setup>
  const { files, inputRef, openFileDialog, removeFile } = useFileUpload({
    multiple: false,
    accept: "image/*",
  });
  const file = computed(() => {
    if (files.value && files.value.length > 0) {
      return files.value[0] || null;
    }
    return null;
  });
  const previewUrl = computed(() => file.value?.preview || null);

  const showImageDialog = ref(false);
  const imageDialog = useTemplateRef<HTMLDivElement>("imageDialog");
  onClickOutside(
    imageDialog,
    () => {
      showImageDialog.value = false;
    },
    {}
  );
</script>
```

<!-- /automd -->

::

### Avatar Upload 2

::prose-show-case

:DocsFileUploadAvatarUpload2

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadAvatarUpload2.vue" code lang="vue" -->

```vue [DocsFileUploadAvatarUpload2.vue]
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
```

<!-- /automd -->

::

### Single Image Uploader

::prose-show-case

:DocsFileUploadSingleImageUploader

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadSingleImageUploader.vue" code lang="vue" -->

```vue [DocsFileUploadSingleImageUploader.vue]
<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <!-- Drop area -->
      <div
        ref="dropzoneRef"
        role="button"
        class="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px] lg:min-h-72"
        @click="openFileDialog"
      >
        <input ref="inputRef" hidden aria-label="Upload file" />
        <div v-if="currentFile" class="absolute inset-0">
          <img
            :src="currentFile.preview"
            :alt="currentFile.file.name"
            class="size-full object-cover"
          />
        </div>
        <div v-else class="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <Icon name="lucide:image-up" class="size-4 opacity-60" />
          </div>
          <p class="mb-1.5 text-sm font-medium">Drop your image here or click to browse</p>
          <p class="text-muted-foreground text-xs">Max size: {{ maxSizeMB }}MB</p>
        </div>
      </div>
      <div v-if="currentFile" class="absolute top-3 right-3">
        <button
          type="button"
          class="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          aria-label="Remove image"
          @click="removeFile(currentFile.id)"
        >
          <Icon name="lucide:x" class="size-4" aria-hidden="true" />
        </button>
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
      Single image uploader w/ max size
    </p>
  </div>
</template>

<script lang="ts" setup>
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const { files, errors, openFileDialog, removeFile, dropzoneRef, inputRef } = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const currentFile = computed(() => files.value?.[0]);
</script>
```

<!-- /automd -->

::

### Single Image Uploader w/ Button

::prose-show-case

:DocsFileUploadSingleImageUploaderButton

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadSingleImageUploaderButton.vue" code lang="vue" -->

```vue [DocsFileUploadSingleImageUploaderButton.vue]
<template>
  <div class="flex flex-col gap-2">
    <div class="relative">
      <!-- Drop area -->
      <div
        ref="dropzoneRef"
        class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px] lg:min-h-64"
      >
        <input ref="inputRef" hidden aria-label="Upload image file" />
        <div v-if="currentFile" class="absolute inset-0 flex items-center justify-center p-4">
          <img
            :src="currentFile.preview"
            :alt="currentFile.file.name"
            class="mx-auto max-h-full rounded object-contain"
          />
        </div>
        <div v-else class="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <Icon name="lucide:image" class="size-4 opacity-60" />
          </div>
          <p class="mb-1.5 text-sm font-medium">Drop your image here</p>
          <p class="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {{ maxSizeMB }}MB)</p>
          <UiButton variant="outline" class="mt-4" @click="openFileDialog">
            <Icon name="lucide:upload" class="-ms-1 size-4 opacity-60" aria-hidden="true" />
            Select image
          </UiButton>
        </div>
      </div>

      <div v-if="currentFile" class="absolute top-3 right-3">
        <button
          type="button"
          class="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          aria-label="Remove image"
          @click="removeFile(currentFile.id)"
        >
          <Icon name="lucide:x" class="size-4" aria-hidden="true" />
        </button>
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
      Single image uploader w/ max size (drop area + button)
    </p>
  </div>
</template>

<script lang="ts" setup>
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

  const { files, errors, openFileDialog, removeFile, dropzoneRef, inputRef } = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
  });

  const currentFile = computed(() => files.value?.[0]);
</script>
```

<!-- /automd -->

::

### Multiple Image Uploader w/ Grid

::prose-show-case

:DocsFileUploadMultipleImageUploaderGrid

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadMultipleImageUploaderGrid.vue" code lang="vue" -->

```vue [DocsFileUploadMultipleImageUploaderGrid.vue]
<template>
  <div class="flex flex-col gap-2">
    <!-- Drop area -->
    <div
      ref="dropzoneRef"
      :data-files="files.length > 0 || undefined"
      class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
    >
      <input ref="inputRef" hidden aria-label="Upload image file" />
      <div v-if="files.length > 0" class="flex w-full flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <h3 class="truncate text-sm font-medium">Uploaded Files ({{ files.length }})</h3>
          <UiButton variant="outline" :disabled="files.length >= maxFiles" @click="openFileDialog">
            <Icon name="lucide:upload" class="-ms-0.5 size-3.5 opacity-60" aria-hidden="true" />
            Add more
          </UiButton>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div
            v-for="file in files"
            :key="file.id"
            class="bg-accent relative aspect-square rounded-md"
          >
            <img
              :src="file.preview"
              :alt="file.file.name"
              class="size-full rounded-[inherit] object-cover"
            />
            <UiButton
              size="icon"
              class="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
              aria-label="Remove image"
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
        <p class="mb-1.5 text-sm font-medium">Drop your images here</p>
        <p class="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {{ maxSizeMB }}MB)</p>
        <UiButton variant="outline" class="mt-4" @click="openFileDialog">
          <Icon name="lucide:upload" class="-ms-1 size-4 opacity-60" aria-hidden="true" />
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
      Multiple image uploader w/ image grid
    </p>
  </div>
</template>

<script lang="ts" setup>
  // Create a dummy image file
  const initialFiles = [
    {
      name: "image-01.jpg",
      size: 1528737,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=1",
      id: useId(),
    },
    {
      name: "image-02.jpg",
      size: 1528737,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=2",
      id: useId(),
    },
    {
      name: "image-03.jpg",
      size: 1528737,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=3",
      id: useId(),
    },
    {
      name: "image-04.jpg",
      size: 1528737,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=4",
      id: useId(),
    },
  ];

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  const { files, errors, openFileDialog, removeFile, dropzoneRef, inputRef } = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles,
  });
</script>
```

<!-- /automd -->

::

### Multiple Image Uploader w/ List + Button

::prose-show-case

:DocsFileUploadMultipleImageUploaderListButton

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadMultipleImageUploaderListButton.vue" code lang="vue" -->

```vue [DocsFileUploadMultipleImageUploaderListButton.vue]
<template>
  <div class="flex flex-col gap-2">
    <!-- Drop area -->
    <div
      ref="dropzoneRef"
      :data-files="files.length > 0 || undefined"
      class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
    >
      <input ref="inputRef" hidden aria-label="Upload image file" />
      <div class="flex flex-col items-center justify-center px-4 py-3 text-center">
        <div
          class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <Icon name="lucide:image" class="size-4 opacity-60" />
        </div>
        <p class="mb-1.5 text-sm font-medium">Drop your images here</p>
        <p class="text-muted-foreground text-xs">SVG, PNG, JPG or GIF (max. {{ maxSizeMB }}MB)</p>
        <UiButton variant="outline" class="mt-4" @click="openFileDialog">
          <Icon name="lucide:upload" class="-ms-1 size-4 opacity-60" aria-hidden="true" />
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

    <!-- File list -->
    <div v-if="files.length > 0" class="space-y-2">
      <div
        v-for="file in files"
        :key="file.id"
        class="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="bg-accent aspect-square shrink-0 rounded">
            <img
              :src="file.preview"
              :alt="file.file.name"
              class="size-10 rounded-[inherit] object-cover"
            />
          </div>
          <div class="flex min-w-0 flex-col gap-0.5">
            <p class="truncate text-[13px] font-medium">
              {{ file.file.name }}
            </p>
            <p class="text-muted-foreground text-xs">
              {{ formatBytes(file.file.size) }}
            </p>
          </div>
        </div>

        <UiButton
          size="icon"
          variant="ghost"
          class="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
          aria-label="Remove file"
          @click="removeFile(file.id)"
        >
          <Icon name="lucide:x" aria-hidden="true" />
        </UiButton>
      </div>

      <!-- Remove all files button -->
      <div v-if="files.length > 1">
        <UiButton size="sm" variant="outline" @click="clearFiles"> Remove all files </UiButton>
      </div>
    </div>

    <p aria-live="polite" role="region" class="text-muted-foreground mt-2 text-center text-xs">
      Multiple image uploader w/ image list
    </p>
  </div>
</template>

<script lang="ts" setup>
  // Create a dummy image file

  const initialFiles = [
    {
      name: "image-01.jpg",
      size: 1528737,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=1",
      id: useId(),
    },
    {
      name: "image-02.jpg",
      size: 2345678,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=2",
      id: useId(),
    },
    {
      name: "image-03.jpg",
      size: 3456789,
      type: "image/jpeg",
      url: "https://picsum.photos/1000/800?grayscale&random=3",
      id: useId(),
    },
  ];

  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default
  const maxFiles = 6;

  const {
    files,

    errors,
    openFileDialog,
    removeFile,
    clearFiles,
    dropzoneRef,
    inputRef,
  } = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/gif",
    maxSize,
    multiple: true,
    maxFiles,
    initialFiles,
  });
</script>
```

<!-- /automd -->

::

### Single File Uploader

::prose-show-case

:DocsFileUploadSingleFileUploader

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadSingleFileUploader.vue" code lang="vue" -->

```vue [DocsFileUploadSingleFileUploader.vue]
<template>
  <LayoutGroup>
    <Motion
      :variants="sequenceContainer"
      initial="hidden"
      while-in-view="visible"
      exit="exit"
      layout="position"
      class="mx-auto flex max-w-md flex-col gap-2"
    >
      <!-- Drop area -->
      <Motion as-child :variants="dropAreaContainer">
        <div
          ref="dropzoneRef"
          role="button"
          class="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
          @click="openFileDialog"
        >
          <input ref="inputRef" hidden aria-label="Upload file" :disabled="Boolean(currentFile)" />

          <div class="flex flex-col items-center justify-center text-center">
            <Motion
              :variants="dropAreaContainerItem"
              class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <Icon name="lucide:upload" class="size-4 opacity-60" />
            </Motion>
            <Motion as="p" :variants="dropAreaContainerItem" class="mb-1.5 text-sm font-medium"
              >Upload file</Motion
            >
            <Motion as="p" :variants="dropAreaContainerItem" class="text-muted-foreground text-xs">
              Drag & drop or click to browse (max. {{ formatBytes(maxSize) }})
            </Motion>
            <AnimatePresence>
              <Motion
                v-if="currentFile"
                key="message"
                layout="position"
                :variants="dropAreaContainerItem"
                as="p"
                class="mt-1 text-center text-xs text-sky-500"
              >
                Remove the current file to upload a new one.
              </Motion>
            </AnimatePresence>
          </div>
        </div>
      </Motion>

      <Motion
        v-if="errors.length > 0"
        key="errors"
        layout="position"
        initial="hidden"
        animate="visible"
        :variants="fileListItem"
        class="text-destructive flex items-center gap-1 text-xs"
        role="alert"
      >
        <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
        <span>{{ errors[0] }}</span>
      </Motion>

      <Motion
        v-if="currentFile"
        key="file-list"
        layout="position"
        initial="hidden"
        animate="visible"
        :variants="fileListItem"
        class="space-y-2"
      >
        <div class="flex items-center justify-between gap-2 rounded-lg border px-4 py-2">
          <div class="flex items-center gap-3 overflow-hidden">
            <Icon name="lucide:paperclip" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
            <div class="min-w-0">
              <p class="truncate text-[13px] font-medium">
                {{ currentFile.file.name }}
              </p>
            </div>
          </div>

          <UiButton
            size="icon"
            variant="ghost"
            class="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
            aria-label="Remove file"
            @click="removeFile(currentFile.id)"
          >
            <Icon name="lucide:x" class="size-4" aria-hidden="true" />
          </UiButton>
        </div>
      </Motion>

      <Motion
        as="p"
        layout="position"
        :variants="fileListItem"
        aria-live="polite"
        role="region"
        class="text-muted-foreground mt-2 text-center text-xs"
      >
        Single file uploader w/ max size
      </Motion>
    </Motion>
  </LayoutGroup>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";

  const maxSize = 10 * 1024 * 1024; // 10MB default

  const initialFiles = [
    {
      name: "Behon Baker - Software Developer.png",
      size: 1528737,
      type: "image/png",
      url: "https://behonbaker.com/icon.png",
      id: useId(),
    },
  ];

  const { files, errors, openFileDialog, removeFile } = useFileUpload({
    maxSize,
    initialFiles,
  });

  const currentFile = computed(() => files.value[0]);

  // Overall sequence container - controls the main timing
  const sequenceContainer: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, when: "beforeChildren" },
    },
  };

  // Drop area container - handles internal stagger of upload elements
  const dropAreaContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  // Individual upload elements (icon, text, description)
  const dropAreaContainerItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // File list and other elements that come after drop area
  const fileListItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
    // Add exit animation that matches hidden state
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
</script>
```

<!-- /automd -->

::

### Multiple File Uploader

::prose-show-case

:DocsFileUploadMultipleFileUploader

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadMultipleFileUploader.vue" code lang="vue" -->

```vue [DocsFileUploadMultipleFileUploader.vue]
<template>
  <LayoutGroup>
    <Motion
      layout="position"
      :variants="parentVariants"
      while-in-view="visible"
      initial="hidden"
      exit="exit"
      :in-view-options="{ once: true }"
      class="mx-auto flex max-w-md flex-col gap-2"
    >
      <!-- Drop area -->
      <Motion layout="position" as-child :variants="dropAreaContainer">
        <div
          ref="dropzoneRef"
          role="button"
          class="border-input hover:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
          @click="openFileDialog"
        >
          <input ref="inputRef" hidden aria-label="Upload files" />

          <div class="flex flex-col items-center justify-center text-center">
            <Motion
              :variants="dropAreaItem"
              class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <Icon name="lucide:file-up" class="size-4 opacity-60" />
            </Motion>
            <Motion :variants="dropAreaItem" as="p" class="mb-1.5 text-sm font-medium"
              >Upload files</Motion
            >
            <Motion :variants="dropAreaItem" as="p" class="text-muted-foreground mb-2 text-xs"
              >Drag & drop or click to browse</Motion
            >
            <Motion
              :variants="dropAreaItem"
              class="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs"
            >
              <span>All files</span>
              <span>∙</span>
              <span>Max {{ maxFiles }} files</span>
              <span>∙</span>
              <span>Up to {{ formatBytes(maxSize) }}</span>
            </Motion>
          </div>
        </div>
      </Motion>

      <div
        v-if="errors.length > 0"
        class="text-destructive flex items-center gap-1 text-xs"
        role="alert"
      >
        <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
        <span>{{ errors[0] }}</span>
      </div>

      <!-- File list -->
      <LayoutGroup id="file-list">
        <AnimatePresence>
          <Motion
            v-if="files.length > 0"
            layout="position"
            :variants="fileListContainer"
            initial="hidden"
            animate="visible"
            class="space-y-2"
          >
            <AnimatePresence>
              <Motion
                v-for="file in files"
                :key="file.id"
                layout="position"
                :variants="fileListItem"
                class="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <div
                    class="flex aspect-square size-10 shrink-0 items-center justify-center rounded border"
                  >
                    <Icon :name="getFileIcon(file)" class="size-4 opacity-60" />
                  </div>
                  <div class="flex min-w-0 flex-col gap-0.5">
                    <p class="truncate text-[13px] font-medium">
                      {{ file.file.name }}
                    </p>
                    <p class="text-muted-foreground text-xs">
                      {{ formatBytes(file.file.size) }}
                    </p>
                  </div>
                </div>

                <UiButton
                  size="icon"
                  variant="ghost"
                  class="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                  aria-label="Remove file"
                  @click="removeFile(file.id)"
                >
                  <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                </UiButton>
              </Motion>
            </AnimatePresence>

            <!-- Remove all files button -->
            <AnimatePresence>
              <Motion v-if="files.length > 1" layout="position" :variants="fileListItem">
                <UiButton size="sm" variant="outline" @click="clearFiles">
                  Remove all files
                </UiButton>
              </Motion>
            </AnimatePresence>
          </Motion>
        </AnimatePresence>
      </LayoutGroup>

      <Motion
        as="p"
        layout="position"
        :variants="dropAreaItem"
        aria-live="polite"
        role="region"
        class="text-muted-foreground mt-2 text-center text-xs"
      >
        Multiple files uploader w/ list
      </Motion>
    </Motion>
  </LayoutGroup>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";

  const initialFiles = [
    {
      name: "document.pdf",
      size: 528737,
      type: "application/pdf",
      url: "https://example.com/document.pdf",
      id: "document.pdf-1744638436563-8u5xuls",
    },
    {
      name: "intro.zip",
      size: 252873,
      type: "application/zip",
      url: "https://example.com/intro.zip",
      id: "intro.zip-1744638436563-8u5xuls",
    },
    {
      name: "conclusion.xlsx",
      size: 352873,
      type: "application/xlsx",
      url: "https://example.com/conclusion.xlsx",
      id: "conclusion.xlsx-1744638436563-8u5xuls",
    },
  ];

  const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    if (
      fileType.includes("pdf") ||
      fileName.endsWith(".pdf") ||
      fileType.includes("word") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")
    ) {
      return "lucide:file-text";
    } else if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileName.endsWith(".zip") ||
      fileName.endsWith(".rar")
    ) {
      return "lucide:file-archive";
    } else if (
      fileType.includes("excel") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return "lucide:file-spreadsheet";
    } else if (fileType.includes("video/")) {
      return "lucide:video";
    } else if (fileType.includes("audio/")) {
      return "lucide:headphones";
    } else if (fileType.startsWith("image/")) {
      return "lucide:image";
    }
    return "lucide:file";
  };

  const maxSize = 100 * 1024 * 1024; // 100MB default
  const maxFiles = 10;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });

  const parentVariants: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, when: "beforeChildren" },
    },
  };

  const dropAreaContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const dropAreaItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const fileListContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const fileListItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { opacity: 0, y: 5, transition: { duration: 0.2, ease: "easeInOut" } },
  };
</script>
```

<!-- /automd -->

::

### Multiple File Uploader w/ List Inside

::prose-show-case

:DocsFileUploadMultipleFileUploaderListInside

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadMultipleFileUploaderListInside.vue" code lang="vue" -->

```vue [DocsFileUploadMultipleFileUploaderListInside.vue]
<template>
  <LayoutGroup>
    <Motion
      layout="position"
      :variants="parentVariants"
      initial="hidden"
      while-in-view="visible"
      exit="exit"
      class="mx-auto flex max-w-md flex-col gap-2"
    >
      <!-- Drop area -->
      <Motion as-child layout="position" :variants="dropZoneContainer">
        <div
          ref="dropzoneRef"
          :data-files="files.length > 0 || undefined"
          class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-56 flex-col items-center rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
        >
          <input ref="inputRef" hidden aria-label="Upload files" />

          <AnimatePresence mode="wait">
            <Motion
              v-if="files.length > 0"
              key="file-list"
              :variants="fileListContainer"
              initial="hidden"
              animate="visible"
              layout="position"
              class="flex w-full flex-col gap-3"
            >
              <div class="flex items-center justify-between gap-2">
                <Motion as="h3" :variants="fileListItem" class="truncate text-sm font-medium"
                  >Uploaded Files ({{ files.length }})</Motion
                >
                <Motion :variants="fileListItem">
                  <UiButton size="sm" variant="outline" @click="clearFiles">
                    <Icon
                      name="lucide:trash-2"
                      class="-ms-0.5 size-3.5 opacity-60"
                      aria-hidden="true"
                    />
                    Remove all
                  </UiButton>
                </Motion>
              </div>
              <Motion :variants="fileListItem" class="w-full space-y-2">
                <AnimatePresence>
                  <Motion
                    v-for="file in files"
                    :key="file.id"
                    layout="position"
                    :variants="fileListItemChild"
                    class="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                  >
                    <div class="flex items-center gap-3 overflow-hidden">
                      <div
                        class="flex aspect-square size-10 shrink-0 items-center justify-center rounded border"
                      >
                        <Icon :name="getFileIcon(file)" class="size-4 opacity-60" />
                      </div>
                      <div class="flex min-w-0 flex-col gap-0.5">
                        <p class="truncate text-[13px] font-medium">
                          {{ file.file.name }}
                        </p>
                        <p class="text-muted-foreground text-xs">
                          {{ formatBytes(file.file.size) }}
                        </p>
                      </div>
                    </div>

                    <UiButton
                      size="icon"
                      variant="ghost"
                      class="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                      aria-label="Remove file"
                      @click="removeFile(file.id)"
                    >
                      <Icon name="lucide:x" class="size-4" aria-hidden="true" />
                    </UiButton>
                  </Motion>
                </AnimatePresence>

                <UiButton
                  v-if="files.length < maxFiles"
                  size="sm"
                  variant="outline"
                  @click="openFileDialog"
                >
                  <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
                  Add more
                </UiButton>
              </Motion>
            </Motion>

            <Motion
              v-else
              key="empty-state"
              layout="position"
              :variants="emptyContainer"
              initial="hidden"
              animate="visible"
              class="flex flex-col items-center justify-center text-center"
            >
              <Motion
                layout="position"
                :variants="emptyItem"
                class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <Icon name="lucide:file" class="size-4 opacity-60" />
              </Motion>
              <Motion as="p" :variants="emptyItem" class="mb-1.5 text-sm font-medium"
                >Upload files</Motion
              >
              <Motion as="p" :variants="emptyItem" class="text-muted-foreground text-xs">
                Max {{ maxFiles }} files ∙ Up to {{ formatBytes(maxSize) }}
              </Motion>
              <Motion :variants="emptyItem">
                <UiButton size="sm" variant="outline" class="mt-4" @click="openFileDialog">
                  <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
                  Select files
                </UiButton>
              </Motion>
            </Motion>
          </AnimatePresence>
        </div>
      </Motion>

      <AnimatePresence>
        <Motion
          v-if="errors.length > 0"
          initial="hidden"
          animate="visible"
          :variants="fileListItem"
          class="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
          <span>{{ errors[0] }}</span>
        </Motion>
      </AnimatePresence>

      <Motion
        as="p"
        aria-live="polite"
        role="region"
        class="text-muted-foreground mt-2 text-center text-xs"
      >
        Multiple files uploader w/ list inside
      </Motion>
    </Motion>
  </LayoutGroup>
</template>

<script lang="ts" setup>
  import type { MotionProps } from "motion-v";

  const initialFiles = [
    {
      name: "document.pdf",
      size: 528737,
      type: "application/pdf",
      url: "https://example.com/document.pdf",
      id: "document.pdf-1744638436563-8u5xuls",
    },
    {
      name: "intro.zip",
      size: 252873,
      type: "application/zip",
      url: "https://example.com/intro.zip",
      id: "intro.zip-1744638436563-8u5xuls",
    },
    {
      name: "conclusion.xlsx",
      size: 352873,
      type: "application/xlsx",
      url: "https://example.com/conclusion.xlsx",
      id: "conclusion.xlsx-1744638436563-8u5xuls",
    },
  ];
  const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    if (
      fileType.includes("pdf") ||
      fileName.endsWith(".pdf") ||
      fileType.includes("word") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")
    ) {
      return "lucide:file-text";
    } else if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileName.endsWith(".zip") ||
      fileName.endsWith(".rar")
    ) {
      return "lucide:file-archive";
    } else if (
      fileType.includes("excel") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return "lucide:file-spreadsheet";
    } else if (fileType.includes("video/")) {
      return "lucide:video";
    } else if (fileType.includes("audio/")) {
      return "lucide:headphones";
    } else if (fileType.startsWith("image/")) {
      return "lucide:image";
    }
    return "lucide:file";
  };

  const maxSize = 7 * 1024 * 1024; // 10MB default
  const maxFiles = 7;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });

  const parentVariants: MotionProps["variants"] = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" },
    },
  };

  const dropZoneContainer: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const emptyContainer: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1, // Reverse stagger for exit
      },
    },
  };

  const emptyItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: -10, // Exit upward (opposite of enter)
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  };

  const fileListContainer: MotionProps["variants"] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.1, // Small delay to let empty state exit first
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        staggerChildren: 0.05,
        when: "afterChildren",
      },
    },
  };

  const fileListItem: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
    // Add exit animation that matches hidden state
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };
  const fileListItemChild: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };
</script>
```

<!-- /automd -->

::

### Multiple File Uploader w/ Table

::prose-show-case

:DocsFileUploadMultipleFileUploaderTable

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadMultipleFileUploaderTable.vue" code lang="vue" -->

```vue [DocsFileUploadMultipleFileUploaderTable.vue]
<template>
  <Motion
    :variants="lvl1Variants"
    initial="hidden"
    while-in-view="visible"
    exit="exit"
    :in-view-options="{ once: true }"
    class="mx-auto flex max-w-md flex-col gap-2"
  >
    <!-- Drop area -->
    <AnimatePresence mode="wait">
      <Motion
        v-if="files.length > 0"
        :variants="lvl2Variants"
        initial="hidden"
        animate="visible"
        class="flex flex-col gap-2"
      >
        <!-- Table header with actions -->
        <div class="flex items-center justify-between gap-2">
          <h3 class="text-sm font-medium">Files ({{ files.length }})</h3>
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

        <!-- Table -->
        <div class="bg-background overflow-hidden rounded-md border">
          <UiTable class="w-full">
            <UiTableHeader class="text-xs">
              <UiTableRow class="bg-muted/50">
                <UiTableHead class="h-9 py-2 text-left">Name</UiTableHead>
                <UiTableHead class="h-9 py-2 text-left">Type</UiTableHead>
                <UiTableHead class="h-9 py-2 text-left">Size</UiTableHead>
                <UiTableHead class="h-9 w-0 py-2 text-right">Actions</UiTableHead>
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody class="text-[13px]">
              <UiTableRow v-for="file in files" :key="file.id">
                <UiTableCell class="max-w-48 py-2 font-medium">
                  <span class="flex items-center gap-2">
                    <span class="shrink-0">
                      <component :is="getFileIcon(file)" class="size-4 opacity-60" />
                    </span>
                    <span class="truncate">{{ file.file.name }}</span>
                  </span>
                </UiTableCell>
                <UiTableCell class="text-muted-foreground py-2">
                  {{ file.file.type.split("/")[1]?.toUpperCase() || "UNKNOWN" }}
                </UiTableCell>
                <UiTableCell class="text-muted-foreground py-2">
                  {{ formatBytes(file.file.size) }}
                </UiTableCell>
                <UiTableCell class="py-2 text-right whitespace-nowrap">
                  <UiButton
                    size="icon"
                    variant="ghost"
                    class="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
                    aria-label="Download file"
                  >
                    <Icon name="lucide:download" class="size-4" />
                  </UiButton>
                  <UiButton
                    size="icon"
                    variant="ghost"
                    class="text-muted-foreground/80 hover:text-foreground size-8 hover:bg-transparent"
                    aria-label="Remove file"
                    @click="removeFile(file.id)"
                  >
                    <Icon name="lucide:trash-2" class="size-4" />
                  </UiButton>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
      </Motion>

      <Motion v-else :variants="lvl2Variants" initial="hidden" animate="visible">
        <div
          ref="dropzoneRef"
          :data-files="files.length > 0 || undefined"
          class="border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 flex min-h-56 flex-col items-center rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px] data-[files]:hidden"
        >
          <div class="flex flex-col items-center justify-center text-center">
            <Motion
              :variants="lvl2EmptyItemVariants"
              class="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <Icon name="lucide:file" class="size-4 opacity-60" />
            </Motion>
            <Motion as="p" :variants="lvl2EmptyItemVariants" class="mb-1.5 text-sm font-medium"
              >Upload files</Motion
            >
            <Motion as="p" :variants="lvl2EmptyItemVariants" class="text-muted-foreground text-xs">
              Max {{ maxFiles }} files ∙ Up to {{ formatBytes(maxSize) }}
            </Motion>
            <Motion :variants="lvl2EmptyItemVariants">
              <UiButton size="sm" variant="outline" class="mt-4" @click="openFileDialog">
                <Icon name="lucide:file-up" class="-ms-1 opacity-60" aria-hidden="true" />
                Select files
              </UiButton>
            </Motion>
          </div>
        </div>
      </Motion>
    </AnimatePresence>

    <Motion
      v-if="errors.length > 0"
      :variants="lvl2Variants"
      initial="hidden"
      animate="visible"
      class="text-destructive flex items-center gap-1 text-xs"
      role="alert"
    >
      <Icon name="lucide:circle-alert" class="size-3 shrink-0" />
      <span>{{ errors[0] }}</span>
    </Motion>

    <Motion
      :variants="lvl2Variants"
      as="p"
      aria-live="polite"
      role="region"
      class="text-muted-foreground mt-2 text-center text-xs"
    >
      Multiple files uploader w/ table
    </Motion>

    <input ref="inputRef" hidden aria-label="Upload files" />
  </Motion>
</template>

<script lang="ts" setup>
  import { stagger } from "motion-v";
  import type { MotionProps } from "motion-v";

  const initialFiles = [
    {
      name: "document.pdf",
      size: 528737,
      type: "application/pdf",
      url: "https://example.com/document.pdf",
      id: useId(),
    },
    {
      name: "intro.zip",
      size: 252873,
      type: "application/zip",
      url: "https://example.com/intro.zip",
      id: useId(),
    },
    {
      name: "conclusion.xlsx",
      size: 352873,
      type: "application/xlsx",
      url: "https://example.com/conclusion.xlsx",
      id: useId(),
    },
  ];
  const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    if (
      fileType.includes("pdf") ||
      fileName.endsWith(".pdf") ||
      fileType.includes("word") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")
    ) {
      return "lucide:file-text";
    } else if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileName.endsWith(".zip") ||
      fileName.endsWith(".rar")
    ) {
      return "lucide:file-archive";
    } else if (
      fileType.includes("excel") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx")
    ) {
      return "lucide:file-spreadsheet";
    } else if (fileType.includes("video/")) {
      return "lucide:video";
    } else if (fileType.includes("audio/")) {
      return "lucide:headphones";
    } else if (fileType.startsWith("image/")) {
      return "lucide:image";
    }
    return "lucide:file";
  };

  const maxSize = 7 * 1024 * 1024; // 10MB default
  const maxFiles = 7;

  const { files, errors, openFileDialog, removeFile, clearFiles, dropzoneRef, inputRef } =
    useFileUpload({
      multiple: true,
      maxFiles,
      maxSize,
      initialFiles,
    });

  const lvl1Variants: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delayChildren: stagger(0.2), when: "beforeChildren" },
    },
  };

  const lvl2Variants: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
    exit: { opacity: 0, y: 5, scale: 0.95, transition: { duration: 0.2 } },
  };

  const lvl2EmptyItemVariants: MotionProps["variants"] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };
</script>
```

<!-- /automd -->

::

### Mixed Content w/ Card

::prose-show-case

:DocsFileUploadMixedContentCard

#code

<!-- automd:file src="../../app/components/content/Docs/FileUpload/DocsFileUploadMixedContentCard.vue" code lang="vue" -->

```vue [DocsFileUploadMixedContentCard.vue]
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
```

<!-- /automd -->

::
