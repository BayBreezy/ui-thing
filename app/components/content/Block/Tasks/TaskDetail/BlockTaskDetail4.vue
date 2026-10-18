<template>
  <!--
    Task with subtasks and attachments
    Features: Subtask checklist with add and remove, attachment grid with image previews and file cards, add attachment through the file picker, remove buttons with labels and size totals
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl space-y-10">
      <section aria-labelledby="td4-subs">
        <div class="flex items-center justify-between">
          <h2 id="td4-subs" class="text-lg font-semibold">Subtasks</h2>
          <span class="text-muted-foreground text-sm" aria-live="polite"
            >{{ done }} of {{ subs.length }} done</span
          >
        </div>
        <ul class="mt-3 divide-y rounded-xl border">
          <li
            v-for="sub in subs"
            :key="sub.id"
            class="group/sub flex items-center gap-3 px-4 py-2.5"
          >
            <UiCheckbox :id="`td4-${sub.id}`" v-model="sub.done" />
            <UiLabel
              :for="`td4-${sub.id}`"
              class="flex-1 cursor-pointer font-normal"
              :class="sub.done ? 'text-muted-foreground line-through' : ''"
              >{{ sub.title }}</UiLabel
            >
            <UiButton
              variant="ghost"
              size="icon-sm"
              class="opacity-0 group-focus-within/sub:opacity-100 group-hover/sub:opacity-100"
              :aria-label="`Remove ${sub.title}`"
              @click="subs = subs.filter((item) => item.id !== sub.id)"
              ><Icon name="lucide:x" class="size-4"
            /></UiButton>
          </li>
          <li>
            <form class="flex items-center gap-2 px-4 py-2" @submit.prevent="addSub">
              <Icon name="lucide:plus" class="text-muted-foreground size-4" />
              <UiLabel for="td4-new" class="sr-only">Add a subtask</UiLabel>
              <input
                id="td4-new"
                v-model="draft"
                placeholder="Add a subtask"
                autocomplete="off"
                class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent py-1 text-sm outline-none"
              />
            </form>
          </li>
        </ul>
      </section>

      <section aria-labelledby="td4-files">
        <div class="flex items-center justify-between">
          <h2 id="td4-files" class="text-lg font-semibold">
            Attachments
            <span class="text-muted-foreground text-sm font-normal">({{ files.length }})</span>
          </h2>
          <input
            ref="picker"
            type="file"
            multiple
            class="sr-only"
            tabindex="-1"
            aria-hidden="true"
            @change="onPick"
          />
          <UiButton variant="outline" size="sm" @click="picker?.click()"
            ><Icon name="lucide:paperclip" class="size-4" />Add file</UiButton
          >
        </div>
        <ul class="mt-3 grid gap-3 sm:grid-cols-2">
          <li
            v-for="file in files"
            :key="file.id"
            class="group/file relative flex items-center gap-3 rounded-xl border p-3"
          >
            <img
              v-if="file.image"
              :src="file.image"
              alt=""
              class="bg-muted size-12 shrink-0 rounded-lg object-cover"
            />
            <span v-else class="bg-muted grid size-12 shrink-0 place-items-center rounded-lg"
              ><Icon name="lucide:file-text" class="size-5"
            /></span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ file.name }}</p>
              <p class="text-muted-foreground text-xs">{{ file.size }}</p>
            </div>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="`Remove ${file.name}`"
              @click="removeFile(file.id)"
              ><Icon name="lucide:trash-2" class="size-4"
            /></UiButton>
          </li>
        </ul>
        <p
          v-if="!files.length"
          class="text-muted-foreground mt-3 rounded-xl border border-dashed py-8 text-center text-sm"
        >
          No attachments yet.
        </p>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Sub = { id: string; title: string; done: boolean };
  type File_ = { id: number; name: string; size: string; image?: string; local?: boolean };

  const props = withDefaults(
    defineProps<{
      initialSubs?: Sub[];
      initialFiles?: File_[];
    }>(),
    {
      initialSubs: () => [
        { id: "s1", title: "Collect competitor examples", done: true },
        { id: "s2", title: "Sketch three layouts", done: false },
        { id: "s3", title: "Review with the team", done: false },
      ],
      initialFiles: () => [
        {
          id: 1,
          name: "layout-a.jpg",
          size: "1.2 MB",
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=200&q=80",
        },
        { id: 2, name: "pricing-research.pdf", size: "640 KB" },
        {
          id: 3,
          name: "layout-b.jpg",
          size: "980 KB",
          image:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80",
        },
      ],
    }
  );

  const subs = ref<Sub[]>(props.initialSubs.map((sub) => ({ ...sub })));
  const files = ref<File_[]>(props.initialFiles.map((file) => ({ ...file })));
  const draft = ref("");
  const picker = ref<HTMLInputElement>();
  let counter = 100;

  const done = computed(() => subs.value.filter((sub) => sub.done).length);

  function addSub() {
    const title = draft.value.trim();
    if (!title) return;
    subs.value.push({ id: `n${counter++}`, title, done: false });
    draft.value = "";
  }

  function readable(bytes: number) {
    return bytes > 1024 * 1024
      ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
      : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  function onPick(event: Event) {
    const input = event.target as HTMLInputElement;
    for (const file of [...(input.files ?? [])]) {
      files.value.push({
        id: counter++,
        name: file.name,
        size: readable(file.size),
        image: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        local: true,
      });
    }
    input.value = "";
  }

  function removeFile(id: number) {
    const file = files.value.find((item) => item.id === id);
    if (file?.local && file.image) URL.revokeObjectURL(file.image);
    files.value = files.value.filter((item) => item.id !== id);
  }

  onBeforeUnmount(() =>
    files.value.forEach((file) => file.local && file.image && URL.revokeObjectURL(file.image))
  );
</script>
