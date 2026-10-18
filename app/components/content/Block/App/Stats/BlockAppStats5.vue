<template>
  <!--
    Stat card with a mini bar chart and an actions menu
    Features: Light fancy icon, overflow menu with refresh that simulates a reload, trend pill, bar chart that highlights the latest bar on hover
  -->
  <UiCard>
    <UiCardContent class="space-y-5">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <slot name="icon">
            <UiFancyIcon :icon="props.icon" theme="light" :color="props.color" />
          </slot>
          <slot name="label">
            <p class="text-muted-foreground text-sm font-medium">{{ props.label }}</p>
          </slot>
        </div>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost" size="icon-sm" aria-label="More options">
              <Icon name="lucide:ellipsis" class="size-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end">
            <UiDropdownMenuItem icon="lucide:eye" title="View details" />
            <UiDropdownMenuItem icon="lucide:download" title="Export" />
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem icon="lucide:refresh-cw" title="Refresh" @select="refresh" />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>

      <div class="flex items-end justify-between gap-4">
        <div>
          <p
            class="text-3xl font-bold tracking-tight tabular-nums transition-opacity"
            :class="loading && 'opacity-40'"
          >
            {{ props.value }}
          </p>
          <p
            class="mt-1 flex items-center gap-1 text-sm font-medium"
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
            <span class="text-muted-foreground font-normal">vs last week</span>
          </p>
        </div>
        <div class="flex h-14 items-end gap-1.5" aria-hidden="true">
          <div
            v-for="(bar, i) in props.data"
            :key="i"
            class="w-2.5 rounded-sm transition-all duration-300"
            :class="
              i === props.data.length - 1 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/50'
            "
            :style="{ height: loading ? '20%' : `${(bar / max) * 100}%` }"
          />
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
      icon?: string;
      trend?: "up" | "down";
      color?: "primary" | "gray" | "error" | "warning" | "success" | "info";
      data?: number[];
    }>(),
    {
      label: "Sales",
      value: "$24,500",
      change: "8.2%",
      icon: "lucide:shopping-cart",
      trend: "up",
      color: "primary",
      data: () => [40, 65, 48, 80, 58, 72, 95],
    }
  );

  const max = computed(() => Math.max(...props.data));
  const loading = ref(false);

  async function refresh() {
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 700));
    loading.value = false;
  }
</script>
