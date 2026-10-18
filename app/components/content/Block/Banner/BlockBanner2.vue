<template>
  <!--
    Pill shaped announcement with a new badge
    Features: Centered pill with a brand badge, hover state with a moving arrow, soft glow behind it, dismiss button, show again link for previews
  -->
  <div class="relative flex min-h-24 items-center justify-center overflow-hidden px-4 py-6">
    <div
      class="bg-primary/10 pointer-events-none absolute top-1/2 left-1/2 h-24 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      aria-hidden="true"
    />
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="relative"
        :initial="{ opacity: 0, y: -12, scale: 0.96 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.9 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 22 }"
      >
        <div
          class="bg-background/80 flex items-center gap-1 rounded-full border p-1 pr-1.5 shadow-sm backdrop-blur"
        >
          <NuxtLink
            :to="props.link"
            class="group hover:bg-muted flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1 text-sm transition-colors"
          >
            <UiBadge class="rounded-full px-2.5">{{ props.badge }}</UiBadge>
            <span class="font-medium">{{ props.message }}</span>
            <Icon
              name="lucide:arrow-right"
              class="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5"
            />
          </NuxtLink>
          <button
            type="button"
            class="text-muted-foreground hover:bg-muted hover:text-foreground flex size-7 items-center justify-center rounded-full transition-colors"
            aria-label="Dismiss announcement"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-3.5" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <UiButton v-if="!visible" variant="ghost" size="sm" @click="visible = true">
      Show banner again
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      badge?: string;
      message?: string;
      link?: string;
    }>(),
    {
      badge: "New",
      message: "Dark mode and custom themes are here",
      link: "#",
    }
  );

  const visible = ref(true);
</script>
