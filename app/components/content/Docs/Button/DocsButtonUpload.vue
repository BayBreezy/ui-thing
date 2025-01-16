<template>
  <div class="mx-auto text-center">
    <div class="inline-flex items-center gap-2 align-top">
      <div
        class="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input"
        :aria-label="previewUrl ? 'Preview of uploaded image' : 'Default user avatar'"
      >
        <Icon
          v-if="!previewUrl"
          aria-hidden="true"
          class="size-4 opacity-60"
          name="lucide:circle-user"
        />

        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="Preview of uploaded image"
          class="size-full object-cover"
        />
      </div>
      <div class="relative inline-block">
        <UiButton aria-haspopup="dialog" @click="open()">
          {{ fileName ? "Change image" : "Upload image" }}
        </UiButton>
      </div>
    </div>

    <TransitionExpand>
      <div v-if="fileName" class="mt-2">
        <div class="inline-flex gap-2 text-xs">
          <p class="truncate text-muted-foreground" aria-live="polite">
            {{ fileName }}
          </p>
          <button
            class="font-medium text-red-500 hover:underline"
            :aria-label="`Remove ${fileName}`"
            @click="handleRemove"
          >
            Remove
          </button>
        </div>
      </div>
    </TransitionExpand>

    <div class="sr-only" aria-live="polite" role="status">
      {{ previewUrl ? "Image uploaded and preview available" : "No image uploaded" }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { open, onChange } = useFileDialog({ accept: "image/*", multiple: false, reset: true });
  const previewUrl = ref<string | null>(null);
  const fileName = ref<string | null>(null);
  onChange(async (files) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;
    fileName.value = file.name;
    const { execute } = useBase64(file);
    previewUrl.value = await execute();
  });

  const handleRemove = () => {
    previewUrl.value = null;
    fileName.value = null;
  };
</script>
