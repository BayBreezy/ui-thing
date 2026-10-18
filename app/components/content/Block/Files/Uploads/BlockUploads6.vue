<template>
  <!--
    Failed uploads and retry
    Features: A list of uploads with done, uploading and failed states, a clear reason for each failure, retry for network errors, replace file for files that are too large or have the wrong type, a retry all failed button and a summary alert
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Uploads</h1>
        <UiButton variant="outline" size="sm" :disabled="!retryable" @click="retryAll"
          ><Icon name="lucide:rotate-cw" class="size-4" />Retry all failed</UiButton
        >
      </div>

      <UiAlert
        v-if="failed"
        role="status"
        class="mt-4"
        icon="lucide:triangle-alert"
        :title="`${failed} ${failed === 1 ? 'upload' : 'uploads'} failed`"
        description="Retry the ones that failed because of the network. Replace files that are too large or not supported."
      />

      <ul class="mt-4 divide-y rounded-xl border" aria-live="polite">
        <li v-for="item in items" :key="item.id" class="flex items-center gap-3 px-4 py-3.5">
          <span
            class="grid size-9 shrink-0 place-items-center rounded-lg"
            :class="tone[item.status]"
          >
            <Icon
              :name="icon[item.status]"
              class="size-4"
              :class="item.status === 'uploading' ? 'animate-spin motion-reduce:animate-none' : ''"
            />
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ item.name }}</p>
            <p
              class="text-xs"
              :class="item.status === 'failed' ? 'text-destructive' : 'text-muted-foreground'"
            >
              {{
                item.status === "failed"
                  ? reasons[item.reason!]
                  : item.status === "uploading"
                    ? "Uploading"
                    : `${item.size} · Uploaded`
              }}
            </p>
          </div>
          <UiButton
            v-if="item.status === 'failed' && item.reason === 'network'"
            variant="outline"
            size="sm"
            @click="retry(item)"
            >Retry</UiButton
          >
          <UiButton
            v-else-if="item.status === 'failed'"
            variant="outline"
            size="sm"
            @click="replace(item)"
            >Replace file</UiButton
          >
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`Remove ${item.name}`"
            @click="remove(item.id)"
            ><Icon name="lucide:x" class="size-4"
          /></UiButton>
        </li>
        <li v-if="!items.length" class="text-muted-foreground px-4 py-10 text-center text-sm">
          No uploads.
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "done" | "uploading" | "failed";
  type Reason = "network" | "size" | "type";
  type Item = { id: string; name: string; size: string; status: Status; reason?: Reason };

  const props = withDefaults(
    defineProps<{
      uploads?: Item[];
    }>(),
    {
      uploads: () => [
        { id: "r1", name: "Invoice 1042.pdf", size: "92 KB", status: "done" },
        { id: "r2", name: "Site photos.zip", size: "480 MB", status: "failed", reason: "size" },
        {
          id: "r3",
          name: "Contract draft.docx",
          size: "240 KB",
          status: "failed",
          reason: "network",
        },
        { id: "r4", name: "Voice memo.m4a", size: "3.1 MB", status: "failed", reason: "type" },
        { id: "r5", name: "Budget 2027.xlsx", size: "310 KB", status: "uploading" },
        { id: "r6", name: "Team photo.jpg", size: "2.8 MB", status: "failed", reason: "network" },
      ],
    }
  );

  const reasons: Record<Reason, string> = {
    network: "The connection dropped. Try again.",
    size: "The file is larger than the 100 MB limit.",
    type: "This file type is not supported.",
  };
  const tone: Record<Status, string> = {
    done: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    uploading: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    failed: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  };
  const icon: Record<Status, string> = {
    done: "lucide:check",
    uploading: "lucide:loader-circle",
    failed: "lucide:triangle-alert",
  };

  const items = ref<Item[]>(props.uploads.map((item) => ({ ...item })));
  const failed = computed(() => items.value.filter((item) => item.status === "failed").length);
  const retryable = computed(() =>
    items.value.some((item) => item.status === "failed" && item.reason === "network")
  );

  function retry(item: Item) {
    item.status = "uploading";
    item.reason = undefined;
    setTimeout(() => (item.status = "done"), 1200);
  }

  function retryAll() {
    items.value
      .filter((item) => item.status === "failed" && item.reason === "network")
      .forEach(retry);
  }

  function replace(item: Item) {
    useSonner.info(`Choose a replacement for ${item.name}`);
  }

  function remove(id: string) {
    items.value = items.value.filter((item) => item.id !== id);
  }
</script>
