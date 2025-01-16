<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="flex justify-center">
        <UiTabsList class="bg-transparent">
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="flex items-center gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
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
