<template>
  <UiCard>
    <UiCardHeader class="flex flex-col gap-3">
      <UiBreadcrumbs :items="crumbs">
        <template #options>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton size="icon-sm" variant="ghost" aria-label="Account options">
                <Icon name="lucide:ellipsis" />
                <span class="sr-only">Account options</span>
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start">
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem>Profile</UiDropdownMenuItem>
                <UiDropdownMenuItem>Statements</UiDropdownMenuItem>
                <UiDropdownMenuItem>Documents</UiDropdownMenuItem>
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </template>
      </UiBreadcrumbs>
    </UiCardHeader>
    <UiCardContent>
      <UiItemGroup class="gap-4">
        <div v-for="link in links" :key="link.title" role="listitem" class="w-full">
          <UiItem variant="muted" as-child>
            <a href="#">
              <UiItemMedia variant="icon">
                <Icon :name="link.icon" />
              </UiItemMedia>
              <UiItemContent>
                <UiItemTitle>{{ link.title }}</UiItemTitle>
                <UiItemDescription>{{ link.description }}</UiItemDescription>
              </UiItemContent>
              <Icon name="lucide:chevron-right" class="text-muted-foreground size-4 shrink-0" />
            </a>
          </UiItem>
        </div>
      </UiItemGroup>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  import type { BreadcrumbItem } from "~/components/Ui/Breadcrumbs.vue";

  const crumbs: BreadcrumbItem[] = [
    { label: "Home", link: "#" },
    { slot: "options" },
    { label: "Payments" },
  ];

  const links = [
    {
      title: "Change transfer limit",
      description: "Adjust how much you can send from your balance.",
      icon: "lucide:settings",
    },
    {
      title: "Scheduled transfers",
      description: "Set up a transfer to send at a later date.",
      icon: "lucide:calendar",
    },
    {
      title: "Recurring card payments",
      description: "Manage your repeated card transactions.",
      icon: "lucide:refresh-cw",
    },
  ];
</script>
