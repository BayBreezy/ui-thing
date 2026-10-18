<template>
  <!--
    Business metrics with growth badges
    Features: Cards with modern fancy icons, trend badges colored by direction, hover lift, values that count up on view
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <dl class="grid gap-5 md:grid-cols-3">
      <div
        v-for="(stat, i) in props.stats"
        :key="stat.label"
        class="bg-card group rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <div class="flex items-start justify-between">
          <UiFancyIcon :icon="stat.icon" theme="modern-neue" color="gray" />
          <span
            class="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
            :class="
              stat.up
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            "
          >
            <Icon
              :name="stat.up ? 'lucide:trending-up' : 'lucide:trending-down'"
              class="size-3.5"
            />
            {{ stat.change }}
          </span>
        </div>
        <dd class="mt-6 text-4xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
        <dt class="mt-1 font-semibold">{{ stat.label }}</dt>
        <p class="text-muted-foreground mt-1 text-sm">{{ stat.note }}</p>
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
    change: string;
    up: boolean;
    note: string;
  };

  const props = withDefaults(defineProps<{ stats?: Stat[] }>(), {
    stats: () => [
      {
        label: "Total revenue",
        value: 2.4,
        prefix: "$",
        suffix: "M",
        decimals: 1,
        icon: "lucide:badge-dollar-sign",
        change: "12.5%",
        up: true,
        note: "Compared to last quarter.",
      },
      {
        label: "New customers",
        value: 1840,
        icon: "lucide:user-plus",
        change: "18.2%",
        up: true,
        note: "Acquired this month.",
      },
      {
        label: "Churn rate",
        value: 3.2,
        suffix: "%",
        decimals: 1,
        icon: "lucide:user-minus",
        change: "0.6%",
        up: false,
        note: "Across all plans.",
      },
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
