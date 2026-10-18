<template>
  <!--
    Compact icon metrics in a single row
    Features: Fancy icon beside each value, short labels, numbers that count up on view, wraps to two columns on small screens
  -->
  <UiContainer ref="root" class="py-10 lg:py-14">
    <dl class="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
      <div v-for="(stat, i) in props.stats" :key="stat.label" class="flex items-center gap-4">
        <UiFancyIcon :icon="stat.icon" theme="modern" color="gray" />
        <div>
          <dd class="text-3xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
          <dt class="text-muted-foreground text-sm">{{ stat.label }}</dt>
        </div>
      </div>
    </dl>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    icon: string;
  };

  const props = withDefaults(defineProps<{ stats?: Stat[] }>(), {
    stats: () => [
      { label: "Active users", value: 50, suffix: "K+", icon: "lucide:users" },
      { label: "Uptime", value: 99.9, suffix: "%", decimals: 1, icon: "lucide:activity" },
      { label: "Countries", value: 150, suffix: "+", icon: "lucide:globe" },
      { label: "Support rating", value: 4.9, decimals: 1, icon: "lucide:star" },
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
