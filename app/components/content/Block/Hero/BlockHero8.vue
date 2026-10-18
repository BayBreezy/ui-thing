<template>
  <!--
    Developer hero with an install command card
    Features: Feature badges, headline with two actions, tabbed install command for different package managers that copies on click, trust indicators
  -->
  <section class="relative overflow-hidden">
    <UiContainer class="py-16 text-center lg:py-28">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <UiBadge variant="secondary" class="gap-1.5 rounded-full py-1">
          <Icon name="lucide:sparkles" class="size-3.5" />
          {{ props.badge }}
        </UiBadge>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg">
            Get started
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton size="lg" variant="outline">
            <Icon name="mdi:github" class="size-5" />
            Star on GitHub
          </UiButton>
        </div>
      </Motion>

      <Motion
        class="mx-auto mt-12 max-w-xl text-left"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 100, damping: 22, delay: 0.2 }"
      >
        <div class="bg-card overflow-hidden rounded-xl border shadow-lg">
          <div class="flex items-center justify-between border-b px-2 pt-2">
            <div class="flex gap-1" role="tablist">
              <button
                v-for="manager in managers"
                :key="manager.name"
                type="button"
                role="tab"
                :aria-selected="active === manager.name"
                class="rounded-t-md px-3 py-1.5 text-sm font-medium transition-colors"
                :class="
                  active === manager.name
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                "
                @click="active = manager.name"
              >
                {{ manager.name }}
              </button>
            </div>
            <span class="text-muted-foreground mr-2 text-xs">Terminal</span>
          </div>
          <div class="flex items-center justify-between gap-3 p-4 font-mono text-sm">
            <code class="min-w-0 truncate"
              ><span class="text-muted-foreground select-none">$ </span>{{ command }}</code
            >
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="copied ? 'Copied' : 'Copy command'"
              @click="copy"
            >
              <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
            </UiButton>
          </div>
        </div>
      </Motion>

      <ul class="text-muted-foreground mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        <li v-for="item in trust" :key="item" class="flex items-center gap-2">
          <Icon name="lucide:circle-check" class="size-4 text-green-500" />
          {{ item }}
        </li>
      </ul>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{ badge?: string; title?: string; description?: string }>(),
    {
      badge: "Open source and free forever",
      title: "Build your dream product with our amazing tools",
      description:
        "Components you copy into your project and own completely. No runtime dependency, no lock-in.",
    }
  );

  const managers = [
    { name: "bun", command: "bunx ui-thing@latest add button card" },
    { name: "npm", command: "npx ui-thing@latest add button card" },
    { name: "pnpm", command: "pnpm dlx ui-thing@latest add button card" },
    { name: "yarn", command: "yarn dlx ui-thing@latest add button card" },
  ];
  const trust = ["No credit card required", "MIT licensed", "Works with Nuxt 4"];

  const active = ref("bun");
  const copied = ref(false);
  const command = computed(() => managers.find((m) => m.name === active.value)?.command ?? "");

  async function copy() {
    try {
      await navigator.clipboard.writeText(command.value);
    } catch {
      // Clipboard access can be blocked inside an iframe; the UI still confirms.
    }
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  }
</script>
