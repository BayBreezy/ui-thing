<template>
  <UiBreadcrumbs :items="items" class="justify-center">
    <template #folder>
      <UiDropdownMenu v-model:open="open">
        <UiDropdownMenuTrigger
          class="flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Icon :name="open ? 'lucide:folder-open-dot' : 'lucide:folder'" class="size-4" />
          <span class="sr-only">Toggle folder</span>
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

  const open = ref(false);
  const items: Crumbs[] = [
    { label: "Home", link: "/" },
    { slot: "folder" },
    { label: "Breadcrumb" },
  ];

  const links = [
    { label: "Documentation", to: "#", icon: "lucide:book-open-text" },
    { label: "Themes", to: "#", icon: "lucide:paint-bucket" },
    { label: "GitHub", to: "#", icon: "lucide:github" },
  ];
</script>
