<template>
  <!--
    Detailed metric cards with a mini chart
    Features: Icon, value, label and supporting sentence in each card, a small bar chart that grows in when visible, counting values
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <dl class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(stat, i) in props.stats"
        :key="stat.label"
        class="bg-card flex flex-col rounded-2xl border p-6"
      >
        <UiFancyIcon :icon="stat.icon" theme="light" color="primary" size="md" />
        <dd class="mt-5 text-3xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
        <dt class="mt-1 font-semibold">{{ stat.label }}</dt>
        <p class="text-muted-foreground mt-1 flex-1 text-sm">{{ stat.note }}</p>
        <div class="mt-5 flex h-12 items-end gap-1" aria-hidden="true">
          <div
            v-for="(bar, n) in stat.bars"
            :key="n"
            class="bg-primary/25 flex-1 rounded-sm transition-all duration-1000 ease-out"
            :style="{ height: target[i] ? `${bar}%` : '8%' }"
          />
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
    note: string;
    bars: number[];
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Why choose us?",
      description: "Numbers that speak for themselves.",
      stats: () => [
        {
          label: "Success rate",
          value: 99,
          suffix: "%",
          icon: "lucide:trending-up",
          note: "Projects completed on time.",
          bars: [60, 72, 66, 80, 76, 92, 99],
        },
        {
          label: "Response time",
          value: 1,
          prefix: "<",
          suffix: " hr",
          icon: "lucide:clock",
          note: "Average first reply from support.",
          bars: [90, 80, 84, 68, 70, 56, 48],
        },
        {
          label: "Team size",
          value: 100,
          suffix: "+",
          icon: "lucide:users",
          note: "Experts across 12 countries.",
          bars: [30, 38, 46, 52, 64, 78, 90],
        },
        {
          label: "Experience",
          value: 10,
          suffix: " yr",
          icon: "lucide:award",
          note: "Building for the web.",
          bars: [40, 48, 56, 64, 72, 82, 94],
        },
      ],
    }
  );

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
