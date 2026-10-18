<template>
  <!--
    Featured stat with a chart beside four smaller stats
    Features: Large revenue card with a bar chart that shows a tooltip on hover, a two by two grid of compact stats with fancy icons, collapses to a single column on mobile
  -->
  <div class="grid gap-4 lg:grid-cols-5">
    <UiCard class="lg:col-span-3">
      <UiCardContent class="flex h-full flex-col gap-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-muted-foreground text-sm font-medium">{{ props.title }}</p>
            <p class="mt-1 text-3xl font-bold tracking-tight tabular-nums">{{ total }}</p>
            <p
              class="mt-1 flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400"
            >
              <Icon name="lucide:trending-up" class="size-4" />
              {{ props.change }}
              <span class="text-muted-foreground font-normal">vs last year</span>
            </p>
          </div>
          <UiFancyIcon icon="lucide:chart-column" theme="modern-neue" color="gray" />
        </div>

        <div class="flex min-h-40 flex-1 items-end gap-2" role="img" aria-label="Monthly revenue">
          <div
            v-for="month in props.months"
            :key="month.label"
            class="group relative flex h-full flex-1 flex-col justify-end"
          >
            <span
              class="bg-foreground text-background pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100"
            >
              ${{ month.value }}k
            </span>
            <div
              class="bg-primary/20 group-hover:bg-primary rounded-t-md transition-colors"
              :style="{ height: `${(month.value / max) * 100}%` }"
            />
            <span class="text-muted-foreground mt-2 text-center text-[10px]">{{
              month.label
            }}</span>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <div class="grid gap-4 sm:grid-cols-2 lg:col-span-2">
      <UiCard v-for="stat in props.stats" :key="stat.label">
        <UiCardContent class="flex h-full flex-col justify-between gap-4">
          <UiFancyIcon :icon="stat.icon" theme="light" :color="stat.color" size="md" />
          <div>
            <p class="text-muted-foreground text-xs font-medium">{{ stat.label }}</p>
            <p class="mt-0.5 text-xl font-bold tracking-tight tabular-nums">{{ stat.value }}</p>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";

  const props = withDefaults(
    defineProps<{
      title?: string;
      change?: string;
      months?: { label: string; value: number }[];
      stats?: { label: string; value: string; icon: string; color: Color }[];
    }>(),
    {
      title: "Revenue this year",
      change: "18.2%",
      months: () =>
        [38, 44, 41, 52, 49, 58, 55, 63, 60, 71, 68, 82].map((value, i) => ({
          label: "JFMAMJJASOND"[i]!,
          value,
        })),
      stats: () => [
        { label: "New customers", value: "1,284", icon: "lucide:user-plus", color: "info" },
        { label: "Avg. order value", value: "$86.40", icon: "lucide:receipt", color: "success" },
        { label: "Churn rate", value: "1.9%", icon: "lucide:user-minus", color: "error" },
        { label: "Support tickets", value: "142", icon: "lucide:life-buoy", color: "warning" },
      ],
    }
  );

  const max = computed(() => Math.max(...props.months.map((month) => month.value)));
  const total = computed(
    () => `$${props.months.reduce((sum, month) => sum + month.value, 0).toLocaleString()}k`
  );
</script>
