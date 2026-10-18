<template>
  <!--
    Centered hero with a self contained video player card
    Features: Badge, headline and buttons, a styled player with a play button that toggles a playing state with a moving progress bar, no external video required
  -->
  <section class="relative overflow-hidden">
    <UiContainer class="py-16 text-center lg:py-24">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <NuxtLink
          to="#"
          class="hover:bg-muted group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors"
        >
          {{ props.badge }}
          <Icon
            name="lucide:arrow-right"
            class="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </NuxtLink>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg" variant="outline" @click="playing = true">
            <Icon name="lucide:play" class="size-4" />
            Watch demo
          </UiButton>
          <UiButton size="lg">Sign up free</UiButton>
        </div>
      </Motion>

      <Motion
        class="mx-auto mt-14 max-w-4xl"
        :initial="{ opacity: 0, y: 32 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 100, damping: 22, delay: 0.2 }"
      >
        <div
          class="from-primary to-primary/70 text-primary-foreground group relative aspect-video overflow-hidden rounded-2xl bg-linear-to-br shadow-2xl ring-1 ring-black/10"
        >
          <div
            class="bg-primary-foreground/10 absolute -top-20 -right-10 size-80 rounded-full blur-3xl"
          />
          <div
            class="bg-primary-foreground/10 absolute -bottom-24 -left-10 size-80 rounded-full blur-3xl"
          />

          <div class="absolute inset-0 flex flex-col items-start gap-2 p-6 text-left sm:p-10">
            <p class="max-w-sm text-xl font-semibold text-balance sm:text-3xl">
              {{ props.videoTitle }}
            </p>
            <p class="text-primary-foreground/70 text-sm">{{ props.videoLength }} · Product tour</p>
          </div>

          <button
            type="button"
            class="absolute top-1/2 left-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-xl transition-all hover:scale-105"
            :class="playing && 'pointer-events-none scale-75 opacity-0'"
            aria-label="Play video"
            @click="playing = true"
          >
            <Icon name="lucide:play" class="ml-1 size-8 fill-current" />
          </button>

          <div
            class="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-linear-to-t from-black/50 to-transparent px-5 pt-8 pb-4"
          >
            <button
              type="button"
              :aria-label="playing ? 'Pause' : 'Play'"
              @click="playing = !playing"
            >
              <Icon :name="playing ? 'lucide:pause' : 'lucide:play'" class="size-5 fill-current" />
            </button>
            <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                class="h-full rounded-full bg-white transition-[width] duration-200 ease-linear"
                :style="{ width: `${progress}%` }"
              />
            </div>
            <span class="text-xs tabular-nums">{{ elapsed }} / {{ props.videoLength }}</span>
          </div>
        </div>
        <p class="text-muted-foreground mt-3 text-xs">
          The player is a placeholder. Swap it for your own video or an embed.
        </p>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      badge?: string;
      title?: string;
      description?: string;
      videoTitle?: string;
      /** Length in seconds. */
      seconds?: number;
      videoLength?: string;
    }>(),
    {
      badge: "New feature! Check out our new dashboard",
      title: "High-performing remote teams. The future of work.",
      description:
        "Powerful, self-serve team engagement tools and analytics. Supercharge your managers and keep employees engaged from anywhere.",
      videoTitle: "See it in action in under two minutes",
      seconds: 120,
      videoLength: "2:00",
    }
  );

  const playing = ref(false);
  const progress = ref(0);

  let timer: ReturnType<typeof setInterval> | undefined;
  watch(playing, (value) => {
    clearInterval(timer);
    if (!value) return;
    timer = setInterval(() => {
      progress.value = Math.min(100, progress.value + 100 / props.seconds / 5);
      if (progress.value >= 100) {
        playing.value = false;
        progress.value = 0;
      }
    }, 200);
  });
  onBeforeUnmount(() => clearInterval(timer));

  const elapsed = computed(() => {
    const total = Math.floor((progress.value / 100) * props.seconds);
    return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
  });
</script>
