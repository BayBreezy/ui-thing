<template>
  <!--
    Live activity feed with rotating customer events
    Features: Card that cycles through recent signups and upgrades with an animated swap, relative timestamps, a pulsing live dot and a heading with supporting copy
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p class="text-primary flex items-center gap-2 text-sm font-semibold">
          <span class="relative flex size-2">
            <span
              class="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60"
            />
            <span class="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          Happening now
        </p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-lg">{{ props.description }}</p>
      </div>

      <UiCard class="shadow-sm">
        <UiCardContent class="p-0">
          <TransitionGroup
            tag="ul"
            class="relative divide-y"
            aria-live="polite"
            move-class="transition-transform duration-500"
            enter-active-class="transition duration-500"
            enter-from-class="-translate-y-4 opacity-0"
            leave-active-class="absolute inset-x-0 transition duration-300"
            leave-to-class="opacity-0"
          >
            <li
              v-for="(event, i) in visible"
              :key="event.id"
              class="bg-card flex items-center gap-4 p-5 transition-opacity duration-500"
              :class="i === 0 ? 'opacity-100' : i === 1 ? 'opacity-70' : 'opacity-40'"
            >
              <UiAvatar :src="event.avatar" :fallback="event.name[0]" class="size-10" />
              <p class="min-w-0 flex-1 text-sm">
                <span class="font-semibold">{{ event.name }}</span>
                <span class="text-muted-foreground"> from {{ event.city }} {{ event.action }}</span>
              </p>
              <UiBadge variant="secondary" class="shrink-0">{{ event.time }}</UiBadge>
            </li>
          </TransitionGroup>
        </UiCardContent>
      </UiCard>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Event = { name: string; city: string; action: string; avatar: string };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; events?: Event[] }>(),
    {
      title: "New teams join every hour",
      description: "Someone, somewhere, just started building with us. Here is a live look.",
      events: () => [
        {
          name: "Maya",
          city: "Berlin",
          action: "upgraded to Pro",
          avatar: "https://i.pravatar.cc/80?img=47",
        },
        {
          name: "Liam",
          city: "Toronto",
          action: "invited 12 teammates",
          avatar: "https://i.pravatar.cc/80?img=12",
        },
        {
          name: "Priya",
          city: "Mumbai",
          action: "launched a new project",
          avatar: "https://i.pravatar.cc/80?img=45",
        },
        {
          name: "Noah",
          city: "Lisbon",
          action: "started a free trial",
          avatar: "https://i.pravatar.cc/80?img=15",
        },
        {
          name: "Sam",
          city: "Austin",
          action: "connected Slack",
          avatar: "https://i.pravatar.cc/80?img=32",
        },
        {
          name: "Ana",
          city: "São Paulo",
          action: "upgraded to Team",
          avatar: "https://i.pravatar.cc/80?img=44",
        },
      ],
    }
  );

  const times = ["just now", "1m ago", "3m ago"];
  const start = ref(0);
  const visible = computed(() =>
    Array.from({ length: 3 }, (_, i) => {
      const event = props.events[(start.value + i) % props.events.length]!;
      return { ...event, id: (start.value + i) % props.events.length, time: times[i]! };
    })
  );

  useIntervalFn(() => {
    start.value = (start.value + props.events.length - 1) % props.events.length;
  }, 3200);
</script>
