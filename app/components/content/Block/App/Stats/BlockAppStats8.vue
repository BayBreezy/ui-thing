<template>
  <UiCard>
    <UiCardContent class="space-y-4">
      <div class="flex items-center justify-between">
        <div
          :class="[
            'flex size-12 items-center justify-center rounded-xl',
            props.iconBg || 'from-primary/20 to-primary/5 bg-linear-to-br',
          ]"
        >
          <Icon :name="props.icon" :class="['size-6', props.iconColor || 'text-primary']" />
        </div>
        <UiButton variant="ghost" size="icon">
          <Icon name="lucide:external-link" class="size-4" />
        </UiButton>
      </div>
      <div>
        <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
        <h3 class="mt-1 text-3xl font-bold tracking-tight" v-html="props.value" />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1 text-sm">
          <Icon
            :name="props.trend === 'up' ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'"
            :class="[
              'size-4',
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500',
            ]"
          />
          <span
            :class="[
              'font-semibold',
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500',
            ]"
            v-html="props.change"
          />
          <span class="text-muted-foreground text-xs" v-html="props.timeframe" />
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
      timeframe?: string;
      trend?: "up" | "down";
      icon?: string;
      iconBg?: string;
      iconColor?: string;
    }>(),
    {
      label: "New Customers",
      value: "573",
      change: "+12.3%",
      timeframe: "this month",
      trend: "up",
      icon: "lucide:user-plus",
    }
  );
</script>
