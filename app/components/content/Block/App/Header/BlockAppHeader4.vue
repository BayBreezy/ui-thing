<template>
  <!--
    Dashboard header with a greeting and a date range switcher
    Features: Time of day greeting, formatted date, segmented range control, refresh button that spins and updates its timestamp, export action
  -->
  <UiContainer class="px-4 py-6 md:px-8">
    <Motion
      class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <div>
        <slot name="title">
          <h1 class="text-2xl font-bold tracking-tight">{{ greeting }}, {{ props.name }}</h1>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            <Icon name="lucide:calendar" class="size-4" />
            {{ today }}
          </p>
        </slot>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <UiToggleGroup
          :model-value="range"
          type="single"
          variant="outline"
          class="bg-background shadow-xs"
          aria-label="Date range"
          @update:model-value="(value) => value && (range = value as string)"
        >
          <UiToggleGroupItem
            v-for="option in props.ranges"
            :key="option.value"
            :value="option.value"
            class="px-3 text-sm"
          >
            {{ option.label }}
          </UiToggleGroupItem>
        </UiToggleGroup>

        <UiButton variant="outline" :disabled="refreshing" @click="refresh">
          <Icon name="lucide:refresh-cw" class="size-4" :class="refreshing && 'animate-spin'" />
          <span class="text-muted-foreground hidden sm:inline">{{ updated }}</span>
          <span class="sm:hidden">Refresh</span>
        </UiButton>
        <slot>
          <UiButton>
            <Icon name="lucide:download" class="size-4" />
            Export
          </UiButton>
        </slot>
      </div>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      name?: string;
      ranges?: { label: string; value: string }[];
    }>(),
    {
      name: "Maya",
      ranges: () => [
        { label: "7D", value: "7d" },
        { label: "30D", value: "30d" },
        { label: "90D", value: "90d" },
        { label: "1Y", value: "1y" },
      ],
    }
  );

  const range = ref("30d");
  const refreshing = ref(false);
  const updated = ref("Updated just now");

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(now);

  async function refresh() {
    refreshing.value = true;
    await new Promise((resolve) => setTimeout(resolve, 900));
    refreshing.value = false;
    updated.value = "Updated just now";
    useSonner.success("Dashboard refreshed");
  }
</script>
