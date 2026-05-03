<template>
  <UiTabs default-value="Projects" orientation="vertical" class="mx-auto w-full max-w-lg flex-row">
    <UiTabsList :pill="false" class="relative flex-col rounded-none border-l bg-transparent p-0">
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
      >
        {{ t.title }}
      </UiTabsTrigger>
    </UiTabsList>

    <div class="grow rounded-md border text-start">
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-muted-foreground px-4 py-3 text-xs">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </div>
  </UiTabs>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 2,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
