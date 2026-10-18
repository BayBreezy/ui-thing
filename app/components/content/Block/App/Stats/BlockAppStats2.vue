<template>
  <!--
    Stat card with a gradient icon on the right
    Features: Gradient fancy icon, big value, trend with an arrow, supporting text, hover lift and ring
  -->
  <UiCard class="group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <UiCardContent class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <slot name="label">
          <p class="text-muted-foreground text-sm font-medium">{{ props.label }}</p>
        </slot>
        <slot name="value">
          <p class="mt-2 text-3xl font-bold tracking-tight tabular-nums">{{ props.value }}</p>
        </slot>
        <p class="mt-3 flex items-center gap-1.5 text-sm">
          <span
            class="flex items-center gap-0.5 font-medium"
            :class="
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            "
          >
            <Icon
              :name="props.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'"
              class="size-4"
            />
            {{ props.change }}
          </span>
          <span class="text-muted-foreground">{{ props.comparison }}</span>
        </p>
      </div>
      <slot name="icon">
        <UiFancyIcon
          :icon="props.icon"
          theme="gradient"
          :color="props.color"
          size="xl"
          class="transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
        />
      </slot>
    </UiCardContent>
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
      color?: "primary" | "gray" | "error" | "warning" | "success" | "info";
    }>(),
    {
      label: "Active users",
      value: "24,830",
      change: "+8.2%",
      comparison: "vs last week",
      icon: "lucide:users",
      trend: "up",
      color: "info",
    }
  );
</script>
