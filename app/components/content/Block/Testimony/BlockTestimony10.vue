<template>
  <!--
    Always dark quote with avatar switcher
    Features: Dark panel with a large quote that crossfades when you pick a customer avatar, with the selected avatar ringed and keyboard friendly tab semantics
  -->
  <UiContainer class="py-14 lg:py-20">
    <div
      class="relative overflow-hidden rounded-3xl bg-neutral-950 px-6 py-14 text-center text-white ring-1 ring-white/15 sm:px-12 lg:py-20"
    >
      <div
        class="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-3xl">
        <Icon name="lucide:quote" class="mx-auto size-10 text-indigo-300/70" />
        <div class="mt-6 min-h-52 sm:min-h-40" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <Motion
              :key="active"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -10 }"
              :transition="{ duration: 0.25 }"
            >
              <blockquote class="text-2xl leading-snug font-medium text-balance sm:text-3xl">
                {{ current.quote }}
              </blockquote>
              <p class="mt-6 font-semibold">{{ current.name }}</p>
              <p class="text-sm text-neutral-400">{{ current.role }}, {{ current.company }}</p>
            </Motion>
          </AnimatePresence>
        </div>
        <div role="tablist" aria-label="Choose a customer" class="mt-8 flex justify-center gap-3">
          <button
            v-for="(t, i) in props.items.slice(0, 5)"
            :key="t.name"
            role="tab"
            type="button"
            :aria-selected="i === active"
            :aria-label="t.name"
            class="rounded-full p-0.5 ring-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            :class="
              i === active ? 'ring-indigo-400' : 'opacity-60 ring-transparent hover:opacity-100'
            "
            @click="active = i"
          >
            <UiAvatar :src="t.avatar" :fallback="t.name[0]" class="size-12" />
          </button>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Testimonial = {
    quote: string;
    name: string;
    role: string;
    company: string;
    handle: string;
    avatar: string;
  };

  const props = withDefaults(
    defineProps<{ title?: string; description?: string; items?: Testimonial[] }>(),
    {
      title: "",
      description: "",
      items: () => [
        {
          quote:
            "We replaced three tools with one and our planning meetings got shorter overnight. The team actually enjoys opening it.",
          name: "Sarah Johnson",
          role: "CEO",
          company: "Northwind",
          handle: "@sarahj",
          avatar: "https://i.pravatar.cc/120?img=47",
        },
        {
          quote:
            "Onboarding a new engineer used to take two weeks. With the shared workspace it takes an afternoon.",
          name: "Michael Chen",
          role: "CTO",
          company: "Vertex",
          handle: "@mchen",
          avatar: "https://i.pravatar.cc/120?img=12",
        },
        {
          quote:
            "Support volume dropped by a third in the first quarter because customers finally find answers on their own.",
          name: "Emily Rodriguez",
          role: "Head of Support",
          company: "Lumen",
          handle: "@emilyrod",
          avatar: "https://i.pravatar.cc/120?img=32",
        },
        {
          quote:
            "The best investment we made this year. Our releases are calmer and nobody dreads Mondays anymore.",
          name: "Priya Nair",
          role: "VP of Engineering",
          company: "Orbit",
          handle: "@priya_n",
          avatar: "https://i.pravatar.cc/120?img=45",
        },
        {
          quote:
            "Simple, powerful and reliable. Exactly what we needed for a team that grew from five to fifty.",
          name: "Noah Fischer",
          role: "Founder",
          company: "Pulse",
          handle: "@noahf",
          avatar: "https://i.pravatar.cc/120?img=53",
        },
        {
          quote:
            "Outstanding support. I asked for a small change on Tuesday and it shipped on Wednesday.",
          name: "Ana Souza",
          role: "Operations Lead",
          company: "Nimbus",
          handle: "@anasouza",
          avatar: "https://i.pravatar.cc/120?img=44",
        },
        {
          quote:
            "Every detail feels considered. It is rare to find software that is this fast and this friendly.",
          name: "Hannah Lee",
          role: "Product Manager",
          company: "Quanta",
          handle: "@hannahlee",
          avatar: "https://i.pravatar.cc/120?img=49",
        },
        {
          quote:
            "We evaluated six alternatives. Nothing else came close on price, polish or the people behind it.",
          name: "Diego Alvarez",
          role: "Director of IT",
          company: "Summit",
          handle: "@diegoa",
          avatar: "https://i.pravatar.cc/120?img=33",
        },
      ],
    }
  );

  const active = ref(0);
  const current = computed(() => props.items[active.value]!);
</script>
