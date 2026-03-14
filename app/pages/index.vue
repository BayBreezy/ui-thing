<template>
  <div class="mx-auto max-w-[1440px] px-5 pb-10">
    <ui-gradient-divider class="mb-10" />
    <UiTabs default-value="home">
      <UiTabsList :pill="false" class="relative mb-5 flex items-center overflow-x-auto">
        <UiTabsTrigger
          v-for="tab in tabs"
          :key="tab"
          :pill="false"
          :value="tab"
          class="capitalize"
          >{{ tab }}</UiTabsTrigger
        >
        <UiTabsIndicator />
      </UiTabsList>
      <UiTabsContent value="tasks" class="rounded-lg border bg-background px-4 py-6 lg:p-6">
        <HomeTasks />
      </UiTabsContent>
      <UiTabsContent value="home">
        <HomeCards />
      </UiTabsContent>
      <UiTabsContent value="playground">
        <Playground />
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  import Playground from "~/examples/playground/Playground.vue";

  definePageMeta({ layout: "home" });
  defineOgImage("UIThing", {
    title: "Beautiful Nuxt Components",
    description: "Discover a collection of stunning UI components for your next Nuxt project.",
  });

  const tabs = ["home", "tasks", "playground"];
</script>
