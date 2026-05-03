<template>
  <UiCard>
    <UiCardContent class="space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
        <UiBadge :variant="props.trend === 'up' ? 'default' : 'destructive'">
          <Icon
            :name="props.trend === 'up' ? 'lucide:arrow-up' : 'lucide:arrow-down'"
            class="mr-1 size-3"
          />
          {{ props.change }}
        </UiBadge>
      </div>
      <div>
        <h3 class="text-3xl font-bold tracking-tight" v-html="props.value" />
        <p class="text-muted-foreground mt-1 text-xs" v-html="props.description" />
      </div>
      <UiProgress :model-value="props.progress" class="h-1.5" />
      <div class="text-muted-foreground flex items-center justify-between text-xs">
        <span v-html="props.progressLabel" />
        <span>{{ props.progress }}%</span>
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
      trend?: "up" | "down";
      description?: string;
      progress?: number;
      progressLabel?: string;
    }>(),
    {
      label: "Monthly Target",
      value: "$12,450",
      change: "+12.5%",
      trend: "up",
      description: "Target: $15,000",
      progress: 83,
      progressLabel: "83% of target reached",
    }
  );
</script>
