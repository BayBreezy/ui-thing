<template>
  <!--
    Split hero with an email form and a product card visual
    Features: Badge, headline, validated email form with success state, trust line, layered interface cards on the right that float gently, staggered entrance
  -->
  <section class="relative overflow-hidden">
    <UiContainer class="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <Motion
        class="max-w-xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <NuxtLink
          to="#"
          class="hover:bg-muted group inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors"
        >
          <span class="bg-primary size-1.5 rounded-full" />
          {{ props.badge }}
          <Icon
            name="lucide:arrow-right"
            class="size-3.5 transition-transform group-hover:translate-x-0.5"
          />
        </NuxtLink>
        <h1 class="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mt-5 text-lg text-balance">{{ props.description }}</p>

        <form
          v-if="!done"
          class="mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
          novalidate
          @submit.prevent="submit"
        >
          <UiInput
            v-model="email"
            type="email"
            placeholder="Enter your work email"
            aria-label="Work email"
            class="h-11"
          />
          <UiButton type="submit" size="lg" class="shrink-0">
            Get early access
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </form>
        <p
          v-else
          class="mt-8 flex items-center gap-2 font-medium text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:circle-check" class="size-5" />
          You're on the list. We'll be in touch soon.
        </p>
        <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>
        <p v-else class="text-muted-foreground mt-3 text-sm">
          Free for 14 days. No credit card required.
        </p>
      </Motion>

      <div class="relative mx-auto h-[26rem] w-full max-w-lg" aria-hidden="true">
        <div class="bg-primary/10 absolute inset-8 rounded-full blur-3xl" />
        <Motion
          class="bg-card absolute top-4 left-0 w-64 rounded-2xl border p-4 shadow-xl"
          :animate="{ y: [0, -8, 0] }"
          :transition="{ duration: 6, repeat: Infinity, ease: 'easeInOut' }"
        >
          <div class="flex items-center justify-between">
            <p class="text-muted-foreground text-xs font-medium">Monthly revenue</p>
            <span
              class="rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400"
              >+18%</span
            >
          </div>
          <p class="mt-1 text-2xl font-bold tabular-nums">$48,260</p>
          <div class="mt-4 flex h-16 items-end gap-1.5">
            <div
              v-for="(bar, i) in bars"
              :key="i"
              class="bg-primary/20 flex-1 rounded-sm"
              :class="i === bars.length - 1 && 'bg-primary'"
              :style="{ height: `${bar}%` }"
            />
          </div>
        </Motion>

        <Motion
          class="bg-card absolute top-28 right-0 w-60 rounded-2xl border p-4 shadow-xl"
          :animate="{ y: [0, 8, 0] }"
          :transition="{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }"
        >
          <p class="text-sm font-semibold">Team activity</p>
          <ul class="mt-3 space-y-3">
            <li v-for="item in activity" :key="item.name" class="flex items-center gap-2.5 text-sm">
              <UiAvatar :src="item.avatar" :fallback="item.name[0]" class="size-7" />
              <span class="min-w-0 flex-1 truncate"
                ><span class="font-medium">{{ item.name }}</span> {{ item.action }}</span
              >
            </li>
          </ul>
        </Motion>

        <Motion
          class="bg-card absolute bottom-2 left-10 flex items-center gap-3 rounded-2xl border p-3 pr-5 shadow-xl"
          :animate="{ y: [0, -6, 0] }"
          :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
        >
          <UiFancyIcon icon="lucide:rocket" theme="gradient" color="success" size="md" />
          <div>
            <p class="text-sm font-semibold">Deployed to production</p>
            <p class="text-muted-foreground text-xs">2 minutes ago</p>
          </div>
        </Motion>
      </div>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{ badge?: string; title?: string; description?: string }>(),
    {
      badge: "We're hiring. Join our remote team",
      title: "People who care about your growth",
      description:
        "Powerful, self-serve product and growth analytics to help you convert, engage and retain more users.",
    }
  );

  const bars = [30, 46, 38, 58, 50, 72, 64, 90];
  const activity = [
    { name: "Priya", action: "shipped v2.4", avatar: "https://i.pravatar.cc/60?img=45" },
    { name: "Liam", action: "closed 6 issues", avatar: "https://i.pravatar.cc/60?img=12" },
    { name: "Sam", action: "invited 3 people", avatar: "https://i.pravatar.cc/60?img=32" },
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
