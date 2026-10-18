<template>
  <!--
    Customer spotlight with a logo switcher
    Features: Large featured quote with an outcome stat, logo buttons that switch the story with an animated crossfade, accessible tab semantics
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto max-w-4xl">
      <div
        role="tablist"
        aria-label="Customer stories"
        class="flex flex-wrap items-center justify-center gap-2"
      >
        <button
          v-for="(story, i) in props.stories"
          :key="story.company"
          role="tab"
          type="button"
          :aria-selected="active === i"
          class="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors"
          :class="
            active === i
              ? 'border-primary bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          "
          @click="active = i"
        >
          <Icon :name="story.icon" class="size-4" />
          {{ story.company }}
        </button>
      </div>

      <div class="relative mt-10 min-h-80 sm:min-h-64" role="tabpanel">
        <AnimatePresence mode="wait">
          <Motion
            :key="current.company"
            :initial="{ opacity: 0, y: 12 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -12 }"
            :transition="{ duration: 0.25 }"
            class="grid items-center gap-8 md:grid-cols-[1fr_auto]"
          >
            <figure>
              <blockquote class="text-2xl leading-snug font-medium text-balance sm:text-3xl">
                “{{ current.quote }}”
              </blockquote>
              <figcaption class="mt-6 flex items-center gap-3">
                <UiAvatar :src="current.avatar" :fallback="current.name[0]" class="size-11" />
                <div>
                  <p class="font-semibold">{{ current.name }}</p>
                  <p class="text-muted-foreground text-sm">{{ current.role }}</p>
                </div>
              </figcaption>
            </figure>
            <div class="bg-muted/60 rounded-2xl p-6 text-center md:min-w-48">
              <p class="text-primary text-5xl font-bold tracking-tight">{{ current.stat }}</p>
              <p class="text-muted-foreground mt-1 text-sm">{{ current.statLabel }}</p>
            </div>
          </Motion>
        </AnimatePresence>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Story = {
    company: string;
    icon: string;
    quote: string;
    name: string;
    role: string;
    avatar: string;
    stat: string;
    statLabel: string;
  };

  const props = withDefaults(defineProps<{ stories?: Story[] }>(), {
    stories: () => [
      {
        company: "Northwind",
        icon: "lucide:compass",
        quote:
          "We replaced three tools with one and our planning meetings got shorter overnight. The team actually enjoys opening it.",
        name: "Sarah Johnson",
        role: "CEO at Northwind",
        avatar: "https://i.pravatar.cc/80?img=47",
        stat: "42%",
        statLabel: "faster planning",
      },
      {
        company: "Vertex",
        icon: "lucide:triangle",
        quote:
          "Onboarding a new engineer used to take two weeks. With the shared workspace it takes an afternoon.",
        name: "Michael Chen",
        role: "CTO at Vertex",
        avatar: "https://i.pravatar.cc/80?img=12",
        stat: "5x",
        statLabel: "quicker onboarding",
      },
      {
        company: "Lumen",
        icon: "lucide:sun",
        quote:
          "Support volume dropped by a third in the first quarter because customers finally find answers on their own.",
        name: "Emily Rodriguez",
        role: "Head of Support at Lumen",
        avatar: "https://i.pravatar.cc/80?img=32",
        stat: "-33%",
        statLabel: "support tickets",
      },
    ],
  });

  const active = ref(0);
  const current = computed(() => props.stories[active.value]!);
</script>
