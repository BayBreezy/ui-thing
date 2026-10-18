<template>
  <!--
    Get the app banner with store buttons and a phone illustration
    Features: Brand gradient, rating line, App Store and Google Play buttons, phone mockup built from CSS that bobs gently, dismiss
  -->
  <div class="px-4 py-6">
    <AnimatePresence>
      <Motion
        v-if="visible"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.97 }"
        :transition="{ type: 'spring', stiffness: 220, damping: 24 }"
      >
        <div
          class="from-primary to-primary/80 text-primary-foreground relative mx-auto grid max-w-4xl items-center gap-6 overflow-hidden rounded-2xl bg-linear-to-br px-6 pt-8 shadow-lg sm:grid-cols-[1fr_auto] sm:px-10 sm:pt-0"
        >
          <div
            class="bg-primary-foreground/10 absolute -top-16 -left-10 size-64 rounded-full blur-3xl"
          />
          <div class="relative space-y-4 pb-2 sm:py-10">
            <div class="flex items-center gap-1" aria-label="Rated 4.9 out of 5">
              <Icon
                v-for="n in 5"
                :key="n"
                name="lucide:star"
                class="size-4 fill-amber-400 text-amber-400"
              />
              <span class="text-primary-foreground/80 ml-1.5 text-xs font-medium"
                >4.9 · 12k ratings</span
              >
            </div>
            <slot name="title">
              <h3 class="text-2xl font-bold tracking-tight text-balance">{{ props.title }}</h3>
            </slot>
            <slot name="description">
              <p class="text-primary-foreground/75 max-w-md text-sm">{{ props.description }}</p>
            </slot>
            <div class="flex flex-wrap gap-3">
              <slot>
                <UiButton variant="secondary" class="text-foreground h-11 gap-2.5 px-4">
                  <Icon name="mdi:apple" class="size-6" />
                  <span class="text-left leading-tight">
                    <span class="block text-[10px] font-normal opacity-70">Download on the</span>
                    <span class="block text-sm font-semibold">App Store</span>
                  </span>
                </UiButton>
                <UiButton variant="secondary" class="text-foreground h-11 gap-2.5 px-4">
                  <Icon name="mdi:google-play" class="size-5" />
                  <span class="text-left leading-tight">
                    <span class="block text-[10px] font-normal opacity-70">Get it on</span>
                    <span class="block text-sm font-semibold">Google Play</span>
                  </span>
                </UiButton>
              </slot>
            </div>
          </div>

          <Motion
            class="relative mx-auto -mb-16 h-56 w-40 shrink-0 sm:mb-0 sm:h-64 sm:self-end"
            :animate="{ y: [0, -8, 0] }"
            :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
            aria-hidden="true"
          >
            <div
              class="bg-background absolute inset-x-0 top-6 bottom-[-4rem] rounded-[1.75rem] border-[6px] border-black/80 shadow-2xl sm:top-10"
            >
              <div class="mx-auto mt-2 h-4 w-14 rounded-full bg-black/80" />
              <div class="space-y-2 p-3">
                <div class="bg-primary/15 h-14 rounded-xl" />
                <div class="grid grid-cols-2 gap-2">
                  <div class="bg-muted h-12 rounded-lg" />
                  <div class="bg-muted h-12 rounded-lg" />
                </div>
                <div v-for="n in 3" :key="n" class="flex items-center gap-2">
                  <div class="bg-muted size-6 rounded-full" />
                  <div class="bg-muted h-2 flex-1 rounded-full" />
                </div>
              </div>
            </div>
          </Motion>

          <button
            type="button"
            class="bg-primary-foreground/15 hover:bg-primary-foreground/30 absolute top-3 right-3 flex size-8 items-center justify-center rounded-full backdrop-blur transition-colors"
            aria-label="Dismiss banner"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="text-center">
      <UiButton variant="ghost" size="sm" @click="visible = true">Show banner again</UiButton>
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
      title: "Take your work anywhere",
      description: "Get notifications, approve requests and check progress from your phone.",
    }
  );

  const visible = ref(true);
</script>
