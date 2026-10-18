<template>
  <!--
    Centered footer with navigation and social icons
    Features: Centered logo and tagline, inline navigation, social icon buttons, legal links and copyright, stacks cleanly on mobile
  -->
  <UiContainer as="footer" class="py-14 text-center lg:py-20">
    <NuxtLink to="#" class="inline-flex items-center gap-2.5 text-lg font-semibold">
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
    <p class="text-muted-foreground mx-auto mt-3 max-w-md text-sm text-balance">
      {{ props.tagline }}
    </p>

    <nav class="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3" aria-label="Footer">
      <NuxtLink
        v-for="link in links"
        :key="link"
        to="#"
        class="text-sm font-medium transition-colors hover:underline hover:underline-offset-4"
      >
        {{ link }}
      </NuxtLink>
    </nav>

    <ul class="mt-8 flex justify-center gap-2">
      <li v-for="social in socials" :key="social.name">
        <NuxtLink
          to="#"
          :aria-label="social.name"
          class="hover:bg-muted flex size-10 items-center justify-center rounded-full border transition-colors"
        >
          <Icon :name="social.icon" class="size-[18px]" />
        </NuxtLink>
      </li>
    </ul>

    <div
      class="text-muted-foreground mt-10 flex flex-col items-center justify-center gap-3 border-t pt-8 text-sm sm:flex-row sm:gap-6"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}, Inc.</p>
      <ul class="flex gap-5">
        <li v-for="item in legal" :key="item">
          <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string; tagline?: string }>(), {
    name: "UI Thing",
    tagline: "Building the interface layer for modern products, one component at a time.",
  });

  const links = ["Home", "Products", "Solutions", "Developers", "Company", "Support"];
  const legal = ["Privacy", "Terms", "Cookies"];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "LinkedIn", icon: "mdi:linkedin" },
    { name: "YouTube", icon: "mdi:youtube" },
    { name: "Instagram", icon: "mdi:instagram" },
  ];
</script>
