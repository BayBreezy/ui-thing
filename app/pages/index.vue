<template>
  <div class="mx-auto max-w-[1440px] px-5 pb-10">
    <ui-gradient-divider class="mb-10" />
    <UiTabs default-value="home">
      <UiTabsList :pill="false" class="relative mb-5 flex items-center overflow-x-auto">
        <UiTabsTrigger :pill="false" value="home">Home</UiTabsTrigger>
        <UiTabsTrigger :pill="false" value="tasks">Tasks</UiTabsTrigger>
        <UiTabsIndicator />
      </UiTabsList>
      <UiTabsContent value="tasks" class="rounded-lg border bg-background px-4 py-6 lg:p-6">
        <HomeTasks />
      </UiTabsContent>
      <UiTabsContent value="home">
        <HomeCards />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: "home" });
  defineOgImageComponent("UIThing", {
    title: "Beautiful Nuxt Components",
    description: "Discover a collection of stunning UI components for your next Nuxt project.",
  });
</script>
