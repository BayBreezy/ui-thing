<template>
  <!--
    Metrics beside a customer quote
    Features: Large quote with avatar and role on the left, three stacked metrics with dividers on the right, values count up on view
  -->
  <UiContainer ref="root" class="py-14 lg:py-20">
    <div class="bg-card grid overflow-hidden rounded-3xl border lg:grid-cols-[1.3fr_1fr]">
      <figure class="flex flex-col justify-between gap-10 p-8 lg:p-12">
        <Icon name="lucide:quote" class="text-primary/40 size-10" />
        <blockquote
          class="text-2xl leading-snug font-semibold tracking-tight text-balance lg:text-3xl"
        >
          {{ quote }}
        </blockquote>
        <figcaption class="flex items-center gap-3">
          <UiAvatar src="https://i.pravatar.cc/120?img=47" fallback="MC" class="size-12" />
          <div>
            <p class="font-semibold">Maya Chen</p>
            <p class="text-muted-foreground text-sm">Head of Product, Northwind</p>
          </div>
        </figcaption>
      </figure>
      <dl class="bg-muted/40 divide-y border-t lg:border-t-0 lg:border-l">
        <div v-for="(stat, i) in props.stats" :key="stat.label" class="p-8 lg:px-10">
          <dd class="text-5xl font-bold tracking-tight tabular-nums">{{ fmt(i) }}</dd>
          <dt class="text-muted-foreground mt-2 text-sm">{{ stat.label }}</dt>
        </div>
      </dl>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Stat = { label: string; value: number; prefix?: string; suffix?: string; decimals?: number };

  const props = withDefaults(defineProps<{ stats?: Stat[] }>(), {
    stats: () => [
      { label: "Faster page builds", value: 3, suffix: "x" },
      { label: "Fewer support tickets", value: 42, suffix: "%" },
      { label: "Saved each sprint", value: 18, suffix: " hrs" },
    ],
  });

  const quote =
    "We rebuilt our whole dashboard in a weekend. Every piece was already there and every piece was ours to change.";

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
