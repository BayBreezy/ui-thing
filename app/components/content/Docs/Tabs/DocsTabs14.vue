<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <UiTabsList class="mx-auto flex w-full max-w-xs bg-transparent">
        <UiTabsTrigger
          v-for="t in tabs"
          :key="t.title"
          :value="t.title"
          :pill="false"
          class="group data-[state=active]:bg-muted flex-1 flex-col p-3 text-xs data-[state=active]:shadow-none"
        >
          <UiBadge
            class="mb-1.5 flex min-w-5 items-center justify-center px-1 transition-opacity group-data-[state=inactive]:opacity-50"
            >{{ t.badge }}</UiBadge
          >
          {{ t.title }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-muted-foreground mx-auto max-w-sm p-4 text-center text-sm text-pretty">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      badge: 3,
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 0,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: 7,
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
