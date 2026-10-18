<template>
  <!--
    Stat card with an icon, trend pill and sparkline
    Features: Fancy icon, large value, trend pill with direction color, comparison text, area sparkline drawn from your data
  -->
  <UiCard class="overflow-hidden py-0">
    <UiCardContent class="p-5 pb-0">
      <div class="flex items-start justify-between gap-3">
        <slot name="icon">
          <UiFancyIcon :icon="props.icon" theme="modern" color="gray" />
        </slot>
        <span
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          :class="
            up
              ? 'bg-green-500/10 text-green-600 dark:text-green-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400'
          "
        >
          <Icon :name="up ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'" class="size-3" />
          {{ props.change }}
        </span>
      </div>
      <div class="mt-4">
        <slot name="label">
          <p class="text-muted-foreground text-sm font-medium">{{ props.label }}</p>
        </slot>
        <slot name="value">
          <p class="mt-1 text-3xl font-bold tracking-tight tabular-nums">{{ props.value }}</p>
        </slot>
        <p class="text-muted-foreground mt-1 text-xs">{{ props.comparison }}</p>
      </div>
    </UiCardContent>
    <svg
      viewBox="0 0 160 48"
      preserveAspectRatio="none"
      class="mt-3 h-14 w-full"
      :class="up ? 'text-green-500' : 'text-red-500'"
      aria-hidden="true"
    >
      <path :d="spark.area" fill="currentColor" class="opacity-10" />
      <path
        :d="spark.line"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: string;
      change?: string;
      comparison?: string;
      icon?: string;
      trend?: "up" | "down";
      data?: number[];
    }>(),
    {
      label: "Total revenue",
      value: "$48,260",
      change: "12.5%",
      comparison: "Compared to $42,900 last month",
      icon: "lucide:wallet",
      trend: "up",
      data: () => [12, 18, 15, 24, 21, 30, 27, 36, 33, 42, 39, 48],
    }
  );

  const up = computed(() => props.trend === "up");

  const spark = computed(() => {
    const w = 160;
    const h = 48;
    const min = Math.min(...props.data);
    const max = Math.max(...props.data);
    const step = w / (props.data.length - 1);
    const points = props.data.map((v, i) => [
      i * step,
      h - 6 - ((v - min) / (max - min || 1)) * (h - 14),
    ]);
    const line = points
      .map(([x, y], i) => `${i ? "L" : "M"}${x!.toFixed(1)},${y!.toFixed(1)}`)
      .join(" ");
    return { line, area: `${line} L${w},${h} L0,${h} Z` };
  });
</script>
