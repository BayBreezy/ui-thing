<template>
  <!--
    Sale hero with a live countdown
    Features: Dark promo panel with a headline discount, a countdown to days, hours, minutes and seconds that ticks every second, a screen reader friendly summary and two tilted product photos
  -->
  <UiContainer class="py-16 lg:py-24">
    <div
      class="relative isolate overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 text-white ring-1 ring-white/10 sm:px-12 lg:px-16 lg:py-16"
    >
      <div
        class="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-orange-500/30 blur-3xl"
        aria-hidden="true"
      />
      <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
        >
          <p
            class="inline-flex items-center gap-2 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold tracking-wide text-orange-300 uppercase"
          >
            <span class="relative flex size-2">
              <span
                class="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75"
              />
              <span class="relative inline-flex size-2 rounded-full bg-orange-400" />
            </span>
            {{ eyebrow }}
          </p>
          <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {{ title }}
          </h1>
          <p class="mt-4 max-w-md text-lg text-white/70">{{ description }}</p>

          <p class="sr-only" role="timer" aria-live="off">
            Sale ends in {{ parts[0]!.value }} days, {{ parts[1]!.value }} hours and
            {{ parts[2]!.value }} minutes.
          </p>
          <dl class="mt-8 flex gap-3 sm:gap-4" aria-hidden="true">
            <div
              v-for="part in parts"
              :key="part.label"
              class="w-16 rounded-xl bg-white/10 py-3 text-center backdrop-blur sm:w-20"
            >
              <dt class="sr-only">{{ part.label }}</dt>
              <dd class="text-2xl font-bold tabular-nums sm:text-3xl">
                {{ String(part.value).padStart(2, "0") }}
              </dd>
              <p class="text-xs text-white/60">{{ part.label }}</p>
            </div>
          </dl>

          <div class="mt-10 flex flex-wrap items-center gap-4">
            <UiButton size="lg" class="bg-orange-500 text-white hover:bg-orange-400">
              Shop the sale
              <Icon name="lucide:arrow-right" />
            </UiButton>
            <span class="text-sm text-white/60"
              >Use code <strong class="text-white">AUTUMN40</strong></span
            >
          </div>
        </Motion>

        <Motion
          class="relative mx-auto h-72 w-full max-w-md sm:h-96"
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.6, delay: 0.1 }"
        >
          <img
            :src="images[0]"
            alt="Studio over-ear headphones"
            class="absolute top-0 left-0 h-[78%] w-[58%] -rotate-6 rounded-2xl object-cover shadow-2xl"
          />
          <img
            :src="images[1]"
            alt="Rust bomber jacket"
            class="absolute right-0 bottom-0 h-[78%] w-[58%] rotate-6 rounded-2xl object-cover shadow-2xl"
          />
          <span
            class="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange-500 text-center text-sm leading-tight font-bold shadow-lg"
          >
            Up to<br />40% off
          </span>
        </Motion>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      eyebrow?: string;
      title?: string;
      description?: string;
      /** ISO date for when the sale ends. Defaults to a few days from now. */
      endsAt?: string;
      images?: [string, string];
    }>(),
    {
      eyebrow: "Autumn sale is live",
      title: "Up to 40% off the season's best sellers.",
      description: "Headphones, outerwear and everyday bags at their lowest prices of the year.",
      endsAt: () => new Date(Date.now() + (3 * 24 + 7) * 3_600_000).toISOString(),
      images: () => [
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=700&q=80",
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80",
      ],
    }
  );

  // Time is read after mount so server and client markup match.
  const now = ref(0);
  const mounted = ref(false);

  onMounted(() => {
    now.value = Date.now();
    mounted.value = true;
  });
  useIntervalFn(() => (now.value = Date.now()), 1000);

  const parts = computed(() => {
    const ms = mounted.value ? Math.max(0, Date.parse(props.endsAt) - now.value) : 0;
    const total = Math.floor(ms / 1000);
    return [
      { label: "Days", value: Math.floor(total / 86400) },
      { label: "Hours", value: Math.floor((total % 86400) / 3600) },
      { label: "Minutes", value: Math.floor((total % 3600) / 60) },
      { label: "Seconds", value: total % 60 },
    ];
  });
</script>
