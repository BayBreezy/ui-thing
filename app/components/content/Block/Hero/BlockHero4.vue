<template>
  <!--
    Hero on a masked grid with an interface window
    Features: Faded grid background, headline with two actions on the left, a browser style window with a kanban board on the right, no overlap on any screen size
  -->
  <section class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_top,black_30%,transparent_75%)] bg-size-[56px_56px]"
      aria-hidden="true"
    />
    <UiContainer class="relative grid items-center gap-14 py-16 lg:grid-cols-[1fr_1.1fr] lg:py-28">
      <Motion
        class="max-w-xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <UiBadge variant="outline" class="gap-1.5 rounded-full py-1">
          <Icon name="lucide:sparkles" class="size-3.5" />
          {{ props.badge }}
        </UiBadge>
        <h1 class="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-5 text-lg text-balance">{{ props.description }}</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <UiButton size="lg">
            Start a free trial
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton size="lg" variant="outline">Book a demo</UiButton>
        </div>
        <ul class="text-muted-foreground mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li v-for="item in perks" :key="item" class="flex items-center gap-1.5">
            <Icon name="lucide:check" class="text-primary size-4" />
            {{ item }}
          </li>
        </ul>
      </Motion>

      <Motion
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 120, damping: 22, delay: 0.15 }"
      >
        <div class="bg-card overflow-hidden rounded-2xl border shadow-2xl" aria-hidden="true">
          <div class="flex items-center gap-1.5 border-b px-4 py-3">
            <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span class="bg-muted text-muted-foreground mx-auto rounded-md px-12 py-0.5 text-xs"
              >app.uithing.com/board</span
            >
          </div>
          <div class="bg-muted/30 grid grid-cols-3 gap-3 p-4">
            <div v-for="column in board" :key="column.title" class="space-y-2.5">
              <p
                class="text-muted-foreground flex items-center justify-between text-xs font-semibold"
              >
                {{ column.title }}
                <span class="bg-muted rounded-full px-1.5 tabular-nums">{{
                  column.cards.length
                }}</span>
              </p>
              <div
                v-for="card in column.cards"
                :key="card.title"
                class="bg-card space-y-2 rounded-lg border p-2.5 shadow-xs"
              >
                <p class="text-xs leading-snug font-medium">{{ card.title }}</p>
                <div class="flex items-center justify-between">
                  <span class="rounded px-1.5 py-0.5 text-[10px] font-medium" :class="card.tag">{{
                    card.label
                  }}</span>
                  <UiAvatar :src="card.avatar" class="size-5" />
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
    defineProps<{ badge?: string; title?: string; description?: string }>(),
    {
      badge: "Now with AI planning",
      title: "Plan, track and ship work in one place",
      description:
        "Boards, docs and roadmaps that stay in sync, so your team always knows what matters next.",
    }
  );

  const perks = ["Free for 14 days", "No credit card", "Cancel anytime"];

  const board = [
    {
      title: "To do",
      cards: [
        {
          title: "Design onboarding flow",
          label: "Design",
          tag: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
          avatar: "https://i.pravatar.cc/40?img=45",
        },
        {
          title: "Write launch email",
          label: "Marketing",
          tag: "bg-pink-500/15 text-pink-600 dark:text-pink-400",
          avatar: "https://i.pravatar.cc/40?img=32",
        },
      ],
    },
    {
      title: "In progress",
      cards: [
        {
          title: "Build billing page",
          label: "Engineering",
          tag: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
          avatar: "https://i.pravatar.cc/40?img=12",
        },
        {
          title: "Review analytics",
          label: "Data",
          tag: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
          avatar: "https://i.pravatar.cc/40?img=47",
        },
      ],
    },
    {
      title: "Done",
      cards: [
        {
          title: "Set up CI pipeline",
          label: "Engineering",
          tag: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
          avatar: "https://i.pravatar.cc/40?img=15",
        },
      ],
    },
  ];
</script>
