<template>
  <!--
    Centered metrics on a soft panel
    Features: Three large brand colored numbers that count up when they scroll into view, short captions, rounded muted container
  -->
  <UiContainer ref="root" class="py-12 lg:py-16">
    <div class="bg-muted/50 rounded-3xl border px-6 py-14 text-center lg:py-20">
      <h2 class="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{{ props.title }}</h2>
      <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-balance">
        {{ props.description }}
      </p>
      <dl class="mx-auto mt-12 grid max-w-4xl gap-10 sm:grid-cols-3">
        <div v-for="(stat, i) in props.stats" :key="stat.label">
          <dd class="text-primary text-5xl font-bold tracking-tight tabular-nums lg:text-6xl">
            {{ fmt(i) }}
          </dd>
          <dt class="text-muted-foreground mt-2 text-sm font-medium">{{ stat.label }}</dt>
        </div>
      </dl>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = {
    label: string;
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Results that speak for themselves",
      description: "Numbers from the teams that build with us every day.",
      stats: () => [
        { label: "Projects shipped", value: 230, suffix: "+" },
        { label: "Average return on investment", value: 600, suffix: "%" },
        { label: "Global downloads", value: 10, suffix: "K" },
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
