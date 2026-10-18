<template>
  <!--
    Four column metrics strip with vertical dividers
    Features: Borders above and below, hairline dividers between stats that reflow on small screens, numbers that count up on view
  -->
  <UiContainer ref="root" class="py-12 lg:py-16">
    <dl
      class="bg-border grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4"
    >
      <div
        v-for="(stat, i) in props.stats"
        :key="stat.label"
        class="bg-background px-6 py-10 text-center"
      >
        <dd class="text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">{{ fmt(i) }}</dd>
        <dt class="text-muted-foreground mt-2 text-sm">{{ stat.label }}</dt>
      </div>
    </dl>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number };

  const props = withDefaults(defineProps<{ stats?: Stat[] }>(), {
    stats: () => [
      { label: "Projects completed", value: 230, suffix: "+" },
      { label: "Return on investment", value: 600, suffix: "%" },
      { label: "Global downloads", value: 10, suffix: "K" },
      { label: "5-star reviews", value: 200, suffix: "+" },
    ],
  });

  // Numbers start at zero and count up the first time the section is visible.
  const root = ref<{ $el?: HTMLElement } | null>(null);
  const target = ref(props.stats.map(() => 0));
  const animated = useTransition(target, { duration: 1600 });
  useIntersectionObserver(
    computed(() => root.value?.$el),
    ([entry], observer) => {
      if (entry?.isIntersecting) {
        target.value = props.stats.map((s) => s.value);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  const fmt = (i: number) => {
    const stat = props.stats[i]!;
    const value = animated.value[i] ?? 0;
    const number = stat.decimals
      ? value.toFixed(stat.decimals)
      : Math.round(value).toLocaleString("en-US");
    return `${stat.prefix ?? ""}${number}${stat.suffix ?? ""}`;
  };
</script>
