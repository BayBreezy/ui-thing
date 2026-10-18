<template>
  <!--
    Multi file upload progress
    Features: A queue of files with a progress bar for each one, speed and time left, pause and resume, cancel for one file or all, an overall progress bar and a done state with a clear finished button
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-xl gap-0 py-0">
      <div class="flex items-center justify-between gap-3 border-b px-5 py-4">
        <div>
          <h1 class="font-semibold">
            Uploading {{ files.length }} {{ files.length === 1 ? "file" : "files" }}
          </h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            {{ doneCount }} of {{ files.length }} complete
          </p>
        </div>
        <UiButton variant="outline" size="sm" :disabled="!active" @click="cancelAll"
          >Cancel all</UiButton
        >
      </div>
      <UiProgress :model-value="overall" class="h-1 rounded-none" aria-label="Overall progress" />

      <ul class="divide-y">
        <li v-for="file in files" :key="file.id" class="px-5 py-4">
          <div class="flex items-center gap-3">
            <Icon :name="file.icon" class="text-muted-foreground size-5 shrink-0" />
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ file.name }}</p>
              <p class="text-muted-foreground text-xs" aria-live="off">{{ statusText(file) }}</p>
            </div>
            <Icon
              v-if="file.status === 'done'"
              name="lucide:circle-check"
              class="size-5 text-green-500"
              aria-label="Done"
            />
            <template v-else-if="file.status !== 'cancelled'">
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`${file.status === 'paused' ? 'Resume' : 'Pause'} ${file.name}`"
                @click="file.status = file.status === 'paused' ? 'uploading' : 'paused'"
                ><Icon
                  :name="file.status === 'paused' ? 'lucide:play' : 'lucide:pause'"
                  class="size-4"
              /></UiButton>
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Cancel ${file.name}`"
                @click="file.status = 'cancelled'"
                ><Icon name="lucide:x" class="size-4"
              /></UiButton>
            </template>
          </div>
          <UiProgress
            v-if="file.status !== 'cancelled'"
            :model-value="file.progress"
            class="mt-3 h-1.5"
            :aria-label="`${file.name} progress`"
          />
        </li>
      </ul>

      <div v-if="!active" class="flex items-center justify-between gap-3 border-t px-5 py-3">
        <p class="text-muted-foreground text-sm">
          {{ doneCount }} uploaded, {{ cancelledCount }} cancelled
        </p>
        <UiButton size="sm" variant="outline" @click="restart">Upload again</UiButton>
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "uploading" | "paused" | "done" | "cancelled";
  type Upload = {
    id: string;
    name: string;
    icon: string;
    mb: number;
    /** Percent added per second. */
    rate: number;
  };

  const props = withDefaults(
    defineProps<{
      uploads?: Upload[];
      /** Speed up the simulation. */
      speed?: number;
    }>(),
    {
      speed: 1,
      uploads: () => [
        { id: "u1", name: "Product demo.mp4", icon: "lucide:file-video", mb: 84, rate: 12 },
        { id: "u2", name: "Brand guidelines.pdf", icon: "lucide:file-text", mb: 6.2, rate: 26 },
        { id: "u3", name: "Team photo.jpg", icon: "lucide:image", mb: 3.4, rate: 34 },
        { id: "u4", name: "Customer list.csv", icon: "lucide:file-spreadsheet", mb: 0.8, rate: 55 },
      ],
    }
  );

  type Row = Upload & { progress: number; status: Status };
  const fresh = () =>
    props.uploads.map<Row>((upload, index) => ({
      ...upload,
      progress: index === 3 ? 100 : 0,
      status: index === 3 ? "done" : "uploading",
    }));
  const files = ref<Row[]>(fresh());

  const doneCount = computed(() => files.value.filter((file) => file.status === "done").length);
  const cancelledCount = computed(
    () => files.value.filter((file) => file.status === "cancelled").length
  );
  const active = computed(() =>
    files.value.some((file) => file.status === "uploading" || file.status === "paused")
  );
  const overall = computed(() => {
    const live = files.value.filter((file) => file.status !== "cancelled");
    return live.length ? live.reduce((sum, file) => sum + file.progress, 0) / live.length : 0;
  });

  useIntervalFn(() => {
    for (const file of files.value) {
      if (file.status !== "uploading") continue;
      file.progress = Math.min(100, file.progress + (file.rate * props.speed) / 5);
      if (file.progress >= 100) file.status = "done";
    }
  }, 200);

  function statusText(file: Row) {
    if (file.status === "done") return `${file.mb} MB · Uploaded`;
    if (file.status === "cancelled") return "Cancelled";
    if (file.status === "paused") return `${Math.round(file.progress)}% · Paused`;
    const left = Math.ceil((100 - file.progress) / (file.rate * props.speed));
    return `${Math.round(file.progress)}% of ${file.mb} MB · ${left}s left`;
  }

  function cancelAll() {
    files.value.forEach((file) => {
      if (file.status === "uploading" || file.status === "paused") file.status = "cancelled";
    });
  }

  function restart() {
    files.value = fresh();
  }
</script>
