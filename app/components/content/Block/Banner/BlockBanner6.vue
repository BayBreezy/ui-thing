<template>
  <!--
    Feature announcement on a gradient background
    Features: Vivid gradient with blurred shapes, new badge, headline with two actions, floating interface chips on larger screens, staggered entrance, dismiss
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
          class="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl lg:p-8"
        >
          <div class="absolute -top-20 -right-10 size-72 rounded-full bg-white/20 blur-3xl" />
          <div
            class="absolute -bottom-24 left-1/3 size-72 rounded-full bg-fuchsia-300/30 blur-3xl"
          />

          <div class="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div class="max-w-lg space-y-4">
              <Motion
                :initial="{ opacity: 0, x: -10 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: 0.1 }"
              >
                <span
                  class="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur"
                >
                  <Icon name="lucide:sparkles" class="size-3.5" />
                  {{ props.badge }}
                </span>
              </Motion>
              <Motion
                as="h3"
                class="text-2xl leading-tight font-bold tracking-tight text-balance lg:text-3xl"
                :initial="{ opacity: 0, x: -10 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: 0.2 }"
              >
                {{ props.title }}
              </Motion>
              <Motion
                as="p"
                class="text-white/80"
                :initial="{ opacity: 0, x: -10 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ delay: 0.3 }"
              >
                {{ props.description }}
              </Motion>
              <Motion
                class="flex flex-wrap gap-3 pt-1"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.4 }"
              >
                <slot>
                  <UiButton variant="secondary" class="text-foreground">
                    Try it now
                    <Icon name="lucide:arrow-right" class="size-4" />
                  </UiButton>
                  <UiButton variant="ghost" class="text-white hover:bg-white/15 hover:text-white">
                    Watch the demo
                  </UiButton>
                </slot>
              </Motion>
            </div>

            <div class="relative hidden h-40 w-64 lg:block" aria-hidden="true">
              <Motion
                v-for="(chip, i) in chips"
                :key="chip.label"
                class="absolute flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur"
                :class="chip.position"
                :animate="{ y: [0, -6, 0] }"
                :transition="{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }"
              >
                <Icon :name="chip.icon" class="size-4" />
                {{ chip.label }}
              </Motion>
            </div>
          </div>

          <button
            type="button"
            class="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors hover:bg-white/30"
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
      badge?: string;
      title?: string;
      description?: string;
    }>(),
    {
      badge: "Just shipped",
      title: "Build dashboards faster with AI-assisted layouts",
      description:
        "Describe the page you need and get a working layout built from your own components.",
    }
  );

  const visible = ref(true);

  const chips = [
    { label: "Revenue +12%", icon: "lucide:trending-up", position: "top-0 left-4" },
    { label: "3 new teammates", icon: "lucide:user-plus", position: "top-16 right-0" },
    { label: "Deployed", icon: "lucide:rocket", position: "bottom-0 left-10" },
  ];
</script>
