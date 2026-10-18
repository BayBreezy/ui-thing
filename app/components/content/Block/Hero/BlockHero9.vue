<template>
  <!--
    Centered hero with a grid background and animated statistics
    Features: Masked grid, status badge with a pulsing dot, headline, two buttons, three statistics that count up when they scroll into view
  -->
  <section ref="root" class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_70%)] bg-size-[48px_48px]"
      aria-hidden="true"
    />
    <UiContainer class="relative py-20 text-center lg:py-32">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <span
          class="bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm shadow-xs"
        >
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          {{ props.badge }}
        </span>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg">
            Start building now
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton size="lg" variant="outline">
            <Icon name="mdi:github" class="size-5" />
            View on GitHub
          </UiButton>
        </div>
      </Motion>

      <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6">
        <div v-for="stat in stats" :key="stat.label">
          <dd class="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
            {{ display[stat.label] }}{{ stat.suffix }}
          </dd>
          <dt class="text-muted-foreground mt-1 text-sm">{{ stat.label }}</dt>
        </div>
      </dl>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{ badge?: string; title?: string; description?: string }>(),
    {
      badge: "All systems operational",
      title: "The modern way to build software",
      description:
        "Ship faster, collaborate better and build products your customers love. Everything you need in one powerful platform.",
    }
  );

  const stats = [
    { label: "Active users", value: 50000, suffix: "+", decimals: 0 },
    { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
    { label: "Support", value: 24, suffix: "/7", decimals: 0 },
  ];

  const root = ref<HTMLElement | null>(null);
  const started = ref(false);
  const sources = reactive<Record<string, number>>(
    Object.fromEntries(stats.map((s) => [s.label, 0]))
  );
  const animated = Object.fromEntries(
    stats.map((s) => [s.label, useTransition(toRef(sources, s.label), { duration: 1600 })])
  );

  const display = computed(() =>
    Object.fromEntries(
      stats.map((s) => {
        const value = animated[s.label]!.value;
        return [
          s.label,
          s.decimals ? value.toFixed(s.decimals) : Math.round(value).toLocaleString("en-US"),
        ];
      })
    )
  );

  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.value) {
          started.value = true;
          stats.forEach((s) => (sources[s.label] = s.value));
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (root.value) observer.observe(root.value);
    onBeforeUnmount(() => observer.disconnect());
  });
</script>
