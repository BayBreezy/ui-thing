<template>
  <!--
    Minimal footer with a back to top button
    Features: Divider with a centered back to top button that scrolls smoothly, logo with legal links, copyright and social icons in one tidy block
  -->
  <UiContainer as="footer" class="pb-10">
    <div class="relative flex justify-center">
      <div class="bg-border absolute inset-x-0 top-1/2 h-px" />
      <UiButton
        variant="outline"
        size="sm"
        class="bg-background relative gap-1.5 rounded-full"
        @click="toTop"
      >
        <Icon name="lucide:arrow-up" class="size-4" />
        Back to top
      </UiButton>
    </div>

    <div class="mt-10 flex flex-col items-center gap-6 text-center">
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
      <ul class="text-muted-foreground flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <li v-for="item in links" :key="item">
          <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
        </li>
      </ul>
      <ul class="flex gap-1">
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
      <p class="text-muted-foreground text-xs">
        &copy; {{ new Date().getFullYear() }} {{ props.name }}. Made with care.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const links = ["Privacy", "Terms", "Security", "Accessibility", "Sitemap"];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
  ];

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>
