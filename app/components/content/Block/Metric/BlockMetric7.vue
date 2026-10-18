<template>
  <!--
    Two column metrics with a story
    Features: Eyebrow, heading and copy on the left, a two by two grid with hairline dividers on the right, values count up on view
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div>
        <p class="text-primary text-sm font-semibold">By the numbers</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-lg text-balance">{{ props.description }}</p>
      </div>
      <dl class="bg-border grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2">
        <div v-for="(stat, i) in props.stats" :key="stat.label" class="bg-card p-8">
          <dd class="text-4xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
          <dt class="text-muted-foreground mt-2 text-sm">{{ stat.label }}</dt>
        </div>
      </dl>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Making an impact that matters",
      description:
        "Our platform helps teams around the world ship better products faster. Here's how we're making a difference.",
      stats: () => [
        { label: "Daily active users", value: 25, suffix: "K+" },
        { label: "API calls per day", value: 2, suffix: "M+" },
        { label: "Average response time", value: 45, suffix: "ms" },
        { label: "Customer retention", value: 94, suffix: "%" },
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
