<template>
  <UiContainer class="pb-10">
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
      <UiTabsContent value="tasks" class="bg-background rounded-lg border px-4 py-6 lg:p-6">
        <HomeTasks />
      </UiTabsContent>
      <UiTabsContent value="home">
        <HomeCards />
      </UiTabsContent>
      <UiTabsContent value="playground">
        <Playground />
      </UiTabsContent>
    </UiTabs>
  </UiContainer>
</template>

<script lang="ts" setup>
  import Playground from "~/examples/playground/Playground.vue";
  const tabs = ["home", "tasks", "playground"];
</script>
