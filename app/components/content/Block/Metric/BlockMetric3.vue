<template>
  <!--
    Metrics with a heading and call to action buttons
    Features: Heading with supporting copy and two buttons, four metrics with short descriptions that count up on view, responsive button placement
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="flex flex-col gap-6 border-b pb-10 md:flex-row md:items-end md:justify-between">
      <div class="max-w-xl">
        <h2 class="text-3xl font-bold tracking-tight text-balance">{{ props.title }}</h2>
        <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
      </div>
      <div class="flex gap-3">
        <slot>
          <UiButton variant="outline">Book a demo</UiButton>
          <UiButton>
            Get started
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </slot>
      </div>
    </div>
    <dl class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="(stat, i) in props.stats" :key="stat.label">
        <dd class="text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">{{ fmt(i) }}</dd>
        <dt class="mt-2 font-semibold">{{ stat.label }}</dt>
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
    note?: string;
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; stats?: Stat[] }>(),
    {
      title: "Build something great",
      description:
        "Everything you need to build modern interfaces, backed by numbers you can trust.",
      stats: () => [
        {
          label: "Projects completed",
          value: 230,
          suffix: "+",
          note: "Across 40 industries and counting.",
        },
        {
          label: "Return on investment",
          value: 600,
          suffix: "%",
          note: "Average across customer accounts.",
        },
        {
          label: "Global downloads",
          value: 10,
          suffix: "K",
          note: "Every week from the registry.",
        },
        { label: "5-star reviews", value: 200, suffix: "+", note: "From teams who ship with us." },
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
