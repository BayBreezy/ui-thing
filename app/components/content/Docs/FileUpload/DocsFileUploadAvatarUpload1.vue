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
