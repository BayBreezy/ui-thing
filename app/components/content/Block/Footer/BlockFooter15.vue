<template>
  <!--
    Community footer with live looking stats and join buttons
    Features: Soft glow background, community stat tiles with icons, GitHub and Discord join buttons, link columns, copyright
  -->
  <footer class="from-background to-muted/60 relative overflow-hidden border-t bg-linear-to-b">
    <div
      class="bg-primary/10 pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full blur-3xl"
    />
    <UiContainer class="relative py-14 lg:py-20">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-balance">Built in the open, with you</h2>
        <p class="text-muted-foreground mt-3 text-balance">
          Join the community, share what you're building and help shape what comes next.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <UiButton size="lg">
            <Icon name="mdi:github" class="size-5" />
            Star on GitHub
          </UiButton>
          <UiButton size="lg" variant="outline">
            <Icon name="mdi:chat-processing-outline" class="size-5" />
            Join the Discord
          </UiButton>
        </div>
      </div>

      <dl class="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-card rounded-2xl border p-4 text-center"
        >
          <Icon :name="stat.icon" class="text-muted-foreground mx-auto size-5" />
          <dd class="mt-2 text-2xl font-bold tracking-tight tabular-nums">{{ stat.value }}</dd>
          <dt class="text-muted-foreground text-xs">{{ stat.label }}</dt>
        </div>
      </dl>

      <nav
        class="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 text-left sm:grid-cols-4"
        aria-label="Footer"
      >
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

      <p class="text-muted-foreground mt-14 border-t pt-6 text-center text-sm">
        &copy; {{ new Date().getFullYear() }} {{ props.name }}. Open source under the MIT license.
      </p>
    </UiContainer>
  </footer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ name?: string }>(), { name: "UI Thing" });

  const stats = [
    { label: "GitHub stars", value: "12.4k", icon: "lucide:star" },
    { label: "Contributors", value: "186", icon: "lucide:git-pull-request" },
    { label: "Discord members", value: "8,200", icon: "lucide:messages-square" },
    { label: "Weekly installs", value: "41k", icon: "lucide:download" },
  ];
  const columns = [
    { title: "Learn", links: ["Docs", "Guides", "Examples", "Blog"] },
    { title: "Build", links: ["Components", "Blocks", "Themes", "CLI"] },
    { title: "Community", links: ["GitHub", "Discord", "Discussions", "Sponsors"] },
    { title: "About", links: ["Team", "Roadmap", "Changelog", "Contact"] },
  ];
</script>
