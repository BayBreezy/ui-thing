<template>
  <!--
    Metric cards with gradient icon badges
    Features: Rounded cards that lift on hover, gradient fancy icons in different colors, counting values and captions, centered heading
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <dl class="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
      <div
        v-for="(stat, i) in props.stats"
        :key="stat.label"
        class="bg-card flex flex-col items-center rounded-2xl border p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <UiFancyIcon :icon="stat.icon" theme="gradient" :color="stat.color" size="lg" />
        <dd class="mt-5 text-4xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
        <dt class="text-muted-foreground mt-1 text-sm">{{ stat.label }}</dt>
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
    color: "primary" | "gray" | "error" | "warning" | "success" | "info";
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Trusted by teams worldwide",
      description: "Join thousands of companies using the platform to build better products.",
      stats: () => [
        {
          label: "Customer satisfaction",
          value: 98,
          suffix: "%",
          icon: "lucide:heart",
          color: "error",
        },
        {
          label: "Projects delivered",
          value: 1200,
          suffix: "+",
          icon: "lucide:rocket",
          color: "info",
        },
        { label: "Team members", value: 50, suffix: "+", icon: "lucide:users", color: "success" },
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
