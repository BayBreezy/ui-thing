<template>
  <!--
    Dense KPI strip with a sparkline for each metric
    Features: Compact tiles with small icons, value and delta, an inline sparkline per metric, selected tile highlights, scrolls sideways on small screens
  -->
  <div class="-mx-4 overflow-x-auto px-4 pb-1">
    <div class="grid min-w-[44rem] grid-cols-4 gap-3">
      <button
        v-for="kpi in props.kpis"
        :key="kpi.label"
        type="button"
        class="bg-card hover:border-ring/60 group rounded-xl border p-4 text-left transition-all"
        :class="selected === kpi.label && 'border-primary ring-primary/20 ring-4'"
        :aria-pressed="selected === kpi.label"
        @click="selected = kpi.label"
      >
        <div class="flex items-center gap-2">
          <UiFancyIcon :icon="kpi.icon" theme="modern" color="gray" size="sm" class="size-8" />
          <span class="text-muted-foreground truncate text-xs font-medium">{{ kpi.label }}</span>
        </div>
        <div class="mt-3 flex items-end justify-between gap-2">
          <div>
            <p class="text-xl font-bold tracking-tight tabular-nums">{{ kpi.value }}</p>
            <p
              class="mt-0.5 text-xs font-medium"
              :class="
                kpi.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              "
            >
              {{ kpi.up ? "↑" : "↓" }} {{ kpi.change }}
            </p>
          </div>
          <svg
            viewBox="0 0 64 28"
            class="h-7 w-16"
            :class="kpi.up ? 'text-green-500' : 'text-red-500'"
            aria-hidden="true"
          >
            <polyline
              :points="points(kpi.data)"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      kpis?: {
        label: string;
        value: string;
        change: string;
        up: boolean;
        icon: string;
        data: number[];
      }[];
    }>(),
    {
      kpis: () => [
        {
          label: "Sessions",
          value: "84.2k",
          change: "6.4%",
          up: true,
          icon: "lucide:mouse-pointer-click",
          data: [3, 5, 4, 7, 6, 9, 8, 11],
        },
        {
          label: "Sign-ups",
          value: "1,284",
          change: "12.8%",
          up: true,
          icon: "lucide:user-plus",
          data: [2, 3, 3, 5, 4, 6, 7, 9],
        },
        {
          label: "Bounce rate",
          value: "38.2%",
          change: "2.1%",
          up: false,
          icon: "lucide:log-out",
          data: [8, 7, 9, 6, 7, 5, 6, 4],
        },
        {
          label: "Avg. session",
          value: "4m 12s",
          change: "9.3%",
          up: true,
          icon: "lucide:timer",
          data: [4, 4, 5, 6, 5, 7, 8, 8],
        },
      ],
    }
  );

  const selected = ref(props.kpis[0]?.label);

  function points(data: number[]) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const step = 64 / (data.length - 1);
    return data
      .map(
        (v, i) =>
          `${(i * step).toFixed(1)},${(26 - ((v - min) / (max - min || 1)) * 24).toFixed(1)}`
      )
      .join(" ");
  }
</script>
