<template>
  <UiCard>
    <UiCardContent class="space-y-4">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
          <h3 class="mt-1 text-2xl font-bold tracking-tight" v-html="props.value" />
        </div>
        <div :class="['rounded-lg p-2', props.iconBg || 'bg-primary/10']">
          <Icon :name="props.icon" :class="['size-5', props.iconColor || 'text-primary']" />
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Goal</span>
          <span class="font-medium">{{ props.goal }}</span>
        </div>
        <UiProgress :model-value="props.progressPercent" class="h-2" />
        <div class="flex items-center justify-between text-xs">
          <span class="text-muted-foreground">{{ props.remaining }} remaining</span>
          <span class="text-muted-foreground font-medium">{{ props.progressPercent }}%</span>
        </div>
      </div>

      <div class="bg-muted/50 flex items-center gap-2 rounded-lg p-3">
        <Icon
          :name="props.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'"
          :class="[
            'size-4',
            props.trend === 'up'
              ? 'text-green-600 dark:text-green-500'
              : 'text-red-600 dark:text-red-500',
          ]"
        />
        <span class="flex-1 text-sm">
          <span
            :class="[
              'font-semibold',
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500',
            ]"
            v-html="props.change"
          />
          <span class="text-muted-foreground"> {{ props.timeframe }}</span>
        </span>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: string;
      goal?: string;
      remaining?: string;
      progressPercent?: number;
      change?: string;
      timeframe?: string;
      trend?: "up" | "down";
      icon?: string;
      iconBg?: string;
      iconColor?: string;
    }>(),
    {
      label: "Revenue Goal",
      value: "$84,250",
      goal: "$100,000",
      remaining: "$15,750",
      progressPercent: 84.25,
      change: "+18.5%",
      timeframe: "from last quarter",
      trend: "up",
      icon: "lucide:target",
    }
  );
</script>
