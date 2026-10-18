<template>
  <!--
    Hero stat card on a dark gradient
    Features: Always dark card, glass fancy icon, large value that counts up, trend, soft glowing sparkline, call to action
  -->
  <div
    class="from-primary to-primary/80 text-primary-foreground relative overflow-hidden rounded-2xl bg-linear-to-br p-6 shadow-lg"
  >
    <div
      class="bg-primary-foreground/10 absolute -top-16 -right-10 size-56 rounded-full blur-3xl"
    />
    <div class="relative flex items-start justify-between">
      <div>
        <slot name="label">
          <p class="text-primary-foreground/70 text-sm font-medium">{{ props.label }}</p>
        </slot>
        <slot name="value">
          <p class="mt-2 text-4xl font-bold tracking-tight tabular-nums">${{ display }}</p>
        </slot>
        <p class="mt-3 flex items-center gap-2 text-sm">
          <span
            class="bg-primary-foreground/15 flex items-center gap-1 rounded-full px-2 py-0.5 font-medium"
          >
            <Icon name="lucide:arrow-up-right" class="size-3.5" />
            {{ props.change }}
          </span>
          <span class="text-primary-foreground/70">{{ props.comparison }}</span>
        </p>
      </div>
      <slot name="icon">
        <span
          class="bg-primary-foreground/15 flex size-12 items-center justify-center rounded-xl backdrop-blur"
        >
          <Icon :name="props.icon" class="size-6" />
        </span>
      </slot>
    </div>

    <svg
      viewBox="0 0 200 50"
      preserveAspectRatio="none"
      class="relative mt-6 h-16 w-full"
      aria-hidden="true"
    >
      <path :d="spark.area" class="fill-primary-foreground/10" />
      <path
        :d="spark.line"
        fill="none"
        class="stroke-primary-foreground"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <UiButton variant="secondary" size="sm" class="relative mt-5 w-full">
      View full report
      <Icon name="lucide:arrow-right" class="size-4" />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: number;
      change?: string;
      comparison?: string;
      icon?: string;
      data?: number[];
    }>(),
    {
      label: "Net revenue",
      value: 128450,
      change: "18.5%",
      comparison: "from last quarter",
      icon: "lucide:badge-dollar-sign",
      data: () => [20, 26, 22, 34, 30, 41, 37, 48, 44, 56, 52, 64],
    }
  );

  const source = ref(0);
  const animated = useTransition(source, { duration: 1400 });
  const display = computed(() => Math.round(animated.value).toLocaleString("en-US"));
  onMounted(() => {
    source.value = props.value;
  });

  const spark = computed(() => {
    const w = 200;
    const h = 50;
    const min = Math.min(...props.data);
    const max = Math.max(...props.data);
    const step = w / (props.data.length - 1);
    const points = props.data.map((v, i) => [
      i * step,
      h - 6 - ((v - min) / (max - min || 1)) * (h - 14),
    ]);
    const line = points
      .map(([x, y], i) => `${i ? "L" : "M"}${x!.toFixed(1)},${y!.toFixed(1)}`)
      .join(" ");
    return { line, area: `${line} L${w},${h} L0,${h} Z` };
  });
</script>
