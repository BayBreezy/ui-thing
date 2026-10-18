<template>
  <!--
    Footer with app download buttons and link columns
    Features: Brand with a short pitch, App Store and Google Play buttons, three link columns, social icons, legal links row
  -->
  <UiContainer as="footer" class="py-14 lg:py-20">
    <div class="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
      <div class="max-w-md space-y-6">
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
        <p class="text-muted-foreground text-sm leading-relaxed">
          We're on a mission to help teams collaborate and ship products together. Take it with you
          on the go.
        </p>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            v-for="store in stores"
            :key="store.name"
            to="#"
            class="bg-foreground text-background flex h-12 items-center gap-2.5 rounded-lg px-4 transition-opacity hover:opacity-90"
          >
            <Icon :name="store.icon" class="size-6" />
            <span class="text-left leading-tight">
              <span class="block text-[10px] opacity-70">{{ store.small }}</span>
              <span class="block text-sm font-semibold">{{ store.name }}</span>
            </span>
          </NuxtLink>
        </div>
        <div>
          <p class="mb-3 text-sm font-semibold">Follow us</p>
          <ul class="flex gap-2">
            <li v-for="social in socials" :key="social.name">
              <NuxtLink
                to="#"
                :aria-label="social.name"
                class="hover:bg-muted flex size-9 items-center justify-center rounded-full border transition-colors"
              >
                <Icon :name="social.icon" class="size-[18px]" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <nav class="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer">
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
      <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}, Inc. All rights reserved.</p>
      <ul class="flex flex-wrap gap-x-6 gap-y-2">
        <li v-for="item in legal" :key="item">
          <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const stores = [
    { name: "App Store", small: "Download on the", icon: "mdi:apple" },
    { name: "Google Play", small: "Get it on", icon: "mdi:google-play" },
  ];
  const columns = [
    { title: "Platform", links: ["Overview", "Features", "Integrations", "Pricing", "Changelog"] },
    {
      title: "Resources",
      links: ["Documentation", "API reference", "Guides", "Community", "Status"],
    },
    { title: "Company", links: ["About us", "Careers", "Press kit", "Partners", "Contact"] },
  ];
  const legal = ["Privacy policy", "Terms of service", "Cookie policy"];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
    { name: "YouTube", icon: "mdi:youtube" },
  ];
</script>
