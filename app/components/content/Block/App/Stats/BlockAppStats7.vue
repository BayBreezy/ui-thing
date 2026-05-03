<template>
  <UiCard class="relative overflow-hidden">
    <div
      :class="[
        'absolute inset-y-0 left-0 w-1',
        props.trend === 'up'
          ? 'bg-green-500'
          : props.trend === 'down'
            ? 'bg-red-500'
            : 'bg-primary',
      ]"
    />
    <UiCardContent class="pl-8">
      <div class="flex items-start justify-between">
        <div class="flex-1 space-y-1">
          <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
          <div class="flex items-baseline gap-2">
            <h3 class="text-2xl font-bold tracking-tight" v-html="props.value" />
            <span
              :class="[
                'text-sm font-medium',
                props.trend === 'up'
                  ? 'text-green-600 dark:text-green-500'
                  : props.trend === 'down'
                    ? 'text-red-600 dark:text-red-500'
                    : 'text-muted-foreground',
              ]"
              v-html="props.change"
            />
          </div>
          <p class="text-muted-foreground text-xs" v-html="props.description" />
        </div>
        <Icon :name="props.icon" class="text-muted-foreground/50 size-8" />
      </div>
      <div class="mt-4 flex items-center gap-4 text-xs">
        <div class="flex items-center gap-1">
          <div class="bg-primary size-2 rounded-full" />
          <span class="text-muted-foreground">Current: {{ props.current }}</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="bg-muted size-2 rounded-full" />
          <span class="text-muted-foreground">Previous: {{ props.previous }}</span>
        </div>
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
      trend?: "up" | "down" | "neutral";
      description?: string;
      icon?: string;
      current?: string;
      previous?: string;
    }>(),
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+0.4%",
      trend: "up",
      description: "Based on last 1,245 visitors",
      icon: "lucide:activity",
      current: "3.24%",
      previous: "2.84%",
    }
  );
</script>
