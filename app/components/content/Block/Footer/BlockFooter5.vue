<template>
  <!--
    Always dark footer with columns and a newsletter
    Features: Stays dark next to a light page by scoping the dark theme, five link columns, newsletter form with success state, social icons and legal row
  -->
  <footer class="dark bg-background text-foreground border-t">
    <UiContainer class="py-14 lg:py-20">
      <div class="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
        <div class="max-w-sm space-y-5">
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
            The latest news, articles and resources, sent to your inbox every month.
          </p>
          <form v-if="!done" class="flex gap-2" novalidate @submit.prevent="submit">
            <UiInput
              v-model="email"
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
            />
            <UiButton type="submit">Subscribe</UiButton>
          </form>
          <p v-else class="flex items-center gap-2 text-sm font-medium text-green-400">
            <Icon name="lucide:circle-check" class="size-5" />
            You're on the list.
          </p>
          <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
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
        class="text-muted-foreground mt-14 flex flex-col gap-5 border-t pt-8 text-sm md:flex-row md:items-center md:justify-between"
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
  </footer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const columns = [
    { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
    { title: "Resources", links: ["Docs", "Guides", "Blog", "Events"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Licenses"] },
  ];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
    { name: "YouTube", icon: "mdi:youtube" },
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
