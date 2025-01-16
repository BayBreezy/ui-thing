<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="relative mb-3 flex justify-center">
        <UiTabsList
          class="h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="relative flex items-center gap-2 overflow-hidden rounded-none border border-border py-2 first:rounded-s last:rounded-e data-[state=active]:bg-muted"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
        </UiTabsList>
        <UiTabsIndicator />
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
