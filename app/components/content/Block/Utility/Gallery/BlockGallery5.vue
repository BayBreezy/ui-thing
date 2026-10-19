<template>
  <!--
    Video gallery
    Features: Featured player with demo play and pause and a moving progress bar, playlist thumbnails with duration badges, selecting a video switches the player, now playing label
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_20rem]">
      <div>
        <div class="bg-muted relative aspect-video overflow-hidden rounded-xl">
          <img
            :src="current.poster"
            :alt="`Poster for ${current.title}`"
            class="size-full object-cover"
          />
          <div class="absolute inset-0 bg-black/30" aria-hidden="true" />
          <UiButton
            size="icon-lg"
            class="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
            :aria-label="playing ? 'Pause' : 'Play'"
            @click="toggle"
          >
            <Icon :name="playing ? 'lucide:pause' : 'lucide:play'" class="size-7" />
          </UiButton>
          <div
            class="absolute inset-x-0 bottom-0 space-y-2 bg-linear-to-t from-black/70 to-transparent p-4 text-white"
          >
            <UiProgress
              :model-value="percent"
              class="h-1 bg-white/30"
              :aria-label="`Playback progress, ${format(elapsed)} of ${format(current.seconds)}`"
            />
            <p class="flex justify-between text-xs tabular-nums">
              <span>{{ format(elapsed) }}</span>
              <span>{{ format(current.seconds) }}</span>
            </p>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-muted-foreground text-xs tracking-wide uppercase" role="status">
            {{ playing ? "Now playing" : "Selected" }}
          </p>
          <h2 class="mt-1 text-2xl font-bold">{{ current.title }}</h2>
          <p class="text-muted-foreground mt-2">{{ current.description }}</p>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-medium">Up next</h3>
        <ul class="mt-3 grid gap-2">
          <li v-for="(video, index) in videos" :key="video.title">
            <button
              type="button"
              class="hover:bg-muted/60 focus-visible:ring-ring/50 flex w-full gap-3 rounded-lg border p-2 text-left transition-colors outline-none focus-visible:ring-[3px]"
              :class="index === active ? 'border-primary bg-muted/60' : ''"
              :aria-current="index === active ? 'true' : undefined"
              @click="select(index)"
            >
              <span class="relative w-28 shrink-0 overflow-hidden rounded-md">
                <img
                  :src="video.poster"
                  alt=""
                  class="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <span
                  class="absolute right-1 bottom-1 rounded bg-black/75 px-1 text-[10px] text-white tabular-nums"
                  >{{ format(video.seconds) }}</span
                >
              </span>
              <span class="min-w-0 py-0.5">
                <span class="line-clamp-2 text-sm font-medium">{{ video.title }}</span>
                <span class="text-muted-foreground mt-1 block text-xs"
                  >{{ video.views }} views</span
                >
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Video = {
    title: string;
    description: string;
    poster: string;
    seconds: number;
    views: string;
  };

  const props = withDefaults(
    defineProps<{
      videos?: Video[];
    }>(),
    {
      videos: () => [
        {
          title: "A tour of the new planning board",
          description:
            "Ten minutes on boards, filters and the keyboard shortcuts that make planning fast.",
          poster:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
          seconds: 596,
          views: "12K",
        },
        {
          title: "Setting up your workspace in five minutes",
          description: "Invite your team, import your work and pick a template.",
          poster:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
          seconds: 312,
          views: "8.4K",
        },
        {
          title: "Automations that save an hour a week",
          description: "Three small rules that remove repetitive work.",
          poster:
            "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1000&q=80",
          seconds: 428,
          views: "5.1K",
        },
        {
          title: "Reporting for busy managers",
          description: "Build a weekly report once and let it send itself.",
          poster:
            "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1000&q=80",
          seconds: 254,
          views: "3.7K",
        },
      ],
    }
  );

  const active = ref(0);
  const playing = ref(false);
  const elapsed = ref(0);
  const current = computed(() => props.videos[active.value]!);
  const percent = computed(() => (elapsed.value / current.value.seconds) * 100);

  // A demo clock stands in for a real <video> element. Swap it for your player in real use.
  const { pause, resume } = useIntervalFn(
    () => {
      elapsed.value = Math.min(current.value.seconds, elapsed.value + 1);
      if (elapsed.value >= current.value.seconds) stop();
    },
    1000,
    { immediate: false }
  );

  function stop() {
    playing.value = false;
    pause();
  }

  function toggle() {
    if (playing.value) {
      stop();
      return;
    }
    if (elapsed.value >= current.value.seconds) elapsed.value = 0;
    playing.value = true;
    resume();
  }

  function select(index: number) {
    active.value = index;
    elapsed.value = 0;
    stop();
  }

  function format(total: number) {
    const m = Math.floor(total / 60);
    const s = String(total % 60).padStart(2, "0");
    return `${m}:${s}`;
  }
</script>
