<template>
  <!--
    Breakdown stat with a segmented bar and legend
    Features: Total value with a fancy icon, stacked bar split by status, legend with counts and percentages, segments highlight on hover
  -->
  <UiCard>
    <UiCardContent class="space-y-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <slot name="icon">
            <UiFancyIcon :icon="props.icon" theme="modern-neue" color="gray" />
          </slot>
          <div>
            <slot name="label">
              <p class="text-muted-foreground text-sm font-medium">{{ props.label }}</p>
            </slot>
            <p class="text-2xl font-bold tracking-tight tabular-nums">
              {{ total.toLocaleString() }}
            </p>
          </div>
        </div>
        <UiBadge variant="outline">This month</UiBadge>
      </div>

      <div class="flex h-3 gap-1 overflow-hidden rounded-full" role="img" :aria-label="summary">
        <div
          v-for="segment in props.segments"
          :key="segment.label"
          class="h-full rounded-full transition-all duration-300 first:rounded-l-full last:rounded-r-full"
          :class="[segment.color, active && active !== segment.label && 'opacity-30']"
          :style="{ width: `${(segment.value / total) * 100}%` }"
          @mouseenter="active = segment.label"
          @mouseleave="active = ''"
        />
      </div>

      <ul class="grid gap-2.5">
        <li
          v-for="segment in props.segments"
          :key="segment.label"
          class="flex items-center justify-between gap-3 text-sm transition-opacity"
          :class="active && active !== segment.label && 'opacity-40'"
          @mouseenter="active = segment.label"
          @mouseleave="active = ''"
        >
          <span class="flex items-center gap-2">
            <span class="size-2.5 rounded-full" :class="segment.color" />
            {{ segment.label }}
          </span>
          <span class="flex items-center gap-3">
            <span class="font-medium tabular-nums">{{ segment.value.toLocaleString() }}</span>
            <span class="text-muted-foreground w-10 text-right tabular-nums">
              {{ Math.round((segment.value / total) * 100) }}%
            </span>
          </span>
        </li>
      </ul>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      icon?: string;
      segments?: { label: string; value: number; color: string }[];
    }>(),
    {
      label: "Total orders",
      icon: "lucide:package",
      segments: () => [
        { label: "Completed", value: 1305, color: "bg-green-500" },
        { label: "Pending", value: 124, color: "bg-amber-500" },
        { label: "Cancelled", value: 38, color: "bg-red-500" },
      ],
    }
  );

  const active = ref("");
  const total = computed(() => props.segments.reduce((sum, segment) => sum + segment.value, 0));
  const summary = computed(() =>
    props.segments.map((segment) => `${segment.label}: ${segment.value}`).join(", ")
  );
</script>
