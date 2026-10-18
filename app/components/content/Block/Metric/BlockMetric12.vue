<template>
  <!--
    Ring metrics for service health
    Features: Three progress rings that fill when visible with the value in the center, status labels and a short caption each, counting values
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-balance">{{ props.title }}</h2>
      <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
    </div>
    <dl class="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
      <div
        v-for="(stat, i) in props.stats"
        :key="stat.label"
        class="flex flex-col items-center text-center"
      >
        <div class="relative size-36">
          <svg class="size-36 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke-width="8" class="stroke-muted" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke-width="8"
              stroke-linecap="round"
              class="stroke-primary transition-[stroke-dashoffset] duration-[1600ms] ease-out"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference * (1 - (target[i] ? stat.value / 100 : 0))"
            />
          </svg>
          <dd
            class="absolute inset-0 flex items-center justify-center text-2xl font-bold tabular-nums"
          >
            {{ fmt(i) }}
          </dd>
        </div>
        <dt class="mt-4 font-semibold">{{ stat.label }}</dt>
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
    note: string;
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Reliability you can measure",
      description: "We publish our numbers so you know exactly what to expect.",
      stats: () => [
        {
          label: "Uptime",
          value: 99.9,
          suffix: "%",
          decimals: 1,
          note: "Measured over the last 12 months.",
        },
        {
          label: "Customer satisfaction",
          value: 96,
          suffix: "%",
          note: "From 8,400 survey responses.",
        },
        {
          label: "Deploys without rollback",
          value: 98,
          suffix: "%",
          note: "Across all production releases.",
        },
      ],
    }
  );

  const circumference = 2 * Math.PI * 44;

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
