<template>
  <!--
    Live stat card with a dark icon block and a pulsing live badge
    Features: Dark fancy icon on a colored accent column, live indicator that pulses, value that counts up on load, period label
  -->
  <UiCard class="overflow-hidden py-0">
    <div class="flex">
      <div class="bg-primary/5 flex items-center border-r px-5">
        <slot name="icon">
          <UiFancyIcon :icon="props.icon" theme="dark" color="primary" size="lg" />
        </slot>
      </div>
      <div class="min-w-0 flex-1 p-5">
        <div class="flex items-center justify-between gap-2">
          <slot name="label">
            <p class="text-muted-foreground text-sm font-medium">{{ props.label }}</p>
          </slot>
          <span
            class="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400"
          >
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75"
              />
              <span class="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Live
          </span>
        </div>
        <slot name="value">
          <p class="mt-1 text-3xl font-bold tracking-tight tabular-nums">{{ display }}</p>
        </slot>
        <p class="text-muted-foreground mt-1 flex items-center gap-1.5 text-xs">
          <Icon name="lucide:calendar" class="size-3.5" />
          {{ props.period }}
        </p>
      </div>
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: number;
      period?: string;
      icon?: string;
    }>(),
    {
      label: "Active users",
      value: 2845,
      period: "Last 30 minutes",
      icon: "lucide:users",
    }
  );

  // Counts up from zero when the card appears, then keeps the final value.
  const source = ref(0);
  const animated = useTransition(source, { duration: 1200 });
  const display = computed(() => Math.round(animated.value).toLocaleString("en-US"));
  onMounted(() => {
    source.value = props.value;
  });
</script>
