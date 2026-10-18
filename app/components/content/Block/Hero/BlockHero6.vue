<template>
  <!--
    Centered hero with a dashboard mockup that rises into view
    Features: Pulsing beta badge, gradient accent word, two actions, detailed dashboard built from cards with stats, chart and rows, staggered spring entrance
  -->
  <section class="relative overflow-hidden">
    <div
      class="from-primary/10 pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-radial to-transparent blur-3xl"
      aria-hidden="true"
    />
    <UiContainer class="relative pt-16 lg:pt-24">
      <Motion
        class="mx-auto max-w-3xl text-center"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <span
          class="bg-background inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm shadow-xs"
        >
          <span class="relative flex size-2">
            <span
              class="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75"
            />
            <span class="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          {{ props.badge }}
        </span>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.titleStart }}
          <span
            class="from-primary bg-linear-to-r via-violet-500 to-pink-500 bg-clip-text text-transparent"
            >{{ props.titleAccent }}</span
          >
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg">
            Get started free
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton size="lg" variant="outline">See a demo</UiButton>
        </div>
      </Motion>

      <Motion
        class="relative mx-auto mt-14 max-w-5xl"
        :initial="{ opacity: 0, y: 60 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 80, damping: 20, delay: 0.25 }"
      >
        <div
          class="bg-card overflow-hidden rounded-t-2xl border border-b-0 mask-[linear-gradient(to_bottom,black_70%,transparent)] shadow-2xl"
          aria-hidden="true"
        >
          <div class="flex items-center gap-1.5 border-b px-4 py-3">
            <span class="size-2.5 rounded-full bg-red-400/70" />
            <span class="size-2.5 rounded-full bg-amber-400/70" />
            <span class="size-2.5 rounded-full bg-green-400/70" />
          </div>
          <div class="grid gap-4 p-5 pb-24 md:grid-cols-[12rem_1fr]">
            <div class="hidden space-y-1.5 md:block">
              <div
                v-for="(item, i) in nav"
                :key="item"
                class="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm"
                :class="i === 0 ? 'bg-muted font-medium' : 'text-muted-foreground'"
              >
                <span class="bg-muted-foreground/30 size-3.5 rounded" />
                {{ item }}
              </div>
            </div>
            <div class="space-y-4">
              <div class="grid grid-cols-3 gap-3">
                <div v-for="stat in stats" :key="stat.label" class="rounded-xl border p-3">
                  <p class="text-muted-foreground text-xs">{{ stat.label }}</p>
                  <p class="mt-1 text-lg font-bold tabular-nums">{{ stat.value }}</p>
                  <p class="text-xs font-medium text-green-600 dark:text-green-400">
                    {{ stat.change }}
                  </p>
                </div>
              </div>
              <div class="rounded-xl border p-4">
                <p class="text-sm font-medium">Weekly activity</p>
                <div class="mt-4 flex h-28 items-end gap-2">
                  <div
                    v-for="(bar, i) in bars"
                    :key="i"
                    class="bg-primary/70 flex-1 rounded-t"
                    :style="{ height: `${bar}%` }"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <div
                  v-for="n in 3"
                  :key="n"
                  class="flex items-center gap-3 rounded-lg border p-2.5"
                >
                  <span class="bg-muted size-7 rounded-full" />
                  <span class="bg-muted h-2 flex-1 rounded-full" />
                  <span class="bg-muted h-2 w-14 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      badge?: string;
      titleStart?: string;
      titleAccent?: string;
      description?: string;
    }>(),
    {
      badge: "Now in public beta",
      titleStart: "Ship products your users will",
      titleAccent: "absolutely love",
      description:
        "The all-in-one platform for modern product teams. Design, build and iterate faster than ever.",
    }
  );

  const nav = ["Overview", "Projects", "Reports", "Team", "Settings"];
  const stats = [
    { label: "Revenue", value: "$48.2k", change: "+12.4%" },
    { label: "Users", value: "2,840", change: "+8.1%" },
    { label: "Conversion", value: "3.24%", change: "+0.4%" },
  ];
  const bars = [35, 52, 44, 68, 58, 82, 70, 92, 76, 64, 88, 96];
</script>
