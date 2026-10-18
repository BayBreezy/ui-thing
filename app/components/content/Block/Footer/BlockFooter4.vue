<template>
  <!--
    Footer with a gradient call to action panel above the links
    Features: Rounded gradient CTA panel with two buttons, four link columns beneath it, bottom bar with legal links and social icons
  -->
  <UiContainer as="footer" class="py-14 lg:py-20">
    <div
      class="from-primary to-primary/80 text-primary-foreground relative overflow-hidden rounded-3xl bg-linear-to-br px-6 py-12 text-center sm:px-12 lg:py-16"
    >
      <div
        class="bg-primary-foreground/10 absolute -top-24 -left-16 size-72 rounded-full blur-3xl"
      />
      <div
        class="bg-primary-foreground/10 absolute -right-16 -bottom-24 size-72 rounded-full blur-3xl"
      />
      <div class="relative mx-auto max-w-2xl space-y-4">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-primary-foreground/75 text-balance">{{ props.description }}</p>
        <div class="flex flex-wrap justify-center gap-3 pt-3">
          <UiButton variant="secondary" size="lg" class="text-foreground">
            Get started free
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton
            variant="ghost"
            size="lg"
            class="text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"
          >
            Talk to sales
          </UiButton>
        </div>
      </div>
    </div>

    <div class="mt-14 grid gap-10 lg:grid-cols-[1.2fr_2fr]">
      <div class="max-w-xs">
        <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            class="fill-primary h-6"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          {{ props.name }}
        </NuxtLink>
        <p class="text-muted-foreground mt-3 text-sm">
          Components you own, in a stack you already know.
        </p>
      </div>
      <nav class="grid grid-cols-2 gap-8 sm:grid-cols-4" aria-label="Footer">
        <div v-for="column in columns" :key="column.title">
          <p class="text-sm font-semibold">{{ column.title }}</p>
          <ul class="mt-4 space-y-3">
            <li v-for="link in column.links" :key="link">
              <NuxtLink
                to="#"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {{ link }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div
      class="text-muted-foreground mt-12 flex flex-col gap-4 border-t pt-8 text-sm md:flex-row md:items-center md:justify-between"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.</p>
      <ul class="flex items-center gap-1">
        <li v-for="social in socials" :key="social.name">
          <NuxtLink
            to="#"
            :aria-label="social.name"
            class="hover:bg-muted hover:text-foreground flex size-9 items-center justify-center rounded-full transition-colors"
          >
            <Icon :name="social.icon" class="size-[18px]" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{ name?: string; title?: string; description?: string }>(),
    {
      name: "UI Thing",
      title: "Ready to build something great?",
      description: "Join thousands of teams shipping faster with components they fully own.",
    }
  );

  const columns = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Developers", links: ["Docs", "API", "Status", "GitHub"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security"] },
  ];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
  ];
</script>
