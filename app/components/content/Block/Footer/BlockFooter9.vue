<template>
  <!--
    Footer with an oversized faded wordmark
    Features: Link columns and social icons above a giant gradient wordmark that fades into the page, legal row, scales with the viewport
  -->
  <footer class="relative overflow-hidden">
    <UiContainer class="pt-14 lg:pt-20">
      <div class="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
        <div class="max-w-xs space-y-4">
          <p class="text-muted-foreground text-sm leading-relaxed">{{ props.description }}</p>
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
        class="text-muted-foreground mt-12 flex flex-col gap-3 text-sm sm:flex-row sm:justify-between"
      >
        <p>&copy; {{ new Date().getFullYear() }} {{ props.name }}. All rights reserved.</p>
        <ul class="flex gap-5">
          <li v-for="item in legal" :key="item">
            <NuxtLink to="#" class="hover:text-foreground transition-colors">{{ item }}</NuxtLink>
          </li>
        </ul>
      </div>
    </UiContainer>

    <p
      class="from-foreground/20 pointer-events-none mt-[-1.5vw] bg-linear-to-b to-transparent bg-clip-text text-center text-[22vw] leading-none font-black tracking-tighter text-transparent select-none"
      aria-hidden="true"
    >
      {{ props.name }}
    </p>
  </footer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string; description?: string }>(), {
    name: "UI Thing",
    description: "Open code components for people who like to own their interface.",
  });

  const columns = [
    { title: "Product", links: ["Components", "Blocks", "Themes", "Changelog"] },
    { title: "Learn", links: ["Docs", "Guides", "Examples", "Blog"] },
    { title: "Community", links: ["GitHub", "Discord", "Contribute", "Sponsors"] },
    { title: "Company", links: ["About", "Careers", "Contact", "Press"] },
  ];
  const legal = ["Privacy", "Terms"];
  const socials = [
    { name: "X", icon: "simple-icons:x" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "YouTube", icon: "mdi:youtube" },
  ];
</script>
