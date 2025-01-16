<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <UiTabsList
        class="flex h-auto justify-center rounded-none border-b border-border bg-transparent p-0"
      >
        <UiTabsTrigger
          v-for="t in tabs"
          :key="t.title"
          :value="t.title"
          class="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          <Icon :name="t.icon" class="mb-1.5 size-4 shrink-0 opacity-60" />
          {{ t.title }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="mx-auto max-w-sm text-pretty p-4 text-center text-sm text-muted-foreground">
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
  ];
</script>
