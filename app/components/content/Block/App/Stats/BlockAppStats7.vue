<template>
  <!--
    Comparison stat showing the current period against the previous one
    Features: Warning colored fancy icon, large value with a delta pill, paired bars for current and previous, plain language footnote
  -->
  <UiCard>
    <UiCardContent class="space-y-5">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <slot name="icon">
            <UiFancyIcon :icon="props.icon" theme="light" color="warning" />
          </slot>
          <slot name="label">
            <p class="text-muted-foreground text-sm font-medium">{{ props.label }}</p>
          </slot>
        </div>
        <UiBadge :variant="improved ? 'success' : 'error'" class="gap-1">
          <Icon :name="improved ? 'lucide:arrow-up' : 'lucide:arrow-down'" class="size-3" />
          {{ delta }}%
        </UiBadge>
      </div>

      <p class="text-4xl font-bold tracking-tight tabular-nums">{{ props.current }}%</p>

      <div class="space-y-3">
        <div v-for="row in rows" :key="row.label" class="space-y-1.5">
          <div class="flex justify-between text-xs">
            <span class="text-muted-foreground">{{ row.label }}</span>
            <span class="font-medium tabular-nums">{{ row.value }}%</span>
          </div>
          <div class="bg-muted h-2 rounded-full">
            <div
              class="h-full rounded-full transition-[width] duration-700 ease-out"
              :class="row.bar"
              :style="{ width: `${(row.value / scale) * 100}%` }"
            />
          </div>
        </div>
      </div>

      <p class="text-muted-foreground text-xs">
        {{ improved ? "Up" : "Down" }}
        {{ Math.abs(props.current - props.previous).toFixed(2) }} points compared to the previous
        {{ props.period }}.
      </p>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      icon?: string;
      current?: number;
      previous?: number;
      period?: string;
    }>(),
    {
      label: "Conversion rate",
      icon: "lucide:activity",
      current: 3.24,
      previous: 2.84,
      period: "30 days",
    }
  );

  const improved = computed(() => props.current >= props.previous);
  const delta = computed(() =>
    Math.abs(((props.current - props.previous) / (props.previous || 1)) * 100).toFixed(1)
  );
  const scale = computed(() => Math.max(props.current, props.previous) * 1.1);
  const rows = computed(() => [
    { label: `This ${props.period}`, value: props.current, bar: "bg-primary" },
    { label: `Previous ${props.period}`, value: props.previous, bar: "bg-muted-foreground/40" },
  ]);
</script>
