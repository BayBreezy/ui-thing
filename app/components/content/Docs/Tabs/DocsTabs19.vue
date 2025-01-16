<template>
  <UiTabs
    default-value="Projects"
    orientation="vertical"
    class="mx-auto flex w-full max-w-lg justify-center gap-2"
  >
    <UiTabsList
      :pill="false"
      class="relative h-auto flex-col gap-1 rounded-none bg-transparent px-1 py-0 text-foreground"
    >
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
      >
        <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 opacity-60" />
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
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
