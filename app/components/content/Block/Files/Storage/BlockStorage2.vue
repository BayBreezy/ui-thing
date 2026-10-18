<template>
  <!--
    Storage breakdown by type
    Features: A row for each kind of file with an icon, a bar sized against the largest type, the size or file count, a switch between size and file count, rows sorted by the chosen metric and a review button for each type
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">What is using your space</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">{{ totalLabel }}</p>
        </div>
        <UiToggleGroup
          :model-value="metric"
          type="single"
          variant="outline"
          size="sm"
          aria-label="Show by"
          @update:model-value="(value) => (metric = (value as 'size' | 'count') || 'size')"
        >
          <UiToggleGroupItem value="size">Size</UiToggleGroupItem>
          <UiToggleGroupItem value="count">File count</UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <ul class="mt-6 space-y-4" aria-live="polite">
        <li v-for="row in rows" :key="row.label" class="flex items-center gap-4">
          <span class="grid size-10 shrink-0 place-items-center rounded-lg" :class="row.tint"
            ><Icon :name="row.icon" class="size-5"
          /></span>
          <div class="min-w-0 flex-1">
            <div class="flex items-baseline justify-between gap-3">
              <p class="text-sm font-medium">{{ row.label }}</p>
              <p class="text-muted-foreground text-sm tabular-nums">{{ valueLabel(row) }}</p>
            </div>
            <div class="bg-muted mt-1.5 h-2 overflow-hidden rounded-full" role="presentation">
              <div
                class="h-full rounded-full transition-[width]"
                :class="row.bar"
                :style="{ width: `${(valueOf(row) / max) * 100}%` }"
              />
            </div>
          </div>
          <UiButton
            variant="ghost"
            size="sm"
            :aria-label="`Review ${row.label}`"
            @click="useSonner.info(`Review ${row.label} here`)"
            >Review</UiButton
          >
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Row = { label: string; icon: string; tint: string; bar: string; gb: number; files: number };

  const props = withDefaults(
    defineProps<{
      rows?: Row[];
    }>(),
    {
      rows: () => [
        {
          label: "Images",
          icon: "lucide:image",
          tint: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
          bar: "bg-violet-500",
          gb: 3.1,
          files: 2840,
        },
        {
          label: "Videos",
          icon: "lucide:video",
          tint: "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
          bar: "bg-pink-500",
          gb: 2.4,
          files: 36,
        },
        {
          label: "Documents",
          icon: "lucide:file-text",
          tint: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
          bar: "bg-blue-500",
          gb: 1.2,
          files: 913,
        },
        {
          label: "Backups",
          icon: "lucide:archive",
          tint: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
          bar: "bg-amber-500",
          gb: 0.5,
          files: 12,
        },
        {
          label: "Audio",
          icon: "lucide:music",
          tint: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
          bar: "bg-green-500",
          gb: 0.3,
          files: 74,
        },
      ],
    }
  );

  const metric = ref<"size" | "count">("size");

  const valueOf = (row: Row) => (metric.value === "size" ? row.gb : row.files);
  const rows = computed(() => [...props.rows].sort((a, b) => valueOf(b) - valueOf(a)));
  const max = computed(() => Math.max(...props.rows.map(valueOf), 1));
  const valueLabel = (row: Row) =>
    metric.value === "size"
      ? `${row.gb.toFixed(1)} GB`
      : `${row.files.toLocaleString("en-US")} files`;
  const totalLabel = computed(() =>
    metric.value === "size"
      ? `${props.rows.reduce((sum, row) => sum + row.gb, 0).toFixed(1)} GB in total`
      : `${props.rows.reduce((sum, row) => sum + row.files, 0).toLocaleString("en-US")} files in total`
  );
</script>
