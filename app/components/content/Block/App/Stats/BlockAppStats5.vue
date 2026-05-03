<template>
  <UiCard>
    <UiCardHeader>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            :class="[
              'flex size-10 items-center justify-center rounded-full',
              props.iconBg || 'bg-primary/10',
            ]"
          >
            <Icon :name="props.icon" :class="['size-5', props.iconColor || 'text-primary']" />
          </div>
          <div>
            <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
            <h3 class="text-xl font-bold tracking-tight" v-html="props.value" />
          </div>
        </div>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost" size="icon-sm">
              <Icon name="lucide:more-horizontal" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end">
            <UiDropdownMenuItem>
              <Icon name="lucide:eye" class="mr-2 size-4" />
              View Details
            </UiDropdownMenuItem>
            <UiDropdownMenuItem>
              <Icon name="lucide:download" class="mr-2 size-4" />
              Export
            </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem>
              <Icon name="lucide:refresh-cw" class="mr-2 size-4" />
              Refresh
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </UiCardHeader>
    <UiCardContent>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
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
              'text-sm font-medium',
              props.trend === 'up'
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500',
            ]"
            v-html="props.change"
          />
          <span class="text-muted-foreground text-sm" v-html="props.timeframe" />
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
      label: "Sales",
      value: "$24,500",
      change: "+8.2%",
      timeframe: "vs last week",
      trend: "up",
      icon: "lucide:shopping-cart",
    }
  );
</script>
