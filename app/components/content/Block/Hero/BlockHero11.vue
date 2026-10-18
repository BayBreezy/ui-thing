<template>
  <!--
    Hero with a bento grid of interface tiles
    Features: Left aligned headline with actions, bento of five tiles including a stat, a chart, an avatar stack, a toggle that works and a progress ring, hover lift
  -->
  <section class="relative overflow-hidden">
    <UiContainer class="py-16 lg:py-24">
      <Motion
        class="max-w-2xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-6 text-lg text-balance">{{ props.description }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UiButton size="lg">
            Start for free
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton size="lg" variant="ghost">
            Talk to us
            <Icon name="lucide:arrow-up-right" class="size-4" />
          </UiButton>
        </div>
      </Motion>

      <div class="mt-14 grid auto-rows-[10rem] gap-4 md:grid-cols-4">
        <Motion
          v-for="(tile, i) in tiles"
          :key="tile.id"
          class="bg-card hover:border-ring/50 flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          :class="tile.span"
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 + i * 0.07 }"
        >
          <template v-if="tile.id === 'stat'">
            <UiFancyIcon icon="lucide:wallet" theme="light" color="success" size="md" />
            <div>
              <p class="text-muted-foreground text-sm">Monthly revenue</p>
              <p class="text-3xl font-bold tracking-tight tabular-nums">$128,450</p>
            </div>
          </template>

          <template v-else-if="tile.id === 'chart'">
            <div class="flex items-center justify-between">
              <p class="font-semibold">Growth</p>
              <span class="text-xs font-medium text-green-600 dark:text-green-400"
                >+24% this quarter</span
              >
            </div>
            <div class="flex h-24 items-end gap-2">
              <div
                v-for="(bar, n) in bars"
                :key="n"
                class="bg-primary/20 hover:bg-primary flex-1 rounded-t-md transition-colors"
                :style="{ height: `${bar}%` }"
              />
            </div>
          </template>

          <template v-else-if="tile.id === 'team'">
            <div class="flex -space-x-2.5">
              <UiAvatar
                v-for="avatar in avatars"
                :key="avatar"
                :src="avatar"
                class="ring-card size-10 ring-2"
              />
            </div>
            <div>
              <p class="font-semibold">Work together</p>
              <p class="text-muted-foreground text-sm">Invite your whole team.</p>
            </div>
          </template>

          <template v-else-if="tile.id === 'toggle'">
            <p class="font-semibold">Dark mode</p>
            <div class="flex items-center justify-between">
              <p class="text-muted-foreground text-sm">{{ dark ? "On" : "Off" }}</p>
              <UiSwitch v-model="dark" aria-label="Dark mode" />
            </div>
          </template>

          <template v-else>
            <p class="font-semibold">Sprint progress</p>
            <div class="flex items-center gap-4">
              <div class="relative size-16">
                <svg class="size-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke-width="8"
                    class="stroke-muted"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke-width="8"
                    stroke-linecap="round"
                    class="stroke-primary"
                    :stroke-dasharray="163"
                    :stroke-dashoffset="163 * 0.28"
                  />
                </svg>
                <span class="absolute inset-0 flex items-center justify-center text-sm font-bold"
                  >72%</span
                >
              </div>
              <p class="text-muted-foreground text-sm">18 of 25 tasks done</p>
            </div>
          </template>
        </Motion>
      </div>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Everything your team needs, nothing it doesn't",
    description: "A calm, focused workspace that brings planning, tracking and reporting together.",
  });

  const tiles = [
    { id: "stat", span: "md:col-span-1" },
    { id: "chart", span: "md:col-span-2 md:row-span-2" },
    { id: "team", span: "md:col-span-1" },
    { id: "toggle", span: "md:col-span-1" },
    { id: "ring", span: "md:col-span-1" },
  ];

  const bars = [30, 44, 38, 56, 48, 68, 60, 82, 74, 96];
  const avatars = [
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=45",
    "https://i.pravatar.cc/80?img=32",
  ];
  const dark = ref(true);
</script>
