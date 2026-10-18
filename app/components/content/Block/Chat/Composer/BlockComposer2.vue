<template>
  <!--
    Composer with file attachments
    Features: Attach button that opens the file picker, drag and drop onto the composer, attachment chips with size and remove button, image thumbnails, file limit message and send with text or files
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto flex max-w-lg flex-col gap-6">
      <div v-if="lastSent" class="flex flex-col items-end gap-2" role="status">
        <UiBubble v-if="lastSent.text">
          <UiBubbleContent>{{ lastSent.text }}</UiBubbleContent>
        </UiBubble>
        <p class="text-muted-foreground text-xs">
          Sent with {{ lastSent.count }} {{ lastSent.count === 1 ? "attachment" : "attachments" }}
        </p>
      </div>

      <form
        ref="zone"
        class="bg-background rounded-2xl border p-3 shadow-xs transition"
        :class="isOverDropZone ? 'border-primary bg-primary/5' : ''"
        @submit.prevent="send"
      >
        <ul v-if="files.length" class="mb-3 flex flex-wrap gap-2">
          <li
            v-for="file in files"
            :key="file.id"
            class="bg-muted flex max-w-full items-center gap-2 rounded-lg py-1 pr-1 pl-1.5 text-sm"
          >
            <img
              v-if="file.preview"
              :src="file.preview"
              alt=""
              class="size-8 rounded object-cover"
            />
            <Icon v-else name="lucide:file" class="text-muted-foreground size-5" />
            <span class="max-w-32 truncate">{{ file.name }}</span>
            <span class="text-muted-foreground text-xs">{{ file.size }}</span>
            <UiButton
              type="button"
              variant="ghost"
              size="icon-sm"
              class="size-6"
              :aria-label="`Remove ${file.name}`"
              @click="remove(file.id)"
            >
              <Icon name="lucide:x" class="size-3.5" />
            </UiButton>
          </li>
        </ul>
        <UiLabel for="composer2" class="sr-only">Message</UiLabel>
        <UiTextarea
          id="composer2"
          v-model="draft"
          :rows="2"
          placeholder="Write a message or drop files here"
          class="resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <div class="mt-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <input
              ref="picker"
              type="file"
              multiple
              class="sr-only"
              tabindex="-1"
              aria-hidden="true"
              @change="onPick"
            />
            <UiButton
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Attach files"
              @click="picker?.click()"
            >
              <Icon name="lucide:paperclip" class="size-4" />
            </UiButton>
            <span v-if="error" class="text-destructive text-xs" role="alert">{{ error }}</span>
          </div>
          <UiButton type="submit" size="sm" :disabled="!draft.trim() && !files.length">
            Send
            <Icon name="lucide:send-horizontal" class="size-4" />
          </UiButton>
        </div>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Attachment = { id: number; name: string; size: string; preview?: string };

  const max = 4;
  const draft = ref("");
  const files = ref<Attachment[]>([]);
  const error = ref("");
  const lastSent = ref<{ text: string; count: number }>();
  const zone = ref<HTMLElement>();
  const picker = ref<HTMLInputElement>();
  let counter = 0;

  const { isOverDropZone } = useDropZone(zone, (dropped) => add(dropped ?? []));

  function readable(bytes: number) {
    if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  function add(list: File[]) {
    error.value = "";
    for (const file of list) {
      if (files.value.length >= max) {
        error.value = `You can attach up to ${max} files.`;
        break;
      }
      files.value.push({
        id: counter++,
        name: file.name,
        size: readable(file.size),
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      });
    }
  }

  function onPick(event: Event) {
    const input = event.target as HTMLInputElement;
    add([...(input.files ?? [])]);
    input.value = "";
  }

  function remove(id: number) {
    const file = files.value.find((item) => item.id === id);
    if (file?.preview) URL.revokeObjectURL(file.preview);
    files.value = files.value.filter((item) => item.id !== id);
    error.value = "";
  }

  function send() {
    lastSent.value = { text: draft.value.trim(), count: files.value.length };
    files.value.forEach((file) => file.preview && URL.revokeObjectURL(file.preview));
    files.value = [];
    draft.value = "";
  }

  onBeforeUnmount(() =>
    files.value.forEach((file) => file.preview && URL.revokeObjectURL(file.preview))
  );
</script>
