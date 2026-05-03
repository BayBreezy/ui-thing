<template>
  <UiTabs default-value="Projects" orientation="vertical" class="mx-auto w-full max-w-lg flex-row">
    <UiTabsList
      :pill="false"
      class="text-foreground flex-col gap-1 rounded-none bg-transparent px-1 py-0"
    >
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
      >
        <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 opacity-60" />
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
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
