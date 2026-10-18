<template>
  <!--
    Bold brand metrics on a grid pattern
    Features: Brand colored panel with a masked grid, light text that follows the theme, four values that count up on view
  -->
  <UiContainer ref="root" class="py-12 lg:py-16">
    <div
      class="from-primary to-primary/85 text-primary-foreground relative overflow-hidden rounded-3xl bg-linear-to-br px-6 py-16 text-center lg:py-20"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.08)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-size-[44px_44px]"
        aria-hidden="true"
      />
      <div class="relative">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-primary-foreground/75 mx-auto mt-3 max-w-xl text-balance">
          {{ props.description }}
        </p>
        <dl class="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
          <div v-for="(stat, i) in props.stats" :key="stat.label">
            <dd class="text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">{{ fmt(i) }}</dd>
            <dt class="text-primary-foreground/70 mt-2 text-sm">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Powering innovation worldwide",
      description: "Trusted by leading companies and fast moving startups.",
      stats: () => [
        { label: "Enterprise clients", value: 500, suffix: "+" },
        { label: "Countries served", value: 120 },
        { label: "Uptime SLA", value: 99.99, suffix: "%", decimals: 2 },
        { label: "Monthly transactions", value: 5, suffix: "M+" },
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
