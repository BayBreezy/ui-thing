<template>
  <!--
    Split hero with customer social proof
    Features: Headline and description, validated email capture, avatar stack with star rating and customer count, product window preview with a live notification
  -->
  <section class="relative overflow-hidden">
    <UiContainer
      class="grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24"
    >
      <Motion
        class="max-w-xl"
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ type: 'spring', stiffness: 130, damping: 22 }"
      >
        <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-5 text-lg text-balance">{{ props.description }}</p>

        <form v-if="!done" class="mt-8 flex max-w-md gap-2" novalidate @submit.prevent="submit">
          <UiInput
            v-model="email"
            type="email"
            placeholder="you@company.com"
            aria-label="Email address"
            class="h-11"
          />
          <UiButton type="submit" size="lg" class="shrink-0">Get started</UiButton>
        </form>
        <p
          v-else
          class="mt-8 flex items-center gap-2 font-medium text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:circle-check" class="size-5" />
          Check your inbox to finish signing up.
        </p>
        <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>

        <div class="mt-8 flex items-center gap-4">
          <div class="flex -space-x-2.5">
            <UiAvatar
              v-for="avatar in avatars"
              :key="avatar"
              :src="avatar"
              class="ring-background size-10 ring-2"
            />
          </div>
          <div>
            <div class="flex gap-0.5" aria-label="Rated 4.9 out of 5">
              <Icon
                v-for="n in 5"
                :key="n"
                name="lucide:star"
                class="size-4 fill-amber-400 text-amber-400"
              />
            </div>
            <p class="text-muted-foreground mt-0.5 text-sm">
              <span class="text-foreground font-semibold">4.9/5</span> from 1,000+ customers
            </p>
          </div>
        </div>
      </Motion>

      <Motion
        class="relative"
        :initial="{ opacity: 0, x: 20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ type: 'spring', stiffness: 130, damping: 22, delay: 0.1 }"
      >
        <div class="bg-card overflow-hidden rounded-2xl border shadow-2xl" aria-hidden="true">
          <div class="flex items-center gap-1.5 border-b px-4 py-3">
            <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
            <span class="text-muted-foreground ml-3 text-xs">Customers</span>
          </div>
          <div class="space-y-1 p-3">
            <div
              v-for="row in rows"
              :key="row.name"
              class="hover:bg-muted/60 flex items-center gap-3 rounded-lg p-2.5 transition-colors"
            >
              <UiAvatar :src="row.avatar" :fallback="row.name[0]" class="size-9" />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium">{{ row.name }}</p>
                <p class="text-muted-foreground text-xs">{{ row.plan }}</p>
              </div>
              <span class="text-sm font-semibold tabular-nums">{{ row.mrr }}</span>
            </div>
          </div>
        </div>
        <Motion
          class="bg-card absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border p-3 pr-5 shadow-xl sm:-left-8"
          :initial="{ opacity: 0, y: 10, scale: 0.95 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ delay: 0.8, type: 'spring', stiffness: 200, damping: 18 }"
        >
          <UiFancyIcon icon="lucide:trending-up" theme="light" color="success" size="md" />
          <div>
            <p class="text-sm font-semibold">New subscription</p>
            <p class="text-muted-foreground text-xs">+$299 MRR just now</p>
          </div>
        </Motion>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Know your customers, grow your revenue",
    description:
      "One place to see who's paying, who's at risk and what to do next. No spreadsheets required.",
  });

  const avatars = [
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=45",
    "https://i.pravatar.cc/80?img=32",
    "https://i.pravatar.cc/80?img=15",
  ];
  const rows = [
    {
      name: "Northwind",
      plan: "Business · Annual",
      mrr: "$1,240",
      avatar: "https://i.pravatar.cc/60?img=47",
    },
    {
      name: "Lumen Labs",
      plan: "Pro · Monthly",
      mrr: "$299",
      avatar: "https://i.pravatar.cc/60?img=12",
    },
    {
      name: "Fieldwork",
      plan: "Pro · Annual",
      mrr: "$249",
      avatar: "https://i.pravatar.cc/60?img=45",
    },
    {
      name: "Hexa Cloud",
      plan: "Starter · Monthly",
      mrr: "$49",
      avatar: "https://i.pravatar.cc/60?img=32",
    },
  ];

  const email = ref("");
  const error = ref("");
  const done = ref(false);

  function submit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    done.value = true;
  }
</script>
