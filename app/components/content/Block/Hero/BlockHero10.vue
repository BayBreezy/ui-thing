<template>
  <!--
    Always dark aurora hero
    Features: Stays dark on a light page, animated aurora blobs, grain free glow, gradient headline, glass buttons and a command palette preview
  -->
  <section class="dark bg-background text-foreground relative isolate overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <Motion
        class="absolute -top-32 left-1/4 size-[28rem] rounded-full bg-violet-600/40 blur-3xl"
        :animate="{ x: [0, 40, 0], y: [0, 20, 0] }"
        :transition="{ duration: 14, repeat: Infinity, ease: 'easeInOut' }"
      />
      <Motion
        class="absolute top-20 right-1/4 size-[26rem] rounded-full bg-sky-500/30 blur-3xl"
        :animate="{ x: [0, -40, 0], y: [0, 30, 0] }"
        :transition="{ duration: 18, repeat: Infinity, ease: 'easeInOut' }"
      />
      <Motion
        class="absolute -bottom-32 left-1/2 size-[24rem] rounded-full bg-pink-500/25 blur-3xl"
        :animate="{ x: [0, 30, 0] }"
        :transition="{ duration: 16, repeat: Infinity, ease: 'easeInOut' }"
      />
    </div>

    <UiContainer class="py-20 text-center lg:py-32">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm backdrop-blur"
        >
          <Icon name="lucide:sparkles" class="size-3.5 text-violet-300" />
          {{ props.badge }}
        </span>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.titleStart }}
          <span
            class="bg-linear-to-r from-violet-300 via-sky-300 to-pink-300 bg-clip-text text-transparent"
            >{{ props.titleAccent }}</span
          >
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg" class="bg-white text-black hover:bg-white/90">
            Get started
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton
            size="lg"
            variant="outline"
            class="border-white/20 bg-white/5 hover:bg-white/10"
          >
            Read the docs
          </UiButton>
        </div>
      </Motion>

      <Motion
        class="mx-auto mt-16 max-w-xl text-left"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 100, damping: 22, delay: 0.3 }"
      >
        <div
          class="overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-2xl backdrop-blur-xl"
          aria-hidden="true"
        >
          <div class="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Icon name="lucide:search" class="text-muted-foreground size-4" />
            <span class="text-muted-foreground text-sm">Search commands, pages and people…</span>
            <UiKbd class="ml-auto">⌘K</UiKbd>
          </div>
          <ul class="p-2">
            <li
              v-for="(item, i) in commands"
              :key="item.label"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              :class="i === 0 && 'bg-white/10'"
            >
              <Icon :name="item.icon" class="text-muted-foreground size-4" />
              {{ item.label }}
              <span class="text-muted-foreground ml-auto text-xs">{{ item.hint }}</span>
            </li>
          </ul>
        </div>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      badge?: string;
      titleStart?: string;
      titleAccent?: string;
      description?: string;
    }>(),
    {
      badge: "Introducing command palette 2.0",
      titleStart: "Move at the speed of",
      titleAccent: "your thoughts",
      description:
        "A faster, keyboard-first way to get things done. Search, navigate and act without lifting your hands.",
    }
  );

  const commands = [
    { label: "Create new project", icon: "lucide:folder-plus", hint: "N" },
    { label: "Invite teammates", icon: "lucide:user-plus", hint: "I" },
    { label: "Open billing", icon: "lucide:credit-card", hint: "B" },
    { label: "Switch theme", icon: "lucide:moon", hint: "T" },
  ];
</script>
