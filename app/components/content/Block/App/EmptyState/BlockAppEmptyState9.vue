<template>
  <!--
    All caught up empty state for inboxes and notification lists
    Features: Animated check badge with confetti dots, read items fading out behind it, view archive and notification settings actions
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="flex w-full max-w-md flex-col items-center text-center">
      <div class="relative flex h-44 w-full items-center justify-center" aria-hidden="true">
        <div
          class="absolute inset-0 space-y-2 mask-[radial-gradient(circle_at_center,black_20%,transparent_70%)] py-2 opacity-60"
        >
          <div
            v-for="row in 4"
            :key="row"
            class="bg-card mx-auto flex items-center gap-3 rounded-lg border p-2.5"
            :style="{ width: `${100 - row * 6}%` }"
          >
            <div class="bg-muted size-6 rounded-full" />
            <div class="bg-muted h-2 flex-1 rounded-full" />
            <Icon name="lucide:check-check" class="text-muted-foreground/60 size-4" />
          </div>
        </div>

        <span
          v-for="dot in dots"
          :key="dot.class"
          class="absolute rounded-full"
          :class="dot.class"
        />

        <Motion
          class="relative flex size-20 items-center justify-center rounded-full bg-green-500 text-white shadow-lg"
          :initial="{ scale: 0.6, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ type: 'spring', stiffness: 220, damping: 14 }"
        >
          <Icon name="lucide:check" class="size-10" />
        </Motion>
      </div>

      <div class="mt-2 flex flex-col gap-2">
        <slot name="title">
          <h2 class="text-xl font-bold tracking-tight">{{ props.title }}</h2>
        </slot>
        <slot name="description">
          <p class="text-muted-foreground text-sm text-balance">{{ props.description }}</p>
        </slot>
      </div>

      <slot>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <UiButton variant="outline">
            <Icon name="lucide:archive" class="size-4" />
            View archive
          </UiButton>
          <UiButton variant="ghost">
            <Icon name="lucide:settings-2" class="size-4" />
            Notification settings
          </UiButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "You're all caught up",
      description:
        "No new notifications. We'll let you know the moment something needs your attention.",
    }
  );

  const dots = [
    { class: "top-4 left-16 size-2 bg-amber-400" },
    { class: "top-10 right-14 size-2.5 bg-sky-400" },
    { class: "bottom-8 left-12 size-2.5 bg-rose-400" },
    { class: "bottom-6 right-20 size-2 bg-violet-400" },
    { class: "top-20 left-8 size-1.5 bg-green-400" },
    { class: "top-6 right-32 size-1.5 bg-rose-400" },
  ];
</script>
