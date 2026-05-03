<template>
  <nav class="flex items-center gap-6 text-sm font-medium">
    <NuxtLink
      :class="[
        route.path.startsWith('/components/') || route.path.includes('/forms/')
          ? 'text-primary!'
          : '',
      ]"
      to="/components"
      class="text-foreground/60 hover:text-foreground transition-colors"
      >Components</NuxtLink
    >
    <UiDropdownMenu>
      <UiDropdownMenuTrigger>
        <div
          class="text-foreground/60 hover:text-foreground inline-flex items-center gap-1 transition-colors"
        >
          <span>Examples</span>
          <Icon name="heroicons:chevron-down" class="h-3 w-3" />
        </div>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="min-w-[180px]" align="start" :side-offset="5">
        <UiDropdownMenuItem v-for="l in localProjects" :key="l.name" as-child>
          <NuxtLink class="hover:bg-muted cursor-pointer" :to="l.link">{{ l.name }}</NuxtLink>
        </UiDropdownMenuItem>
        <template v-for="l in externalProjects" :key="l.name">
          <UiDropdownMenuItem as-child>
            <NuxtLink
              target="_blank"
              external
              class="hover:bg-muted cursor-pointer"
              :href="l.link"
              >{{ l.name }}</NuxtLink
            >
          </UiDropdownMenuItem>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
    <NuxtLink
      :class="[route.path.startsWith('/colors') ? 'text-primary!' : '']"
      to="/colors"
      class="text-foreground/60 hover:text-foreground transition-colors"
      >Colors</NuxtLink
    >
    <NuxtLink
      to="https://docd.uithing.com/prose/callout"
      class="group text-foreground/60 hover:text-foreground transition-colors"
      target="_blank"
      >Prose
    </NuxtLink>
    <NuxtLink
      to="https://inspira-ui.com/"
      class="group text-foreground/60 hover:text-foreground transition-colors"
      target="_blank"
      >Inspira UI
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const externalProjects = [
    { name: "Settings Dashboard", link: "https://settings-dash.behonbaker.com/" },
    { name: "ETag Topup UI", link: "https://etag-ui.behonbaker.com/" },
    { name: "UI Todo", link: "https://ui-todo.behonbaker.com/" },
  ];
  const localProjects = [
    { name: "Cards", link: "/examples/cards" },
    { name: "Dashboard", link: "/examples/dashboard" },
    { name: "Schema Visualizer", link: "/examples/schema-visualizer" },
    { name: "Landing Page", link: "/examples/landing" },
  ];
</script>
