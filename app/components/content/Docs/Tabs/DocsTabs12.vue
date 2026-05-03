<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <UiScrollArea orientation="horizontal" class="w-full max-w-lg">
        <UiTabsList
          class="border-border text-foreground relative mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="hover:bg-accent hover:text-foreground data-[state=active]:hover:bg-accent relative data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
          <UiTabsIndicator />
        </UiTabsList>
      </UiScrollArea>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-muted-foreground p-4 text-center text-sm">{{ t.content }}</p>
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
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
    {
      title: "Team",
      icon: "lucide:users",
      content: "This is the team section. Here you can see the team members.",
    },
    {
      title: "Settings",
      icon: "lucide:settings",
      content: "This is the settings section. Here you can change the settings.",
    },
    {
      title: "Reports",
      icon: "lucide:chart-area",
      content: "This is the reports section. Here you can see the reports.",
    },
  ];
</script>
