<template>
  <!--
    Quota warning banners
    Features: A banner that changes with how full the storage is, a heads up at 80 percent, a warning at 90 percent and a full state at 100 percent that pauses uploads, a dismiss button for the lower levels and free up space and upgrade actions, with a demo slider to preview each state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl space-y-6">
      <div
        v-if="state"
        :key="state.level"
        class="flex items-start gap-3 rounded-xl border p-4"
        :class="state.tone"
        :role="state.level === 'full' ? 'alert' : 'status'"
      >
        <Icon :name="state.icon" class="mt-0.5 size-5 shrink-0" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold">{{ state.title }}</p>
          <p class="mt-0.5 text-sm opacity-90">{{ state.body }}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <UiButton
              size="sm"
              variant="outline"
              class="bg-background/60"
              @click="useSonner.info('Open the storage manager here')"
              >Free up space</UiButton
            >
            <UiButton size="sm" @click="useSonner.info('Open the plans page here')"
              >Upgrade</UiButton
            >
          </div>
        </div>
        <UiButton
          v-if="state.level !== 'full'"
          variant="ghost"
          size="icon-sm"
          aria-label="Dismiss"
          @click="dismissed = state.level"
          ><Icon name="lucide:x" class="size-4"
        /></UiButton>
      </div>

      <UiCard>
        <UiCardContent class="space-y-4">
          <div class="flex items-center justify-between text-sm">
            <span class="font-medium">Your storage</span>
            <span class="tabular-nums">{{ usedGb.toFixed(1) }} of {{ total }} GB</span>
          </div>
          <UiProgress :model-value="percent" class="h-2.5" aria-label="Storage used" />
          <UiButton
            :disabled="percent >= 100"
            class="w-full"
            @click="useSonner.success('Upload started')"
          >
            <Icon name="lucide:upload" class="size-4" />{{
              percent >= 100 ? "Uploads paused" : "Upload a file"
            }}
          </UiButton>
        </UiCardContent>
      </UiCard>

      <div class="rounded-xl border border-dashed p-4">
        <div class="flex items-center justify-between gap-3">
          <UiLabel for="demo-usage" class="text-sm">Preview usage (demo only)</UiLabel>
          <span class="text-muted-foreground text-sm tabular-nums">{{ percent }}%</span>
        </div>
        <input
          id="demo-usage"
          v-model.number="percent"
          type="range"
          min="40"
          max="100"
          step="1"
          class="accent-primary mt-2 w-full"
        />
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Level = "notice" | "warning" | "full";

  const props = withDefaults(
    defineProps<{
      total?: number;
      /** Starting usage as a percent. */
      usage?: number;
    }>(),
    { total: 15, usage: 92 }
  );

  const percent = ref(props.usage);
  const dismissed = ref<Level | "">("");
  const usedGb = computed(() => (percent.value / 100) * props.total);

  const level = computed<Level | null>(() =>
    percent.value >= 100
      ? "full"
      : percent.value >= 90
        ? "warning"
        : percent.value >= 80
          ? "notice"
          : null
  );

  watch(level, () => (dismissed.value = ""));

  const states: Record<Level, { icon: string; title: string; body: string; tone: string }> = {
    notice: {
      icon: "lucide:info",
      title: "You have used 80 percent of your storage",
      body: "You still have room, but now is a good time to clear out what you do not need.",
      tone: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200",
    },
    warning: {
      icon: "lucide:triangle-alert",
      title: "Your storage is almost full",
      body: "At 100 percent you will not be able to upload new files or sync changes.",
      tone: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200",
    },
    full: {
      icon: "lucide:circle-alert",
      title: "Your storage is full",
      body: "Uploads are paused until you free up space or upgrade your plan.",
      tone: "border-red-200 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200",
    },
  };

  const state = computed(() =>
    level.value && dismissed.value !== level.value
      ? { level: level.value, ...states[level.value] }
      : null
  );
</script>
