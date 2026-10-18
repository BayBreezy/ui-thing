<template>
  <!--
    Upload dialog
    Features: A dialog with an upload tab and an import from link tab, a dropzone and a browse button, a progress bar while the file uploads, a link check, closing when the upload finishes and a list of uploaded files on the page
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Documents</h1>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton><Icon name="lucide:upload" class="size-4" />Upload</UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-md">
            <UiDialogHeader>
              <UiDialogTitle>Add a document</UiDialogTitle>
              <UiDialogDescription>Upload a file or import it from a link.</UiDialogDescription>
            </UiDialogHeader>
            <UiTabs v-model="tab">
              <UiTabsList class="grid w-full grid-cols-2">
                <UiTabsTrigger value="file">Upload</UiTabsTrigger>
                <UiTabsTrigger value="link">From link</UiTabsTrigger>
              </UiTabsList>
              <UiTabsContent value="file" class="space-y-3">
                <template v-if="!current">
                  <UiDropfile
                    title="Drag and drop a file"
                    subtext="PDF, DOCX or TXT"
                    accept=".pdf,.docx,.txt"
                    :multiple="false"
                    @dropped="pick"
                  />
                  <UiButton variant="outline" class="w-full" @click="browse()"
                    >Browse files</UiButton
                  >
                </template>
                <div v-else class="rounded-xl border p-4" aria-live="polite">
                  <div class="flex items-center gap-3">
                    <Icon name="lucide:file-text" class="size-5 shrink-0" />
                    <p class="min-w-0 flex-1 truncate text-sm font-medium">{{ current.name }}</p>
                    <span class="text-muted-foreground text-xs tabular-nums"
                      >{{ Math.round(progress) }}%</span
                    >
                  </div>
                  <UiProgress
                    :model-value="progress"
                    class="mt-3 h-1.5"
                    aria-label="Upload progress"
                  />
                </div>
                <p v-if="fileError" class="text-destructive text-sm" role="alert">
                  {{ fileError }}
                </p>
              </UiTabsContent>
              <UiTabsContent value="link" class="space-y-3">
                <form class="space-y-3" novalidate @submit.prevent="importLink">
                  <div class="space-y-2">
                    <UiLabel for="upload-link">File link</UiLabel>
                    <UiInput
                      id="upload-link"
                      v-model="link"
                      type="url"
                      placeholder="https://example.com/report.pdf"
                      :aria-invalid="!!linkError"
                    />
                    <p v-if="linkError" class="text-destructive text-sm">{{ linkError }}</p>
                  </div>
                  <UiButton type="submit" class="w-full">Import</UiButton>
                </form>
              </UiTabsContent>
            </UiTabs>
          </UiDialogContent>
        </UiDialog>
      </div>

      <ul v-if="documents.length" class="mt-6 divide-y rounded-xl border" aria-live="polite">
        <li v-for="doc in documents" :key="doc.id" class="flex items-center gap-3 px-4 py-3">
          <Icon
            :name="doc.from === 'link' ? 'lucide:link' : 'lucide:file-text'"
            class="text-muted-foreground size-5 shrink-0"
          />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ doc.name }}</p>
            <p class="text-muted-foreground text-xs">{{ doc.meta }}</p>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`Remove ${doc.name}`"
            @click="documents = documents.filter((item) => item.id !== doc.id)"
            ><Icon name="lucide:trash-2" class="size-4"
          /></UiButton>
        </li>
      </ul>
      <p
        v-else
        class="text-muted-foreground mt-6 rounded-xl border border-dashed py-12 text-center text-sm"
      >
        No documents yet.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Doc = { id: string; name: string; meta: string; from: "file" | "link" };

  const props = withDefaults(
    defineProps<{
      initial?: Doc[];
      maxMb?: number;
    }>(),
    {
      maxMb: 10,
      initial: () => [
        {
          id: "d0",
          name: "Onboarding guide.pdf",
          meta: "1.4 MB · Uploaded yesterday",
          from: "file",
        },
      ],
    }
  );

  const open = ref(false);
  const tab = ref("file");
  const documents = ref<Doc[]>(props.initial.map((doc) => ({ ...doc })));
  const current = ref<File | null>(null);
  const progress = ref(0);
  const fileError = ref("");
  const link = ref("");
  const linkError = ref("");
  let counter = 0;

  const {
    open: browse,
    onChange,
    reset,
  } = useFileDialog({ accept: ".pdf,.docx,.txt", multiple: false });
  onChange((files) => {
    if (files?.[0]) {
      pick([files[0]]);
      reset();
    }
  });

  const { pause, resume } = useIntervalFn(
    () => {
      progress.value = Math.min(100, progress.value + 20);
      if (progress.value >= 100 && current.value) {
        pause();
        const file = current.value;
        documents.value.unshift({
          id: `u${counter++}`,
          name: file.name,
          meta: `${(file.size / 1e6).toFixed(1)} MB · Uploaded just now`,
          from: "file",
        });
        useSonner.success(`${file.name} uploaded`);
        setTimeout(() => (open.value = false), 300);
      }
    },
    250,
    { immediate: false }
  );

  watch(open, (value) => {
    if (value) return;
    pause();
    current.value = null;
    progress.value = 0;
    fileError.value = "";
    link.value = "";
    linkError.value = "";
    tab.value = "file";
  });

  function pick(files: File[]) {
    const file = files[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx", "txt"].includes(ext ?? "")) {
      fileError.value = "Choose a PDF, DOCX or TXT file.";
      return;
    }
    if (file.size > props.maxMb * 1024 * 1024) {
      fileError.value = `The file must be smaller than ${props.maxMb} MB.`;
      return;
    }
    fileError.value = "";
    current.value = file;
    progress.value = 0;
    resume();
  }

  function importLink() {
    let url: URL | null = null;
    try {
      url = new URL(link.value.trim());
    } catch {
      url = null;
    }
    if (!url || !["http:", "https:"].includes(url.protocol)) {
      linkError.value = "Enter a link that starts with http or https.";
      return;
    }
    linkError.value = "";
    documents.value.unshift({
      id: `l${counter++}`,
      name: url.pathname.split("/").filter(Boolean).pop() || url.hostname,
      meta: `Imported from ${url.hostname}`,
      from: "link",
    });
    useSonner.success("Link imported");
    open.value = false;
  }
</script>
