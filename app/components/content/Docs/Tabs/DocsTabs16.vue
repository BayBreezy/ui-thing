<template>
  <div class="mx-auto w-full max-w-lg">
    <UiTabs default-value="Projects" orientation="vertical" class="w-full flex-row">
      <UiTabsList class="flex-col">
        <UiTooltip v-for="t in tabs" :key="t.title">
          <UiTooltipTrigger as-child>
            <span class="h-full">
              <UiTabsTrigger :value="t.title" class="py-3">
                <UiChip
                  v-if="t.badge"
                  class="bg-primary text-primary-foreground"
                  :text="t.badge?.toString()"
                  size="lg"
                >
                  <Icon :name="t.icon" class="size-4 shrink-0" />
                </UiChip>
                <Icon v-else :name="t.icon" class="size-4 shrink-0" />
              </UiTabsTrigger>
            </span>
          </UiTooltipTrigger>
          <UiTooltipContent side="right" class="px-2 py-1 text-xs">{{ t.title }}</UiTooltipContent>
        </UiTooltip>
      </UiTabsList>
      <div class="grow rounded-md border text-start">
        <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
          <p class="text-muted-foreground px-4 py-3 text-xs">
            {{ t.content }}
          </p>
        </UiTabsContent>
      </div>
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
