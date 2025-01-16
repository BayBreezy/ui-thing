<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="relative flex justify-center">
        <UiTabsList
          class="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="relative flex items-center gap-2 overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="p-4 text-center text-sm text-muted-foreground">{{ t.content }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
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
      badge: 3,
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: "New",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
