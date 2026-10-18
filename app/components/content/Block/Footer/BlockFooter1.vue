<template>
  <!--
    Classic footer with brand, link columns and a status pill
    Features: Logo and description, four link columns, system status pill with a pulsing dot, monochrome social icons, legal links and copyright
  -->
  <UiContainer as="footer" class="py-14 lg:py-20">
    <div class="grid gap-10 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
      <div class="max-w-sm">
        <NuxtLink to="#" class="flex items-center gap-2.5 text-lg font-semibold">
          <svg
            class="fill-primary h-7"
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
        <p class="text-muted-foreground mt-4 text-sm leading-relaxed">{{ props.description }}</p>
        <NuxtLink
          to="#"
          class="hover:bg-muted mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <span class="relative flex size-2">
            <span
              class="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75"
            />
            <span class="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          All systems operational
        </NuxtLink>
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
      class="mt-12 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between"
    >
      <p class="text-muted-foreground text-sm">
        &copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.
      </p>
      <ul class="flex items-center gap-1">
        <li v-for="social in socials" :key="social.name">
          <NuxtLink
            to="#"
            :aria-label="social.name"
            class="text-muted-foreground hover:bg-muted hover:text-foreground flex size-9 items-center justify-center rounded-full transition-colors"
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
    defineProps<{
      name?: string;
      description?: string;
    }>(),
    {
      name: "UI Thing",
      description:
        "Copy and paste components built with Nuxt, Tailwind and Reka UI. Own every line.",
    }
  );

  const columns = [
    { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"] },
    { title: "Resources", links: ["Documentation", "Guides", "Blog", "Community", "Support"] },
    { title: "Company", links: ["About", "Careers", "Press", "Partners", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];

  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
    { name: "YouTube", icon: "mdi:youtube" },
  ];
</script>
