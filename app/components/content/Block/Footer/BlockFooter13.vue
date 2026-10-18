<template>
  <!--
    Two column footer with follow buttons
    Features: Brand and pitch on the left, labeled follow buttons in pills on the right, inline navigation and a legal row with a back to top link
  -->
  <UiContainer as="footer" class="py-12 lg:py-16">
    <div class="grid gap-10 md:grid-cols-2">
      <div class="max-w-md space-y-4">
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
        <p class="text-muted-foreground text-sm leading-relaxed">{{ props.description }}</p>
        <nav class="flex flex-wrap gap-x-5 gap-y-2 pt-1" aria-label="Footer">
          <NuxtLink
            v-for="link in links"
            :key="link"
            to="#"
            class="text-sm font-medium transition-colors hover:underline hover:underline-offset-4"
          >
            {{ link }}
          </NuxtLink>
        </nav>
      </div>

      <div class="md:justify-self-end">
        <p class="text-sm font-semibold">Follow us</p>
        <ul class="mt-4 flex flex-wrap gap-2">
          <li v-for="social in socials" :key="social.name">
            <NuxtLink
              to="#"
              class="hover:bg-muted inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors"
            >
              <Icon :name="social.icon" class="size-4" />
              {{ social.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="text-muted-foreground mt-12 flex flex-col gap-3 border-t pt-8 text-sm md:flex-row md:items-center md:justify-between"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.</p>
      <ul class="flex flex-wrap items-center gap-x-5 gap-y-2">
        <li v-for="item in legal" :key="item">
          <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string; description?: string }>(), {
    name: "UI Thing",
    description: "Building exceptional digital products that help businesses grow and succeed.",
  });

  const links = ["About", "Features", "Pricing", "Blog", "Contact", "Careers"];
  const legal = ["Privacy policy", "Terms of service", "Cookies"];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
    { name: "YouTube", icon: "mdi:youtube" },
  ];
</script>
