<template>
  <!--
    Compact single row footer
    Features: Logo, inline navigation and copyright in one row on desktop, wraps into a tidy stack on small screens
  -->
  <UiContainer as="footer" class="py-6">
    <div class="flex flex-col items-center gap-5 md:flex-row md:justify-between">
      <NuxtLink to="#" class="flex items-center gap-2.5 font-semibold">
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
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
        <NuxtLink
          v-for="link in links"
          :key="link"
          to="#"
          class="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          {{ link }}
        </NuxtLink>
      </nav>
      <p class="text-muted-foreground text-sm">
        &copy; {{ new Date().getFullYear() }} {{ props.name }}
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });
  const links = ["About", "Features", "Pricing", "Docs", "Blog", "Contact"];
</script>
