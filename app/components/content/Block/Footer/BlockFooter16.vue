<template>
  <!--
    Sitemap footer with dense link groups
    Features: Six linked group headings with sub links, region and language pickers, legal links and a back to top button, built for large sites
  -->
  <UiContainer as="footer" class="py-12 lg:py-16">
    <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
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
      <div class="flex flex-wrap items-center gap-3">
        <UiNativeSelect v-model="region" class="h-9 w-44" aria-label="Region">
          <option v-for="item in regions" :key="item">{{ item }}</option>
        </UiNativeSelect>
        <UiButton variant="outline" size="sm" class="gap-1.5" @click="toTop">
          <Icon name="lucide:arrow-up" class="size-4" />
          Back to top
        </UiButton>
      </div>
    </div>

    <nav
      class="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-10 sm:grid-cols-3 lg:grid-cols-6"
      aria-label="Sitemap"
    >
      <div v-for="group in groups" :key="group.title">
        <NuxtLink to="#" class="text-sm font-semibold hover:underline hover:underline-offset-4">
          {{ group.title }}
        </NuxtLink>
        <ul class="mt-3 space-y-2.5">
          <li v-for="link in group.links" :key="link">
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

    <div
      class="text-muted-foreground mt-12 flex flex-col gap-3 border-t pt-6 text-xs md:flex-row md:items-center md:justify-between"
    >
      <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}, Inc. {{ region }}.</p>
      <ul class="flex flex-wrap gap-x-5 gap-y-2">
        <li v-for="item in legal" :key="item">
          <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const region = ref("United States");
  const regions = ["United States", "United Kingdom", "Germany", "France", "Japan", "Australia"];

  const groups = [
    { title: "Platform", links: ["Overview", "Security", "Integrations", "Pricing"] },
    { title: "Solutions", links: ["Startups", "Enterprise", "Agencies", "Education"] },
    { title: "Developers", links: ["Documentation", "API", "SDKs", "Status"] },
    { title: "Learn", links: ["Blog", "Guides", "Webinars", "Case studies"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
    { title: "Support", links: ["Help center", "Community", "Trust center", "Accessibility"] },
  ];
  const legal = [
    "Privacy",
    "Terms of use",
    "Cookie settings",
    "Modern slavery statement",
    "Sitemap",
  ];

  function toTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>
