<template>
  <!--
    Overview section with a period switcher and four stat cards
    Features: Section heading with a segmented range control, cards whose values and trends change per range, colored gradient fancy icons, skeleton shimmer while the data loads
  -->
  <section class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground text-sm">{{ props.description }}</p>
        </slot>
      </div>
      <UiToggleGroup
        :model-value="range"
        type="single"
        variant="outline"
        aria-label="Date range"
        class="bg-background shadow-xs"
        @update:model-value="change"
      >
        <UiToggleGroupItem
          v-for="item in ranges"
          :key="item.value"
          :value="item.value"
          class="px-3 text-sm"
        >
          {{ item.label }}
        </UiToggleGroupItem>
      </UiToggleGroup>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <UiCard v-for="stat in cards" :key="stat.label">
        <UiCardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <UiFancyIcon :icon="stat.icon" theme="gradient" :color="stat.color" size="md" />
            <span
              v-if="!loading"
              class="flex items-center gap-0.5 text-xs font-medium"
              :class="
                stat.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              "
            >
              <Icon
                :name="stat.up ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'"
                class="size-3.5"
              />
              {{ stat.change }}
            </span>
          </div>
          <div>
            <p class="text-muted-foreground text-sm">{{ stat.label }}</p>
            <div v-if="loading" class="bg-muted mt-2 h-8 w-24 animate-pulse rounded-md" />
            <p v-else class="mt-1 text-2xl font-bold tracking-tight tabular-nums">
              {{ stat.values[range] }}
            </p>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </section>
</template>

<script lang="ts" setup>
  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";
  type Range = "7d" | "30d" | "90d";

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Overview",
      description: "How the business is doing across the selected period.",
    }
  );

  const ranges: { label: string; value: Range }[] = [
    { label: "7 days", value: "7d" },
    { label: "30 days", value: "30d" },
    { label: "90 days", value: "90d" },
  ];

  const range = ref<Range>("30d");
  const loading = ref(false);

  const metrics: {
    label: string;
    icon: string;
    color: Color;
    values: Record<Range, string>;
    changes: Record<Range, { change: string; up: boolean }>;
  }[] = [
    {
      label: "Revenue",
      icon: "lucide:wallet",
      color: "success",
      values: { "7d": "$12.4k", "30d": "$48.2k", "90d": "$141k" },
      changes: {
        "7d": { change: "4.2%", up: true },
        "30d": { change: "12.4%", up: true },
        "90d": { change: "21.8%", up: true },
      },
    },
    {
      label: "New customers",
      icon: "lucide:user-plus",
      color: "info",
      values: { "7d": "312", "30d": "1,284", "90d": "3,906" },
      changes: {
        "7d": { change: "2.1%", up: true },
        "30d": { change: "8.1%", up: true },
        "90d": { change: "14.3%", up: true },
      },
    },
    {
      label: "Open tickets",
      icon: "lucide:life-buoy",
      color: "warning",
      values: { "7d": "38", "30d": "142", "90d": "406" },
      changes: {
        "7d": { change: "6.0%", up: false },
        "30d": { change: "3.4%", up: false },
        "90d": { change: "1.2%", up: true },
      },
    },
    {
      label: "Churn rate",
      icon: "lucide:user-minus",
      color: "error",
      values: { "7d": "0.4%", "30d": "1.9%", "90d": "5.2%" },
      changes: {
        "7d": { change: "0.1%", up: true },
        "30d": { change: "0.3%", up: true },
        "90d": { change: "0.8%", up: false },
      },
    },
  ];

  const cards = computed(() =>
    metrics.map((metric) => ({
      ...metric,
      ...metric.changes[range.value],
    }))
  );

  async function change(value: unknown) {
    // Clicking the active item clears a single toggle group, so ignore empty values.
    if (!value || value === range.value) return;
    range.value = value as Range;
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 450));
    loading.value = false;
  }
</script>
