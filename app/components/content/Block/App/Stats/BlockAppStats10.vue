<template>
  <!--
    Stat card with a period switcher
    Features: Segmented 7D, 30D and 90D control that swaps the value, delta and chart, modern fancy icon, bars animate between periods
  -->
  <UiCard>
    <UiCardContent class="space-y-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <slot name="icon">
            <UiFancyIcon :icon="props.icon" theme="modern-neue" color="gray" />
          </slot>
          <slot name="label">
            <p class="text-sm font-medium">{{ props.label }}</p>
          </slot>
        </div>
        <UiToggleGroup
          :model-value="period"
          type="single"
          variant="outline"
          size="sm"
          aria-label="Period"
          @update:model-value="(value) => value && (period = value as string)"
        >
          <UiToggleGroupItem
            v-for="item in periods"
            :key="item.value"
            :value="item.value"
            class="px-2.5 text-xs"
          >
            {{ item.label }}
          </UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="text-3xl font-bold tracking-tight tabular-nums">{{ current.value }}</p>
          <p
            class="mt-1 flex items-center gap-1 text-sm font-medium"
            :class="
              current.up ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            "
          >
            <Icon
              :name="current.up ? 'lucide:trending-up' : 'lucide:trending-down'"
              class="size-4"
            />
            {{ current.delta }}
            <span class="text-muted-foreground font-normal">vs previous period</span>
          </p>
        </div>
        <div class="flex h-16 items-end gap-1" aria-hidden="true">
          <div
            v-for="(bar, i) in current.bars"
            :key="i"
            class="bg-primary/70 w-2 rounded-sm transition-all duration-500"
            :style="{ height: `${bar}%` }"
          />
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      icon?: string;
    }>(),
    {
      label: "Page views",
      icon: "lucide:eye",
    }
  );

  const periods = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
  ];

  const data: Record<string, { value: string; delta: string; up: boolean; bars: number[] }> = {
    "7d": { value: "84,210", delta: "+6.4%", up: true, bars: [45, 60, 52, 75, 68, 88, 80] },
    "30d": {
      value: "362,904",
      delta: "+12.8%",
      up: true,
      bars: [30, 42, 38, 55, 48, 62, 58, 70, 66, 78, 74, 90],
    },
    "90d": {
      value: "1.04M",
      delta: "-2.1%",
      up: false,
      bars: [80, 74, 78, 66, 70, 62, 64, 56, 60, 52, 55, 48, 50, 44, 46, 40],
    },
  };

  const period = ref("30d");
  const current = computed(() => data[period.value] ?? data["30d"]!);
</script>
