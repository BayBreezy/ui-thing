<template>
  <UiCard>
    <UiCardContent class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
        <h3 class="mt-2 text-2xl font-bold tracking-tight" v-html="props.value" />
        <div class="mt-2 flex items-center gap-1.5 text-sm">
          <Icon
            :name="props.trend === 'up' ? 'lucide:trending-up' : 'lucide:trending-down'"
            :class="[
              'size-4',
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500',
            ]"
          />
          <span
            :class="[
              'font-medium',
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500',
            ]"
            v-html="props.change"
          />
          <span class="text-muted-foreground" v-html="props.timeframe" />
        </div>
      </div>
      <div
        :class="[
          'flex size-12 items-center justify-center rounded-lg',
          props.iconBg || 'bg-primary/10',
        ]"
      >
        <Icon :name="props.icon" :class="['size-6', props.iconColor || 'text-primary']" />
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: string;
      change?: string;
      timeframe?: string;
      trend?: "up" | "down";
      icon?: string;
      iconBg?: string;
      iconColor?: string;
    }>(),
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      timeframe: "from last month",
      trend: "up",
      icon: "lucide:dollar-sign",
    }
  );
</script>
