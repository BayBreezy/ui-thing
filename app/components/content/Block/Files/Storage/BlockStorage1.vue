<template>
  <!--
    Storage usage meter
    Features: Used and total storage in large numbers, a segmented bar split by file type with a text alternative, a legend with the size of each type, the free space left and manage and upgrade buttons
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-lg">
      <UiCardHeader>
        <UiCardTitle>Storage</UiCardTitle>
        <UiCardDescription>{{ plan }} plan</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="space-y-5">
        <div>
          <p class="text-3xl font-bold tabular-nums">
            {{ used.toFixed(1) }} GB
            <span class="text-muted-foreground text-base font-normal">of {{ total }} GB used</span>
          </p>
          <div
            class="bg-muted mt-3 flex h-3 overflow-hidden rounded-full"
            role="img"
            :aria-label="summary"
          >
            <span
              v-for="segment in segments"
              :key="segment.label"
              class="h-full first:rounded-l-full"
              :class="segment.color"
              :style="{ width: `${(segment.gb / total) * 100}%` }"
            />
          </div>
          <p class="text-muted-foreground mt-2 text-sm">{{ (total - used).toFixed(1) }} GB free</p>
        </div>
        <ul class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <li v-for="segment in segments" :key="segment.label" class="flex items-center gap-2">
            <span class="size-2.5 shrink-0 rounded-full" :class="segment.color" />
            <span class="flex-1">{{ segment.label }}</span>
            <span class="text-muted-foreground tabular-nums">{{ segment.gb.toFixed(1) }} GB</span>
          </li>
        </ul>
      </UiCardContent>
      <UiCardFooter class="gap-2 border-t">
        <UiButton variant="outline" @click="useSonner.info('Open the storage manager here')"
          >Manage storage</UiButton
        >
        <UiButton @click="useSonner.info('Open the plans page here')">Get more space</UiButton>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Segment = { label: string; gb: number; color: string };

  const props = withDefaults(
    defineProps<{
      plan?: string;
      total?: number;
      segments?: Segment[];
    }>(),
    {
      plan: "Free",
      total: 15,
      segments: () => [
        { label: "Documents", gb: 1.2, color: "bg-blue-500" },
        { label: "Images", gb: 3.1, color: "bg-violet-500" },
        { label: "Videos", gb: 2.4, color: "bg-pink-500" },
        { label: "Backups", gb: 0.5, color: "bg-amber-500" },
        { label: "Other", gb: 0.2, color: "bg-slate-400" },
      ],
    }
  );

  const used = computed(() => props.segments.reduce((sum, segment) => sum + segment.gb, 0));
  const summary = computed(
    () =>
      `${used.value.toFixed(1)} of ${props.total} gigabytes used. ` +
      props.segments.map((segment) => `${segment.label} ${segment.gb.toFixed(1)}`).join(", ")
  );
</script>
