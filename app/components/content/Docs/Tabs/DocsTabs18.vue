<template>
  <UiTabs
    default-value="Projects"
    orientation="vertical"
    class="mx-auto flex w-full max-w-lg justify-center gap-2"
  >
    <UiTabsList
      :pill="false"
      class="relative h-auto flex-col rounded-none border-l border-border bg-transparent p-0"
    >
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:after:bg-primary"
      >
        {{ t.title }}
      </UiTabsTrigger>
    </UiTabsList>

    <div className="grow rounded-lg border border-border text-start">
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-pretty px-3 text-sm text-muted-foreground">
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
