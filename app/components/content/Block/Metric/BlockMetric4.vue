<template>
  <!--
    Split metrics with a CSS visual
    Features: Heading and copy with a two by two metric grid on the left, a gradient mesh panel with floating chips on the right that needs no image, counts up on view
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p class="text-primary text-sm font-semibold">{{ eyebrow }}</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-lg text-balance">{{ props.description }}</p>
        <dl class="mt-10 grid grid-cols-2 gap-8">
          <div v-for="(stat, i) in props.stats" :key="stat.label" class="border-l-2 pl-4">
            <dd class="text-3xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
            <dt class="text-muted-foreground mt-1 text-sm">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>
      <div
        class="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-6"
        aria-hidden="true"
      >
        <div class="absolute -top-16 -right-10 size-64 rounded-full bg-white/25 blur-3xl" />
        <div class="absolute -bottom-20 left-1/4 size-64 rounded-full bg-sky-300/30 blur-3xl" />
        <Motion
          v-for="(chip, i) in chips"
          :key="chip.label"
          class="absolute flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur"
          :class="chip.position"
          :animate="{ y: [0, -8, 0] }"
          :transition="{ duration: 4, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }"
        >
          <Icon :name="chip.icon" class="size-4" />
          {{ chip.label }}
        </Motion>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Launch faster",
      description:
        "We've done the heavy lifting so you don't have to. A perfect starting point for any project.",
      stats: () => [
        { label: "Teams onboarded", value: 1200, suffix: "+" },
        { label: "Average setup time", value: 15, suffix: " min" },
        { label: "Uptime last year", value: 99.99, suffix: "%", decimals: 2 },
        { label: "Countries served", value: 120 },
      ],
    }
  );

  const eyebrow = "Why teams choose us";
  const chips = [
    { label: "Deployed in 14s", icon: "lucide:rocket", position: "top-8 left-6" },
    { label: "0 incidents", icon: "lucide:shield-check", position: "top-1/2 right-6" },
    { label: "+38% faster", icon: "lucide:trending-up", position: "bottom-8 left-10" },
  ];

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
