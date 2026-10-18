<template>
  <!--
    Release notes toast anchored to the bottom corner
    Features: Floating card with version badge, short list of changes, what's new and later actions, slides in and out, dismiss
  -->
  <div class="relative min-h-72">
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="fixed right-4 bottom-4 left-4 z-50 sm:left-auto sm:w-96"
        :initial="{ opacity: 0, x: 40 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: 40 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 26 }"
      >
        <div class="bg-card relative overflow-hidden rounded-2xl border shadow-xl" role="status">
          <div class="from-primary to-primary/60 h-1 bg-linear-to-r" />
          <div class="p-5">
            <div class="flex items-start gap-3 pr-6">
              <UiFancyIcon icon="lucide:rocket" theme="gradient" color="primary" size="md" />
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold">{{ props.title }}</h3>
                  <UiBadge variant="secondary">v{{ props.version }}</UiBadge>
                </div>
                <p class="text-muted-foreground mt-0.5 text-sm">{{ props.description }}</p>
              </div>
            </div>

            <ul class="mt-4 space-y-2">
              <li v-for="item in props.changes" :key="item" class="flex items-start gap-2 text-sm">
                <Icon name="lucide:circle-check" class="text-primary mt-0.5 size-4 shrink-0" />
                {{ item }}
              </li>
            </ul>

            <div class="mt-5 flex gap-2">
              <UiButton size="sm" class="flex-1">
                What's new
                <Icon name="lucide:arrow-up-right" class="size-4" />
              </UiButton>
              <UiButton size="sm" variant="outline" @click="visible = false">Maybe later</UiButton>
            </div>
          </div>
          <button
            type="button"
            class="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-4 right-3 flex size-7 items-center justify-center rounded-md transition-colors"
            aria-label="Dismiss release notes"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="p-8 text-center">
      <UiButton variant="outline" size="sm" @click="visible = true">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      version?: string;
      changes?: string[];
    }>(),
    {
      title: "We shipped an update",
      description: "Here's what's new since you were last here.",
      version: "2.4.0",
      changes: () => [
        "Dark mode across the whole app",
        "Exports are up to 3x faster",
        "New keyboard shortcuts for navigation",
      ],
    }
  );

  const visible = ref(true);
</script>
