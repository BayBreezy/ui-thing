<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #dots>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger
          class="flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Icon name="lucide:ellipsis" class="size-4" />
          <span class="sr-only">Toggle menu</span>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start">
          <UiDropdownMenuItem v-for="l in links" :key="l.label" as-child>
            <NuxtLink :to="l.to"><Icon :name="l.icon" class="size-4" /> {{ l.label }}</NuxtLink>
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </template>
  </UiBreadcrumbs>
</template>

<script lang="ts" setup>
  import type { Crumbs } from "~/components/Ui/Breadcrumbs.vue";

  const items: Crumbs[] = [
    { label: "Home", link: "/" },
    { slot: "dots" },
    { label: "Components", link: "/components/accordion" },
    { label: "Breadcrumb" },
  ];

  const links = [
    { label: "Documentation", to: "#", icon: "lucide:book-open-text" },
    { label: "Themes", to: "#", icon: "lucide:paint-bucket" },
    { label: "GitHub", to: "#", icon: "lucide:github" },
  ];
</script>
